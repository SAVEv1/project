document.addEventListener('DOMContentLoaded',()=>{
    const faqs=[
      {q:"What can I recycle?",       a:"Plastics (#1 & #2), paper, glass, metals, electronics."},
      {q:"How prepare items?",        a:"Rinse, flatten, sort by material."},
      {q:"Where drop e‑waste?",       a:"At special collection events or certified centers."},
      {q:"Why sort properly?",        a:"Avoids contamination, ensures reuse."}
    ];
    const list=document.getElementById('faq-list');
    faqs.forEach(item=>{
      const d=document.createElement('div'); d.className='faq-item';
      d.innerHTML=`<strong>Q:</strong> ${item.q}<br/><strong>A:</strong> ${item.a}`;
      list.appendChild(d);
    });
    document.getElementById('faq-form').addEventListener('submit',e=>{
      e.preventDefault();
      const q=document.getElementById('question').value.trim();
      if(q){
        const d=document.createElement('div'); d.className='faq-item';
        d.innerHTML=`<strong>Q:</strong> ${q}<br/><strong>A:</strong> We'll get back to you soon.`;
        list.appendChild(d);
        document.getElementById('question').value='';
      }
    });
  });  