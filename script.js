/* ---------------------------
   Quiz Data & Core Variables
   --------------------------- */
const questions = [
    {
        q: "1. What is Cloud Computing?",
        options: ["Using the internet to access resources", "Using a pendrive", "Using a local server only", "Using a mobile hotspot"],
        answer: 0
    },
    {
        q: "2. Which of the following is a cloud provider?",
        options: [ "VLC Player","AWS", "Telegram", "Notepad"],
        answer: 1
    },
    {
        q: "3. What does SaaS stand for?",
        options: [ "System as a Service", "Security as a Software", "Storage as a Service","Software as a Service"],
        answer: 3
    },
    {
        q: "4. What does IaaS stand for?",
        options: ["Infrastructure as a Service", "Internal Application as a Service", "Internet as a System", "Interface as a Service"],
        answer: 0
    },
    {
        q: "5. What does PaaS stand for?",
        options: ["Process as a Service", "Platform and Storage","Platform as a Service", "Private Application Service"],
        answer: 2
    },
    {
        q: "6. What is an example of SaaS?",
        options: ["Gmail", "CPU", "Hard disk", "Router"],
        answer: 0
    },
    {
        q: "7. What is an example of IaaS?",
        options: ["Bluetooth", "AWS EC2","Speaker", "MS Word"],
        answer: 1
    },
    {
        q: "8. What is used for cloud storage?",
        options: [ "Mouse", "Amazon S3","Motherboard", "USB"],
        answer: 1
    },
    {
        q: "9. Cloud services are accessed using the—",
        options: ["TV", "Printer","Internet", "Calculator"],
        answer: 3
    },
    {
        q: "10. What is a Virtual Machine (VM)?",
        options: ["A software-based computer", "A mobile app", "A robot", "A modem"],
        answer: 0
    },
    {
        q: "11. Public cloud is available to—",
        options: [ "One private company only","Everyone", "Only students", "Only government"],
        answer: 1
    },
    {
        q: "12. Private cloud is used by—",
        options: ["A single organization", "Everyone in the world", "Only gamers", "Only mobile users"],
        answer: 0
    },
    {
        q: "13. Hybrid cloud is—",
        options: [ "Only private", "Only public","Combination of public and private", "Only on-premise"],
        answer: 2
    },
    {
        q: "14. What is scalability?",
        options: ["Ability to increase resources", "Ability to increase screen size", "Ability to run games", "Ability to charge a phone"],
        answer: 0
    },
    {
        q: "15. What is elasticity?",
        options: ["Automatic scaling of resources", "Stretching wires", "Slow internet", "Increasing price"],
        answer: 0
    },
    {
        q: "16. What is the benefit of cloud computing?",
        options: [ "Buy expensive hardware", "No internet needed", "Very slow speed","Pay-as-you-go"],
        answer: 3
    },
    {
        q: "17. What is serverless computing?",
        options: ["No servers at all","No server management", "Only offline use", "Only for gaming"],
        answer: 1
    },
    {
        q: "18. Which is a database service?",
        options: ["Pen drive", "RAM","Amazon RDS", "SMS"],
        answer: 2
    },
    {
        q: "19. What is multi-tenancy?",
        options: ["Multiple users share the same resources", "Only one user", "A type of cable", "A storage device"],
        answer: 0
    },
    {
        q: "20. Which protocol is secure?",
        options: [, "HTTP", "FTP", "Telnet","HTTPS"],
        answer: 3
    },
    {
        q: "21. What is a cloud region?",
        options: ["Geographic area with data centers", "A mobile SIM", "A TV zone", "A local folder"],
        answer: 0
    },
    {
        q: "22. What is a cloud Availability Zone?",
        options: ["A location on desktop", "Independent data centers in a region","A mobile setting", "A WiFi range"],
        answer: 1
    },
    {
        q: "23. What is a load balancer used for?",
        options: ["Distribute traffic to multiple servers", "Slow down traffic", "Increase bill", "Block users"],
        answer: 0
    },
    {
        q: "24. What does “on-demand” mean?",
        options: [, "Resources only at night", "Resources increase price automatically","Resources available anytime", "Unavailable resources"],
        answer: 2
    },
    {
        q: "25. What is a container?",
        options: ["A lightweight packaged environment", "A dustbin", "A physical box", "A browser"],
        answer: 0
    },
    {
        q: "26. What is Kubernetes used for?",
        options: [, "Writing documents","Container management", "Playing music", "Charging phone"],
        answer: 1
    },
    {
        q: "27. What is encryption?",
        options: ["Protecting data using codes", "Copying data", "Deleting files", "Restarting server"],
        answer: 0
    },
    {
        q: "28. What is a CDN?",
        options: [, "Cable Data Node", "Cloud Desktop Network", "Central Data Number","Content Delivery Network"],
        answer: 4
    },
    {
        q: "29. What is “pay-as-you-go”?",
        options: ["Pay full amount first","Pay only for what you use",  "Pay yearly compulsory", "Pay double"],
        answer: 1
    },
    {
        q: "30. Cloud computing reduces—",
        options: [ "Internet speed", "Mobile battery", "Hardware cost","TV channels"],
        answer: 2
    }
];

let timerId = null;
let timeLeft = 90; // default seconds
const defaultTime = 90;

/* ------------ DOM refs ------------ */
const userInfo = document.getElementById('user-info');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const quizDiv = document.getElementById('quiz');
const timeEl = document.getElementById('time');
const timerEl = document.getElementById('timer');
const scoreValueEl = document.getElementById('scoreValue');
const maxQEl = document.getElementById('maxQ');
const leaderboardEl = document.getElementById('leaderboard');
const userDetailsEl = document.getElementById('user-details');

maxQEl.innerText = questions.length;

/* ---------- RENDER QUIZ ---------- */
function startQuiz(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if(!name || !email || !phone){
    alert('Please fill name, email and phone.');
    return;
  }

  // show quiz panel
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
  quizSection.classList.add('show');

  renderQuestions();
  timeLeft = defaultTime;
  timeEl.innerText = timeLeft;
  timerEl.classList.remove('warn');
  startTimer();
}

/* build questions */
function renderQuestions(){
  quizDiv.innerHTML = '';
  questions.forEach((item, idx) => {
    const qwrap = document.createElement('div');
    qwrap.className = 'question';
    qwrap.innerHTML = `<h3>${item.q}</h3>`;
    const opts = document.createElement('div');

    item.options.forEach((o, i) => {
      const opt = document.createElement('label');
      opt.className = 'option';
      opt.innerHTML = `<input type="radio" name="q${idx}" value="${i}"> <span>${o}</span>`;
      opts.appendChild(opt);
    });

    qwrap.appendChild(opts);
    quizDiv.appendChild(qwrap);
  });
}

/* ---------- TIMER ---------- */
function startTimer(){
  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;
    if (timeLeft <= 20) {
      timerEl.classList.add('warn');
    }
    if(timeLeft <= 0){
      clearInterval(timerId);
      submitQuiz();
    }
  },1000);
}

/* ---------- SUBMIT & SCORE ---------- */
function submitQuiz(){
  clearInterval(timerId);

  // calculate score
  let score = 0;
  questions.forEach((item, idx) => {
    const sel = document.querySelector(`input[name="q${idx}"]:checked`);
    if(sel && parseInt(sel.value) === item.answer) score++;
  });

  // show result panel
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
  resultSection.classList.add('show');

  // display user details and animated score
  const name = document.getElementById('name').value.trim();
  userDetailsEl.innerText = `Name: ${name} • Time left: ${timeLeft}s`;
  animateScore(0, score, 800);

  // save leaderboard
  saveScore(name, score);

  // chart and confetti
  showChart(score);
  if(score >= Math.ceil(questions.length * 0.6)) {
    // celebratory confetti when >=60%
    confettiBurst();
  }

  // show leaderboard
  showLeaderboard();
}

/* --------- SCORE COUNT ANIMATION --------- */
function animateScore(from, to, duration){
  const start = performance.now();
  function tick(now){
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const cur = Math.floor(from + (to - from) * easeOutCubic(progress));
    scoreValueEl.innerText = cur;
    if(progress < 1) requestAnimationFrame(tick);
    else scoreValueEl.innerText = to;
  }
  requestAnimationFrame(tick);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

/* ---------- LEADERBOARD (localStorage) ---------- */
function saveScore(name, score){
  let lb = JSON.parse(localStorage.getItem('leaderboard')) || [];
  lb.push({ name, score, time: Date.now() });
  lb.sort((a,b)=> b.score - a.score || a.time - b.time);
  lb = lb.slice(0,10);
  localStorage.setItem('leaderboard', JSON.stringify(lb));
}
function showLeaderboard(){
  const lb = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboardEl.innerHTML = '';
  lb.forEach((entry, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${i+1}. ${escapeHtml(entry.name)}</strong> — ${entry.score}/${questions.length}`;
    leaderboardEl.appendChild(li);
  });
}
function clearLeaderboard(){
  if(confirm('Clear all leaderboard data?')){
    localStorage.removeItem('leaderboard');
    leaderboardEl.innerHTML = '';
  }
}

/* basic escaping */
function escapeHtml(s){ return s.replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

/* ---------- CHART ---------- */
let chartInstance = null;
function showChart(score){
  const ctx = document.getElementById('resultChart').getContext('2d');
  const data = {
    labels: ['Correct','Wrong'],
    datasets: [{
      label: 'Results',
      data: [score, questions.length - score],
      backgroundColor: ['#00e5ff','#ff6b6b']
    }]
  };
  if(chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data,
    options:{
      responsive:true,
      maintainAspectRatio:true,
      animation:{ animateScale:true, duration:800 },
      plugins:{ legend:{ position:'bottom', labels:{ color:'#fff' } } }
    }
  });
}

/* ---------- CONFETTI BURST ---------- */
function confettiBurst(){
  // using canvas-confetti
  confetti({
    particleCount: 120,
    spread: 120,
    gravity: 0.6,
    origin: { y: 0.2 }
  });
  // secondary burst
  setTimeout(()=> confetti({ particleCount: 80, spread: 160, origin:{ y:0.35 } }), 300);
}

/* ---------- RESTART ---------- */
function restart(){
  // clear radio choices
  document.querySelectorAll('input[type=radio]').forEach(i=>i.checked=false);
  // reset panels
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
  userInfo.classList.add('show');
  // reset timer display
  timeLeft = defaultTime;
  timeEl.innerText = timeLeft;
  timerEl.classList.remove('warn');
}

/* ---------- PARTICLE BACKGROUND ---------- */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){ canvas.width = innerWidth; canvas.height = innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function initParticles(){
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 60000);
  for(let i=0;i< Math.max(30, count); i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.6 + 0.6,
      vx: (Math.random()-0.5)*0.15,
      vy: (Math.random()-0.5)*0.15,
      alpha: Math.random()*0.6 + 0.12
    });
  }
}
initParticles();

function updateParticles(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  for(const p of particles){
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < -10) p.x = canvas.width+10;
    if(p.x > canvas.width+10) p.x = -10;
    if(p.y < -10) p.y = canvas.height+10;
    if(p.y > canvas.height+10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(updateParticles);
}
updateParticles();

/* ---------- INITIAL UI STATE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // show only user card
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('show'));
  userInfo.classList.add('show');
  showLeaderboard();
});
