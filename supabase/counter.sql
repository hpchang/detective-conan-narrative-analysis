-- 瀏覽計數器 · Supabase 設定
-- 在 Supabase 儀表板 → SQL Editor → New query，整段貼上後按 Run。
--
-- 安全設計：
--   1. 資料表開啟 RLS 且「不建立任何 policy」→ 前端金鑰無法直接讀寫這張表
--   2. 只開放呼叫兩個函式（一個累加、一個純讀取）
--   3. 累加函式只能更新「已存在的列」，無法新增列 → 不會被灌爆儲存空間
--   4. security definer + 固定 search_path → 避免 search_path 注入

-- ---------------------------------------------------------------
-- 1. 計數表
-- ---------------------------------------------------------------
create table if not exists public.page_hits (
  slug       text primary key,
  hits       bigint      not null default 0,
  updated_at timestamptz not null default now()
);

-- 預先建立要計數的頁面。只有這裡列出的 slug 才能被累加。
insert into public.page_hits (slug, hits)
values ('timeline', 0)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------
-- 2. 開啟 RLS，且刻意不建立任何 policy
--    → 透過 publishable key 走 PostgREST 完全碰不到這張表
-- ---------------------------------------------------------------
alter table public.page_hits enable row level security;

-- ---------------------------------------------------------------
-- 3. 累加函式（原子操作，回傳累加後的數字）
-- ---------------------------------------------------------------
create or replace function public.bump_hits(page_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  n bigint;
begin
  update public.page_hits
     set hits = hits + 1, updated_at = now()
   where slug = page_slug
  returning hits into n;

  -- 找不到就報錯，而不是新增一列。
  -- 這樣別人無法用任意 slug 灌進無限多列。
  if n is null then
    raise exception 'unknown page slug: %', page_slug using errcode = '22023';
  end if;

  return n;
end;
$$;

-- ---------------------------------------------------------------
-- 4. 純讀取函式（同一個瀏覽階段重新整理時用，不會重複累加）
-- ---------------------------------------------------------------
create or replace function public.read_hits(page_slug text)
returns bigint
language sql
security definer
stable
set search_path = public
as $$
  select hits from public.page_hits where slug = page_slug;
$$;

-- ---------------------------------------------------------------
-- 5. 權限：收回預設，只放行這兩個函式給未登入使用者
--    （publishable key 對應的就是 anon 這個角色）
-- ---------------------------------------------------------------
revoke all on function public.bump_hits(text) from public;
revoke all on function public.read_hits(text) from public;

grant execute on function public.bump_hits(text) to anon;
grant execute on function public.read_hits(text) to anon;

-- ---------------------------------------------------------------
-- 6. 驗證：以下應該回傳 1
-- ---------------------------------------------------------------
-- select public.bump_hits('timeline');
