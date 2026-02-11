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

export const UNITS = {
  math: [
    { id: 'm1', label: 'たしざん・ひきざん' },
    { id: 'm2', label: 'かけ算（九九）' },
    { id: 'm3', label: 'わり算' },
    { id: 'm4', label: '図形（面積・体積）' },
    { id: 'm5', label: '分数・小数' },
  ],
  japanese: [
    { id: 'j1', label: '漢字の読み書き' },
    { id: 'j2', label: '文章題（物語）' },
    { id: 'j3', label: '文章題（説明文）' },
    { id: 'j4', label: '敬語・言葉のきまり' },
  ],
  // 他の教科も順次追加可能
};
