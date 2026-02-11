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

  // APIのURLがおかしくならないよう、最も標準的な方法で初期化
  const genAI = new GoogleGenerativeAI(apiKey);

  // 試行するモデル名のリスト（絶対にどれかは反応するように広げました）
  const modelNames = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
  ];

  let lastError = null;

  for (const modelName of modelNames) {
    try {
      console.log(`[Diagnostic] Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `あなたは日本の教師です。以下の条件で20問の4択テストをJSON形式で作成してください。
学年: ${grade}, 教科: ${subject}, 単元: ${unit}, 配慮: ${specialNeed}
${useFurigana ? '【重要】すべての漢字に(ふりがな)をつけてください。例：漢字(かんじ)' : 'ふりがな不要。'}

【形式】以下のJSONのみ返せ:
{
  "title": "${grade} ${subject} テスト",
  "questions": [
    {
      "text": "問題文",
      "options": ["a", "b", "c", "d"],
      "correctIndex": 0,
      "explanation": "丁寧な解説"
    }
  ]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Success] Worked with: ${modelName}`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn(`[Fail] ${modelName} failed:`, err.message);
      lastError = err;
      if (err.message?.includes("API_KEY_INVALID")) {
        throw new Error("APIキーが無効です。Google AI Studioで取得したキーか確認してください。");
      }
      continue;
    }
  }

  throw new Error(`利用可能なGeminiモデルが見つかりません(404)。APIキーの権限(無料枠など)を確認してください。\n(Error: ${lastError?.message})`);
}
