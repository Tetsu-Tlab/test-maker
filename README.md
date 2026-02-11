# Quiz Creator AI 🚀

学力（認知能力）の向上を目指し、児童生徒一人ひとりに最適化された小テストを爆速で生成するアプリです。

## 🌟 特徴

- **AI問題生成**: Gemini 1.5 Flash を活用し、20問の良質な問題と詳細な解説を生成。
- **ふりがな対応**: 低学年や配慮が必要な児童向けに、ワンクリックで全漢字に対応するふりがなを追加可能。
- **Google連携**: `clasp` によるGAS連携で、Google フォームの作成、ドライブでの自動整理、成績管理スプレッドシートの紐付けを自動化。
- **エコシステム**: T-Labの教員支援総合サイトの一部として、他のアプリ（週案、成績処理など）と有機的に連動することを前提に設計。

## 🚀 開発のロードマップ

- [x] UIベースの構築
- [x] Gemini API による問題生成ロジック
- [x] GAS/Clasp によるフォーム自動生成
- [x] ふりがなトグル機能
- [ ] 成績データのさらなる高度な分析連携
- [ ] ミス傾向に基づいた「類似問題5問」の自動リコメンド

## 📦 セットアップ

1. `npm install`
2. `npm run dev`
3. GASの連携については `GAS_GUIDE.md` を参照してください。
 see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
