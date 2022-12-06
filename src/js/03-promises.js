import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
  e.preventDefault();

  const amount = getNumber(e.target.amount.value);
  const step = getNumber(e.target.step.value);
  const delay = getNumber(e.target.delay.value);

  generatePromise({ delay, step, amount });
}

function getNumber(value) {
  return Number.parseInt(value);
}

function generatePromise({ delay, step, amount }) {
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
