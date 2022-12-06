const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = 0;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(setBodyColor, 1000);
  disableStartBtn(true);
}

function onStopBtnClick() {
  clearInterval(timerId);
  disableStartBtn(false);
}

function disableStartBtn(isDisable) {
  refs.startBtn.disabled = isDisable;
}

function setBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
