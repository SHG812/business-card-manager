# GitHubにアップロードするファイル一覧と手順

このガイドでは、名刺管理アプリのどのファイルをGitHubにアップロードすべきか、そしてそれらのファイルがどこにあるのかを説明します。

## アップロードが必要なファイル

名刺管理アプリをGitHubで公開するためには、以下のファイルをすべてアップロードする必要があります。これらのファイルはすべて `/home/tanaka/business-card-manager/` ディレクトリにあります：

### 必須ファイル（基本機能に必要）

1. **`index.html`** - メインのHTMLファイル
2. **`css/styles.css`** - スタイルシート
3. **`js/app.js`** - JavaScriptコード
4. **`manifest.json`** - PWAマニフェスト
5. **`sw.js`** - サービスワーカー（オフライン機能）

### アイコンとガイド（推奨）

6. **`icons/`** ディレクトリ
   - 現時点では `README.txt` のみが含まれていますが、アプリを実際に公開する前にアイコンファイルを追加することをお勧めします

7. **`README.md`** - アプリの説明
8. **`INSTALL_GUIDE.md`** - インストール方法の詳細
9. **`HOSTING_OPTIONS.md`** - ホスティングオプション
10. **`GITHUB_PAGES_GUIDE.md`** - GitHub Pagesでの公開方法

### アップロード不要なファイル

以下のファイルはローカル開発用なので、GitHubにアップロードする必要はありません：

- **`open-app.sh`** - ローカルでアプリを開くためのスクリプト

## ファイルの場所と確認方法

すべての必要なファイルは `/home/tanaka/business-card-manager/` ディレクトリとそのサブディレクトリにあります。ターミナルで以下のコマンドを実行すると、現在のファイル一覧を確認できます：

```bash
ls -la /home/tanaka/business-card-manager/
```

## GitHubへのアップロード方法

### 方法1: ファイルをダウンロードしてウェブからアップロード

1. ターミナルで以下のコマンドを実行して、アプリの全ファイルを圧縮します：

```bash
cd /home/tanaka
zip -r business-card-manager.zip business-card-manager
```

2. この `business-card-manager.zip` ファイルをダウンロードします

3. 圧縮ファイルを解凍して、GitHubのウェブインターフェースからアップロードします（詳細は `GITHUB_PAGES_GUIDE.md` の「方法A: ウェブブラウザからアップロード」セクションを参照）

### 方法2: Gitコマンドを使用（上級者向け）

Git知識がある場合は、以下のようにコマンドでアップロードできます：

```bash
# GitHubでリポジトリを作成した後
cd /home/tanaka/business-card-manager
git init
git add .
git commit -m "Initial commit: Business Card Manager App"
git remote add origin https://github.com/あなたのユーザー名/business-card-manager.git
git push -u origin main
```

## アイコンファイルについて

アプリを実際に公開して使用する前に、`icons/` ディレクトリに以下のようなアイコンファイルを追加することをお勧めします：

1. `icon-192.png` - 192x192ピクセル（Android用）
2. `icon-512.png` - 512x512ピクセル（Android用）
3. `apple-icon-180.png` - 180x180ピクセル（iPhone用）

これらのアイコンはオンラインのアイコンジェネレーターで作成するか、画像編集ソフトで作成できます。基本的には青色（#3498db）の背景に名刺や連絡先のシンボルを配置したデザインが良いでしょう。

## 参考：全ファイル構成

最終的なファイル構成は以下のようになります：

```
business-card-manager/
├── index.html         # メインHTMLファイル
├── css/
│   └── styles.css     # スタイルシート
├── js/
│   └── app.js         # JavaScriptコード
├── icons/
│   ├── README.txt     # アイコンについての説明
│   ├── icon-192.png   # Android用アイコン（追加推奨）
│   ├── icon-512.png   # Android用アイコン（追加推奨）
│   └── apple-icon-180.png # iPhone用アイコン（追加推奨）
├── manifest.json      # PWAマニフェスト
├── sw.js              # サービスワーカー
├── README.md          # アプリの説明
├── INSTALL_GUIDE.md   # インストール方法の詳細
├── HOSTING_OPTIONS.md # ホスティングオプション
└── GITHUB_PAGES_GUIDE.md # GitHub Pagesでの公開方法
```

すべてのファイルをGitHubにアップロードし、`GITHUB_PAGES_GUIDE.md` の手順に従って設定すれば、iPhone用の名刺管理アプリを無料で公開できます。
