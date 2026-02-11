import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean,
  customModel?: string // ユーザー指定のモデル名を受け取れるように
) {
  if (!apiKey) throw new Error("APIキーが入力されていません。");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 試行するモデル名のリスト
  // ユーザーが指定したものがあれば最優先、なければ最新順に自動試行
  const modelNames = customModel ? [customModel] : [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-pro"
  ];

  let errors: string[] = [];

  for (const modelName of modelNames) {
    try {
      console.log(`[Diagnostic] Attempting with: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `あなたは教師です。20問の4択テストをJSON構造のみで作成してください。
学年: ${grade}, 教科: ${subject}, 単元: ${unit}, 配慮: ${specialNeed}
ふりがな: ${useFurigana ? '必要' : '不要'}

形式：
{"title":"タイトル","questions":[{"text":"問","options":["a","b","c","d"],"correctIndex":0,"explanation":"解説"}]}`;

      const result = await model.generateContent(prompt);
      const data = await result.response;
      const text = data.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Bingo!] Work with: ${modelName}`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      const msg = err.message || "Unknown error";
      console.warn(`[Fail] ${modelName} -> ${msg}`);
      // エラー出力を少し詳しく (最初の100文字に拡大)
      errors.push(`${modelName}: ${msg.substring(0, 100)}`);

      if (msg.includes("API_KEY_INVALID")) {
        throw new Error("APIキーが無効です。Google AI Studioで作成した正しいキーか確認してください。");
      }
      continue;
    }
  }

  throw new Error(
    "全てのAIモデルで見つかりませんでした(404)。\n" +
    "【試行ログ】:\n" + errors.join("\n") + "\n\n" +
    "【哲さんへのアドバイス】: APIキーを Google AI Studio (https://aistudio.google.com/app/apikey) で、『完全に新しく』作り直して貼り付けるのが一番の近道です！✨"
  );
}
