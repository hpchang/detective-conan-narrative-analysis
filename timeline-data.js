/* 分層年表資料（純資料 module，與呈現分離）
   t = 確定程度  confirmed / inferred / disputed
   s = 出處強度  file（有話數）/ line（有台詞）/ claim（僅轉述）      */
export const DATA=[
{era:"很久很久以前（98–50 年前）",items:[
 {y:"98 年前",t:"disputed",s:"claim",x:"<b>Amanda Hughes</b> 出生",w:"漫畫沒說過她幾歲，這個數字是粉絲反推的。"},
 {y:"85 年前",t:"inferred",s:"claim",x:"Misae Yamamura 出生"},
 {y:"72 年前",t:"inferred",s:"claim",x:"鈴木次郎吉出生"},
 {y:"71 年前",t:"inferred",s:"claim",x:"枡山憲三（皮斯可）出生"},
 {y:"67 年前",t:"confirmed",s:"line",x:"<b>Amanda Hughes</b> 在烏丸蓮耶的生日宴上，見到<b>當時還是小孩</b>的蘭姆",ep:"話數待補",todo:true,
  f:"<b>查到的原句：</b>「大約 50 年前，在一位日本大富豪的生日派對上見過面」「<b>當時還是個孩子</b>，卻被用一個奇怪的綽號叫著……是叫『蘭姆』吧？」<br>所以標成 <b>◆ 💬</b>：漫畫確實講了，我也有原句，但還沒查到是第幾話。<br>另外，「蘭姆」這個代號是<b>從他爸爸那裡繼承來的</b>——組織裡目前只知道這一個世襲代號。"},
 {y:"61 年前",t:"inferred",s:"claim",x:"Konosuke Jii 出生",w:"怪盜基德那條線的角色。"},
 {y:"60 年前",t:"inferred",s:"claim",x:"鈴木財閥創立"},
 {y:"56 年前",t:"inferred",s:"claim",x:"小田切敏郎出生"},
 {y:"54 年前",t:"inferred",s:"claim",x:"松本清長、<b>宮野厚司</b>出生"},
 {y:"53 年前",t:"disputed",s:"claim",x:"<b>世良瑪麗</b>出生",w:"瑪麗後來也被藥變小了，她真正幾歲是作品故意不講的謎。"},
 {y:"52 年前",t:"inferred",s:"claim",x:"阿笠博士出生"},
 {y:"51 年前",t:"inferred",s:"claim",x:"鈴木史郎出生"},
 {y:"50 年前",t:"confirmed",s:"file",x:"<b>烏丸蓮耶之死</b>",ep:"漫畫 30 集 File 4–7／動畫 219 話（黃昏之館，烏丸這個名字第一次出現）",
  f:"<b>依 Detective Conan Wiki 修正：</b>該站直接寫「Death of Renya Karasuma」（死亡），而非之前版本的「失蹤並推定死亡」。"},
 {y:"50 年前",t:"inferred",s:"claim",x:"阿笠栗介之死；<b>黑田兵衛</b>出生"}
]},
{era:"上一代的故事（50–18 年前）",items:[
 {y:"41 年前",t:"inferred",s:"claim",x:"中森銀三出生",w:"怪盜基德線。"},
 {y:"40 年前",t:"confirmed",s:"file",x:"阿笠博士和 Fusae Campbell 認識，對方留了一封信說<b>十年後再見</b>",ep:"漫畫 40 集 File 7「博士的初戀」／動畫 421–422 話"},
 {y:"40 年前",t:"inferred",s:"claim",x:"中森綠子出生"},
 {y:"39 年前",t:"inferred",s:"claim",x:"Iwao Ida 出生"},
 {y:"37 年前",t:"disputed",s:"claim",x:"工藤有希子、Jun Omura、<b>若狹留美</b>出生",
  f:"<b>依 Detective Conan Wiki 修正：</b>之前把<b>工藤優作</b>也放在這一年是錯的。該站把工藤優作與黑羽盜一標為「<b>37+ 年前</b>」，並註明確切年齡未曾明示。",
  w:"另外，「若狹留美就是淺香」目前只是粉絲推測，漫畫還沒證實。"},
 {y:"35 年前",t:"inferred",s:"claim",x:"大和敢助、諸伏高明出生"},
 {y:"33 年前",t:"inferred",s:"claim",x:"九條玲子出生"},
 {y:"32 年前",t:"inferred",s:"claim",x:"小嶋元次、Yoshiaki Hara、<b>赤井秀一</b>出生"},
 {y:"30 年前",t:"inferred",s:"claim",x:"伊織無我、風見裕也出生；<b>宮野厚司離家去做研究</b>；<b>本堂伊森進入 CIA</b>；帝丹小學蓋好"},
 {y:"約 25 年前",t:"inferred",s:"claim",x:"烏丸集團買下白鳩製藥使其倒閉，宮野夫婦改開診所"},
 {y:"20 年前",t:"confirmed",s:"file",x:"<b>苦艾酒殺害 Jodie Starling 的父親</b>",ep:"漫畫 42 集（Jodie 靠一句「A secret makes a woman woman」和指紋比對認出兇手）"},
 {y:"20 年前",t:"inferred",s:"claim",x:"越水七槻出生；目暮綠與目暮十三在一次車禍臨檢中認識"},
 {y:"18 年前",t:"confirmed",s:"claim",x:"<b>宮野志保</b>（後來的灰原哀）、京極真、塚本和美、真田高晴出生；<b>佐藤正義死於車禍</b>",ep:"話數待補",todo:true,
  f:"<b>依 Detective Conan Wiki 補上：</b>之前只列了宮野志保，而且標成「19–18 年前（推算）」。該站明確列在 18 年前，並多了三個人的出生與佐藤正義之死。<br>標成 <b>◆ 📄</b>：資料站說得很明確，但我沒看過漫畫原文。"},
 {y:"18 年前",t:"inferred",s:"claim",x:"黑羽盜一在巴黎認識千影，第一代怪盜基德登場"},
 {y:"約 18 年前",t:"inferred",s:"claim",x:"<b>宮野夫婦死於研究室火災</b>"}
]},
{era:"命案那一年（17 年前）",items:[
 {y:"17 年前",t:"confirmed",s:"file",x:"<b>Juke 飯店雙屍案</b>：羽田浩司與 Amanda Hughes 在美國遇害",
  ep:"前段：漫畫 89–90 集「17 年前的同一犯罪現場」｜完整真相：漫畫 104 集 File 4–7「17 年前的真相」"},
 {y:"17 年前",t:"confirmed",s:"file",x:"羽田浩司留下鏡子暗號：剪掉 <code>PTON</code>，留下 <code>UMASCARA</code>",
  ep:"同上；<code>CARASUMA</code> 的正解由工藤優作提出",
  f:"<b>已修正：</b>之前把「剪掉」和「留下」<b>完全講反</b>，還多寫了一個 O（POTON）。正確是剪掉 4 個、留下 8 個。"},
 {y:"17 年前",t:"confirmed",s:"claim",x:"工藤新一（5/4）、黑羽快斗（6/21）、中森青子、世良真純出生",ep:"話數待補",todo:true,
  w:"命案和新一出生同一年。這是作者故意的安排——新一和這樁懸案「同齡」。"},
 {y:"17 年前",t:"inferred",s:"claim",x:"蘭姆右眼受傷；將棋的<b>角行</b>棋子失蹤；黑田兵衛陷入昏迷",
  w:"之前寫成西洋棋的「主教（bishop）」是英譯轉換造成的誤譯，日文原作是將棋的角行。"}
]},
{era:"最近這些年（16 年前至今）",items:[
 {y:"16 年前",t:"confirmed",s:"claim",x:"毛利蘭出生",ep:"話數待補",todo:true},
 {y:"15 年前",t:"confirmed",s:"claim",x:"松本清長在追捕連續殺人犯時，<b>左眼上方</b>留下疤痕",ep:"話數待補",todo:true,
  f:"<b>依 Detective Conan Wiki 補正：</b>該站明確寫是「左眼上方」，之前只寫「臉部傷疤」。"},
 {y:"13 年前",t:"inferred",s:"claim",x:"工藤新一和毛利蘭第一次見面"},
 {y:"10 年前",t:"confirmed",s:"claim",x:"新一在海邊對世良瑪麗和赤井秀一說自己是「<b>福爾摩斯的門徒</b>」",ep:"話數待補",todo:true,
  w:"十年後，瑪麗在倫敦的電視轉播裡聽見柯南講一模一樣的話，因此認出他就是新一。"},
 {y:"10 年前",t:"confirmed",s:"claim",x:"<b>黑羽盜一被 Snake 殺害</b>，怪盜基德從此消失",ep:"話數待補",todo:true,
  f:"<b>已修正：</b>之前寫成「Snake 組織」。<b>Snake 是一個人的代號</b>，不是組織名。"},
 {y:"10 年前",t:"inferred",s:"claim",x:"新一和蘭進帝丹小學；妃英理第一次出庭；小五郎和英理分居；本堂瑛海加入 CIA；赤井家最後一次團聚"},
 {y:"7 年前",t:"confirmed",s:"claim",x:"<b>萩原研二在公寓爆炸中殉職（11 月 7 日）</b>",ep:"話數待補",todo:true,
  f:"<b>依 Detective Conan Wiki 補上：</b>之前的版本<b>整年遺漏</b>。萩原是警察學校五人組之一，也是松田陣平最好的朋友。"},
 {y:"8–5 年前",t:"inferred",s:"claim",x:"赤井秀一進入 FBI"},
 {y:"5 年前",t:"confirmed",s:"claim",x:"<b>赤井秀一開始潛入黑衣組織</b>（化名諸星大），並與宮野明美交往；此時宮野志保已在組織當研究員",ep:"話數待補",todo:true,
  f:"<b>依 Detective Conan Wiki 補正：</b>該站寫的是赤井「開始潛入」，而不只是「與明美相遇」。"},
 {y:"3 年前",t:"confirmed",s:"claim",x:"<b>松田陣平被炸彈炸死（11 月 7 日）</b>；新一和服部平次在滑雪場相遇",ep:"話數待補",todo:true,
  f:"<b>依 Detective Conan Wiki 補上：</b>之前<b>完全沒有這一條</b>。松田和萩原死在<b>同一個日期</b>，相隔四年。"},
 {y:"3 年前",t:"inferred",s:"claim",x:"赤井秀一的 FBI 身分曝光，被迫脫離組織"},
 {y:"2–3 年前",t:"inferred",s:"claim",x:"<b>苦艾酒</b>假扮赤井務武接近世良瑪麗；工藤夫婦搬去美國"},
 {y:"1 年前",t:"inferred",s:"claim",x:"雪莉、琴酒、伏特加到美國調查；<b>伊達航死於車禍</b>"},
 {y:"現在",t:"confirmed",s:"file",x:"<b>工藤新一被灌下 APTX 4869，變成江戶川柯南</b>",ep:"漫畫 File 1／動畫第 1 話"}
]},
{era:"故事進行中：三個關鍵揭曉",items:[
 {y:"揭曉",t:"confirmed",s:"file",x:"黑衣組織的老大是<b>烏丸蓮耶</b>",ep:"漫畫 95 集 File 5／動畫 942 話"},
 {y:"揭曉",t:"confirmed",s:"file",x:"<b>蘭姆</b>的真面目是<b>脇田兼則</b>",ep:"漫畫 100 集 File 1066／動畫 1079 話"},
 {y:"揭曉",t:"confirmed",s:"file",x:"17 年前羽田浩司案的完整真相",ep:"漫畫 104 集 File 4–7"}
]}];

export const TAG={confirmed:"◆ 確定",inferred:"◇ 推算",disputed:"○ 沒把握"};
export const SRC={file:{icon:"📖 有話數",tip:"寫得出第幾集第幾話，你可以自己去翻書對證"},
           line:{icon:"💬 有台詞",tip:"查到了角色講的原句，但還沒找到是第幾話"},
           claim:{icon:"📄 轉述",tip:"是別的資料站說的，我沒看過漫畫原文"}};

/* 將資料中受信任的 inline 標記（<b>／<code>／<br>）安全地套用為 DOM 節點。
   其他文字以 textContent 寫入，避免任意 HTML 被當成標記執行。 */
const ALLOWED_TAGS={B:'b',CODE:'code',BR:'br'};

export function richText(frag){
  /* frag 為含 <b>/<code>/<br> 的字串；回傳 DocumentFragment */
  const tpl=document.createElement('template');
  tpl.innerHTML=frag;
  const walk=(node)=>{
    [...node.childNodes].forEach(ch=>{
      if(ch.nodeType===Node.ELEMENT_NODE){
        const tag=ch.tagName;
        if(ALLOWED_TAGS[tag]){
          ch.querySelectorAll('*').forEach(c=>c.remove());
          walk(ch);
        }else{
          /* 不允許的元素：用其純文字取代 */
          const t=document.createTextNode(ch.textContent);
          ch.replaceWith(t);
        }
      }
    });
  };
  walk(tpl.content);
  return tpl.content.cloneNode(true);
}