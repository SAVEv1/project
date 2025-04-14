document.addEventListener('DOMContentLoaded',()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    let subs=[
      {user:"Ali", title:"Bottle Planter", img:"Bottle Planter.webp", ratings:[4,5,4,5,5]},
      {user:"Sara",title:"Can Lamp",      img:"Lampcan.jpg", ratings:[5,4,5,5,5]},
      {user:"Mona",title:"Glass Mosaic",  img:"glass.jpg", ratings:[3,4,4,5,4]},
      {user:"Huda",title:"Tin Sculpture", img:"Tin Sculpture.jpg", ratings:[5,5,5,4,5]},
      {user:"Ahmed",title:"Paper Art",     img:"Paper Art.jpg", ratings:[4,4,5,4,4]},
      {user:"Noor",title:"Drum Planter",  img:"Drum Planter.jpg", ratings:[5,5,5,5,5]},
      {user:"Noor",title:"Bottle Vase",   img:"Bottle Vase.jpg", ratings:[5,5,5,5,5]},
      {user:"Husain",title:"Paper Sculpture", img:"Paper Sculpture.jpg", ratings:[5,5,5,5,5]}
    ];
    function stars(avg, winner){
      if(winner) return '★'.repeat(5);
      const full = Math.floor(avg);
      const half = avg - full >= 0.5;
      return '★'.repeat(full) + (half?'½':'') + '☆'.repeat(5-full-(half?1:0));
    }
    function render(){
      const g=document.querySelector('.art-gallery'); g.innerHTML='';
      const avgs = subs.map(s=>s.ratings.reduce((a,b)=>a+b,0)/s.ratings.length);
      const maxAvg = Math.max(...avgs);
      subs.forEach((s,i)=>{
        const avg=avgs[i], isWinner=avg===maxAvg;
        const starStr=stars(avg,isWinner);
        const top = isWinner ? '<p><strong>Winner of the Month! 10 BHD Voucher</strong></p>' : '';
        const d=document.createElement('div'); d.className='art-card';
        d.innerHTML=`
          <img src="${s.img}" alt="${s.title}" />
          <h4>${s.title}</h4>
          <p>by ${s.user}</p>
          <p class="stars" style="color:gold">${starStr}</p>
          ${top}
        `;
        g.appendChild(d);
      });
    }
    document.getElementById('art-form').addEventListener('submit',e=>{
      e.preventDefault();
      if (!user) {
        alert('Please sign up or log in to upload art.');
        return;
      }
      const u=e.target.user.value.trim();
      const t=e.target.title.value.trim();
      const f=e.target.image.files[0];
      if(u&&t&&f){
        const r=new FileReader();
        r.onload=()=>{
          subs.push({user:u,title:t,img:r.result,ratings:[5,5,5,5,5]});
          let pts = parseInt(localStorage.getItem('points'))||0; pts +=15;
          localStorage.setItem('points', pts);
          document.getElementById('user-points').textContent = pts;
          render();
        };
        r.readAsDataURL(f);
      }
    });
    render();
  });  