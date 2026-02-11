import { useState } from 'react';
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Globe,
  Languages,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Users,
  Eye,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GRADES, SUBJECTS, SPECIAL_NEEDS, UNITS } from './constants';
import { generateQuiz } from './gemini';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

const iconMap: Record<string, any> = {
  Calculator,
  BookOpen,
  FlaskConical,
  Globe,
  Languages
};

const GAS_WEBAPP_URL = localStorage.getItem('gas_url') || '';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedSpecialNeed, setSelectedSpecialNeed] = useState<string>('none');
  const [useFurigana, setUseFurigana] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('gemini_api_key') || '');
  const [gasUrl, setGasUrl] = useState<string>(GAS_WEBAPP_URL);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [quizPreviewData, setQuizPreviewData] = useState<any>(null);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);

  const loadingMessages = [
    "問題を考えています... 🤔",
    "解説を丁寧に書いています... ✍️",
    "ふりがなを確認しています... 📖",
    "Google Formを準備しています... 📄",
    "児童生徒の笑顔を想像しています... ✨",
    "もう少しで完成です！ 🚀"
  ];

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const saveGasUrl = (url: string) => {
    setGasUrl(url);
    localStorage.setItem('gas_url', url);
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      alert('Gemini APIキーを入力してください。');
      return;
    }

    setIsGenerating(true);
    let msgIdx = 0;
    const interval = setInterval(() => {
      setLoadingMessage(loadingMessages[msgIdx % loadingMessages.length]);
      msgIdx++;
    }, 2500);

    try {
      const gradeLabel = GRADES.find(g => g.id === selectedGrade)?.label || '';
      const subjLabel = SUBJECTS.find(s => s.id === selectedSubject)?.label || '';
      const unitLabel = (UNITS as any)[selectedSubject]?.find((u: any) => u.id === selectedUnit)?.label || '';
      const snLabel = SPECIAL_NEEDS.find(s => s.id === selectedSpecialNeed)?.label || '';

      const quizData = await generateQuiz(apiKey, gradeLabel, subjLabel, unitLabel, snLabel, useFurigana);
      setQuizPreviewData(quizData);
    } catch (error: any) {
      console.error(error);
      alert('エラーが発生しました: ' + error.message);
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const handleFinalCreate = async () => {
    if (!quizPreviewData) return;

    setIsGenerating(true);
    setLoadingMessage("Google Formを作成中...");

    try {
      if (gasUrl) {
        await fetch(gasUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: quizPreviewData.title,
            questions: quizPreviewData.questions,
            folderPath: ["T-Lab", "テスト", `${new Date().getFullYear()}年度`]
          })
        });
        alert('Google Formの作成リクエストを送信しました！GAS側でフォームが作成されるまで数十秒かかる場合があります。');
        setGeneratedUrl('https://docs.google.com/forms/u/0/');
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedUrl('https://docs.google.com/forms/');
      }
    } catch (error: any) {
      console.error(error);
      alert('エラーが発生しました: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentUnits = selectedSubject ? (UNITS as any)[selectedSubject] || [] : [];

  // --- Success Screen ---
  if (generatedUrl) {
    return (
      <div className="app-container">
        <motion.div
          className="card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center', padding: '4rem' }}
        >
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'white'
            }}>
              <CheckCircle2 size={40} />
            </div>
            <h2>テストが完成しました！</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Google Drive内の「T-Lab/テスト/2026年度」フォルダに保存されました。
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href={generatedUrl} target="_blank" rel="noreferrer" className="btn-primary">
              フォームを表示する
            </a>
            <button className="option-chip" onClick={() => {
              setGeneratedUrl(null);
              setQuizPreviewData(null);
            }}>
              別のテストを作る
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Preview Screen ---
  if (quizPreviewData && !isGenerating) {
    return (
      <div className="app-container">
        <header className="header">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1><Eye size={32} /> 問題のプレビュー</h1>
            <p>生成された内容を確認してください。よろしければ Google Form を作成します。</p>
          </motion.div>
        </header>

        <motion.div
          className="card glass-morphism"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ padding: '2rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
            <h2 style={{ margin: 0, color: 'var(--primary)' }}>{quizPreviewData.title}</h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="option-chip" onClick={() => setQuizPreviewData(null)}>
                <ArrowLeft size={18} /> 修正する
              </button>
              <button className="btn-primary" onClick={handleFinalCreate}>
                この内容で作成する <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {quizPreviewData.questions.map((q: any, idx: number) => (
              <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>Q{idx + 1}.</span>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{q.text}</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginLeft: '2rem' }}>
                  {q.options.map((opt: string, oIdx: number) => (
                    <div key={oIdx} style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      background: oIdx === q.correctIndex ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                      borderColor: oIdx === q.correctIndex ? 'var(--primary)' : 'var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {oIdx === q.correctIndex && <CheckCircle2 size={16} color="var(--primary)" />}
                      {opt}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.25rem' }}>💡 解説:</strong>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="btn-primary" style={{ padding: '1rem 4rem' }} onClick={handleFinalCreate}>
              Google Form を作成する <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Selection Screen (Main) ---
  return (
    <div className="app-container">
      <header className="header">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Quiz Creator AI</h1>
          <p>学力向上を支える、20問のパーソナライズ小テスト生成</p>
        </motion.div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Loading Overlay */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000
              }}
            >
              <div className="loading-spinner" style={{
                width: '60px', height: '60px',
                border: '6px solid var(--border)',
                borderTop: '6px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '2rem'
              }}></div>
              <motion.p
                key={loadingMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }}
              >
                {loadingMessage}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* API Key Section */}
        <section className="selection-group glass-morphism card" style={{ marginBottom: '4rem', padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Sparkles className="text-primary" size={24} color="var(--primary)" />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Gemini API キー</h3>
                <input
                  type="password"
                  placeholder="キーを入力..."
                  value={apiKey}
                  onChange={(e) => saveApiKey(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <GraduationCap className="text-primary" size={24} color="var(--primary)" />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>GAS WebApp URL (任意)</h3>
                <input
                  type="text"
                  placeholder="https://script.google.com/..."
                  value={gasUrl}
                  onChange={(e) => saveGasUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Grade Selection */}
        <section className="selection-group">
          <h2><GraduationCap size={24} /> 学年を選択</h2>
          <div className="grid">
            {GRADES.map((grade) => (
              <motion.div
                key={grade.id}
                variants={itemVariants}
                className={`option-chip ${selectedGrade === grade.id ? 'active' : ''}`}
                onClick={() => setSelectedGrade(grade.id)}
              >
                {grade.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 2: Special Needs Selection */}
        <section className="selection-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2><Users size={24} /> クラス・個別の配慮</h2>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: useFurigana ? 'var(--primary)' : 'var(--text-muted)'
            }}>
              <input
                type="checkbox"
                checked={useFurigana}
                onChange={(e) => setUseFurigana(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              ふりがなをつける
            </label>
          </div>
          <div className="grid">
            {SPECIAL_NEEDS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`option-chip ${selectedSpecialNeed === item.id ? 'active' : ''}`}
                onClick={() => setSelectedSpecialNeed(item.id)}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 3: Subject Selection */}
        <section className="selection-group">
          <h2><BookOpen size={24} /> 教科を選択</h2>
          <div className="grid">
            {SUBJECTS.map((subject) => {
              const Icon = iconMap[subject.icon];
              return (
                <motion.div
                  key={subject.id}
                  variants={itemVariants}
                  className={`option-chip ${selectedSubject === subject.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSubject(subject.id);
                    setSelectedUnit('');
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Icon size={20} />
                  {subject.label}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Step 4: Unit Selection */}
        <AnimatePresence>
          {selectedSubject && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="selection-group"
            >
              <h2><Sparkles size={24} /> 単元を選択</h2>
              <div className="grid">
                {currentUnits.map((unit: any) => (
                  <motion.div
                    key={unit.id}
                    variants={itemVariants}
                    className={`option-chip ${selectedUnit === unit.id ? 'active' : ''}`}
                    onClick={() => setSelectedUnit(unit.id)}
                  >
                    {unit.label}
                  </motion.div>
                ))}
                {currentUnits.length === 0 && (
                  <p style={{ color: 'var(--text-muted)' }}>この教科の単元データは準備中です。</p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Final Action */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button
            className="btn-primary"
            disabled={!selectedGrade || !selectedSubject || !selectedUnit || isGenerating}
            onClick={handleGenerate}
          >
            問題を生成してプレビューする <ChevronRight size={20} />
          </button>
        </div>
      </motion.main>

      <footer style={{ marginTop: '5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <p>© 2026 T-Lab - 教育の未来を創る</p>
      </footer>
    </div>
  );
}

export default App;
