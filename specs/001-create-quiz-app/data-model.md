# 資料模型

此專案的資料模型相對簡單，主要由 `public/icon_mapping.json` 檔案定義。

## `QuizItem`

```json
{
  "id": Number,
  "questionImagePath": String,
  "answerImagePath": String,
  "correctAnswer": String
}
```

- **id**: 獨一無二的數字 ID。
- **questionImagePath**: 用於測驗的問題圖片路徑。
- **answerImagePath**: 用於答案複習的圖片路徑。
- **correctAnswer**: 該圖示的正確文字答案。
