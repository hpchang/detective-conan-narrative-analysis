# 部署設定

本站為**純靜態網站，無建置步驟**——`index.html` 單檔自帶所有 CSS 與 JS，只外連 `img/` 下的四張圖與 `favicon/`。

## GitHub Pages（唯一的正式站台）

- **網址**：<https://www.hpchang.com/detective-conan-narrative-analysis/>
- 來源：`main` 分支 / 根目錄（classic branch 部署，非 GitHub Actions）
- 帳號層級的自訂網域 `www.hpchang.com` 會自動套用到專案頁

push 到 `main` 後約 30–60 秒自動重新建置。

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
