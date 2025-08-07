# GitHub Pages で名刺管理アプリを公開する詳細ガイド

このガイドでは、GitHub Pages を使って無料で名刺管理アプリをホスティングする方法を、初心者にもわかりやすく説明します。

## 準備するもの

- インターネット接続
- GitHub アカウント（持っていない場合は無料で作成できます）
- ウェブブラウザ
- 名刺管理アプリのファイル一式

## ステップ1: GitHub アカウントの作成

1. ブラウザで [GitHub のサインアップページ](https://github.com/signup) にアクセスします。
2. 以下の情報を入力してアカウントを作成します:
   - メールアドレス
   - パスワード
   - ユーザー名（これは後のURLの一部になります）
3. 画面の指示に従って登録を完了します。
4. メールアドレスの確認を行います（確認メールが送信されます）。

## ステップ2: 新しいリポジトリ（保存場所）の作成

1. GitHub にログインした状態で、画面右上の「+」アイコンをクリックし、「New repository」を選択します。
2. リポジトリの設定を行います:
   - Repository name: `business-card-manager`（または好きな名前）
   - Description: 「名刺管理アプリケーション」など（任意）
   - Visibility: 「Public」を選択（GitHub Pages を使うには公開設定が必要）
   - 「Initialize this repository with a README」にチェックを入れる
3. 「Create repository」ボタンをクリックします。

## ステップ3: 名刺管理アプリのファイルをアップロード

### 方法A: ウェブブラウザからアップロード（簡単）

1. 作成したリポジトリ画面で「Add file」ボタンをクリックし、「Upload files」を選択します。
2. 名刺管理アプリのファイルとフォルダをドラッグ＆ドロップするか、「choose your files」リンクをクリックして選択します。
   - フォルダごとアップロードする場合は、まず空のフォルダをリポジトリに作成し、その中にファイルをアップロードします。
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `css/` フォルダとその中の `styles.css`
   - `js/` フォルダとその中の `app.js`
   - `icons/` フォルダとその中のファイル
3. 「Commit changes」セクションに:
   - タイトル: 「Add business card manager app files」
   - 説明: 任意（空でも可）
4. 「Commit changes」ボタンをクリックします。

### 方法B: Git を使用してアップロード（上級者向け）

Git の知識がある場合:

```bash
git clone https://github.com/あなたのユーザー名/business-card-manager.git
cd business-card-manager
# ファイルをこのフォルダにコピー
git add .
git commit -m "Add business card manager app files"
git push origin main
```

## ステップ4: GitHub Pages を有効化する

1. リポジトリ画面で「Settings」タブをクリックします。
2. 左側のメニューから「Pages」を選択します。
3. 「Source」セクションで:
   - Branch: 「main」を選択
   - Folder: 「/ (root)」を選択
4. 「Save」ボタンをクリックします。
5. 画面が更新され、「Your site is published at https://あなたのユーザー名.github.io/business-card-manager/」というメッセージが表示されます。

## ステップ5: サービスワーカーの設定を修正

GitHub Pages ではサブディレクトリにホスティングされるため、サービスワーカーの設定を変更する必要があります:

1. リポジトリ画面で `sw.js` ファイルをクリックします。
2. 編集ボタン（鉛筆アイコン）をクリックします。
3. 以下のように変更します:

```javascript
// 変更前
const CACHE_NAME = 'business-card-manager-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/manifest.json',
  '/icons/apple-icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 変更後
const CACHE_NAME = 'business-card-manager-v1';
const BASE_PATH = '/business-card-manager';  // リポジトリ名に合わせて変更
const ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/css/styles.css`,
  `${BASE_PATH}/js/app.js`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icons/apple-icon-180.png`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-512.png`
];
```

4. 同様に、`js/app.js` ファイルの Service Worker 登録部分も編集します:

```javascript
// 変更前
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    // ...

// 変更後
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/business-card-manager/sw.js')  // リポジトリ名に合わせて変更
    // ...
```

5. `manifest.json` ファイルの `start_url` も変更します:

```json
// 変更前
"start_url": "/",

// 変更後
"start_url": "/business-card-manager/",  // リポジトリ名に合わせて変更
```

6. 各ファイルの編集後、画面下の「Commit changes」ボタンをクリックして保存します。

## ステップ6: アプリにアクセスする

1. 数分待ってから、「https://あなたのユーザー名.github.io/business-card-manager/」にアクセスします。
2. 名刺管理アプリが表示されるはずです。
3. iPhone の Safari からこの URL にアクセスし、「ホーム画面に追加」をタップしてインストールします。

## トラブルシューティング

### アプリが表示されない場合

1. 数分待ってみてください。GitHub Pages の反映には少し時間がかかることがあります。
2. リポジトリの「Actions」タブを確認し、デプロイが成功しているか確認します。
3. ファイル構造が正しいか確認してください。`index.html` ファイルがリポジトリのルートディレクトリにあることが重要です。

### サービスワーカーがうまく機能しない場合

1. ブラウザの開発者ツールでコンソールエラーを確認します。
2. パス設定が正しいか確認します。すべてのファイルパスには `/business-card-manager/` のプレフィックスが必要です（リポジトリ名が異なる場合は、それに合わせて変更してください）。

### エラー：404 File not found

1. リポジトリ名が URL と一致しているか確認します。
2. GitHub Pages の設定が正しく有効化されているか確認します。
3. `index.html` ファイルがリポジトリのルートディレクトリにあることを確認します。

## GitHub Pages の利点

- **完全無料**: 商用利用も含めて無料です
- **容量制限**: 1GB のリポジトリサイズ制限（名刺管理アプリには十分）
- **帯域幅**: 月間 100GB の帯域幅制限（個人や小規模チームの利用なら十分）
- **HTTPS 対応**: 自動的に HTTPS が有効になります
- **カスタムドメイン**: 必要に応じて独自ドメインも設定可能（オプション）

## 注意点

- GitHub のパブリックリポジトリはインターネット上で公開されます。機密情報は含めないでください。
- GitHub Pages はウェブページの表示用です。API やサーバーサイドの処理はできません（この名刺管理アプリはクライアントサイドのみなので問題ありません）。
