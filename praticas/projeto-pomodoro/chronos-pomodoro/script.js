const timerEl = document.getElementById('timer');
const playBtn = document.getElementById('playBtn');
const nextCycleEl = document.getElementById('nextCycle');
const alarm = document.getElementById('alarm');

const homeBtn = document.getElementById('homeBtn');
const historyBtn = document.getElementById('historyBtn');
const configBtn = document.getElementById('configBtn');
const themeBtn = document.getElementById('themeBtn');

const screens = document.querySelectorAll('.screen');

const focusInput = document.getElementById('focusInput');
const shortInput = document.getElementById('shortInput');
const longInput = document.getElementById('longInput');
const saveConfig = document.getElementById('saveConfig');

const historyList = document.getElementById('historyList');
const taskInput = document.getElementById('taskInput');

// TEMPOS
let focus = 25 * 60;
let short = 5 * 60;
let long = 15 * 60;

let time = focus;
let running = false;
let interval;
let cycle = 1;

// FORMATAR
function format(t) {
  let m = Math.floor(t / 60);
  let s = t % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// DISPLAY
function update() {
  timerEl.textContent = format(time);
}

// CICLOS
function updateNext() {
  if (cycle % 8 === 0) nextCycleEl.textContent = 'descanso longo';
  else if (cycle % 2 === 0) nextCycleEl.textContent = 'descanso';
  else nextCycleEl.textContent = 'foco';
}

function switchCycle() {
  saveHistory();

  cycle++;

  if (cycle % 8 === 0) time = long;
  else if (cycle % 2 === 0) time = short;
  else time = focus;

  alarm.currentTime = 0;
  alarm.play();

  updateNext();
}

// PLAY
playBtn.onclick = () => {
  if (!running) {
    interval = setInterval(() => {
      time--;
      update();

      if (time <= 0) {
        switchCycle();
      }
    }, 1000);

    running = true;
    playBtn.textContent = 'Pausar';
  } else {
    clearInterval(interval);
    running = false;
    playBtn.textContent = 'Iniciar';
  }
};

// HISTÓRICO
function saveHistory() {
  const task = taskInput.value || 'Sem nome';
  const history = JSON.parse(localStorage.getItem('history')) || [];

  history.push({
    task,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem('history', JSON.stringify(history));
}

function loadHistory() {
  historyList.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('history')) || [];

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.task} - ${item.date}`;
    historyList.appendChild(li);
  });
}

// TELAS
function showScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// BOTÕES
homeBtn.onclick = () => {
  showScreen('timerScreen');
  clearInterval(interval);
  running = false;
  time = focus;
  update();
};

historyBtn.onclick = () => {
  showScreen('historyScreen');
  loadHistory();
};

configBtn.onclick = () => showScreen('configScreen');

// CONFIG
saveConfig.onclick = () => {
  focus = focusInput.value * 60;
  short = shortInput.value * 60;
  long = longInput.value * 60;

  time = focus;
  update();
  showScreen('timerScreen');
};

// TEMA
themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
};

// INIT
update();
updateNext();
