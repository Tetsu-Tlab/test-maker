import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean
) {
  if (!apiKey) throw new Error("APIキーが入力されていません。設定画面で入力してください。");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 404エラー対策: 複数のモデル名を試す
  const modelNames = ["gemini-1.5-flash", "gemini-pro"];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      console.log(`Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const furiganaPrompt = useFurigana
        ? "【重要】漢字の後に(ふりがな)をつけてください。例：漢字(かんじ)"
        : "ふりがなは不要です。";

      const prompt = `
あなたは日本のベテラン教師です。以下の条件で20問の4択テストをJSON形式で作成してください。

【条件】
学年: ${grade}
教科: ${subject}
単元: ${unit}
個別の配慮: ${specialNeed}
${furiganaPrompt}

【出力形式】
以下のJSON構造のみを返してください。
{
  "title": "${grade} ${subject} 小テスト (${unit})",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "児童生徒が理解を深められる丁寧な解説"
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} failed:`, err);
      lastError = err;
      continue; // 次のモデルを試す
    }
  }

  // すべてのモデルで失敗した場合
  const errorMsg = lastError?.message || "AIとの通信に失敗しました。";
  if (errorMsg.includes("404")) {
    throw new Error("利用可能なGeminiモデルが見つかりませんでした。APIキーの権限を確認してください。");
  }
  throw new Error(`生成エラー: ${errorMsg}`);
}
