# 怪手儀表板圖示測驗應用程式 (Excavator Icon Quiz App)

這是一個互動式的網路測驗應用程式，旨在幫助使用者學習和測試他們對挖掘機儀表板圖示的認識。透過這個應用程式，您可以以有趣且有效的方式掌握這些重要符號。

## ✨ 核心功能

*   **元件化架構**: 使用 React 構建，確保程式碼的模組化、可維護性和擴展性。
*   **分離的圖資來源**: 測驗問題使用乾淨圖示，結果頁面則提供原始截圖以供學習對照。
*   **動態測驗生成**: 從 `public/icon_mapping.json` 載入資料，動態生成測驗題目和隨機選項。
*   **互動式測驗體驗**: 每次顯示一題，提供明確的選擇介面和即時回饋。
*   **詳盡的結果與學習回饋**: 測驗結束後，清晰顯示總分，並提供完整的答案解析，包括每道題目的對錯狀態、正確答案與您的選擇。
*   **響應式設計**: 支援手機和桌面裝置，提供流暢的使用者體驗。

## 🚀 技術棧

*   **前端框架**: [React](https://react.dev/)
*   **語言**: [TypeScript](https://www.typescriptlang.org/)
*   **建構工具**: [Vite](https://vitejs.dev/)
*   **CSS 框架**: [Tailwind CSS](https://tailwindcss.com/)
*   **設計規範**: 遵循「ui pro max」指導原則，打造簡潔、高效且具有教育意義的介面。

## ⚙️ 安裝與運行

### 前提條件

請確保您的系統已安裝 Node.js (推薦 LTS 版本) 和 npm。

### 本地端安裝

1.  **複製儲存庫**:
    ```bash
    git clone <您的儲存庫 URL>
    cd excavator_project
    ```
2.  **安裝依賴**:
    ```bash
    npm install
    ```
3.  **準備測驗資料**:
    應用程式需要 `icon_mapping.json` 檔案和圖示圖片。請確保您的 `public` 資料夾結構如下：
    ```
    public/
    ├── icon_mapping.json
    ├── answer_icons/ # 包含 `icon_mapping.json` 中 `filename` 欄位提及的答案圖片 (例如: 截圖 2026-01-15 上午9.35.42.png)
    └── quiz_icons/   # 包含 `icon_mapping.json` 中 `filename` 欄位提及的問題圖片 (例如: icon_1.png, icon_2.png)
    ```
    **注意**: `quiz_icons` 中的檔名應為 `icon_X.png` (X為ID)，`answer_icons` 中的檔名應與 `icon_mapping.json` 的 `filename` 欄位完全匹配。

### 啟動開發伺服器

```bash
npm run dev
```
應用程式將會在 `http://localhost:5173/` 啟動。

## 🕹️ 使用方式

1.  **開始測驗**: 點擊開始畫面上的「開始測驗」按鈕。
2.  **回答問題**: 針對顯示的圖示，從多個選項中選擇正確的答案。
3.  **查看結果**: 完成所有題目後，您將看到您的分數，並可查看每道題目的正確與錯誤狀態及正確答案解析。
4.  **重新開始**: 點擊「重新開始」按鈕以再次進行測驗。

## 📊 資料結構 (`public/icon_mapping.json`)

`icon_mapping.json` 檔案應為一個 JSON 陣列，每個物件代表一個測驗項目：

```json
[
  {
    "id": 1,
    "label": "引擎機油壓力",
    "filename": "截圖 2026-01-15 上午9.35.42.png"
  },
  {
    "id": 2,
    "label": "空氣濾芯",
    "filename": "截圖 2026-01-15 上午9.35.50.png"
  }
  // ... 其他所有圖示的資料
]
```
*   `id`: 獨一無二的問題識別碼。
*   `label`: 該圖示的正確名稱 (用於答案選項和對照)。
*   `filename`: 原始圖片檔案名稱，用於建構 `answer_icons` 的路徑。

## 部署到 GitHub Pages

1.  **配置 `vite.config.ts`**:
    如果您的 GitHub Pages 網站是從儲存庫的子路徑提供的，請在 `vite.config.ts` 中添加 `base` 選項：
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
      plugins: [react()],
      base: '/<您的儲存庫名稱>/' // 將 `<您的儲存庫名稱>` 替換為實際的儲存庫名稱
    })
    ```
2.  **安裝 `gh-pages`**:
    ```bash
    npm install gh-pages --save-dev
    ```
3.  **修改 `package.json`**:
    添加 `homepage` 欄位和 `deploy` 腳本：
    ```json
    {
      "name": "excavator_project",
      "version": "0.0.0",
      "homepage": "https://May27Oliver.github.io/excavator_project",
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "deploy": "gh-pages -d dist" // 新增的部署腳本
      },
      // ... 其他依賴
    }
    ```

4.  **執行部署**:
    ```bash
    npm run deploy
    ```
    這會建置您的應用程式並將其推送到 `gh-pages` 分支。

5.  **GitHub 儲存庫設定**:
    前往您的 GitHub 儲存庫設定 -> Pages，確保「Source」已設定為 `gh-pages` 分支。

## 🤝 貢獻

歡迎任何形式的貢獻！如果您有任何建議或發現錯誤，請隨時開啟 Issue 或提交 Pull Request。