/* ---------- 鏡子密碼 ---------- */
const WORD="PUTONMASCARA".split(""), GAPS={3:1,5:1}, CUT=new Set([0,2,3,4]);
const STEPS=[
 {label:"1. 鏡子原本的字",text:"鏡子上寫著 PUT ON MASCARA，意思是「塗睫毛膏」。這是一面普通的化妝鏡。",mode:"none"},
 {label:"2. 剪掉 4 個字母",text:"羽田浩司用剪刀剪掉了 P、T、O、N 這四個字母。剪掉的丟了，留下的還在鏡子上。",mode:"cut"},
 {label:"3. 剩下 8 個字母",text:"鏡子上剩下 U M A S C A R A。這 8 個字母，就是他真正想留下的東西。",mode:"keep"},
 {label:"4. 大家的第一個答案",text:"重新排一排 → ASACA RUM（淺香・蘭姆）。看起來像在指認兇手。警察和組織都這樣讀，追錯了十七年。",mode:"asaca"},
 {label:"5. 真正的答案",text:"工藤優作發現：不要拆成兩個字，連起來讀 → CARASUMA，就是「烏丸」，組織真正的老大。",mode:"carasuma"}];
const REARR={asaca:"ASACA RUM".split(""),carasuma:"CARASUMA".split("")};

function makeTile(ch,cls){
  const d=document.createElement('div');
  d.className=cls;
  if(ch!==' ') d.textContent=ch;
  return d;
}

export function initMirrorPuzzle(){
  const tilesEl=document.getElementById('tiles');
  const stepText=document.getElementById('steptext');
  const stepBar=document.getElementById('stepbar');
  if(!tilesEl||!stepText||!stepBar) return;

  function render(i){
    const s=STEPS[i];
    tilesEl.replaceChildren();
    if(s.mode==='asaca'||s.mode==='carasuma'){
      REARR[s.mode].forEach(ch=>{
        tilesEl.appendChild(ch===' '?makeTile(' ','tile gap'):makeTile(ch,'tile keep'));
      });
    }else{
      WORD.forEach((ch,idx)=>{
        let tile;
        if(s.mode==='keep' && CUT.has(idx)){
          tile=makeTile(ch,'tile keep');
        }else if(s.mode==='cut' && CUT.has(idx)){
          tile=makeTile(ch,'tile cut');
        }else{
          tile=makeTile(ch,'tile');
          if(s.mode==='keep') tile.classList.add('keep');
        }
        tilesEl.appendChild(tile);
        if(GAPS[idx] && s.mode!=='keep'){
          tilesEl.appendChild(makeTile(' ','tile gap'));
        }
      });
    }
    stepText.textContent=s.text;
    [...stepBar.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));
  }

  STEPS.forEach((s,i)=>{
    const b=document.createElement('button');
    b.textContent=s.label;
    b.type='button';
    b.addEventListener('click',()=>render(i));
    stepBar.appendChild(b);
  });
  render(0);
}