import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let selectedDate = 0;
let timerId = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkSelectedDate(selectedDates[0]);
  },
};

disableStartBtn(true);

flatpickr(refs.dateTimePicker, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  disableStartBtn(true);
  timerId = setInterval(startTimer, 1000);
}

function startTimer() {
  const currentDate = new Date().getTime();
  const dateDifference = selectedDate - currentDate;
  if (dateDifference <= 0) {
    stopTimer();
    return;
  }
  changeValueTimer(convertMs(selectedDate - currentDate));
}

function stopTimer() {
  clearInterval(timerId);
}

function changeValueTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function checkSelectedDate(date) {
  const currentDate = new Date().getTime();
  selectedDate = new Date(date).getTime();
  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future', { timeout: 5000 });
    return;
  }

  disableStartBtn(false);
}

function disableStartBtn(isDisable) {
  refs.startBtn.disabled = isDisable;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
