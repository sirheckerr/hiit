let isBreak = true; //if 15 seconds timer = isBreak
let minutes = 0;
let seconds = 15;
let timerInterval;
let isTimerRunning = false;


function updateTimerDisplay() {
  const displayMinutes = Math.floor(seconds / 60); // Calculate minutes
  const displaySeconds = seconds % 60; // Calculate seconds

  // Format minutes and seconds with leading zeros
  const formattedMinutes = displayMinutes.toString().padStart(2, '0'); 
  // makes it so when countdown goes over 60 seconds
  //then it will go 01:00 and so on.
  const formattedSeconds = displaySeconds.toString().padStart(2, '0');

  document.getElementById('countdown').textContent = `${formattedMinutes}:${formattedSeconds}`;
}


// BUTTON THAT MAKES IT SO YOU CAN CHANGE BREAK DURATION
function changeBreakDuration(change) {
  const breakDurationElement = document.getElementById('breakDuration');
  let newDuration = parseInt(breakDurationElement.textContent) + change; 
  if (newDuration >= 0) {
    breakDurationElement.textContent = newDuration;
    if (isBreak) {
      seconds = newDuration;
      updateTimerDisplay(); // live upate
    }
  }
}

// + BUTTON SO YOU CAN INCREASE BREAK DURATION
function increaseBreakDuration() {
  changeBreakDuration(1);
}

// - BUTTON SO YOU CAN DECREASE BREAK DURATION
function decreaseBreakDuration() {
  changeBreakDuration(-1);
}

// Function to update the workout duration live (so u dont have to refresh the page everytime you press plus lol)
function changeWorkoutDuration(change) {
  const workoutDurationElement = document.getElementById('workoutDuration');
  let newDuration = parseInt(workoutDurationElement.textContent) + change; // Increase or decrease workout duration
  if (newDuration >= 0) {
    workoutDurationElement.textContent = newDuration;
    if (!isBreak) {
      seconds = newDuration;
      updateTimerDisplay(); // Update the countdown immediately
    }
  }
}

// + BUTTON SO YOU CAN INCREASE WORKOUT DURATION
function increaseWorkoutDuration() {
  changeWorkoutDuration(1);
}

// - BUTTON SO YOU CAN DECREASE WORKOUT DURATION
function decreaseWorkoutDuration() {
  changeWorkoutDuration(-1);
}

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('pauseButton').disabled = false;
    document.getElementById('restartButton').disabled = false;
    updateTimer(); // Call this to update the timer immediately when starting
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function pauseTimer() {
  if (isTimerRunning) {
    isTimerRunning = false;
    document.getElementById('startButton').disabled = false;
    document.getElementById('pauseButton').disabled = true;
    document.getElementById('restartButton').disabled = false;
    clearInterval(timerInterval);
  }
}

function restartTimer() {
  clearInterval(timerInterval);
  isBreak = true;
  minutes = 0;
  seconds = parseInt(document.getElementById('breakDuration').textContent);
  isTimerRunning = false;
  document.getElementById('startButton').disabled = false;
  document.getElementById('pauseButton').disabled = true;
  document.getElementById('restartButton').disabled = true;
  document.getElementById('timer').textContent = 'HIIT TIMER!';
  updateTimerDisplay();
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  const countdownElement = document.getElementById('countdown');

  if (isBreak) {
    timerElement.textContent = 'Break';
    if (seconds === 0) {
      seconds = parseInt(document.getElementById('workoutDuration').textContent);
      isBreak = false; // Switch to the workout phase
    }
  } else {
    timerElement.textContent = 'Workout';
    if (seconds === 0) {
      seconds = parseInt(document.getElementById('breakDuration').textContent);
      isBreak = true; // Switch to the break phase
    }
  }

  updateTimerDisplay();
  seconds--;

  if (minutes === 0 && seconds < -1) {
    minutes = isBreak ? 0 : 1;
  }
}

// Buttons
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('restartButton').addEventListener('click', restartTimer);

// +- buttons
document.getElementById('breakMinusButton').addEventListener('click', decreaseBreakDuration);
document.getElementById('breakPlusButton').addEventListener('click', increaseBreakDuration);
document.getElementById('workoutMinusButton').addEventListener('click', decreaseWorkoutDuration);
document.getElementById('workoutPlusButton').addEventListener('click', increaseWorkoutDuration);
