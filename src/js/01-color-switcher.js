const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStart (){
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log('hex-color:', getRandomHexColor())
    }, 1000);
    
    stopBtn.disabled = false;
    startBtn.disabled = true;
    stopBtn.classList.add('stop-active')
    startBtn.classList.add('stop')
};

function onStop() {
    clearInterval(timerId);
    stopBtn.disabled = true;
    stopBtn.classList.remove('stop-active')
    startBtn.disabled = false;
    startBtn.classList.remove('stop')
    document.body.style.backgroundColor = '#fafafa';
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);