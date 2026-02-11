# Google Apps Script (GAS) 連携ガイド

このアプリは、Google フォームを自動生成するために GAS を使用します。`clasp` を使ってスムーズにデプロイするための手順です。

## 1. 準備

1. [Google Apps Script Settings](https://script.google.com/home/usersettings) で `Google Apps Script API` を **ON** にします。
2. ターミナルでログインします：

   ```bash
   clasp login
   ```

## 2. スクリプトの作成と紐付け

1. 新しいGASプロジェクトを作成します：

   ```bash
   clasp create --title "QuizCreatorBackend" --type webapp
   ```

2. 作成された `.clasp.json` の `scriptId` が更新されていることを確認します。

## 3. デプロイ

1. コードをアップロードします：

   ```bash
   clasp push
   ```

2. ブラウザでスクリプトエディタを開きます：

   ```bash
   clasp open
   ```

3. 「デプロイ」 > 「新しいデプロイ」を選択。
   - 種類：ウェブアプリ
   - 説明：初期デプロイ
   - 実行ユーザー：自分
   - アクセスできるユーザー：全員（または組織内）

4. 発行された **ウェブアプリのURL** をコピーします。

## 4. アプリへの設定

1. アプリ画面上の「GAS WebApp URL」欄に、コピーしたURLを貼り付けます。
2. これで、Geminiが生成した問題が直接 Google フォームになります！

## 💡 フォルダと成績の管理

- 生成されたフォームは自動的に `T-Lab/テスト/2026年度/` フォルダに整理されます。
- フォームと同時に「成績管理」用のスプレッドシートも作成され、回答が自動的に集計されるよう設定されています。
