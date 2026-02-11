import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * 複数のモデルを試行し、成功したものを返す
 */
export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean
) {
  if (!apiKey) throw new Error("APIキーが入力されていません。");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 試行するモデルの優先順位
  const modelNames = [
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
    "gemini-1.5-pro-latest",
    "gemini-1.5-pro",
    "gemini-pro" // 旧モデル名
  ];

  let lastError: any = null;

  for (const modelName of modelNames) {
    try {
      console.log(`[Gemini] Attempting with model: ${modelName}`);
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
個別の配慮: ${specialNeed}
${furiganaPrompt}

【出力形式】
JSON構造のみを返してください。
{
  "title": "${grade} ${subject} 小テスト (${unit})",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "理由と解説"
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const data = await result.response;
      const text = data.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Gemini] Success with model: ${modelName}`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn(`[Gemini] Model ${modelName} failed.`, err);
      lastError = err;

      // キーの無効化など、モデル名に依存しない致命的なエラーはループを抜ける
      if (err.message && (err.message.includes("API_KEY_INVALID") || err.message.includes("403"))) {
        throw new Error("APIキーが無効、またはアクセス権限がありません。");
      }

      continue; // 次のモデルを試す
    }
  }

  // すべて失敗した場合
  const finalMessage = lastError?.message || "不明なエラー";
  if (finalMessage.includes("404")) {
    throw new Error("Gemini 1.5/Proモデルが見つかりませんでした(404)。APIキーの設定やリージョンを確認してください。");
  }
  throw new Error(`AI生成エラー: ${finalMessage}`);
}
