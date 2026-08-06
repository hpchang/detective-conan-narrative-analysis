# 部署設定

本站為**純靜態網站，無建置步驟**——`index.html` 單檔自帶所有 CSS 與 JS，只外連 `img/` 下的四張圖與 `favicon/`。

## GitHub Pages（唯一的正式站台）

- **網址**：<https://www.hpchang.com/detective-conan-narrative-analysis/>
- 來源：`main` 分支 / 根目錄（classic branch 部署，非 GitHub Actions）
- 帳號層級的自訂網域 `www.hpchang.com` 會自動套用到專案頁

push 到 `main` 後通常約 30–60 秒自動重新建置。

### 部署逾時紀錄與未來升級方案

2026-08-06 部署 commit `bcbe942` 時，GitHub Pages 的動態 workflow 曾顯示失敗：

- Jekyll 建置成功。
- `actions/upload-pages-artifact@v3` 成功上傳並完成 `github-pages` artifact。
- `actions/deploy-pages@v5` 建立部署後，狀態持續停在 `deployment_in_progress`。
- action 使用預設的 600,000 ms（10 分鐘）timeout；等待逾時後取消部署並將 workflow 標為失敗。
- 正式網站稍後仍成功更新，線上 HTML 與 OG 圖均和該 commit 完全一致。

這次問題發生在 GitHub Pages 發布後端，不是本站的 HTML、圖片、Jekyll 建置或 artifact 上傳錯誤。GitHub API／Actions 顯示的失敗狀態也不一定代表正式站沒有更新，應另外檢查正式網址、檔案內容與 `Last-Modified`。

目前 Pages 使用 GitHub 管理的 branch deployment：

- `build_type: legacy`
- 來源為 `main` 分支／根目錄
- workflow 路徑為 `dynamic/pages/pages-build-deployment`

`dynamic/pages/pages-build-deployment` 是 GitHub 自動產生的 workflow，並不存在於本 repository，因此無法直接修改其 job timeout 或加入額外 polling step。它本身已經使用 `jekyll-build-pages`、`upload-pages-artifact` 與 `deploy-pages`；單純再加一組相同步驟不會避開同一個 Pages 發布後端。

因為這是近期部署中的單次異常，而且正式網站最終成功更新，目前先不遷移部署方式。若逾時持續重複發生，再考慮改為 repository-owned GitHub Actions workflow：

1. 新增 `.github/workflows/static.yml`。
2. 將 Pages source 從 branch deployment 切換為 GitHub Actions。
3. 使用官方 `actions/configure-pages`、`actions/upload-pages-artifact`、`actions/deploy-pages`。
4. 對 `deploy-pages` 明確設定較長的 `timeout`，例如 1,200,000 ms（20 分鐘）。
5. 設定 `contents: read`、`pages: write`、`id-token: write` 權限。
6. 使用 `github-pages` environment，並保留既有 branch protection／deployment policy。
7. 設定 Pages concurrency，避免多次 push 的部署互相覆蓋。
8. 遷移前確認 build artifact 完整，遷移後確認自訂網域、HTTPS 與正式網址均正常。

即使改用自訂 workflow，仍會使用 GitHub Pages 的同一套部署服務，因此延長 timeout 只能提高容錯時間，不能保證消除平台端卡住的情況。

重新啟用指令（若日後需要）：

```bash
gh api -X POST repos/hpchang/detective-conan-narrative-analysis/pages -f "source[branch]=main" -f "source[path]=/"
```

查看建置狀態：

```bash
gh api repos/hpchang/detective-conan-narrative-analysis/pages/builds/latest -q '.status'
```

## 瀏覽計數器（Supabase）

設定與 SQL 見 [`supabase/`](./supabase/)。前端程式在 `index.html` 末端。

- 專案：`detective-conan-narrative-analysis`（ap-northeast-1）
- 前端只呼叫兩個 RPC：`bump_hits`、`read_hits`
- `page_hits` 資料表開啟 RLS 且無任何 policy，前端金鑰無法直接讀寫

查看目前數字：

```bash
curl -s -X POST "https://eaawlrtrxwyurcfnekat.supabase.co/rest/v1/rpc/read_hits" -H "apikey: sb_publishable_zS96EY5Uddhaq06hjt04sQ_E8WarUjc" -H "Authorization: Bearer sb_publishable_zS96EY5Uddhaq06hjt04sQ_E8WarUjc" -H "Content-Type: application/json" -d '{"page_slug":"timeline"}'
```

---

## 已移除：Cloudflare Pages

本站一度同時部署在 GitHub Pages 與 Cloudflare Pages，兩者從同一個 repo 的同一個分支建置、內容相同。
由於重複的站台會使搜尋引擎看到兩份一樣的內容，且維護時要顧兩個地方，已於 2026-08-01 刪除
Cloudflare Pages 專案，只保留掛在自訂網域上的 GitHub Pages。

`detective-conan-narrative-analysis.pages.dev` 已停止服務。

### 若日後想改用 Cloudflare Pages

⚠️ Cloudflare Pages 專案在**建立當下**就決定型態，**事後無法互轉**：

| 型態 | 建立方式 | 自動部署 |
|---|---|---|
| **Git 連接** | 儀表板 → Connect to Git | ✅ 每次 push 自動部署 |
| Direct Upload | `wrangler pages deploy` | ❌ 每次都要手動跑指令 |

所以**不要**先用 `wrangler pages deploy` 建立專案——那會佔掉專案名稱，且該專案永遠無法連接 Git。

建置設定（此站適用）：

| 欄位 | 值 |
|---|---|
| Production branch | `main` |
| Framework preset | **None** |
| Build command | **（留空）** |
| Build output directory | **`/`** |

## Cloudflare 的 GitHub App 授權

先前為了 Cloudflare Pages，曾在 GitHub 安裝 **Cloudflare Workers and Pages** App，
授權範圍限於 `detective-conan-narrative-analysis` 這一個 repo（非預設的 All repositories）。

Cloudflare Pages 已刪除，這個授權**不再需要**。若要撤銷：

GitHub → Settings → Applications → Installed GitHub Apps → Cloudflare Workers and Pages → **Uninstall**
