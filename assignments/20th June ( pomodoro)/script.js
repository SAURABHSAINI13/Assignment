let timer
let isRunning = false
let timeLeft = 0
let sessionType = 'Work'
let pomodoroCount = 0

const durations = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  cycle: 4
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')
  document.getElementById("countdown").textContent = `${minutes}:${seconds}`
  document.getElementById("sessionType").textContent = `Session: ${sessionType}`
}

function updateProgress() {
  let display = ''
  for (let i = 0; i < durations.cycle; i++) {
    display += i < (pomodoroCount % durations.cycle) ? '🔴 ' : '⚪ '
  }
  document.getElementById("pomodoroProgress").textContent = display.trim()
}

function startTimer() {
  if (!isRunning) {
    if (timeLeft <= 0) {
      timeLeft = sessionType === 'Work'
        ? durations.work
        : sessionType === 'Short Break'
        ? durations.shortBreak
        : durations.longBreak
    }

    isRunning = true
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--
        updateTimerDisplay()
      } else {
        clearInterval(timer)
        isRunning = false
        nextSession()
      }
    }, 1000)
  }
}

function pauseTimer() {
  clearInterval(timer)
  isRunning = false
}

function resetTimer() {
  clearInterval(timer)
  isRunning = false
  sessionType = 'Work'
  pomodoroCount = 0
  timeLeft = durations.work
  updateTimerDisplay()
  updateProgress()
}

function nextSession() {
  if (sessionType === 'Work') {
    pomodoroCount++
    if (pomodoroCount % durations.cycle === 0) {
      sessionType = 'Long Break'
      timeLeft = durations.longBreak
      alert("🎉 Time for a LONG break!")
    } else {
      sessionType = 'Short Break'
      timeLeft = durations.shortBreak
      alert("🛋️ Time for a SHORT break!")
    }
  } else {
    sessionType = 'Work'
    timeLeft = durations.work
    alert("⏱️ Break's over! Time to WORK!")
  }

  updateTimerDisplay()
  updateProgress()
  startTimer()
}

document.getElementById("startBtn").addEventListener("click", startTimer)
document.getElementById("pauseBtn").addEventListener("click", pauseTimer)
document.getElementById("resetBtn").addEventListener("click", resetTimer)

resetTimer()