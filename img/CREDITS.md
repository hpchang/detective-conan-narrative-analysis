# 圖片來源與授權

本專案首頁的**所有圖解（inline SVG）皆為原創繪製**，不在此列。
以下為取自 Wikimedia Commons 的自由授權素材。**這些素材都已經過改製**：轉為黑白線稿＋45° 網點（screentone）的漫畫風格，原始檔保留在 `_original/`。

| 檔案 | 內容 | 原作者 | 原始授權 | 原始頁面 | 改動 |
|---|---|---|---|---|---|
| `kakugyo.svg` | 將棋角行棋子 | Luffykudo | **CC BY-SA 4.0** | [Commons](https://commons.wikimedia.org/wiki/File:Kakugyo_(Kinki).svg) | 重新上色為紙白底＋黑色描邊，底面改為網點 |
| `cassette.png` | 卡式錄音帶與 DAT | Inpriva | **CC0**（公眾領域貢獻） | [Commons](https://commons.wikimedia.org/wiki/File:DAT_%26_Compact_Cassette_hor.jpg) | 裁切至兩捲帶身，轉為線稿＋網點 |
| `floppy.png` | 3.5 吋軟碟 | George Chernilevsky | **Public domain** | [Commons](https://commons.wikimedia.org/wiki/File:Floppy_disk_2009_G1.jpg) | 縮圖，轉為線稿＋網點 |
| `vauxhall.png` | 倫敦沃克斯豪爾橋 | Acabashi | **CC BY-SA 4.0** | [Commons](https://commons.wikimedia.org/wiki/File:Vauxhall_Bridge_St_George_Wharf_Lambeth_River_Thames_London_01.jpg) | 縮圖，轉為線稿＋網點 |

## 改作物的授權

CC BY-SA 4.0 要求**標示改動**並以**相同授權釋出衍生作品**，因此：

- `kakugyo.svg`、`vauxhall.png` 這兩個改作版本同樣以 **CC BY-SA 4.0** 釋出。
- `floppy.png`（原始為公眾領域）與 `cassette.png`（原始為 CC0）無此義務。

頁面上每張圖的 `figcaption` 都已標明原作者、原始授權與「已改製為漫畫網點風格」。

## 怎麼重新產生

轉檔程式在 `tools/`（Python，需 Pillow、NumPy、SciPy）：

```
python tools/render.py img/_original img
python tools/make_svg.py img/_original/kakugyo.svg img/kakugyo.svg
```

`tools/render.py` 內含每張圖的參數。共同設定是 45° 圓點網點，每張圖以頁面顯示寬度的 2 倍算圖，
網點間距固定 5.2 px（換算到頁面上約 2.6 CSS px），所以四張圖的網點看起來一樣粗。
輸出為 2 色索引 PNG：紙色 `#f4f1ea`、墨色 `#121212`。

## 沒有使用的來源

查證所依據的兩個網站，其圖片**一張都沒有轉載**：

- **conan-zukai.com** — 標示 `© 2023 名探偵コナン考察・図解 図解好き All rights reserved`，且自述為非公式ファンサイト。無任何再利用授權。
- **detectiveconanworld.com** — 文字循 Wikipedia CC BY-SA 3.0／GFDL，但**圖片不在此範圍**。站上圖片為漫畫分鏡與動畫截圖，版權屬青山剛昌／小學館／TMS・讀賣電視台，係以合理使用主張自行託管；**該主張不隨圖片轉移給第三方網站**。

本站亦未使用任何漫畫或動畫畫面。網點風格是照片重新算圖的結果，不含任何柯南原作素材。
