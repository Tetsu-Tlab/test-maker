export const GRADES = [
  { id: 'e1', label: '小学校1年', type: 'elementary' },
  { id: 'e2', label: '小学校2年', type: 'elementary' },
  { id: 'e3', label: '小学校3年', type: 'elementary' },
  { id: 'e4', label: '小学校4年', type: 'elementary' },
  { id: 'e5', label: '小学校5年', type: 'elementary' },
  { id: 'e6', label: '小学校6年', type: 'elementary' },
  { id: 'j1', label: '中学校1年', type: 'junior-high' },
  { id: 'j2', label: '中学校2年', type: 'junior-high' },
  { id: 'j3', label: '中学校3年', type: 'junior-high' },
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

// 学習指導要領に基づいた代表的な単元リスト
export const UNITS: Record<string, Record<string, { id: string, label: string }[]>> = {
  e1: {
    math: [
      { id: 'e1m1', label: '10までのかず' },
      { id: 'e1m2', label: 'いくつといくつ' },
      { id: 'e1m3', label: 'たしざん(1)' },
      { id: 'e1m4', label: 'ひきざん(1)' },
      { id: 'e1m5', label: '3つの数のかいさん' },
      { id: 'e1m6', label: 'くり上がりのある たしざん' },
      { id: 'e1m7', label: 'くり下がりのある ひきざん' }
    ],
    japanese: [
      { id: 'e1j1', label: 'ひらがな・かたかな' },
      { id: 'e1j2', label: 'かんじ' },
      { id: 'e1j3', label: 'おはなしをきこう' },
      { id: 'e1j4', label: 'ぶんをつくろう' }
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
      { id: 'e2m4', label: '三かく形と四かく形' },
      { id: 'e2m5', label: 'かけ算九九' },
      { id: 'e2m6', label: '分けた大きさ(分数)' }
    ],
    japanese: [
      { id: 'e2j1', label: '新出漢字' },
      { id: 'e2j2', label: '主語と述語' },
      { id: 'e2j3', label: 'お話のさくしゃになろう' },
      { id: 'e2j4', label: 'ようすをあらわす言葉' }
    ]
  },
  e3: {
    math: [
      { id: 'e3m1', label: 'わり算' },
      { id: 'e3m2', label: '円と球' },
      { id: 'e3m3', label: '小数' },
      { id: 'e3m4', label: '重さ(g, kg)' },
      { id: 'e3m5', label: '分数' },
      { id: 'e3m6', label: '三角形' }
    ],
    science: [
      { id: 'e3s1', label: '身の回りの生物' },
      { id: 'e3s2', label: '風やゴムの力' },
      { id: 'e3s3', label: '光の性質' },
      { id: 'e3s4', label: '電気の通り道' },
      { id: 'e3s5', label: '磁石の性質' }
    ],
    social: [
      { id: 'e3so1', label: 'わたしたちのまち' },
      { id: 'e3so2', label: 'はたらく人とわたしたちのくらし' },
      { id: 'e3so3', label: '火事からくらしを守る' },
      { id: 'e3so4', label: '昔のくらしと道具' }
    ]
  },
  e4: {
    math: [
      { id: 'e4m1', label: '大きな数' },
      { id: 'e4m2', label: '角の大きさ' },
      { id: 'e4m3', label: '垂直・平行と四角形' },
      { id: 'e4m4', label: '式と計算のじゅんじょ' },
      { id: 'e4m5', label: '面積' },
      { id: 'e4m6', label: '直方体と立方体' }
    ],
    science: [
      { id: 'e4s1', label: '季節と生物' },
      { id: 'e4s2', label: '雨水の行方と地面' },
      { id: 'e4s3', label: '月と星' },
      { id: 'e4s4', label: '金属、水、空気の温まり方' },
      { id: 'e4s5', label: '水のすがたと温度' }
    ],
    social: [
      { id: 'e4so1', label: 'ごみの処理と利用' },
      { id: 'e4so2', label: '水はどこから' },
      { id: 'e4so3', label: '災害からくらしを守る' },
      { id: 'e4so4', label: '郷土の伝統と先人' }
    ]
  },
  e5: {
    math: [
      { id: 'e5m1', label: '小数のかけ算・わり算' },
      { id: 'e5m2', label: '体積' },
      { id: 'e5m3', label: '比例' },
      { id: 'e5m4', label: '合同な図形' },
      { id: 'e5m5', label: '整数の性質(約数・倍数)' },
      { id: 'e5m6', label: '分数(2)' },
      { id: 'e5m7', label: '割合' },
      { id: 'e5m8', label: '円周と円の面積' }
    ],
    science: [
      { id: 'e5s1', label: '植物の発芽、成長' },
      { id: 'e5s2', label: 'メダカの誕生' },
      { id: 'e5s3', label: '台風の接近と天気の変化' },
      { id: 'e5s4', label: '流れる水の働き' },
      { id: 'e5s5', label: '電磁石の働き' }
    ],
    social: [
      { id: 'e5so1', label: '日本の国土と環境' },
      { id: 'e5so2', label: '食料生産のさかんな地域' },
      { id: 'e5so3', label: 'これからの食料生産' },
      { id: 'e5so4', label: '工業生産のさかんな地域' },
      { id: 'e5so5', label: '情報化した社会の産業' }
    ]
  },
  e6: {
    math: [
      { id: 'e6m1', label: '対称な図形' },
      { id: 'e6m2', label: '文字と式' },
      { id: 'e6m3', label: '分数のかけ算・わり算' },
      { id: 'e6m4', label: '比' },
      { id: 'e6m5', label: '図形の拡大と縮小' },
      { id: 'e6m6', label: '円の面積' },
      { id: 'e6m7', label: 'データの活用' }
    ],
    science: [
      { id: 'e6s1', label: '物の燃え方' },
      { id: 'e6s2', label: 'ヒトの体のつくりと働き' },
      { id: 'e6s3', label: '植物のつくりと働き' },
      { id: 'e6s4', label: '月と太陽' },
      { id: 'e6s5', label: '大地のつくりと変化' },
      { id: 'e6s6', label: '電気の利用' }
    ],
    social: [
      { id: 'e6so1', label: '原始、古代の社会' },
      { id: 'e6so2', label: '武士の世の中' },
      { id: 'e6so3', label: '江戸幕府とキリスト教' },
      { id: 'e6so4', label: '明治の新しい国づくり' },
      { id: 'e6so5', label: '長く続いた戦争と戦後の復興' },
      { id: 'e6so6', label: '日本とつながりの深い国々' }
    ]
  },
  j1: {
    math: [
      { id: 'j1m1', label: '正の数・負の数' },
      { id: 'j1m2', label: '文字の式' },
      { id: 'j1m3', label: '一元一次方程式' },
      { id: 'j1m4', label: '比例・反比例' },
      { id: 'j1m5', label: '平面図形' },
      { id: 'j1m6', label: '空間図形' },
      { id: 'j1m7', label: 'データの活用' }
    ],
    english: [
      { id: 'j1e1', label: 'be動詞' },
      { id: 'j1e2', label: '一般動詞' },
      { id: 'j1e3', label: '助動詞(can)' },
      { id: 'j1e4', label: '現在進行形' },
      { id: 'j1e5', label: '代名詞' }
    ]
  },
  j2: {
    math: [
      { id: 'j2m1', label: '式の計算' },
      { id: 'j2m2', label: '連立方程式' },
      { id: 'j2m3', label: '一次関数' },
      { id: 'j2m4', label: '図形の性質・合同' },
      { id: 'j2m5', label: '三角形と四角形' },
      { id: 'j2m6', label: '確率' }
    ]
  },
  j3: {
    math: [
      { id: 'j3m1', label: '多項式の展開・因数分解' },
      { id: 'j3m2', label: '平方根' },
      { id: 'j3m3', label: '二次方程式' },
      { id: 'j3m4', label: '関数 y=ax^2' },
      { id: 'j3m5', label: '相似な図形' },
      { id: 'j3m6', label: '円周角の定理' },
      { id: 'j3m7', label: '三平方の定理' }
    ]
  }
};
