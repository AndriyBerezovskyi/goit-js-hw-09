import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name=delay]'),
  stepInput: document.querySelector('input[name=step]'),
  amountInput: document.querySelector('input[name=amount]'),
  creatBtn: document.querySelector('button')
}

refs.form.addEventListener('submit', promises)

let formData = {};
function promises(e) {
  e.preventDefault();
  formData = {
    delayValue: refs.delayInput.value,
    stepValue: refs.stepInput.value,
    amountValue: refs.amountInput.value,
  }
  let delay = Number(formData.delayValue);
  let step = Number(formData.stepValue);
  let amount = Number(formData.amountValue);

  modifiedPromises(delay, step, amount);
}


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  })
}

function modifiedPromises(delay, step, amount) {
  let counter = 0;
  for (let i = delay; i < 1000000; i += delay) {
    setTimeout(() => {
      counter += 1;
      if (counter > amount) {
        return;
      } else if (counter < 2) {
        createPromise(counter, delay)
        .then(result => Notiflix.Notify.success(`${result}`))
        .catch(result => Notiflix.Notify.failure(`${result}`));
      } else {
        const stepValue = delay += step;
        createPromise(counter, stepValue)
        .then(result => Notiflix.Notify.success(`${result}`))
        .catch(result => Notiflix.Notify.failure(`${result}`));
      }
    }, time(delay, i, step));
    }
}

function time(delay, i, step) {
  if (step < 1) {
    return delay;
  }
  return i;
}