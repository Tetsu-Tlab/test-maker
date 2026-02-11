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

  // APIのURLがおかしくならないよう、最小限の初期化
  const genAI = new GoogleGenerativeAI(apiKey);

  // 404エラー対策: より確実に動作するモデル名のリスト
  // gemini-1.5-flash は最新モデルだが、環境によって名称が異なる場合がある
  const modelNames = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];
  let lastError = null;

  for (const modelName of modelNames) {
    try {
      console.log(`Trying Gemini model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const furiganaPrompt = useFurigana
        ? "【重要】すべての漢字の後に(ふりがな)をつけてください。例：漢字(かんじ)"
        : "ふりがなは不要です。";

      const prompt = `
あなたは日本のベテラン教師です。以下の条件で20問の4択テストをJSON形式で作成してください。

【条件】
学年: ${grade}
教科: ${subject}
単元: ${unit}
配慮: ${specialNeed}
${furiganaPrompt}

【出力形式】
JSONのみを返してください。
{
  "title": "${grade} ${subject} 小テスト",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "解説文"
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
      console.warn(`Model ${modelName} attempt failed:`, err);
      lastError = err;
      // 404以外の致命的なエラー（APIキー無効など）はすぐに投げる
      if (err.message && (err.message.includes("API_KEY_INVALID") || err.message.includes("403"))) {
        throw new Error("APIキーが無効、または権限がありません。");
      }
      continue;
    }
  }

  // ループ終了後にエラーがあれば投げる
  throw new Error(`AI生成に失敗しました (404対策実施済み)。エラー: ${lastError?.message || "不明"}`);
}
