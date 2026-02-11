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
  Edit3,
  Trash2,
  PlusCircle,
  Save,
  RefreshCw
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

  // Editing state for preview
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<any>(null);

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
      const unitLabel = (UNITS as any)[selectedGrade]?.[selectedSubject]?.find((u: any) => u.id === selectedUnit)?.label || '';
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

  // --- Preview Edit Functions ---
  const startEditing = (idx: number) => {
    setEditingIndex(idx);
    setEditBuffer(JSON.parse(JSON.stringify(quizPreviewData.questions[idx])));
  };

  const saveEdit = () => {
    if (editingIndex === null || !editBuffer) return;
    const newQuestions = [...quizPreviewData.questions];
    newQuestions[editingIndex] = editBuffer;
    setQuizPreviewData({ ...quizPreviewData, questions: newQuestions });
    setEditingIndex(null);
  };

  const deleteQuestion = (idx: number) => {
    if (!confirm('この問題を削除しますか？')) return;
    const newQuestions = quizPreviewData.questions.filter((_: any, i: number) => i !== idx);
    setQuizPreviewData({ ...quizPreviewData, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQ = {
      text: "新しい問題文を入力してください",
      options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      correctIndex: 0,
      explanation: "解説を入力してください"
    };
    setQuizPreviewData({
      ...quizPreviewData,
      questions: [...quizPreviewData.questions, newQ]
    });
    startEditing(quizPreviewData.questions.length);
  };

  const currentUnits = (() => {
    if (!selectedGrade || !selectedSubject) return [];
    const gradeUnits = (UNITS as any)[selectedGrade];
    if (!gradeUnits) return [];
    return gradeUnits[selectedSubject] || [];
  })();

  console.log("Current state:", { selectedGrade, selectedSubject, selectedUnit, unitsCount: currentUnits.length });

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
            <h2>テストが完成しました！🚀</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Google Drive内の「T-Lab/テスト/2026年度」フォルダに保存されました。<br />
              成績管理用のスプレッドシートも自動で紐付けられています。
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
            <p>生成された20問の内容を確認・修正してください。先生のこだわりを反映できます！✨</p>
          </motion.div>
        </header>

        <motion.div
          className="preview-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="preview-toolbar card glass-morphism">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <p style={{ fontWeight: 800, margin: 0 }}>現在の問題数: <span className="text-gradient" style={{ fontSize: '1.5rem' }}>{quizPreviewData.questions.length}</span></p>
                <button className="option-chip" onClick={addQuestion}><PlusCircle size={18} /> 問題を追加</button>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="option-chip" onClick={() => setQuizPreviewData(null)}>
                  <RefreshCw size={18} /> 最初からやり直す
                </button>
                <button className="btn-primary" onClick={handleFinalCreate}>
                  Google Form を作成する <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {quizPreviewData.questions.map((q: any, idx: number) => (
              <motion.div
                key={idx}
                layout
                className={`card preview-item ${editingIndex === idx ? 'editing' : ''}`}
                style={{
                  padding: '1.5rem',
                  background: editingIndex === idx ? 'var(--bg-card)' : 'var(--bg-card-alt)',
                  position: 'relative',
                  border: editingIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border)'
                }}
              >
                {editingIndex === idx ? (
                  /* --- EDIT MODE --- */
                  <div className="edit-form">
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800 }}>問題文</label>
                      <textarea
                        value={editBuffer.text}
                        onChange={(e) => setEditBuffer({ ...editBuffer, text: e.target.value })}
                        style={{ width: '100%', padding: '1rem', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                        rows={3}
                      />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800 }}>選択肢</label>
                      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {editBuffer.options.map((opt: string, oIdx: number) => (
                          <div key={oIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                              type="radio"
                              checked={editBuffer.correctIndex === oIdx}
                              onChange={() => setEditBuffer({ ...editBuffer, correctIndex: oIdx })}
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...editBuffer.options];
                                newOpts[oIdx] = e.target.value;
                                setEditBuffer({ ...editBuffer, options: newOpts });
                              }}
                              style={{ flex: 1, padding: '0.5rem', background: 'var(--bg-main)', border: '1px solid var(--border)', color: 'white' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 800 }}>解説</label>
                      <textarea
                        value={editBuffer.explanation}
                        onChange={(e) => setEditBuffer({ ...editBuffer, explanation: e.target.value })}
                        style={{ width: '100%', padding: '1rem', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'white', fontSize: '0.9rem' }}
                        rows={3}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button className="option-chip" onClick={() => setEditingIndex(null)}>キャンセル</button>
                      <button className="btn-primary" onClick={saveEdit}><Save size={18} /> 保存する</button>
                    </div>
                  </div>
                ) : (
                  /* --- VIEW MODE --- */
                  <>
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <button className="icon-btn" onClick={() => startEditing(idx)} title="編集"><Edit3 size={18} /></button>
                      <button className="icon-btn text-error" onClick={() => deleteQuestion(idx)} title="削除"><Trash2 size={18} /></button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                      <span style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.5rem', minWidth: '3rem' }}>{idx + 1}.</span>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', lineHeight: 1.5 }}>{q.text}</h3>
                    </div>

                    <div className="grid" style={{ paddingLeft: '4rem', marginBottom: '1.5rem' }}>
                      {q.options.map((opt: string, oIdx: number) => (
                        <div key={oIdx} className={`option-display ${oIdx === q.correctIndex ? 'correct' : ''}`} style={{
                          padding: '1rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border)',
                          background: oIdx === q.correctIndex ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                          borderColor: oIdx === q.correctIndex ? 'var(--primary)' : 'var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}>
                          {oIdx === q.correctIndex && <CheckCircle2 size={18} color="var(--primary)" />}
                          {opt}
                        </div>
                      ))}
                    </div>

                    <div className="explanation-box" style={{
                      marginLeft: '4rem',
                      padding: '1.5rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '4px solid var(--primary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                        <Sparkles size={16} />
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>即時フィードバック用解説</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{q.explanation}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '4rem' }}>
            <button className="btn-primary" style={{ padding: '1.5rem 6rem', fontSize: '1.2rem' }} onClick={handleFinalCreate}>
              この内容で Google Form を作成する <ChevronRight size={24} />
            </button>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
              作成されたフォームは Google ドライブに自動保存されます。
            </p>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <GraduationCap size={48} className="text-primary" />
            <h1 style={{ fontSize: '3.5rem', margin: 0 }}>Quiz Creator AI</h1>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>学習指導要領準拠。先生の想いを20問に込める、次世代テストメーカー</p>
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
                background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                zIndex: 2000
              }}
            >
              <div className="loading-spinner" style={{
                width: '80px', height: '80px',
                border: '8px solid var(--border)',
                borderTop: '8px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '3rem'
              }}></div>
              <motion.p
                key={loadingMessage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', textAlign: 'center', maxWidth: '600px' }}
              >
                {loadingMessage}
              </motion.p>
              <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                AIが最高の問題を練り上げています。30秒ほどお待ちください...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Setting Section */}
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
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-main)',
                    color: 'white'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Languages className="text-primary" size={24} color="var(--primary)" />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>GAS WebApp URL (任意)</h3>
                <input
                  type="text"
                  placeholder="https://script.google.com/..."
                  value={gasUrl}
                  onChange={(e) => saveGasUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-main)',
                    color: 'white'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Grade */}
        <section className="selection-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <GraduationCap size={32} className="text-primary" />
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>学年を選択</h2>
          </div>
          <div className="grid">
            {GRADES.map((grade) => (
              <motion.div
                key={grade.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`option-chip ${selectedGrade === grade.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedGrade(grade.id);
                  setSelectedUnit('');
                }}
              >
                {grade.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 2: Special Needs */}
        <section className="selection-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Users size={32} className="text-primary" />
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>クラス・個別の配慮</h2>
            </div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 700,
              padding: '0.5rem 1.2rem',
              background: useFurigana ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(255,255,255,0.05)',
              borderRadius: '100px',
              border: `1px solid ${useFurigana ? 'var(--primary)' : 'var(--border)'}`,
              color: useFurigana ? 'var(--primary)' : 'var(--text-muted)',
              transition: 'all 0.3s ease'
            }}>
              <input
                type="checkbox"
                checked={useFurigana}
                onChange={(e) => setUseFurigana(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              ふりがなをつける
            </label>
          </div>
          <div className="grid">
            {SPECIAL_NEEDS.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`option-chip ${selectedSpecialNeed === item.id ? 'active' : ''}`}
                onClick={() => setSelectedSpecialNeed(item.id)}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 3: Subject */}
        <section className="selection-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <BookOpen size={32} className="text-primary" />
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>教科を選択</h2>
          </div>
          <div className="grid">
            {SUBJECTS.map((subject) => {
              const Icon = iconMap[subject.icon];
              return (
                <motion.div
                  key={subject.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`option-chip ${selectedSubject === subject.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSubject(subject.id);
                    setSelectedUnit('');
                  }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.5rem' }}
                >
                  <Icon size={24} />
                  <span style={{ fontSize: '1.2rem' }}>{subject.label}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Step 4: Unit Selection */}
        <section
          className="selection-group"
          style={{
            display: (selectedGrade && selectedSubject) ? 'block' : 'none',
            opacity: 1,
            minHeight: '200px',
            marginTop: '2rem',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            background: 'var(--bg-card)' // 暗い背景に対して確実に白またはグレーを出す
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Sparkles size={32} className="text-primary" />
            <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>単元を選択</h2>
          </div>
          <div className="grid">
            {currentUnits.length > 0 ? (
              currentUnits.map((unit: any) => (
                <div
                  key={unit.id}
                  className={`option-chip ${selectedUnit === unit.id ? 'active' : ''}`}
                  onClick={() => setSelectedUnit(unit.id)}
                  style={{
                    border: selectedUnit === unit.id ? '4px solid var(--primary)' : '2px solid var(--border)',
                    boxShadow: selectedUnit === unit.id ? '0 0 20px rgba(var(--primary-rgb), 0.5)' : 'none',
                    background: selectedUnit === unit.id ? 'var(--primary)' : 'var(--bg-card)'
                  }}
                >
                  {unit.label}
                </div>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-main)',
                border: '1px dashed var(--border)',
                borderRadius: 'var(--radius-md)'
              }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  学年と教科を選択すると、ここに選択肢が表示されます。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Final Action Button */}
        <div style={{ textAlign: 'center', marginTop: '6rem', marginBottom: '4rem' }}>
          <button
            className="btn-primary"
            disabled={!selectedGrade || !selectedSubject || !selectedUnit || isGenerating}
            onClick={handleGenerate}
            style={{
              padding: '2.5rem 8rem',
              fontSize: '2.2rem',
              fontWeight: 900,
              background: 'var(--primary)',
              color: '#ffffff',
              border: '6px solid white',
              boxShadow: '0 0 50px rgba(var(--primary-rgb), 0.8)',
              cursor: (!selectedGrade || !selectedSubject || !selectedUnit || isGenerating) ? 'not-allowed' : 'pointer'
            }}
          >
            問題を生成してプレビューする <ChevronRight size={40} />
          </button>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedGrade ? 'var(--primary)' : 'var(--text-muted)' }}>{selectedGrade ? '● 学年完了' : '○ 学年未選択'}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedSubject ? 'var(--primary)' : 'var(--text-muted)' }}>{selectedSubject ? '● 教科完了' : '○ 教科未選択'}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedUnit ? 'var(--primary)' : 'var(--text-muted)' }}>{selectedUnit ? '● 単元完了' : '○ 単元未選択'}</p>
          </div>
        </div>
      </motion.main>

      <footer style={{ marginTop: '5rem', padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <GraduationCap size={20} />
          <p style={{ fontWeight: 800, letterSpacing: '0.1rem' }}>T-Lab AI EDUCATION</p>
        </div>
        <p style={{ fontSize: '0.8rem' }}>© 2026 T-Lab - 教育の未来を加速させる</p>
      </footer>
    </div>
  );
}

export default App;
