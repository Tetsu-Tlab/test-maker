import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean
) {
  if (!apiKey) throw new Error("APIキーが未設定です。");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 極めて広範囲なモデル名のリスト
  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-1.5-flash-8b"
  ];

  let errors: string[] = [];

  for (const modelName of modelNames) {
    try {
      console.log(`[Diagnostic] Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `あなたは日本の教師です。以下の条件で20問の4択テストをJSON構造のみで返してください。
学年: ${grade}, 教科: ${subject}, 単元: ${unit}, 配慮: ${specialNeed}, ふりがな: ${useFurigana ? '必要' : '不要'}

JSON構造:
{"title":"タイトル","questions":[{"text":"問","options":["a","b","c","d"],"correctIndex":0,"explanation":"解"}]}`;

      const result = await model.generateContent(prompt);
      const data = await result.response;
      const text = data.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Success] Model ${modelName} worked!`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Unknown error";
      console.warn(`[Fail] ${modelName} -> ${errorMsg}`);
      errors.push(`${modelName}: ${errorMsg.substring(0, 50)}...`);

      // キー自体が無効な場合は即終了
      if (errorMsg.includes("API_KEY_INVALID")) {
        throw new Error("入力されたAPIキーが無効です。Google AI Studioで正しいキーを確認してください。");
      }
      continue;
    }
  }

  // すべてのモデルで失敗した場合の最終報告
  throw new Error(
    "利用可能なモデルが見つかりません(404)。\n" +
    "【試行ログ】\n" + errors.join("\n") + "\n\n" +
    "【対策】Google AI Studioで新しいAPIキーを作成し直すと解決する可能性が高いです。"
  );
}
