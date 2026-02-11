import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean
) {
  console.log("Generating quiz with:", { grade, subject, unit, specialNeed, useFurigana });

  if (!apiKey) throw new Error("APIキーが設定されていません。");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // モデル名を最新の安定版に固定
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const furiganaPrompt = useFurigana
      ? "【重要】すべての漢字の後に(ふりがな)をつけてください。例：漢字(かんじ)"
      : "ふりがなは不要です。";

    const prompt = `
あなたは日本の学校の教師です。以下の条件で20問の4択テストをJSON形式で作成してください。

【条件】
学年: ${grade}
教科: ${subject}
単元: ${unit}
配慮: ${specialNeed}
${furiganaPrompt}

【出力形式】
必ず以下のJSON構造のみを返してください。
{
  "title": "テストのタイトル",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "丁寧な解説"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", text);
      throw new Error("AIからの回答が正しい形式ではありませんでした。再度試してください。");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    if (error.message?.includes("API_KEY_INVALID")) {
      throw new Error("APIキーが無効です。正しいキーを入力してください。");
    }
    if (error.message?.includes("model not found") || error.message?.includes("404")) {
      throw new Error("モデルが見つかりません。APIの利用可能状況を確認してください。");
    }
    throw new Error("API接続エラー: " + (error.message || "不明なエラー"));
  }
}
