# PerpX GitHub & Vercel デプロイガイド

**作成日**: 2025年1月29日  
**対象**: PerpXプロジェクトのGitHubエクスポートとVercelデプロイ  
**目的**: Manusの本番ビルド問題を回避し、perpx.fiで正常に表示できるようにする

---

## 概要

現在、Manusプラットフォームの本番環境でReactアプリケーションが正常にレンダリングされない問題が発生しています。開発サーバーでは正常に動作しているため、コード自体には問題ありません。

この問題を回避するため、GitHubにコードをエクスポートし、Vercelでデプロイする方法を説明します。Vercelは、Reactアプリケーションのデプロイに最適化されており、perpx.fiドメインとの連携も簡単です。

---

## 前提条件

以下のアカウントが必要です：

| サービス | 用途 | 料金 |
|----------|------|------|
| **GitHub** | コード管理 | 無料 |
| **Vercel** | ホスティング | 無料（Hobby plan） |

---

## ステップ1: GitHubアカウントの作成

### 1.1 GitHubにアクセス

https://github.com にアクセスし、「Sign up」をクリックします。

### 1.2 アカウント情報の入力

- **Username**: perpx-official（または任意）
- **Email**: admin@perpx.fi
- **Password**: 強力なパスワード

### 1.3 メール認証

登録したメールアドレスに認証メールが届くので、リンクをクリックして認証します。

---

## ステップ2: GitHubリポジトリの作成

### 2.1 新しいリポジトリの作成

1. GitHubにログイン後、右上の「+」→「New repository」をクリック
2. 以下の情報を入力：

| 項目 | 値 |
|------|-----|
| **Repository name** | `perpx-frontend` |
| **Description** | `PerpX - Next-Generation Perpetual DEX` |
| **Visibility** | Private（初期段階） |
| **Initialize this repository with** | 何もチェックしない |

3. 「Create repository」をクリック

### 2.2 リポジトリURLの確認

作成後、以下のようなURLが表示されます：

```
https://github.com/perpx-official/perpx-frontend.git
```

このURLを後で使用します。

---

## ステップ3: Manusからコードをダウンロード

### 3.1 Management UIからダウンロード

1. Manusの「Code」パネルを開く
2. 右上の「Download all files」ボタンをクリック
3. ZIPファイルがダウンロードされる（`perpdex.zip`など）

### 3.2 ZIPファイルを解凍

ダウンロードしたZIPファイルを解凍し、`perpdex`フォルダを作成します。

---

## ステップ4: GitHubにコードをプッシュ

### 4.1 ターミナルを開く

**Mac/Linux**:
- ターミナルアプリを開く

**Windows**:
- Git Bashを開く（Git for Windowsをインストール済みの場合）
- または、PowerShellを開く

### 4.2 プロジェクトディレクトリに移動

```bash
cd ~/Downloads/perpdex
```

（解凍したフォルダのパスに合わせて変更してください）

### 4.3 Gitリポジトリを初期化

```bash
git init
git add .
git commit -m "Initial commit: PerpX frontend"
```

### 4.4 GitHubリモートリポジトリを追加

```bash
git remote add origin https://github.com/perpx-official/perpx-frontend.git
```

（`perpx-official`の部分は、実際のGitHubユーザー名に変更してください）

### 4.5 GitHubにプッシュ

```bash
git branch -M main
git push -u origin main
```

**認証が求められた場合**:
- Username: GitHubのユーザー名
- Password: GitHubのPersonal Access Token（パスワードではありません）

**Personal Access Tokenの作成方法**:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」→「Generate new token (classic)」
3. Note: `perpx-deploy`
4. Expiration: `No expiration`（または任意の期限）
5. Scopes: `repo`にチェック
6. 「Generate token」をクリック
7. 表示されたトークンをコピー（一度しか表示されないので注意）

---

## ステップ5: Vercelアカウントの作成

### 5.1 Vercelにアクセス

https://vercel.com にアクセスし、「Sign Up」をクリックします。

### 5.2 GitHubでサインアップ

「Continue with GitHub」をクリックし、GitHubアカウントで認証します。

### 5.3 Vercelの認証を許可

GitHubの認証画面で、Vercelがリポジトリにアクセスすることを許可します。

---

## ステップ6: Vercelでプロジェクトをデプロイ

### 6.1 新しいプロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで、`perpx-frontend`を選択
3. 「Import」をクリック

### 6.2 プロジェクト設定

| 項目 | 値 |
|------|-----|
| **Project Name** | `perpx` |
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 6.3 環境変数の設定

「Environment Variables」セクションで、以下を追加：

| Key | Value |
|-----|-------|
| `VITE_APP_TITLE` | `PerpX - Perpetual Trading Reimagined` |
| `VITE_APP_LOGO` | `/perpx-icon.png` |

（他の環境変数は、Manusの「Settings → Secrets」から確認してコピーしてください）

### 6.4 デプロイ

「Deploy」ボタンをクリックします。数分でデプロイが完了します。

### 6.5 デプロイ完了

デプロイが完了すると、以下のようなURLが表示されます：

```
https://perpx.vercel.app
```

このURLにアクセスして、正常に表示されることを確認してください。

---

## ステップ7: perpx.fiドメインをVercelに接続

### 7.1 Vercelでドメインを追加

1. Vercelダッシュボード → プロジェクト`perpx` → Settings → Domains
2. 「Add」ボタンをクリック
3. `perpx.fi`を入力して「Add」

### 7.2 DNS設定の確認

Vercelが以下のDNS設定を表示します：

| Type | Name | Value |
|------|------|-------|
| **A** | @ | `76.76.21.21` |
| **CNAME** | www | `cname.vercel-dns.com` |

### 7.3 CloudflareでDNS設定を更新

1. Cloudflareダッシュボードにログイン
2. `perpx.fi`ドメインを選択
3. DNS → Records

**既存のManusのCNAMEレコードを削除**:
- Type: CNAME
- Name: @
- Target: `xxx.manus.space`

**新しいVercelのAレコードを追加**:
- Type: A
- Name: @
- IPv4 address: `76.76.21.21`
- Proxy status: DNS only（オレンジ色の雲をグレーに変更）

**wwwサブドメイン用のCNAMEレコードを追加**:
- Type: CNAME
- Name: www
- Target: `cname.vercel-dns.com`
- Proxy status: DNS only

### 7.4 DNS伝播を待つ

DNS設定の変更が反映されるまで、**最大48時間**かかる場合があります（通常は数分〜数時間）。

### 7.5 perpx.fiにアクセス

DNS伝播後、https://perpx.fi にアクセスして、正常に表示されることを確認してください。

---

## ステップ8: SSL証明書の設定

Vercelは自動的にSSL証明書（Let's Encrypt）を発行します。DNS設定が正しければ、自動的にHTTPSが有効になります。

---

## トラブルシューティング

### 問題1: `git push`でエラーが発生

**エラーメッセージ**:
```
remote: Support for password authentication was removed on August 13, 2021.
```

**解決方法**:
Personal Access Tokenを使用してください（ステップ4.5参照）。

### 問題2: Vercelデプロイが失敗

**エラーメッセージ**:
```
Error: Cannot find module 'react'
```

**解決方法**:
1. `client`ディレクトリに`package.json`が存在することを確認
2. Vercelの「Root Directory」設定が`client`になっていることを確認

### 問題3: perpx.fiにアクセスできない

**原因**:
DNS設定が反映されていない、またはCloudflareのProxy（オレンジ色の雲）が有効になっている。

**解決方法**:
1. CloudflareのDNS設定で、Proxy statusを「DNS only」（グレーの雲）に変更
2. DNS伝播を待つ（最大48時間）
3. `nslookup perpx.fi`コマンドで、正しいIPアドレス（76.76.21.21）が返されることを確認

### 問題4: ページは表示されるが、スタイルが崩れている

**原因**:
環境変数が正しく設定されていない。

**解決方法**:
1. Vercel → Settings → Environment Variables
2. すべての`VITE_*`環境変数が正しく設定されていることを確認
3. 再デプロイ（Deployments → 最新のデプロイ → ⋯ → Redeploy）

---

## 今後の更新フロー

### コード更新時

1. **ローカルで変更を加える**
2. **GitHubにプッシュ**:
   ```bash
   git add .
   git commit -m "Update: [変更内容]"
   git push
   ```
3. **Vercelが自動的にデプロイ**（数分で反映）

### 環境変数の更新

1. Vercel → Settings → Environment Variables
2. 変更または追加
3. 再デプロイ

---

## コスト比較

| サービス | 月額コスト | 帯域幅 | ビルド時間 |
|----------|-----------|--------|-----------|
| **Manus** | $20〜 | 制限あり | 制限あり |
| **Vercel（Hobby）** | **$0** | 100GB | 100時間 |
| **Vercel（Pro）** | $20 | 1TB | 400時間 |

PerpXの現在の規模では、**Vercel Hobbyプラン（無料）**で十分です。

---

## まとめ

GitHubとVercelを使用することで、以下のメリットがあります：

1. **安定した本番環境**: Reactアプリケーションが正常にレンダリングされる
2. **無料**: Vercel Hobbyプランは完全無料
3. **高速**: グローバルCDNによる高速配信
4. **自動デプロイ**: GitHubにプッシュするだけで自動デプロイ
5. **SSL自動**: Let's Encrypt証明書が自動発行
6. **スケーラブル**: ユーザー数が増えても問題なし

perpx.fiドメインをVercelに接続することで、Manusの本番ビルド問題を完全に回避できます。

---

**次のステップ**:
1. GitHubアカウントの作成
2. リポジトリの作成とコードのプッシュ
3. Vercelでのデプロイ
4. perpx.fiドメインの接続
5. 正常動作の確認

質問があれば、いつでもお聞きください！
