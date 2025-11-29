# Alibaba Cloud セットアップガイド - PerpX向け完全版

**作成日**: 2025年1月27日  
**作成者**: Manus AI  
**対象**: PerpXプロジェクトチーム

---

## 重要な前提：現時点でAlibaba Cloudは不要です

**結論を先に述べます**: 現在のPerpXプロジェクトの段階（UI/UXのみ完成）では、**Alibaba Cloudの契約は不要**です。

### 理由

現在のPerpXは以下の状態にあります。

**完成しているもの**:
- フロントエンド（ランディングページ）
- ドメイン（perpx.fi）
- DNS管理（Cloudflare）
- メール（ZohoMail）

**未完成・未開発のもの**:
- スマートコントラクト
- バックエンドAPI
- データベース
- ブロックチェーンノード

Alibaba CloudやAWSなどのクラウドサービスが必要になるのは、**バックエンドインフラを構築する段階**です。つまり、スマートコントラクト開発が始まり、APIサーバーやデータベースが必要になった時点で初めて契約を検討すべきです。

### 現在推奨する構成

| 用途 | サービス | 月額コスト | 状態 |
|------|----------|------------|------|
| フロントエンド | Manus（または Vercel/Netlify） | $0〜$20 | ✅ 稼働中 |
| ドメイン管理 | Netim | $10〜$15/年 | ✅ 設定済み |
| DNS・CDN | Cloudflare | $0（無料プラン） | ✅ 設定済み |
| メール | ZohoMail | 設定済み | ✅ 稼働中 |
| バックエンド | **未実装** | - | ❌ 未開発 |

---

## Alibaba Cloudが必要になるタイミング

以下のいずれかの段階に達した時、クラウドサービスの契約を検討してください。

### フェーズ1: スマートコントラクト開発開始（3〜6ヶ月後）

この段階では、まだAlibaba Cloudは不要です。スマートコントラクトはArbitrumやBaseなどのブロックチェーンにデプロイされるため、独自のサーバーは必要ありません。

**必要なサービス**:
- Infura/Alchemy（ブロックチェーンノードAPI）: $0〜$200/月
- Vercel/Netlify（フロントエンドホスティング）: $0〜$20/月

**Alibaba Cloud不要**

---

### フェーズ2: バックエンドAPI開発開始（6〜9ヶ月後）

この段階で初めてクラウドサービスが必要になります。

**必要な機能**:
- APIサーバー（取引履歴、ユーザー管理など）
- データベース（PostgreSQL、MySQL）
- キャッシュ（Redis）
- 監視・ログ管理

**選択肢**:
1. **AWS Lambda + RDS**（推奨）: $100〜$400/月
2. **Alibaba Cloud ECS + RDS**: $80〜$300/月
3. **Google Cloud Run + Cloud SQL**: $100〜$400/月

**この段階でAlibaba Cloudを検討**

---

### フェーズ3: 本格的なスケーリング（12ヶ月後〜）

トラフィックが増加し、高可用性が必要になった段階。

**必要な機能**:
- ロードバランサー
- オートスケーリング
- マルチリージョン展開
- CDN統合

**月額コスト**: $1,000〜$5,000

**Alibaba CloudまたはAWSでフル構成**

---

## Alibaba Cloud 登録手順（将来必要になった時のため）

将来、バックエンド開発が始まった際に参考にしてください。

### ステップ1: アカウント作成

#### 1-1. Alibaba Cloud公式サイトにアクセス

https://www.alibabacloud.com にアクセスします。

**重要**: 
- **International Site**（alibabacloud.com）を使用してください
- **China Site**（aliyun.com）は中国国内向けで、ICP申請が必要です

#### 1-2. アカウント登録

画面右上の「Free Account」または「Sign Up」をクリックします。

**登録方法の選択**:
- メールアドレス（推奨）
- 電話番号
- Google/Facebook/LinkedIn連携

**推奨**: メールアドレスで登録（admin@perpx.fi を使用）

#### 1-3. 基本情報入力

以下の情報を入力します。

| 項目 | 入力内容 |
|------|----------|
| Email | admin@perpx.fi |
| Password | 強力なパスワード（大文字・小文字・数字・記号を含む） |
| Country/Region | Japan（または実際の所在地） |
| Company Name | PerpX（または正式な会社名） |

#### 1-4. メール認証

登録したメールアドレスに認証リンクが送信されます。リンクをクリックして認証を完了します。

---

### ステップ2: 本人確認（Real-Name Verification）

Alibaba Cloudでは、サービスを利用する前に本人確認が必要です。

#### 2-1. 個人アカウントの場合

**必要書類**:
- パスポート（推奨）
- または運転免許証
- または国民IDカード

**手順**:
1. Alibaba Cloud Console → Account Management → Real-Name Verification
2. 「Individual」を選択
3. パスポート情報を入力
4. パスポートの写真をアップロード
5. 審査待ち（通常1〜3営業日）

#### 2-2. 法人アカウントの場合

**必要書類**:
- 会社登記簿謄本（英語版または中国語版）
- 代表者のパスポート
- ビジネスライセンス

**手順**:
1. Alibaba Cloud Console → Account Management → Real-Name Verification
2. 「Enterprise」を選択
3. 会社情報を入力
4. 書類をアップロード
5. 審査待ち（通常3〜7営業日）

**推奨**: 初期段階では個人アカウントで開始し、必要に応じて法人アカウントへアップグレード

---

### ステップ3: 支払い方法の追加

#### 3-1. クレジットカード登録

1. Console → Billing Management → Payment Methods
2. 「Add Credit/Debit Card」をクリック
3. カード情報を入力:
   - カード番号
   - 有効期限
   - CVV
   - 請求先住所
4. 「Save」をクリック

**対応カード**:
- Visa
- Mastercard
- American Express
- JCB

#### 3-2. PayPal（オプション）

PayPalアカウントでも支払い可能です。

---

### ステップ4: リージョン選択

Alibaba Cloudは世界中にデータセンターを持っています。PerpXに推奨するリージョンは以下の通りです。

| リージョン | 場所 | レイテンシ（日本から） | 推奨度 |
|------------|------|------------------------|--------|
| Japan (Tokyo) | 東京 | 最低 | ★★★★★ |
| Singapore | シンガポール | 低 | ★★★★☆ |
| Hong Kong | 香港 | 低 | ★★★★☆ |
| US West (Silicon Valley) | 米国西海岸 | 中 | ★★★☆☆ |
| US East (Virginia) | 米国東海岸 | 高 | ★★☆☆☆ |

**推奨**: **Japan (Tokyo)** - 日本のユーザーに最適、レイテンシ最小

---

## ECS（Elastic Compute Service）インスタンスの作成

バックエンド開発が始まった際に、以下の手順でサーバーを作成します。

### ステップ1: ECSコンソールにアクセス

1. Alibaba Cloud Console にログイン
2. 左メニューから「Elastic Compute Service」を選択
3. 「Instances」→「Create Instance」をクリック

---

### ステップ2: インスタンス設定

#### 2-1. 課金方式の選択

| 方式 | 説明 | 推奨 |
|------|------|------|
| Pay-As-You-Go | 時間単位課金、いつでも削除可能 | ★★★★★（テスト・開発） |
| Subscription | 月額/年額固定、割引あり | ★★★☆☆（本番環境） |

**推奨**: 最初はPay-As-You-Goで開始し、安定稼働後にSubscriptionへ変更

#### 2-2. リージョンとゾーン

- **Region**: Japan (Tokyo)
- **Zone**: Zone A（または自動選択）

#### 2-3. インスタンスタイプ

**開発・テスト用**（推奨）:
- **ecs.t5-lc1m1.small**
  - 1 vCPU
  - 1 GB RAM
  - 月額: 約$5〜$10

**本番環境用**:
- **ecs.c6.large**
  - 2 vCPU
  - 4 GB RAM
  - 月額: 約$50〜$80

#### 2-4. イメージ（OS）選択

**推奨OS**:
- **Ubuntu 22.04 LTS**（最も一般的、ドキュメント豊富）
- または CentOS 8
- または Debian 11

#### 2-5. ストレージ

- **System Disk**: 40 GB（SSD推奨）
- **Data Disk**: 必要に応じて追加（初期は不要）

#### 2-6. ネットワーク設定

**VPC（Virtual Private Cloud）**:
- 新規VPCを作成（デフォルト設定でOK）

**Public IP Address**:
- 「Assign Public IP」にチェック
- 帯域幅: 1 Mbps（開発用）〜 10 Mbps（本番用）

#### 2-7. セキュリティグループ

セキュリティグループは、ファイアウォールルールを定義します。

**必須ポート**:
| ポート | プロトコル | 用途 | 許可範囲 |
|--------|------------|------|----------|
| 22 | TCP | SSH（サーバー管理） | 自分のIPのみ |
| 80 | TCP | HTTP | 0.0.0.0/0（全世界） |
| 443 | TCP | HTTPS | 0.0.0.0/0（全世界） |
| 3000 | TCP | Node.js開発サーバー | 自分のIPのみ（開発時） |

**設定方法**:
1. 「Create Security Group」を選択
2. 上記のルールを追加
3. 「Save」をクリック

#### 2-8. ログイン認証

**推奨**: SSH Key Pair（パスワードより安全）

**手順**:
1. 「Key Pair」を選択
2. 「Create Key Pair」をクリック
3. キーペア名を入力（例: perpx-tokyo-key）
4. 秘密鍵（.pem）ファイルをダウンロード
5. **重要**: このファイルを安全な場所に保管（紛失すると再発行不可）

---

### ステップ3: インスタンス起動

1. 設定内容を確認
2. 「Create Instance」をクリック
3. 数分待つとインスタンスが起動

---

### ステップ4: インスタンスへの接続

#### 4-1. パブリックIPアドレスの確認

1. ECS Console → Instances
2. 作成したインスタンスの「Public IP Address」をコピー（例: 47.74.123.45）

#### 4-2. SSH接続（Mac/Linux）

ターミナルを開き、以下のコマンドを実行します。

```bash
# 秘密鍵のパーミッション変更（初回のみ）
chmod 400 ~/Downloads/perpx-tokyo-key.pem

# SSH接続
ssh -i ~/Downloads/perpx-tokyo-key.pem root@47.74.123.45
```

#### 4-3. SSH接続（Windows）

**PuTTYを使用**:
1. PuTTYgenで.pemファイルを.ppk形式に変換
2. PuTTYを起動
3. Host Name: root@47.74.123.45
4. Connection → SSH → Auth → Private key file: .ppkファイルを選択
5. 「Open」をクリック

---

## perpx.fiドメインの紐付け方法

### 方法1: CloudflareでAレコードを追加（推奨）

これが最もシンプルで推奨される方法です。Cloudflareを引き続きDNS管理に使用します。

#### 手順

**1. Alibaba Cloud ECSのパブリックIPを確認**

ECS Console → Instances → パブリックIPアドレスをコピー（例: 47.74.123.45）

**2. Cloudflareダッシュボードにログイン**

https://dash.cloudflare.com にアクセスし、perpx.fiドメインを選択します。

**3. DNSレコードを追加**

「DNS」タブをクリックし、以下のレコードを追加します。

| Type | Name | Content | Proxy status | TTL |
|------|------|---------|--------------|-----|
| A | @ | 47.74.123.45 | Proxied（オレンジ色の雲） | Auto |
| A | www | 47.74.123.45 | Proxied | Auto |

**説明**:
- **@**: ルートドメイン（perpx.fi）
- **www**: wwwサブドメイン（www.perpx.fi）
- **Proxied**: CloudflareのCDN・DDoS保護を有効化

**4. 既存のManusのCNAMEレコードを削除**

現在ManusへのCNAMEレコードがある場合、削除またはコメントアウトします。

**5. DNS伝播を待つ**

通常5分〜48時間でDNSが伝播します。以下のコマンドで確認できます。

```bash
# Mac/Linuxターミナル
dig perpx.fi

# または
nslookup perpx.fi
```

**正常な場合の出力例**:
```
;; ANSWER SECTION:
perpx.fi.  300  IN  A  47.74.123.45
```

---

### 方法2: Alibaba Cloud DNSを使用

Cloudflareの代わりにAlibaba Cloud DNSを使用する方法です。

#### 手順

**1. Alibaba Cloud DNSにドメインを追加**

1. Alibaba Cloud Console → Alibaba Cloud DNS
2. 「Add Domain Name」をクリック
3. ドメイン名を入力: perpx.fi
4. 「OK」をクリック

**2. Alibaba CloudのネームサーバーをメモCopy**

Alibaba Cloudが提供するネームサーバー（例）:
```
ns1.alidns.com
ns2.alidns.com
```

**3. Netimでネームサーバーを変更**

1. Netimにログイン
2. perpx.fiドメインを選択
3. 「Nameservers」または「DNS Settings」を選択
4. Alibaba Cloudのネームサーバーに変更
5. 保存

**4. Alibaba Cloud DNSでAレコードを追加**

1. Alibaba Cloud DNS → perpx.fi → Manage DNS
2. 「Add Record」をクリック
3. 以下の設定:
   - Type: A
   - Host: @
   - Value: ECSのパブリックIP（47.74.123.45）
   - TTL: 600
4. wwwサブドメインも同様に追加

**5. DNS伝播を待つ**

ネームサーバー変更は24〜48時間かかる場合があります。

---

### 方法3: Cloudflare + Alibaba Cloud ハイブリッド（最推奨）

CloudflareをCDN・DDoS保護として使用し、Alibaba Cloudをオリジンサーバーとして使用します。

#### メリット

- Cloudflareの無料CDN・SSL・DDoS保護を活用
- Alibaba Cloudの高速サーバーを活用
- 最高のパフォーマンスとセキュリティ

#### 手順

**方法1と同じ**（CloudflareでAレコードを追加）で完了です。Cloudflareが自動的にCDNとして機能します。

---

## SSL証明書の設定

### オプション1: Cloudflare SSL（推奨・無料）

Cloudflareを使用している場合、SSL証明書は自動的に提供されます。

**手順**:
1. Cloudflareダッシュボード → SSL/TLS
2. 「Full」または「Full (strict)」を選択
3. 自動的にSSL証明書が発行される

**設定完了**: https://perpx.fi でアクセス可能

---

### オプション2: Let's Encrypt（無料）

Alibaba Cloud ECS上で直接SSL証明書を設定する方法です。

**手順**:

**1. Certbotをインストール**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

**2. Nginxをインストール（まだの場合）**

```bash
sudo apt install nginx -y
```

**3. SSL証明書を取得**

```bash
sudo certbot --nginx -d perpx.fi -d www.perpx.fi
```

**4. メールアドレスを入力**

admin@perpx.fi を入力します。

**5. 利用規約に同意**

「A」を入力してEnter

**6. 自動更新設定**

```bash
sudo certbot renew --dry-run
```

**設定完了**: https://perpx.fi でアクセス可能

---

## Webサーバーのセットアップ

### Nginx + Node.js構成（推奨）

#### 1. Node.jsのインストール

```bash
# Node.js 20.x LTSをインストール
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# バージョン確認
node -v  # v20.x.x
npm -v   # 10.x.x
```

#### 2. アプリケーションのデプロイ

```bash
# プロジェクトディレクトリ作成
mkdir -p /var/www/perpx
cd /var/www/perpx

# Gitからクローン（または手動アップロード）
git clone https://github.com/your-repo/perpx.git .

# 依存関係インストール
npm install

# ビルド
npm run build
```

#### 3. Nginxの設定

```bash
# Nginx設定ファイル作成
sudo nano /etc/nginx/sites-available/perpx.fi
```

以下の内容を貼り付けます。

```nginx
server {
    listen 80;
    server_name perpx.fi www.perpx.fi;

    # HTTPからHTTPSへリダイレクト
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name perpx.fi www.perpx.fi;

    # SSL証明書（Let's Encryptの場合）
    ssl_certificate /etc/letsencrypt/live/perpx.fi/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/perpx.fi/privkey.pem;

    # セキュリティヘッダー
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # 静的ファイル
    location / {
        root /var/www/perpx/dist;
        try_files $uri $uri/ /index.html;
    }

    # APIプロキシ（バックエンドがある場合）
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. Nginx設定を有効化

```bash
# シンボリックリンク作成
sudo ln -s /etc/nginx/sites-available/perpx.fi /etc/nginx/sites-enabled/

# デフォルト設定を無効化
sudo rm /etc/nginx/sites-enabled/default

# 設定テスト
sudo nginx -t

# Nginx再起動
sudo systemctl restart nginx
```

---

## コスト比較: Manus vs Vercel vs Alibaba Cloud

| 項目 | Manus | Vercel | Alibaba Cloud ECS |
|------|-------|--------|-------------------|
| **月額コスト** | $0〜$50 | $0〜$20 | $5〜$100 |
| **SSL証明書** | 自動 | 自動 | 手動設定（Let's Encrypt無料） |
| **CDN** | 不明 | 自動 | 手動設定（Cloudflare推奨） |
| **スケーラビリティ** | 限定的 | 自動 | 手動設定 |
| **バックエンド対応** | 不明 | Serverless Functions | フル対応 |
| **ウォーターマーク** | あり（要確認） | なし | なし |
| **推奨フェーズ** | 初期開発 | フロントエンドのみ | バックエンド開発以降 |

---

## 推奨アクション：段階的アプローチ

### 現在（フェーズ0）: UI/UXのみ

**推奨構成**:
- フロントエンド: Manus（または Vercel/Netlifyへ移行）
- ドメイン: Netim
- DNS: Cloudflare
- メール: ZohoMail

**月額コスト**: $0〜$20

**Alibaba Cloud不要**

---

### 3〜6ヶ月後（フェーズ1）: スマートコントラクト開発

**推奨構成**:
- フロントエンド: Vercel/Netlify
- スマートコントラクト: Arbitrum/Base（ブロックチェーン）
- ブロックチェーンAPI: Infura/Alchemy

**月額コスト**: $20〜$200

**Alibaba Cloud不要**

---

### 6〜9ヶ月後（フェーズ2）: バックエンドAPI開発

**推奨構成**:
- フロントエンド: Vercel/Netlify
- バックエンドAPI: **Alibaba Cloud ECS**（または AWS EC2）
- データベース: Alibaba Cloud RDS（または AWS RDS）
- DNS: Cloudflare（継続）

**月額コスト**: $100〜$500

**この段階でAlibaba Cloud契約**

---

### 12ヶ月後〜（フェーズ3）: 本格稼働

**推奨構成**:
- フロントエンド: Alibaba Cloud CDN（または Cloudflare）
- バックエンド: Alibaba Cloud ECS（複数インスタンス）
- データベース: Alibaba Cloud RDS（マスター・スレーブ構成）
- ロードバランサー: Alibaba Cloud SLB
- 監視: Alibaba Cloud CloudMonitor

**月額コスト**: $1,000〜$5,000

**Alibaba Cloudフル活用**

---

## まとめ

### 今すぐやるべきこと

**何もしない**（Alibaba Cloud契約は不要）

理由:
1. 現在はフロントエンドのみ完成
2. バックエンドインフラは未開発
3. スマートコントラクトも未開発
4. クラウドサービスが必要な段階ではない

### 今後のアクション

**6〜9ヶ月後**（バックエンド開発開始時）:
1. Alibaba CloudまたはAWSのアカウント作成
2. ECSインスタンス作成（開発・テスト用）
3. CloudflareでAレコードを追加
4. SSL証明書設定（Let's Encrypt）
5. Nginx + Node.jsでWebサーバー構築

### 最終推奨

**AWS > Alibaba Cloud**

理由:
- DeFi/ブロックチェーンエコシステムが最も成熟
- Amazon Managed Blockchainでノード管理が容易
- グローバルなCDNで低レイテンシ
- 豊富な事例とドキュメント

ただし、**アジア市場重視**かつ**コスト削減優先**の場合は、Alibaba Cloudも有力な選択肢です。

---

**作成者**: Manus AI  
**最終更新**: 2025年1月27日

このガイドは、将来バックエンド開発が必要になった際の参考資料としてご活用ください。現時点では、Alibaba Cloudの契約は不要です。
