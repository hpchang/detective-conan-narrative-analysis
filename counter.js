/* ---------- 瀏覽計數器（Cloudflare Worker + KV）----------
   沒有金鑰：可存取的 slug 由 Worker 端的硬編碼白名單決定，未知 slug 回 404。
   GET  <BASE>/<slug>  只讀取，不累加。
   POST <BASE>/<slug>  先累加再回傳。
   兩者都回 {"count":N}。                                            */
const VIEWS_BASE = 'https://views-counter.views-counter-worker.workers.dev';
const SLUG = 'timeline';
const STORAGE_KEY = `hits-counted:${SLUG}`;
const TIMEOUT_MS  = 8000;

function safeStorageGet(key){
  try{ return sessionStorage.getItem(key); }catch(_){ return null; }
}
function safeStorageSet(key,val){
  try{ sessionStorage.setItem(key,val); }catch(_){ /* 受限環境忽略 */ }
}

export function initCounter(){
  const line = document.getElementById('hits-line');
  const out  = document.getElementById('hits');
  if(!line||!out) return;

  /* 同一個瀏覽階段內重新整理只讀取、不重複累加 */
  const seen = safeStorageGet(STORAGE_KEY) === '1';
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), TIMEOUT_MS);

  fetch(`${VIEWS_BASE}/${encodeURIComponent(SLUG)}`,{
    method: seen ? 'GET' : 'POST',
    signal: controller.signal
  })
  .then(r => r.ok ? r.json() : Promise.reject(r.status))
  .then(data => {
    clearTimeout(timer);
    const n = data?.count;
    if(typeof n !== 'number' || !Number.isFinite(n)) return;
    out.textContent = n.toLocaleString('zh-TW');
    line.hidden = false;
    if(!seen) safeStorageSet(STORAGE_KEY,'1');
  })
  .catch(()=>{
    clearTimeout(timer);
    /* 計數失敗就不顯示，不影響頁面其他部分。
       不寫入 sessionStorage，讓下次仍可嘗試累加。 */
  });
}
