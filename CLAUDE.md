# CLAUDE.md

個人簡介網站，React 19 + Vite 8，透過 GitHub Actions 部署到 GitHub Pages（`https://weiwiehu.github.io/resume/`）。

## 專案

- 套件管理：pnpm（版本見 `package.json` 的 `packageManager`）
- 指令：`pnpm dev` / `pnpm build` / `pnpm lint` / `pnpm preview`
- 部署：push 到 `main` 由 `.github/workflows/deploy.yml` 自動 build 並發佈，不使用 gh-pages 套件
- `vite.config.js` 的 `base` 必須等於 `/<repo 名稱>/`，repo 改名要同步修改
- `public/` 內資源在 JSX 中要加 base 前綴：`` `${import.meta.env.BASE_URL}icons.svg` ``，不可寫死 `/icons.svg`

## 分層規則（內容驅動）

```
src/
├─ data/          所有履歷內容（resume.json，可照 JSON Resume schema）
├─ sections/      頁面區塊，一個區塊一個元件（Hero、About、Experience…）
├─ components/    跨 section 共用的小元件（Tag、Card、Icon…）
├─ styles/        全域樣式與 design token
├─ assets/        需經 Vite 處理的圖片等資源
├─ App.jsx        只負責依序組合 sections
└─ main.jsx       進入點
```

- 內容與畫面分離：文字、經歷、連結等內容只放 `data/`，不可寫死在 JSX
- 資料流單向：`App.jsx` 讀 `data/` → 以 props 傳給 `sections/` → `sections/` 使用 `components/`
- import 方向：`App` → `sections` → `components`；`sections` 之間不可互相 import，`components` 不可 import `sections`
- `sections/` 與 `components/` 不直接 import `data/`，一律由 props 取得
- 只被單一 section 使用的元件留在該 section 檔案或同名資料夾內，被兩個以上 section 使用才移到 `components/`
- 元件專屬樣式與元件放一起（如 `Experience.module.css`），`styles/` 只放全域樣式
- 專案長大（多頁、部落格、後台）時再升級成 feature-based，屆時 `sections/` 改為 `features/`

## 工作流程

- 先列出並確認所有問題，等使用者明確提出修改才動手改 code
- Commit 訊息格式：新增功能用 `feat: ...`，修改／修正用 `fix: ...`

## 編碼準則

### 1. 先思考再編碼（Think Before Coding）

- 不做隱性假設；不確定就停下來問
- 有多種解法時把取捨攤開，不默默挑一種硬寫
- 需求不合理就直接提出反對意見

### 2. 極簡優先（Simplicity First）

- 只寫解決問題所需的最少程式碼
- 不做推測性功能，不為不可能發生的情境寫防禦程式碼
- 單次任務不建立複雜抽象

### 3. 外科手術式修改（Surgical Changes）

- 只改必須改的地方，不順手重構相鄰程式碼、不改無關的註解或排版
- 只清理自己這次造成的混亂
- 每一行改動都要能對應到明確的需求

### 4. 目標驅動執行（Goal-Driven Execution）

- 先把模糊任務轉成可驗證的成功標準
- 迴圈驗證直到達標（例如：先重現 bug → 修改 → 確認通過；改設定後跑 `pnpm build` 確認輸出）
