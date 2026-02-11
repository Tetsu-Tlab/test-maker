import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateQuiz(
    apiKey: string,
    grade: string,
    subject: string,
    unit: string,
    specialNeed: string
) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
あなたは日本の小中学校の教師です。以下の条件に基づいて、児童生徒向けの20問の小テストを作成してください。

【条件】
学年: ${grade}
教科: ${subject}
単元: ${unit}
配慮事項: ${specialNeed}

【出力形式】
以下のJSON形式で出力してください。
{
  "title": "テストのタイトル",
  "questions": [
    {
      "text": "問題文",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "correctIndex": 0,
      "explanation": "正解の理由と、間違えやすいポイントを詳しく解説してください。即時フィードバックとして非常に重要です。"
    }
  ]
}

【注意事項】
- 全部で20問作成してください。
- 小学生の場合は、習っていない漢字は使わず、ひらがなを適切に混ぜてください。
- 特別支援の配慮が必要な場合は、問題文を短く分かりやすくし、視覚的に理解しやすい選択肢にしてください。
- 単元の学習目標に沿った、思考力や応用力も問う内容にしてください。
- 日本語で回答してください。
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSONを抽出
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON形式の回答が得られませんでした。");

    return JSON.parse(jsonMatch[0]);
}
