/* ---------- 年表渲染與篩選 ---------- */
import {DATA,TAG,SRC,richText} from './timeline-data.js';

const el=(tag,cls)=>{const e=document.createElement(tag);if(cls)e.className=cls;return e;};

function buildEvent(it){
  const article=el('article','ev');
  article.dataset.tier=it.t; article.dataset.src=it.s;

  const head=el('div','head');
  const yr=el('span','yr'); yr.textContent=it.y; head.appendChild(yr);
  const tag=el('span','tag'); tag.textContent=TAG[it.t]; head.appendChild(tag);
  const src=el('span','src'); src.dataset.s=it.s;
  src.textContent=SRC[it.s].icon; src.title=SRC[it.s].tip; head.appendChild(src);
  article.appendChild(head);

  const title=el('p','title'); title.appendChild(richText(it.x)); article.appendChild(title);

  const metaParts=[];
  if(it.ep){
    const ep=el('span','ep'+(it.todo?' todo':''));
    ep.textContent=it.ep; metaParts.push(ep);
  }
  if(it.f){const note=el('div','note f'); note.appendChild(richText(it.f)); metaParts.push(note);}
  if(it.w){const note=el('div','note w'); note.appendChild(richText(it.w)); metaParts.push(note);}
  if(metaParts.length){
    const meta=el('div','meta');
    metaParts.forEach(m=>meta.appendChild(m));
    article.appendChild(meta);
  }

  article.dataset.text=article.textContent.toLowerCase();
  return article;
}

export function initTimeline(){
  const tl=document.getElementById('tl');
  if(!tl) return;

  DATA.forEach(g=>{
    const sec=el('div','era-block');
    const h=el('div','era');
    const h3=el('h3'); h3.textContent=g.era; h.appendChild(h3);
    const span=el('span'); span.textContent=`${g.items.length} 條`; h.appendChild(span);
    sec.appendChild(h);
    const tr=el('div','track');
    g.items.forEach(it=>tr.appendChild(buildEvent(it)));
    sec.appendChild(tr);
    tl.appendChild(sec);
  });

  /* 預先快取 DOM，避免每次 input 都重新 query 全部 */
  const chips=[...document.querySelectorAll('.chip')];
  const q=document.getElementById('q');
  const cnt=document.getElementById('count');
  const emp=document.getElementById('empty');
  const onlyFile=document.getElementById('only-file');
  const eraBlocks=[...document.querySelectorAll('.era-block')].map(sec=>({
    sec,
    countSpan:sec.querySelector('.era span'),
    events:[...sec.querySelectorAll('.ev')],
  }));
  const total=eraBlocks.reduce((n,b)=>n+b.events.length,0);

  ['confirmed','inferred','disputed'].forEach(t=>{
    const n=document.getElementById('n-'+t);
    if(n) n.textContent=eraBlocks.reduce((c,b)=>c+b.events.filter(e=>e.dataset.tier===t).length,0);
  });

  function apply(){
    const on=new Set(chips.filter(c=>c.getAttribute('aria-pressed')==='true').map(c=>c.dataset.tier));
    const term=q.value.trim().toLowerCase();
    const fileOnly=onlyFile.getAttribute('aria-pressed')==='true';
    let shown=0;
    eraBlocks.forEach(b=>{
      let n=0;
      b.events.forEach(ev=>{
        const ok=on.has(ev.dataset.tier)
              &&(!fileOnly||ev.dataset.src==='file')
              &&(!term||ev.dataset.text.includes(term));
        ev.hidden=!ok;
        if(ok){shown++;n++;}
      });
      b.sec.hidden=n===0;
      b.countSpan.textContent=`${n} 條`;
    });
    cnt.textContent=`${shown} / ${total} 條`;
    emp.hidden=shown!==0;
  }

  chips.forEach(c=>c.addEventListener('click',()=>{
    c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');
    apply();
  }));
  q.addEventListener('input',apply);
  onlyFile.addEventListener('click',()=>{
    onlyFile.setAttribute('aria-pressed',onlyFile.getAttribute('aria-pressed')==='true'?'false':'true');
    apply();
  });
  const reset=document.getElementById('reset');
  if(reset) reset.addEventListener('click',()=>{
    chips.forEach(c=>c.setAttribute('aria-pressed','true'));
    onlyFile.setAttribute('aria-pressed','false'); q.value=''; apply();
  });
  apply();
}