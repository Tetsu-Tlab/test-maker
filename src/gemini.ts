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

  // 利用可能な可能性がある全モデル名を優先順位順にリスト
  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-8b",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-2.0-flash-exp" // 最新プレビュー版も試す
  ];

  let diagnosticLogs = [];

  for (const modelName of modelNames) {
    try {
      console.log(`[Gemini Attempt] Trying: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const furiganaPrompt = useFurigana
        ? "【重要】すべての漢字の後に(ふりがな)をつけてください。"
        : "ふりがな不要。";

      const prompt = `あなたは教師です。20問の4択テストをJSONで作成してください。
学年: ${grade}, 教科: ${subject}, 単元: ${unit}, 配慮: ${specialNeed}
${furiganaPrompt}

【形式】必ずこの構造のJSONのみ返せ:
{"title":"タイトル","questions":[{"text":"問","options":["a","b","c","d"],"correctIndex":0,"explanation":"解"}]}`;

      const result = await model.generateContent(prompt);
      const data = await result.response;
      const text = data.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Gemini Success] Loaded with: ${modelName}`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      const msg = err.message || "不明なエラー";
      diagnosticLogs.push(`${modelName}: ${msg}`);
      console.warn(`[Gemini Fail] ${modelName} failed:`, msg);

      // 致命的な権限エラーはすぐに報告
      if (msg.includes("API_KEY_INVALID")) throw new Error("APIキーが正しくありません。");
      continue;
    }
  }

  // 全滅した場合の原因を詳細に出す
  throw new Error(
    "AIモデルが一つも見つかりませんでした。APIキーがGemini API(Google AI Studio)用か確認してください。 " +
    "(試行ログ: " + diagnosticLogs.join(" / ") + ")"
  );
}
