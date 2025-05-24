let timerDisplay = document.getElementById('timer');
let statusDisplay = document.getElementById('status');
let sessionDisplay = document.getElementById('sessions');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');
let skipBtn = document.getElementById('skip');

let isFocus = true;
let isRunning = false;
let timer;
let timeLeft = 25 * 60;
let completedPomodoros = 0;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  statusDisplay.textContent = isFocus ? "Focus Time" : "Break Time";
  sessionDisplay.textContent = completedPomodoros;
}

function switchMode() {
  if (isFocus) completedPomodoros++;
  isFocus = !isFocus;
  timeLeft = isFocus ? 25 * 60 : 5 * 60;
  updateDisplay();
  startTimer(); // auto-start next session
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        switchMode();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isFocus = true;
  timeLeft = 25 * 60;
  isRunning = false;
  completedPomodoros = 0;
  updateDisplay();
}

function skipTimer() {
  clearInterval(timer);
  isRunning = false;
  switchMode();
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
skipBtn.onclick = skipTimer;

updateDisplay();
