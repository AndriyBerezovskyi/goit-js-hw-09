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
    stopBtn.disabled = false;
    stopBtn.classList.add('stop-active')
    startBtn.disabled = true;
    startBtn.classList.add('stop')
    }, 1000);
    
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