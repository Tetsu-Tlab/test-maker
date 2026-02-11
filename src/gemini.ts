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

  // 2026年現在、最も普及しており、かつエラーになりにくい最新モデル順
  const modelNames = [
    "gemini-1.5-flash",        // 標準
    "gemini-1.5-flash-latest", // 最新版
    "gemini-2.0-flash-exp",    // 次世代プレビュー版（制限が緩いことが多い）
    "gemini-1.5-pro"           // プロ版
  ];

  let errors: string[] = [];

  for (const modelName of modelNames) {
    try {
      console.log(`[Diagnostic] Trying: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });

      // 余計な修飾を省いた最もシンプルなプロンプト
      const prompt = `あなたは教師です。20問の4択テストを作成し、以下のJSON構造のみで返してください。
学年: ${grade}
教科: ${subject}
単元: ${unit}
配慮: ${specialNeed}
ふりがな: ${useFurigana ? 'すべての漢字に(ふりがな)を付与' : '不要'}

JSON形式：
{
  "title": "テストタイトル",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "解説"
    }
  ]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // JSON部分を抽出
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        console.log(`[Success!] Work with: ${modelName}`);
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn(`[Failed] ${modelName}:`, err.message);
      errors.push(`${modelName}(${err.message.substring(0, 30)})`);

      if (err.message?.includes("API_KEY_INVALID")) {
        throw new Error("APIキーが無効です。Google AI Studioで新しいキーを発行してください。");
      }
      continue;
    }
  }

  // すべてダメだった場合
  throw new Error(
    "全てのAIモデルへの接続に失敗しました(404)。\n\n" +
    "【試行ログ】: " + errors.join(", ") + "\n\n" +
    "【解決策】: Google AI Studio (https://aistudio.google.com/) で、APIキーを「完全に新しく」作り直して貼り付けてみてください。古いキーだと新しいモデルが見つからない場合があります。"
  );
}
