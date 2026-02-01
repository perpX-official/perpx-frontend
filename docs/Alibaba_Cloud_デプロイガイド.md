# PerpX Alibaba Cloud デプロイガイド

本ガイドでは、PerpXのフロントエンド（本サイト）と管理画面をAlibaba Cloudにデプロイする手順を詳細に説明します。

---

## 目次

1. [推奨アーキテクチャ](#1-推奨アーキテクチャ)
2. [必要なAlibaba Cloudサービス](#2-必要なalibaba-cloudサービス)
3. [ECSインスタンスのセットアップ](#3-ecsインスタンスのセットアップ)
4. [データベース（ApsaraDB）のセットアップ](#4-データベースapsaradbのセットアップ)
5. [アプリケーションのデプロイ](#5-アプリケーションのデプロイ)
6. [管理画面の分離デプロイ](#6-管理画面の分離デプロイ)
7. [ドメイン設定とSSL](#7-ドメイン設定とssl)
8. [環境変数の設定](#8-環境変数の設定)
9. [運用コスト見積もり](#9-運用コスト見積もり)
10. [セキュリティ設定](#10-セキュリティ設定)

---

## 1. 推奨アーキテクチャ

### 構成図

```
┌─────────────────────────────────────────────────────────────────┐
│                      Alibaba Cloud                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐              ┌─────────────────┐           │
│  │   ECS #1        │              │   ECS #2        │           │
│  │   本サイト       │              │   管理画面       │           │
│  │   (公開)        │              │   (IP制限)      │           │
│  │                 │              │                 │           │
│  │  - Node.js      │              │  - Node.js      │           │
│  │  - PM2          │              │  - PM2          │           │
│  │  - Nginx        │              │  - Nginx        │           │
│  └────────┬────────┘              └────────┬────────┘           │
│           │                                │                     │
│           └────────────┬───────────────────┘                     │
│                        ↓                                         │
│              ┌─────────────────┐                                │
│              │   ApsaraDB      │                                │
│              │   for MySQL     │                                │
│              │   (共有DB)      │                                │
│              └─────────────────┘                                │
│                                                                  │
│  ┌─────────────────┐              ┌─────────────────┐           │
│  │   OSS           │              │   CDN           │           │
│  │   (静的ファイル) │              │   (高速配信)    │           │
│  └─────────────────┘              └─────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### なぜサーバーを分けるのか

| 理由 | 詳細 |
|------|------|
| **セキュリティ** | 管理画面へのアクセスをIPホワイトリストで制限可能 |
| **負荷分離** | 本サイトのトラフィックが管理画面に影響しない |
| **メンテナンス** | 本サイトを止めずに管理画面を更新可能 |
| **コスト最適化** | 管理画面は小さいインスタンスで十分 |

---

## 2. 必要なAlibaba Cloudサービス

| サービス | 用途 | 推奨スペック |
|---------|------|-------------|
| **ECS (Elastic Compute Service)** | アプリケーションサーバー | 本サイト: 2vCPU/4GB、管理画面: 1vCPU/2GB |
| **ApsaraDB for MySQL** | データベース | 1vCPU/1GB（開始時） |
| **OSS (Object Storage Service)** | 静的ファイル保存 | 従量課金 |
| **CDN** | コンテンツ配信高速化 | 従量課金 |
| **SLB (Server Load Balancer)** | ロードバランサー（オプション） | 必要に応じて |

---

## 3. ECSインスタンスのセットアップ

### 3.1 インスタンス作成

1. Alibaba Cloudコンソールにログイン
2. **ECS** → **インスタンス** → **インスタンスの作成**
3. 以下の設定を選択：

| 項目 | 本サイト用 | 管理画面用 |
|------|-----------|-----------|
| リージョン | 東京 (ap-northeast-1) | 東京 (ap-northeast-1) |
| インスタンスタイプ | ecs.t6-c1m2.large (2vCPU/4GB) | ecs.t6-c1m1.small (1vCPU/1GB) |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| ストレージ | 40GB SSD | 20GB SSD |
| ネットワーク | VPC（新規作成） | 同じVPC |

### 3.2 サーバー初期設定

SSHでECSに接続後、以下のコマンドを実行：

```bash
# システム更新
sudo apt update && sudo apt upgrade -y

# Node.js 22.x インストール
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# pnpm インストール
sudo npm install -g pnpm

# PM2 インストール（プロセス管理）
sudo npm install -g pm2

# Nginx インストール
sudo apt install -y nginx

# Git インストール
sudo apt install -y git
```

### 3.3 Nginx設定

`/etc/nginx/sites-available/perpx` を作成：

```nginx
server {
    listen 80;
    server_name perpx.fi www.perpx.fi;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

設定を有効化：

```bash
sudo ln -s /etc/nginx/sites-available/perpx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 4. データベース（ApsaraDB）のセットアップ

### 4.1 ApsaraDB for MySQL作成

1. Alibaba Cloudコンソール → **ApsaraDB for MySQL**
2. **インスタンスの作成**
3. 以下の設定：

| 項目 | 設定値 |
|------|--------|
| エディション | Basic Edition（開始時） |
| バージョン | MySQL 8.0 |
| インスタンスタイプ | 1vCPU/1GB |
| ストレージ | 20GB SSD |
| リージョン | 東京 (ap-northeast-1) |
| VPC | ECSと同じVPC |

### 4.2 データベース作成

ApsaraDBコンソールで：

1. **アカウント管理** → 管理者アカウント作成
2. **データベース管理** → `perpx` データベース作成
3. **ホワイトリスト設定** → ECSのプライベートIPを追加

### 4.3 接続情報

```
DATABASE_URL=mysql://username:password@rm-xxxxx.mysql.japan.rds.aliyuncs.com:3306/perpx?ssl={"rejectUnauthorized":true}
```

---

## 5. アプリケーションのデプロイ

### 5.1 コードのクローン

```bash
cd /home/ubuntu
git clone https://github.com/your-username/perpx.git
cd perpx
```

### 5.2 依存関係インストール

```bash
pnpm install
```

### 5.3 環境変数設定

`.env` ファイルを作成：

```bash
nano .env
```

内容（後述の環境変数セクション参照）

### 5.4 ビルド

```bash
pnpm build
```

### 5.5 データベースマイグレーション

```bash
pnpm db:push
```

### 5.6 PM2でアプリケーション起動

```bash
pm2 start dist/index.js --name perpx
pm2 save
pm2 startup
```

---

## 6. 管理画面の分離デプロイ

### 6.1 管理画面専用ECSの設定

管理画面用ECSでも同様の手順でセットアップしますが、以下の点が異なります：

**Nginx設定（IP制限付き）：**

```nginx
server {
    listen 80;
    server_name admin.perpx.fi;

    # IP制限（あなたのIPアドレスのみ許可）
    allow 123.456.789.0/24;  # あなたのオフィスIP
    allow 111.222.333.444;    # あなたの自宅IP
    deny all;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6.2 管理画面のルート分離（オプション）

同じコードベースで管理画面を分離する場合、環境変数で制御：

```bash
# 本サイト用
ADMIN_ENABLED=false

# 管理画面用
ADMIN_ENABLED=true
```

---

## 7. ドメイン設定とSSL

### 7.1 ドメインDNS設定

ドメインレジストラ（Netim等）で以下のAレコードを設定：

| ホスト | タイプ | 値 |
|-------|-------|-----|
| @ | A | ECS #1のパブリックIP |
| www | A | ECS #1のパブリックIP |
| admin | A | ECS #2のパブリックIP |

### 7.2 SSL証明書（Let's Encrypt）

```bash
# Certbot インストール
sudo apt install -y certbot python3-certbot-nginx

# SSL証明書取得
sudo certbot --nginx -d perpx.fi -d www.perpx.fi

# 自動更新設定
sudo certbot renew --dry-run
```

---

## 8. 環境変数の設定

### 8.1 必須環境変数

```bash
# データベース
DATABASE_URL=mysql://username:password@rm-xxxxx.mysql.japan.rds.aliyuncs.com:3306/perpx?ssl={"rejectUnauthorized":true}

# JWT認証
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters

# 管理者
ADMIN_PASSWORD=your-admin-password

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=7b3c2778deabef041da731133fab3568

# X (Twitter) OAuth
X_CLIENT_ID=your-x-client-id
X_CLIENT_SECRET=your-x-client-secret
X_BEARER_TOKEN=your-x-bearer-token

# Discord OAuth
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# アプリケーション
NODE_ENV=production
PORT=3000
```

### 8.2 OAuth Redirect URI更新

**X Developer Portal:**
- Callback URL: `https://perpx.fi/api/oauth/x/callback`

**Discord Developer Portal:**
- Redirect URI: `https://perpx.fi/api/oauth/discord/callback`

---

## 9. 運用コスト見積もり

### 月額コスト（東京リージョン）

| サービス | スペック | 月額（USD） |
|---------|---------|------------|
| ECS #1（本サイト） | 2vCPU/4GB | $30-50 |
| ECS #2（管理画面） | 1vCPU/1GB | $10-15 |
| ApsaraDB for MySQL | 1vCPU/1GB | $20-30 |
| OSS | 10GB | $1-2 |
| CDN | 100GB転送 | $5-10 |
| **合計** | | **$66-107** |

### スケールアップ時の目安

| ユーザー数 | ECS | DB | 月額（USD） |
|-----------|-----|-----|------------|
| ~1,000 | 2vCPU/4GB | 1vCPU/1GB | $66-107 |
| ~10,000 | 4vCPU/8GB | 2vCPU/4GB | $150-200 |
| ~100,000 | 8vCPU/16GB + SLB | 4vCPU/8GB | $400-600 |

---

## 10. セキュリティ設定

### 10.1 セキュリティグループ設定

**本サイト用ECS:**

| ポート | プロトコル | ソース | 説明 |
|-------|----------|--------|------|
| 22 | TCP | あなたのIP | SSH |
| 80 | TCP | 0.0.0.0/0 | HTTP |
| 443 | TCP | 0.0.0.0/0 | HTTPS |

**管理画面用ECS:**

| ポート | プロトコル | ソース | 説明 |
|-------|----------|--------|------|
| 22 | TCP | あなたのIP | SSH |
| 80 | TCP | あなたのIP | HTTP（IP制限） |
| 443 | TCP | あなたのIP | HTTPS（IP制限） |

### 10.2 ファイアウォール（UFW）

```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 10.3 自動セキュリティ更新

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## デプロイチェックリスト

- [ ] Alibaba Cloudアカウント作成
- [ ] ECS #1（本サイト）作成
- [ ] ECS #2（管理画面）作成
- [ ] ApsaraDB for MySQL作成
- [ ] VPC/セキュリティグループ設定
- [ ] Node.js/pnpm/PM2/Nginx インストール
- [ ] GitHubからコードクローン
- [ ] 環境変数設定
- [ ] データベースマイグレーション
- [ ] PM2でアプリケーション起動
- [ ] ドメインDNS設定
- [ ] SSL証明書取得
- [ ] X/Discord OAuth Redirect URI更新
- [ ] 動作確認

---

## トラブルシューティング

### アプリケーションが起動しない

```bash
# ログ確認
pm2 logs perpx

# プロセス状態確認
pm2 status
```

### データベース接続エラー

```bash
# 接続テスト
mysql -h rm-xxxxx.mysql.japan.rds.aliyuncs.com -u username -p

# ホワイトリスト確認
# ApsaraDBコンソール → セキュリティ → ホワイトリスト
```

### Nginx 502 Bad Gateway

```bash
# アプリケーションが起動しているか確認
pm2 status

# Nginxログ確認
sudo tail -f /var/log/nginx/error.log
```

---

## 参考リンク

- [Alibaba Cloud ECS ドキュメント](https://www.alibabacloud.com/help/en/ecs/)
- [ApsaraDB for MySQL ドキュメント](https://www.alibabacloud.com/help/en/apsaradb-for-rds/latest/what-is-apsaradb-rds)
- [Let's Encrypt Certbot](https://certbot.eff.org/)
- [PM2 ドキュメント](https://pm2.keymetrics.io/docs/usage/quick-start/)
