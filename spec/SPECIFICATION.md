# 怪手儀表板圖示測驗程式 - 專案規格書 (v3 - Final)

## 1. 專案概述 (Overview)

本專案旨在開發一個使用 **React** 和 **Tailwind CSS** 技術棧的互動式網頁測驗應用程式。使用者可以透過此程式學習並測試自己對於挖掘機儀表圖示的認識。系統將隨機抽題，並在測驗結束後公佈分數與完整答案，並利用不同圖資（有答案與無答案）優化測驗與學習體驗。

## 2. 核心功能 (Core Features)

1.  **React 元件化架構**:
    *   整個應用程式將被拆分為獨立、可重用的元件（如 `StartScreen`, `Quiz`, `Results`），使程式碼結構更清晰、更易於維護。
    *   使用 React 的狀態管理（State）來控制測驗流程（例如：從開始畫面切換到測驗中，再到結果畫面）。

2.  **分離的圖資來源**:
    *   **測驗題目**: 使用位於 `dist/icons` 中的 **無答案** 乾淨圖示，提供公平的測驗環境。
    *   **答案複習**: 使用位於 `icons` 中的 **原始截圖**，在結果頁面提供對照，加強學習效果。

3.  **動態測驗生成**:
    *   應用程式啟動時，會從 `public/icon_mapping.json` 檔案中讀取題庫資料。
    *   對於每道題目，程式會動態生成選擇題選項，包含一個正確答案和數個從題庫中隨機抽取的干擾選項。

4.  **互動式測驗體驗**:
    *   一次只顯示一題，包含圖示和選項。
    *   使用 Tailwind CSS 打造一個乾淨、美觀且具備響應式設計的介面。

5.  **結果與學習回饋**:
    *   測驗結束時，清楚地展示使用者的得分。
    *   在結果頁下方，渲染出一個完整的圖示與答案對照表，其中包含原始截圖和正確名稱。

## 3. 資料結構 (Data Structure)

為了同時管理兩種圖資，我們將採用以下 JSON 結構。

**前置作業建議：**

1.  **重新命名圖片檔**: 強烈建議將所有圖示檔名（包括 `dist/icons` 和 `icons` 內的）修改為更簡潔且對應 `id` 的名稱，例如 `1.png`, `2.png`。
2.  **更新 JSON 檔案**: 根據新的圖片檔名，更新 JSON 檔中的路徑。

**最終 `icon_mapping.json` 格式：**

```json
[
  {
    "id": 1,
    "questionImagePath": "quiz_icons/1.png",
    "answerImagePath": "answer_icons/1.png",
    "correctAnswer": "引擎機油壓力"
  },
  {
    "id": 2,
    "questionImagePath": "quiz_icons/2.png",
    "answerImagePath": "answer_icons/2.png",
    "correctAnswer": "空氣濾芯"
  }
  // ... 其他所有圖示的資料
]
```

- **`id`**: 獨一無二的編號。
- **`questionImagePath`**: **問題用**的圖示路徑 (指向 `public/quiz_icons/` 中的檔案)。
- **`answerImagePath`**: **答案頁用**的圖示路徑 (指向 `public/answer_icons/` 中的檔案)。
- **`correctAnswer`**: 該圖示的正確名稱。

## 4. 技術棧 (Tech Stack)

-   **開發環境**: Node.js & npm
-   **建構工具**: **Vite**
-   **前端框架**: **React**
-   **CSS 框架**: **Tailwind CSS**

## 5. 最終專案檔案結構 (Target File Structure)

```
/excavator-quiz-app/        # 新的 React 專案根目錄
├── /public/                # 靜態資源資料夾
│   ├── /quiz_icons/        # (來自原始的 /dist/icons)
│   │   ├── 1.png
│   │   └── ...
│   ├── /answer_icons/      # (來自原始的 /icons)
│   │   ├── 1.png
│   │   └── ...
│   └── icon_mapping.json   # 更新後的題庫資料檔
├── /src/
│   ├── /components/
│   │   ├── StartScreen.jsx
│   │   ├── Quiz.jsx
│   │   └── Results.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 6. 開發工作流程 (Development Workflow)

1.  **規格確認 (v3)**: 您檢視並同意此份最終規格書。
2.  **環境建立**: 我將執行 `npm create vite@latest excavator-quiz-app ...` 指令來初始化 React 專案，並設定好 Tailwind CSS。
3.  **資源遷移 (使用者操作)**:
    *   在新建立的 `excavator-quiz-app` 資料夾內，建立 `public/quiz_icons` 和 `public/answer_icons` 資料夾。
    *   將原始專案的 `dist/icons` 內容複製到 `public/quiz_icons`。
    *   將原始專案的 `icons` 內容複製到 `public/answer_icons`。
    *   依照 **第 3 點** 的格式準備好 `icon_mapping.json`，並將其放入 `public/`。
4.  **程式開發**: 我將根據此規格書，開始撰寫 React 元件和應用程式邏輯。
5.  **測試與交付**: 完成後交付，您即可在本機運行測試。
