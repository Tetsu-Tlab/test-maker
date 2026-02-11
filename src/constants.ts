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

// 学習指導要領に基づいた詳細な単元リスト
export const UNITS: Record<string, Record<string, { id: string, label: string }[]>> = {
  e1: {
    math: [
      { id: 'e1m1', label: '10までのかず' },
      { id: 'e1m2', label: 'いくつといくつ' },
      { id: 'e1m3', label: 'たしざん(1)' },
      { id: 'e1m4', label: 'ひきざん(1)' },
      { id: 'e1m5', label: '20までのかず' },
      { id: 'e1m6', label: 'たしざん(2)' },
      { id: 'e1m7', label: 'ひきざん(2)' },
      { id: 'e1m8', label: 'かたちあそび' },
      { id: 'e1m9', label: 'とけい' }
    ],
    japanese: [
      { id: 'e1j1', label: 'ひらがな・かたかな' },
      { id: 'e1j2', label: 'かんじ' },
      { id: 'e1j3', label: 'おはなしをたのしもう' },
      { id: 'e1j4', label: 'しをよもう' },
      { id: 'e1j5', label: 'しらせたいな、見つけたよ' }
    ],
    science: [{ id: 'e1s1', label: 'せいかつ(1)' }, { id: 'e1s2', label: 'あきをみつけよう' }],
    social: [{ id: 'e1so1', label: 'せいかつ(1)' }, { id: 'e1so2', label: 'がっこうたんけん' }],
    english: [{ id: 'e1e1', label: 'Hello! (あいさつ)' }, { id: 'e1e2', label: 'Numbers (かず)' }]
  },
  e2: {
    math: [
      { id: 'e2m1', label: 'グラフとひょう' },
      { id: 'e2m2', label: 'たし算のひっ算' },
      { id: 'e2m3', label: 'ひき算のひっ算' },
      { id: 'e2m4', label: '長さ(cm, mm)' },
      { id: 'e2m5', label: '1000より大きい数' },
      { id: 'e2m6', label: '水のかさ' },
      { id: 'e2m7', label: 'かけ算九九' },
      { id: 'e2m8', label: '三かく形と四かく形' }
    ],
    japanese: [
      { id: 'e2j1', label: 'かんじのひろば' },
      { id: 'e2j2', label: '主語と述語' },
      { id: 'e2j3', label: 'お話のさくしゃになろう' },
      { id: 'e2j4', label: 'スイミー' },
      { id: 'e2j5', label: '名前を見てちょうだい' }
    ],
    science: [{ id: 'e2s1', label: 'せいかつ(2)' }],
    social: [{ id: 'e2so1', label: 'せいかつ(2)' }],
    english: [{ id: 'e2e1', label: 'I like fruit.' }, { id: 'e2e2', label: 'Animals (どうぶつ)' }]
  },
  e3: {
    math: [
      { id: 'e3m1', label: '九九を見なおそう' },
      { id: 'e3m2', label: 'わり算' },
      { id: 'e3m3', label: '長いさのたんい' },
      { id: 'e3m4', label: 'あまりのあるわり算' },
      { id: 'e3m5', label: '10000より大きい数' },
      { id: 'e3m6', label: 'かけ算のひっ算' },
      { id: 'e3m7', label: '小数' },
      { id: 'e3m8', label: '分数' },
      { id: 'e3m9', label: '円と球' },
      { id: 'e3m10', label: '重さ' }
    ],
    japanese: [
      { id: 'e3j1', label: 'きつつきの商売' },
      { id: 'e3j2', label: '国語辞典をひこう' },
      { id: 'e3j3', label: '進行を考えながら話し合おう' },
      { id: 'e3j4', label: 'ちいちゃんのかげおくり' },
      { id: 'e3j5', label: 'モチモチの木' }
    ],
    science: [
      { id: 'e3s1', label: '身近な自然の観察' },
      { id: 'e3s2', label: '風やゴムの力' },
      { id: 'e3s3', label: '光の性質' },
      { id: 'e3s4', label: '電気の通り道' },
      { id: 'e3s5', label: '磁石の性質' },
      { id: 'e3s6', label: '昆虫の育ち方' }
    ],
    social: [
      { id: 'e3so1', label: 'わたしたちのまち' },
      { id: 'e3so2', label: 'はたらく人とわたしたちのくらし' },
      { id: 'e3so3', label: '店ではたらく人' },
      { id: 'e3so4', label: '火事からくらしを守る' },
      { id: 'e3so5', label: '昔のくらしと道具' }
    ],
    english: [{ id: 'e3e1', label: 'Hello, world!' }, { id: 'e3e2', label: 'Alphabet' }]
  },
  e4: {
    math: [
      { id: 'e4m1', label: '大きな数' },
      { id: 'e4m2', label: '角の大きさ' },
      { id: 'e4m3', label: 'わり算のひっ算' },
      { id: 'e4m4', label: '垂直・平行と四角形' },
      { id: 'e4m5', label: '面積' },
      { id: 'e4m6', label: '小数' },
      { id: 'e4m7', label: '分数' },
      { id: 'e4m8', label: '直方体と立方体' }
    ],
    japanese: [
      { id: 'e4j1', label: '白いぼうし' },
      { id: 'e4j2', label: '一つの花' },
      { id: 'e4j3', label: 'ごんぎつね' },
      { id: 'e4j4', label: '慣用句' },
      { id: 'e4j5', label: 'つながりに気をつけて書こう' }
    ],
    science: [
      { id: 'e4s1', label: '季節と生物' },
      { id: 'e4s2', label: '電池の働き' },
      { id: 'e4s3', label: '雨水の行方と地面' },
      { id: 'e4s4', label: '月と星' },
      { id: 'e4s5', label: '人の体のつくりと運動' },
      { id: 'e4s6', label: '金属、水、空気の温まり方' }
    ],
    social: [
      { id: 'e4so1', label: '県内の特色ある地域' },
      { id: 'e4so2', label: 'ごみの処理と利用' },
      { id: 'e4so3', label: '水はどこから' },
      { id: 'e4so4', label: '地震からくらしを守る' },
      { id: 'e4so5', label: '。郷土の発展につくした人' }
    ],
    english: [{ id: 'e4e1', label: 'What time is it?' }, { id: 'e4e2', label: 'This is my day.' }]
  },
  e5: {
    math: [
      { id: 'e5m1', label: '小数のかけ算' },
      { id: 'e5m2', label: '体積' },
      { id: 'e5m3', label: '小数のわり算' },
      { id: 'e5m4', label: '合同な図形' },
      { id: 'e5m5', label: '整数の性質' },
      { id: 'e5m6', label: '分数' },
      { id: 'e5m7', label: '単位量あたりの大きさ' },
      { id: 'e5m8', label: '割合とグラフ' }
    ],
    japanese: [
      { id: 'e5j1', label: '物語の全体像をとらえよう' },
      { id: 'e5j2', label: '言葉の準備運動' },
      { id: 'e5j3', label: '大造じいさんとガン' },
      { id: 'e5j4', label: '和の文化を受け継ぐ' },
      { id: 'e5j5', label: '提案書の書き方' }
    ],
    science: [
      { id: 'e5s1', label: '植物の発芽、成長' },
      { id: 'e5s2', label: 'メダカの誕生' },
      { id: 'e5s3', label: '台風の接近と天気の変化' },
      { id: 'e5s4', label: '流れる水の働き' },
      { id: 'e5s5', label: '電磁石の働き' },
      { id: 'e5s6', label: 'ふりこの運動' }
    ],
    social: [
      { id: 'e5so1', label: '日本の国土の様子' },
      { id: 'e5so2', label: '食料生産を支える人' },
      { id: 'e5so3', label: 'これからの食料生産' },
      { id: 'e5so4', label: '工業生産を支える人' },
      { id: 'e5so5', label: 'これからの工業生産' },
      { id: 'e5so6', label: '情報化した社会' }
    ],
    english: [{ id: 'e5e1', label: 'My special dish.' }, { id: 'e5e2', label: 'When is your birthday?' }]
  },
  e6: {
    math: [
      { id: 'e6m1', label: '対称な図形' },
      { id: 'e6m2', label: '分数のかけ算' },
      { id: 'e6m3', label: '分数のわり算' },
      { id: 'e6m4', label: '比' },
      { id: 'e6m5', label: '図形の拡大と縮小' },
      { id: 'e6m6', label: '円の面積' },
      { id: 'e6m7', label: '場合の数' },
      { id: 'e6m8', label: 'データの活用' }
    ],
    japanese: [
      { id: 'e6j1', label: 'カレーライス' },
      { id: 'e6j2', label: 'やまなし' },
      { id: 'e6j3', label: '鳥獣戯画を読む' },
      { id: 'e6j4', label: '大切にしたい言葉' },
      { id: 'e6j5', label: '生きる' }
    ],
    science: [
      { id: 'e6s1', label: '物の燃え方' },
      { id: 'e6s2', label: 'ヒトの体のつくりと働き' },
      { id: 'e6s3', label: '植物のつくりと働き' },
      { id: 'e6s4', label: '月と太陽' },
      { id: 'e6s5', label: '大地のつくりと変化' },
      { id: 'e6s6', label: '電気の利用' },
      { id: 'e6s7', label: '水溶液の性質' }
    ],
    social: [
      { id: 'e6so1', label: '日本のあゆみ(原始〜古代)' },
      { id: 'e6so2', label: '武士の世の中' },
      { id: 'e6so3', label: '明治維新' },
      { id: 'e6so4', label: '日本とつながりの深い国' },
      { id: 'e6so5', label: '政治の仕組み' }
    ],
    english: [{ id: 'e6e1', label: 'What do you want to be?' }, { id: 'e6e2', label: 'My summer vacation.' }]
  },
  j1: {
    math: [
      { id: 'j1m1', label: '正の数・負の数' },
      { id: 'j1m2', label: '文字の式' },
      { id: 'j1m3', label: '一次方程式' },
      { id: 'j1m4', label: '比例・反比例' },
      { id: 'j1m5', label: '平面図形' },
      { id: 'j1m6', label: '空間図形' },
      { id: 'j1m7', label: 'データの分析' }
    ],
    japanese: [
      { id: 'j1j1', label: '花曇りの向こう' },
      { id: 'j1j2', label: '蓬莱の玉の枝' },
      { id: 'j1j3', label: '言葉の単位' },
      { id: 'j1j4', label: '少年の日の思い出' }
    ],
    science: [
      { id: 'j1s1', label: '植物の生活と種類' },
      { id: 'j1s2', label: '身の回りの物質' },
      { id: 'j1s3', label: '光・音・力' },
      { id: 'j1s4', label: '大地の変化' }
    ],
    social: [
      { id: 'j1so1', label: '世界の姿' },
      { id: 'j1so2', label: '古代文明と日本' },
      { id: 'j1so3', label: '中世の日本' }
    ],
    english: [
      { id: 'j1e1', label: 'be動詞' },
      { id: 'j1e2', label: '一般動詞' },
      { id: 'j1e3', label: '助動詞 can' },
      { id: 'j1e4', label: '現在進行形' }
    ]
  },
  j2: {
    math: [
      { id: 'j2m1', label: '式の計算' },
      { id: 'j2m2', label: '連立方程式' },
      { id: 'j2m3', label: '一次関数' },
      { id: 'j2m4', label: '図形の性質' },
      { id: 'j2m5', label: '図形の合同' },
      { id: 'j2m6', label: '確率' }
    ],
    japanese: [
      { id: 'j2j1', label: 'アイスプラネット' },
      { id: 'j2j2', label: '枕草子' },
      { id: 'j2j3', label: '走れメロス' }
    ],
    science: [
      { id: 'j2s1', label: '化学変化と原子・分子' },
      { id: 'j2s2', label: '動物の生活と生物の進化' },
      { id: 'j2s3', label: '電気の世界' },
      { id: 'j2s4', label: '気象のしくみ' }
    ],
    social: [
      { id: 'j2so1', label: '日本の地域構成' },
      { id: 'j2so2', label: '近世の日本' },
      { id: 'j2so3', label: '近代の日本' }
    ],
    english: [
      { id: 'j2e1', label: '過去形' },
      { id: 'j2e2', label: '未来形' },
      { id: 'j2e3', label: '不定詞(1)' },
      { id: 'j2e4', label: '動名詞' }
    ]
  },
  j3: {
    math: [
      { id: 'j3m1', label: '展開と因数分解' },
      { id: 'j3m2', label: '平方根' },
      { id: 'j3m3', label: '二次方程式' },
      { id: 'j3m4', label: '関数 y=ax^2' },
      { id: 'j3m5', label: '図形の相似' },
      { id: 'j3m6', label: '円周角の定理' },
      { id: 'j3m7', label: '三平方の定理' },
      { id: 'j3m8', label: '標本調査' }
    ],
    japanese: [
      { id: 'j3j1', label: '春に' },
      { id: 'j3j2', label: 'おくのほそ道' },
      { id: 'j3j3', label: '故郷' }
    ],
    science: [
      { id: 'j3s1', label: '化学変化とイオン' },
      { id: 'j3s2', label: '生命の連続性' },
      { id: 'j3s3', label: '運動とエネルギー' },
      { id: 'j3s4', label: '地球と宇宙' },
      { id: 'j3s5', label: '自然と人間' }
    ],
    social: [
      { id: 'j3so1', label: '現代の民主政治' },
      { id: 'j3so2', label: '私たちの暮らしと経済' },
      { id: 'j3so3', label: '地球社会の課題' }
    ],
    english: [
      { id: 'j3e1', label: '現在完了形' },
      { id: 'j3e2', label: '関係代名詞' },
      { id: 'j3e3', label: '受動態' },
      { id: 'j3e4', label: '仮定法' }
    ]
  }
};
