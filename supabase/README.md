# Supabase 瀏覽計數器 · 建立步驟

## 步驟 1：建立帳號與專案

1. 到 <https://supabase.com> → **Start your project** → 用 GitHub 帳號登入最快
2. **New project**，填：

   | 欄位 | 建議值 |
   |---|---|
   | Name | `detective-conan-timeline` |
   | Database Password | 按 **Generate a password**，然後**存進密碼管理器** |
   | Region | **Northeast Asia (Tokyo)** 或 **Southeast Asia (Singapore)** |
   | Plan | **Free** |

3. 按 **Create new project**，等約 1–2 分鐘佈建完成

> **資料庫密碼一定要存好。** 這個計數器用不到它，但日後要直連資料庫就需要，而且事後無法查看、只能重設。

## 步驟 2：執行 SQL

1. 左側選單 → **SQL Editor** → **New query**
2. 打開本目錄的 [`counter.sql`](./counter.sql)，**整份複製貼上**
3. 按 **Run**（或 ⌘↵）
4. 看到 `Success. No rows returned` 就成功了

## 步驟 3：取得 Project URL 與 Publishable key

左側選單 → **Settings**（齒輪）→ **API Keys**

| 要複製的 | 長相 | 說明 |
|---|---|---|
| **Project URL** | `https://xxxxxxxx.supabase.co` | 在 Settings → **Data API** 分頁 |
| **Publishable key** | `sb_publishable_...` | 在 **API Keys** 分頁 |

> 如果 **API Keys** 分頁裡沒有 publishable key，按 **Create new API keys** 產生。
>
> 你可能也會看到舊的 `anon` key（一長串 JWT）。**請用 publishable key**——Supabase 已宣布在 2026 年底前淘汰 `anon` 與 `service_role` 這組舊金鑰。

## 步驟 4：把這兩個值給我

貼給我就好：

```
Project URL: https://xxxxxxxx.supabase.co
Publishable key: sb_publishable_xxxxxxxxxxxx
```

**已完成**——計數器已接上並部署。

---

## 關於「把金鑰放進公開 repo」

**Publishable key 本來就是設計成公開的**——每個 Supabase 前端網站都會把它送到瀏覽器，任何人按 F12 都看得到。它的安全性不靠保密，而是靠資料庫端的權限設定。

本專案的防護是：

| 措施 | 效果 |
|---|---|
| 資料表開 RLS 且無任何 policy | 拿到金鑰也**讀不到、寫不了**這張表 |
| 只授權兩個函式 | 只能做「累加」和「讀數字」兩件事 |
| 函式內固定 slug 白名單（目前只允許 `timeline`） | 日後新增其他列，匿名使用者也**不能用 RPC 碰**它們 |
| 累加只更新既有列 | 無法用任意 slug 灌進無限多列 |
| `security definer` + 固定 `search_path` | 避免 search_path 注入 |

**做不到的事**：擋不了有人反覆呼叫來灌高瀏覽數。這是所有公開計數器的共同弱點；真要防就得加上驗證或伺服器端速率限制，對一個閱讀量統計而言不值得。

**要注意**：金鑰一旦 push 進公開 repo，就會**永久留在 git 歷史裡**。日後想換得到 Supabase 儀表板 rotate（舊的停用、發新的），光是改檔案沒有用。

---

## 之後想自己看數字

SQL Editor 執行：

```sql
select * from public.page_hits;
```

（在儀表板裡是用管理員身分連線，不受 RLS 限制，所以看得到。）
