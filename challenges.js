document.addEventListener('DOMContentLoaded', ()=>{
  const user = JSON.parse(localStorage.getItem('user'));
  const missions = {
    today:[
      {
        text:"Zero‑Waste Lunch",
        desc:"Pack your lunch using only reusable containers—no plastic bags or disposable cutlery.",
        benefit:"Reduces 0.5 kg landfill waste this month",
        pts:20
      },
      {
        text:"Digital Receipts Only",
        desc:"Opt for email receipts instead of printed ones at all purchases today.",
        benefit:"Saves 10 g of paper",
        pts:15
      }
    ],
    week:[
      {
        text:"Plastic‑Free Week",
        desc:"Avoid all single-use plastics for seven consecutive days.",
        benefit:"Cuts 5 kg of plastic waste",
        pts:50
      },
      {
        text:"Community Cleanup",
        desc:"Join or organize a local park or beach cleanup.",
        benefit:"Removes 2 kg of trash from environment",
        pts:40
      }
    ]
  };

  const pick = arr => arr[Math.floor(Math.random()*arr.length)];
  const t = pick(missions.today);
  document.getElementById('mission-today').textContent  = t.text;
  document.getElementById('desc-today').textContent     = t.desc;
  document.getElementById('benefit-today').textContent = `Impact: ${t.benefit}`;

  const w = pick(missions.week);
  document.getElementById('mission-week').textContent  = w.text;
  document.getElementById('desc-week').textContent     = w.desc;
  document.getElementById('benefit-week').textContent = `Impact: ${w.benefit}`;

  function addPoints(pts){
    let total = parseInt(localStorage.getItem('points')) || 0;
    total += pts;
    localStorage.setItem('points', total);
    document.getElementById('user-points').textContent = total;
  }

  document.getElementById('complete-today').addEventListener('click', () => {
    if (!user) {
      alert('Please sign up or log in to complete challenges.');
      return;
    }
    addPoints(t.pts);
    document.getElementById('complete-today').textContent = `+${t.pts} pts`;
    document.getElementById('complete-today').disabled = true;
    document.getElementById('m-today').classList.add('completed');
    updateLeaderboard(user.username, t.pts);
  });

  document.getElementById('complete-week').addEventListener('click', () => {
    if (!user) {
      alert('Please sign up or log in to complete challenges.');
      return;
    }
    addPoints(w.pts);
    document.getElementById('complete-week').textContent = `+${w.pts} pts`;
    document.getElementById('complete-week').disabled = true;
    document.getElementById('m-week').classList.add('completed');
    updateLeaderboard(user.username, w.pts);
  });

  let board = [
    {name:"Ahmed", pts:320,badge:"🥇"},
    {name:"Noor",   pts:290,badge:"🥇"},
    {name:"Fatima",  pts:250,badge:"🥈"},
    {name:"Husain",pts:200,badge:"🥉"},
    {name:"Mohammed",  pts:150,badge:"🏅"}
  ];

  function updateLeaderboard(name, pts){
    let me = board.find(u=>u.name===name);
    if (!me) {
      me = { name, pts, badge:"" };
      board.push(me);
    } else {
      me.pts += pts;
    }
    render();
  }

  function render(){
    const lc = document.querySelector('.leaderboard-cards');
    lc.innerHTML = '';
    board.sort((a,b)=>b.pts-a.pts).forEach(u=>{
      const card = document.createElement('div'); card.className='card';
      card.innerHTML = `<h4>${u.badge} ${u.name}</h4><p>${u.pts} pts</p>`;
      lc.appendChild(card);
    });
  }
  render();
});