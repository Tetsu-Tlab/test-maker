/**
 * 哲さんの怒りを感動に変える、執念のRaw API接続モジュール (v3.1)
 * SDKのバージョン制約を突破し、2026年の最新モデル(2.5/3.0)を直接叩きます。
 */

export async function generateQuiz(
  apiKey: string,
  grade: string,
  subject: string,
  unit: string,
  specialNeed: string,
  useFurigana: boolean,
  customModel?: string
) {
  if (!apiKey) throw new Error("APIキーが入力されていません。");

  // 2026年現在の最新モデル候補（SDKを通さず直接指定）
  const modelNames = customModel ? [customModel] : [
    "gemini-3.0-flash",       // 最新最強
    "gemini-3.0-pro",
    "gemini-2.5-flash",       // 2025年王道
    "gemini-2.5-pro",
    "gemini-2.0-flash-exp",   // 安定プレビュー
    "gemini-1.5-flash"        // 最終バックアップ
  ];

  const prompt = `あなたは日本のトップ教師です。以下の条件で20問の4択テストを作成し、純粋なJSON形式のみで出力してください。
条件：学年=${grade}, 教科=${subject}, 単元=${unit}, 配慮=${specialNeed}, ふりがな=${useFurigana ? '必須' : '不要'}

出力形式（この構造以外は一切出力禁止）：
{
  "title": "${grade} ${subject} テスト",
  "questions": [
    {
      "text": "問題文",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "解説"
    }
  ]
}`;

  let lastDetailedError = "";
  let attemptedModels: string[] = [];

  for (const modelName of modelNames) {
    attemptedModels.push(modelName);
    try {
      console.log(`[Raw Trial] Directing to: ${modelName}`);

      // SDKを使わず、生のfetchで最新エンドポイント(v1)を叩く
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 4096,
              responseMimeType: "application/json" // 2.0以降の強制JSONモードを活用
            }
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || `HTTP ${response.status}`);
      }

      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        console.log(`[Victory!] Model ${modelName} responded.`);
        // JSON抽出（稀にテキストが混じる場合への配慮）
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return JSON.parse(jsonMatch ? jsonMatch[0] : text);
      }
    } catch (err: any) {
      console.warn(`[Fail] ${modelName}:`, err.message);
      lastDetailedError = err.message;
      if (err.message?.includes("API_KEY_INVALID")) {
        throw new Error("APIキーが無効です。最新のキーに更新してください。");
      }
      continue;
    }
  }

  // 全滅した場合
  throw new Error(
    `【全AIモデルが沈黙】2.5/3.0系への接続に失敗しました。\n\n` +
    `試行したモデル: ${attemptedModels.join(" → ")}\n` +
    `最後のエラー: ${lastDetailedError}\n\n` +
    `【哲さん、これだけ試して！】\n` +
    `1. APIキーを『今すぐ』Google AI Studioで作直してください（古い鍵は次世代モデルに拒絶されます）。\n` +
    `2. モデル名に『gemini-2.0-flash』と入れて試すのも有効です。`
  );
}
