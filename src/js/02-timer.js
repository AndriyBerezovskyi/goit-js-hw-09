import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    pause: document.querySelector('[data-pause]'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minutesValue: document.querySelector('[data-minutes]'),
    secondsValue: document.querySelector('[data-seconds]'),
}

refs.start.disabled = true;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (new Date() > selectedDates[0]) {
          Notiflix.Notify.failure('Please choose a date in the future')
      }
      else {
          refs.start.disabled = false;
          refs.start.addEventListener('click', () => {
            Notiflix.Notify.info('The countdown started')
            refs.pause.classList.remove('inactive')
            timerId = setInterval(() => {
                const convertedDate = convertMs(selectedDates[0] - new Date());
                refs.daysValue.textContent = convertedDate.days;
                refs.hoursValue.textContent = convertedDate.hours;
                refs.minutesValue.textContent = convertedDate.minutes;
                refs.secondsValue.textContent = convertedDate.seconds;
                if ((selectedDates[0] - new Date()) < 1000) {
                    clearInterval(timerId);
                    Notiflix.Notify.success('Time is up')
                }
                
            }, 1000);
          })
      }
    },
};

refs.pause.addEventListener('click', () => {
    clearInterval(timerId);
    Notiflix.Notify.warning('The countdown paused')
})

refs.stop.addEventListener('click', () => {
    Notiflix.Notify.warning('The countdown stopped')
    clearInterval(timerId);
    setTimeout(() => {
        document.location.reload()
    }, 1500);
})


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr("#datetime-picker", options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}
  
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}