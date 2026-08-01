# 部署設定

本站為**純靜態網站，無建置步驟**——`index.html` 單檔自帶所有 CSS 與 JS，無外部相依。

## GitHub Pages（已上線）

- 來源：`main` 分支 / 根目錄（classic branch 部署，非 Actions）
- 網址：<https://www.hpchang.com/detective-conan-narrative-analysis/>
- 帳號層級的自訂網域 `www.hpchang.com` 會自動套用到專案頁

重新啟用指令（若日後需要）：

```bash
gh api -X POST repos/hpchang/detective-conan-narrative-analysis/pages -f "source[branch]=main" -f "source[path]=/"
```

## Cloudflare Pages（需在儀表板完成一次連接）

### ⚠️ 先讀這一段

Cloudflare Pages 專案在**建立當下**就決定型態，**事後無法互轉**：

| 型態 | 建立方式 | 自動部署 |
|---|---|---|
| **Git 連接** | 儀表板連接 GitHub repo | ✅ 每次 push 自動部署 |
| Direct Upload | `wrangler pages deploy` | ❌ 每次都要手動跑指令 |

因此**不要**先用 `wrangler pages deploy` 建立專案——那會佔掉專案名稱，且該專案永遠無法連接 Git。

### 設定步驟

1. 前往 <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授權 Cloudflare 的 GitHub App，選擇 repo `hpchang/detective-conan-narrative-analysis`
3. 建置設定填入：

   | 欄位 | 值 |
   |---|---|
   | Project name | `detective-conan-narrative-analysis` |
   | Production branch | `main` |
   | Framework preset | **None** |
   | Build command | **（留空）** |
   | Build output directory | `/` |
   | Root directory | **（留空）** |

4. **Save and Deploy**

完成後網址為 `https://detective-conan-narrative-analysis.pages.dev`，此後每次 push 到 `main` 都會自動部署。

### 為什麼 Build output directory 是 `/`

因為沒有建置步驟，`index.html` 就在 repo 根目錄。填 `dist`、`build`、`public` 都會失敗。

## 兩個站台的關係

兩者從**同一個 repo 的同一個分支**部署，內容一致：

- GitHub Pages — <https://www.hpchang.com/detective-conan-narrative-analysis/>
- Cloudflare Pages — `https://detective-conan-narrative-analysis.pages.dev`（待設定）

推送一次，兩邊都會更新（GitHub Pages 自動；Cloudflare 在完成上述連接後自動）。
