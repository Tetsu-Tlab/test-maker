export const GRADES = [
  { id: 'e1', label: '小学校1年' },
  { id: 'e2', label: '小学校2年' },
  { id: 'e3', label: '小学校3年' },
  { id: 'e4', label: '小学校4年' },
  { id: 'e5', label: '小学校5年' },
  { id: 'e6', label: '小学校6年' },
  { id: 'j1', label: '中学校1年' },
  { id: 'j2', label: '中学校2年' },
  { id: 'j3', label: '中学校3年' },
];

export const SUBJECTS = [
  { id: 'math', label: '算数・数学', icon: 'Calculator' },
  { id: 'japanese', label: '国語', icon: 'BookOpen' },
  { id: 'science', label: '理科', icon: 'FlaskConical' },
  { id: 'social', label: '社会', icon: 'Globe' },
  { id: 'english', label: '英語', icon: 'Languages' },
];

export const SPECIAL_NEEDS = [
  { id: 'none', label: '通常学級' },
  { id: 'intellectual', label: '特別支援（知的）' },
  { id: 'emotional', label: '特別支援（情緒）' },
  { id: 'others', label: 'その他配慮が必要' },
];

// 学習指導要領に基づいた単元リスト（全学年・全教科の枠組みを網羅）
export const UNITS: Record<string, Record<string, { id: string, label: string }[]>> = {
  e1: {
    math: [
      { id: 'e1m1', label: '10までのかず' },
      { id: 'e1m2', label: 'いくつといくつ' },
      { id: 'e1m3', label: 'たしざん(1)' },
      { id: 'e1m4', label: 'ひきざん(1)' },
      { id: 'e1m5', label: 'くり上がりのある たしざん' },
      { id: 'e1m6', label: 'くり下がりのある ひきざん' }
    ],
    japanese: [
      { id: 'e1j1', label: 'ひらがな・かたかな' },
      { id: 'e1j2', label: 'かんじ' },
      { id: 'e1j3', label: 'おはなしをきこう' }
    ],
    science: [{ id: 'na', label: '（生活科に含まれます）' }],
    social: [{ id: 'na', label: '（生活科に含まれます）' }],
    english: [{ id: 'e1e1', label: 'Hello! (あいさつ)' }]
  },
  e2: {
    math: [
      { id: 'e2m1', label: 'たし算のひっ算' },
      { id: 'e2m2', label: 'ひき算のひっ算' },
      { id: 'e2m3', label: '長さ(cm, mm)' },
      { id: 'e2m4', label: 'かけ算九九' },
      { id: 'e2m5', label: '1000より大きい数' }
    ],
    japanese: [
      { id: 'e2j1', label: '新しい漢字' },
      { id: 'e2j2', label: '主語と述語' },
      { id: 'e2j3', label: 'スイミー' }
    ],
    science: [{ id: 'na', label: '（生活科に含まれます）' }],
    social: [{ id: 'na', label: '（生活科に含まれます）' }],
    english: [{ id: 'e2e1', label: 'I like fruit.' }]
  },
  e3: {
    math: [
      { id: 'e3m1', label: 'わり算' },
      { id: 'e3m2', label: '円と球' },
      { id: 'e3m3', label: '小数' },
      { id: 'e3m4', label: '分数' }
    ],
    japanese: [
      { id: 'e3j1', label: 'きつつきの商売' },
      { id: 'e3j2', label: 'ちいちゃんのかげおくり' }
    ],
    science: [
      { id: 'e3s1', label: '風やゴムの力' },
      { id: 'e3s2', label: '光の性質' },
      { id: 'e3s3', label: '電気の通り道' }
    ],
    social: [
      { id: 'e3so1', label: 'わたしたちのまち' },
      { id: 'e3so2', label: '火事からくらしを守る' }
    ],
    english: [{ id: 'e3e1', label: 'Hello, world!' }]
  },
  e4: {
    math: [
      { id: 'e4m1', label: '大きな数' },
      { id: 'e4m2', label: '角の大きさ' },
      { id: 'e4m3', label: '面積' },
      { id: 'e4m4', label: '小数' }
    ],
    japanese: [
      { id: 'e4j1', label: '白いぼうし' },
      { id: 'e4j2', label: 'ごんぎつね' }
    ],
    science: [
      { id: 'e4s1', label: '電池の働き' },
      { id: 'e4s2', label: '金属、水、空気の温まり方' }
    ],
    social: [
      { id: 'e4so1', label: 'ごみの処理と利用' },
      { id: 'e4so2', label: '水はどこから' }
    ],
    english: [{ id: 'e4e1', label: 'What time is it?' }]
  },
  e5: {
    math: [
      { id: 'e5m1', label: '小数のかけ算・わり算' },
      { id: 'e5m2', label: '体積' },
      { id: 'e5m3', label: '割合' }
    ],
    japanese: [
      { id: 'e5j1', label: '大造じいさんとガン' },
      { id: 'e5j2', label: '和の文化を受け継ぐ' }
    ],
    science: [
      { id: 'e5s1', label: '植物の発芽、成長' },
      { id: 'e5s2', label: '電磁石の働き' }
    ],
    social: [
      { id: 'e5so1', label: '日本の国土と環境' },
      { id: 'e5so2', label: '工業生産のさかんな地域' }
    ],
    english: [{ id: 'e5e1', label: 'My special dish.' }]
  },
  e6: {
    math: [
      { id: 'e6m1', label: '分数のかけ算・わり算' },
      { id: 'e6m2', label: '比' },
      { id: 'e6m3', label: '円の面積' }
    ],
    japanese: [
      { id: 'e6j1', label: 'やまなし' },
      { id: 'e6j2', label: '鳥獣戯画を読む' }
    ],
    science: [
      { id: 'e6s1', label: '物の燃え方' },
      { id: 'e6s2', label: '電気の利用' }
    ],
    social: [
      { id: 'e6so1', label: '日本のあゆみ(歴史)' },
      { id: 'e6so2', label: '政治の仕組み' }
    ],
    english: [{ id: 'e6e1', label: 'What do you want to be?' }]
  },
  j1: {
    math: [
      { id: 'j1m1', label: '正の数・負の数' },
      { id: 'j1m2', label: '文字の式' },
      { id: 'j1m3', label: '一次方程式' }
    ],
    japanese: [
      { id: 'j1j1', label: '少年の日の思い出' }
    ],
    science: [
      { id: 'j1s1', label: '植物の生活と種類' },
      { id: 'j1s2', label: '身の回りの物質' }
    ],
    social: [
      { id: 'j1so1', label: '世界の姿' },
      { id: 'j1so2', label: '古代文明と日本' }
    ],
    english: [
      { id: 'j1e1', label: 'be動詞' },
      { id: 'j1e2', label: '一般動詞' }
    ]
  },
  j2: {
    math: [
      { id: 'j2m1', label: '連立方程式' },
      { id: 'j2m2', label: '一次関数' }
    ],
    japanese: [{ id: 'j2j1', label: '走れメロス' }],
    science: [{ id: 'j2s1', label: '化学変化' }],
    social: [{ id: 'j2so1', label: '近世の日本' }],
    english: [{ id: 'j2e1', label: '未来形' }]
  },
  j3: {
    math: [
      { id: 'j3m1', label: '平方根' },
      { id: 'j3m2', label: '二次方程式' }
    ],
    japanese: [{ id: 'j3j1', label: '故郷' }],
    science: [{ id: 'j3s1', label: '運動とエネルギー' }],
    social: [{ id: 'j3so1', label: '現代の民主政治' }],
    english: [{ id: 'j3e1', label: '現在完了形' }]
  }
};
