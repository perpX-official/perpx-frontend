# PerpX ホーム画面修正サマリー

## 修正日時
2025-10-21

## 実施した修正

### 1. Header.tsx - ナビゲーションリンクの削除

#### 変更内容
- **デスクトップナビゲーション**: Features/Stats/Roadmapリンクを削除
- **モバイルメニュー**: Features/Stats/Roadmapリンクを削除

#### 理由
ホームページ専用のナビゲーションリンクが不要なため削除し、ヘッダーをシンプルに保つ。

#### 修正前
```tsx
{isHomePage && (
  <div className="hidden lg:flex items-center gap-4 sm:gap-6 ml-4 sm:ml-8">
    <a href="#features">Features</a>
    <Link href="/stats"><a>Stats</a></Link>
    <a href="#roadmap">Roadmap</a>
  </div>
)}
```

#### 修正後
削除（ヘッダーがよりクリーンに）

---

### 2. Home.tsx - Roadmapセクションの位置

#### 確認結果
Roadmapセクションはすでに"Ready to Start Trading?"（CTAセクション）の直前に配置されていたため、移動不要。

#### 現在の構造
1. Hero Section
2. Features Section
3. **Roadmap Section** ← すでに正しい位置
4. **CTA Section** ("Ready to Start Trading?")
5. Footer

---

### 3. Home.tsx - フッターの簡素化

#### 変更内容
Product、Resources、Communityの3つのセクションを削除し、コピーライトとリーガルリンクのみを残す。

#### 修正前
```tsx
<footer>
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
    <div>Product (Trade, Dashboard, Points, Referral)</div>
    <div>Resources (Documentation, API, Tutorials, Blog)</div>
    <div>Community (Twitter, Discord, Telegram)</div>
    <div>PerpX Logo & Description</div>
  </div>
  <div>Copyright & Legal Links</div>
</footer>
```

#### 修正後
```tsx
<footer className="border-t border-white/10 py-8 sm:py-12 glass-menu">
  <div className="container mx-auto px-3 sm:px-4 lg:px-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p>© 2025 PerpX. All rights reserved.</p>
      <div className="flex gap-4 sm:gap-6">
        <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
        <Link href="/terms-of-service"><a>Terms of Service</a></Link>
      </div>
    </div>
  </div>
</footer>
```

#### レイアウト
- **左側**: コピーライト表示
- **右側**: Privacy PolicyとTerms of Serviceのリンク
- **削除**: Product/Resources/Communityセクション

---

### 4. Privacy Policy & Terms of Service ページの作成

#### 参考資料
dYdXの公式Privacy PolicyとTerms of Serviceを参考に、DEX業界標準に準拠した内容を作成。

**参考URL:**
- https://www.dydx.xyz/legal/privacy-policy
- https://dydx.exchange/v4-terms

#### 作成したファイル

**PrivacyPolicy.tsx** (`/home/ubuntu/perpdex/client/src/pages/PrivacyPolicy.tsx`)
- 13セクションの包括的なプライバシーポリシー
- 最終更新日: January 21, 2026
- 主要セクション:
  1. General Information
  2. Information We Collect (Technical Data, Wallet Information, Communication Data)
  3. How We Use Your Information
  4. Legal Basis for Processing
  5. Data Sharing and Disclosure
  6. Data Security
  7. Data Retention
  8. Your Rights (GDPR準拠)
  9. Cookies and Tracking
  10. International Data Transfers
  11. Children's Privacy
  12. Changes to This Privacy Policy
  13. Contact Us (privacy@perpx.exchange)

**TermsOfService.tsx** (`/home/ubuntu/perpdex/client/src/pages/TermsOfService.tsx`)
- 16セクションの包括的な利用規約
- 最終更新日: January 21, 2026
- 主要セクション:
  1. Acceptance of Terms
  2. Eligibility and Restrictions (18歳以上、地域制限、VPN禁止)
  3. Description of Services
  4. User Responsibilities
  5. Trading Risks (レバレッジ取引のリスク開示)
  6. Fees and Charges
  7. Intellectual Property
  8. Disclaimers ("AS IS" 提供)
  9. Limitation of Liability
  10. Indemnification
  11. Modifications to Terms
  12. Termination
  13. Dispute Resolution (仲裁条項)
  14. Governing Law
  15. Severability
  16. Contact Information (legal@perpx.exchange)

#### ルーティング設定

**App.tsx** に以下のルートを追加:
```tsx
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Routes
<Route path={"/privacy-policy"} component={PrivacyPolicy} />
<Route path={"/terms-of-service"} component={TermsOfService} />
```

#### フッターリンク更新

**Home.tsx** のフッターリンクを`#`から実際のページへのリンクに変更:
```tsx
<Link href="/privacy-policy"><a>Privacy Policy</a></Link>
<Link href="/terms-of-service"><a>Terms of Service</a></Link>
```

---

## 法的文書の特徴

### Privacy Policy
- **データ保護規制準拠**: GDPR、Cayman Islands Data Protection Act
- **透明性**: 収集するデータの種類を明確に説明
- **ユーザー権利**: アクセス、修正、削除、データポータビリティ
- **セキュリティ**: 技術的・組織的セキュリティ対策の説明
- **ブロックチェーン特有**: ウォレットアドレスとトランザクション履歴の取り扱い

### Terms of Service
- **リスク開示**: レバレッジ取引のリスクを明確に警告
- **地域制限**: 特定の管轄区域での使用禁止
- **免責事項**: "AS IS"提供、保証の否認
- **責任制限**: 間接損害、取引損失への責任制限
- **紛争解決**: 仲裁条項、集団訴訟の放棄
- **知的財産**: プラットフォームの所有権保護

---

## ビルド結果

✅ TypeScriptコンパイル成功  
✅ Viteビルド成功  
✅ エラーなし  
✅ すべてのページが正常に表示

---

## テスト済み機能

1. ✅ ホームページのヘッダーからFeatures/Stats/Roadmapが削除
2. ✅ モバイルメニューからFeatures/Stats/Roadmapが削除
3. ✅ フッターがシンプルなレイアウトに変更
4. ✅ Privacy Policyページが正常に表示
5. ✅ Terms of Serviceページが正常に表示
6. ✅ フッターのリンクが正しく機能

---

## プレビューURL

- ホームページ: https://3000-i3te5b7pchasy0i76y38q-a459596c.manus.computer/
- Privacy Policy: https://3000-i3te5b7pchasy0i76y38q-a459596c.manus.computer/privacy-policy
- Terms of Service: https://3000-i3te5b7pchasy0i76y38q-a459596c.manus.computer/terms-of-service

---

## 影響範囲

### 修正したファイル
1. `/home/ubuntu/perpdex/client/src/components/Header.tsx` - ナビゲーションリンク削除
2. `/home/ubuntu/perpdex/client/src/pages/Home.tsx` - フッター簡素化、リンク更新
3. `/home/ubuntu/perpdex/client/src/pages/PrivacyPolicy.tsx` - 新規作成
4. `/home/ubuntu/perpdex/client/src/pages/TermsOfService.tsx` - 新規作成
5. `/home/ubuntu/perpdex/client/src/App.tsx` - ルート追加

### 削除した要素
- ヘッダーのFeatures/Stats/Roadmapリンク（デスクトップ・モバイル）
- フッターのProductセクション（Trade, Dashboard, Points, Referral）
- フッターのResourcesセクション（Documentation, API, Tutorials, Blog）
- フッターのCommunityセクション（Twitter, Discord, Telegram）
- フッターのPerpXロゴと説明文

### 追加した要素
- Privacy Policyページ（13セクション、包括的な内容）
- Terms of Serviceページ（16セクション、包括的な内容）
- フッターのPrivacy Policy/Terms of Serviceリンク

---

## 今後の推奨事項

1. **法的レビュー**: 実際のローンチ前に法律顧問によるレビューを実施
2. **多言語対応**: Privacy PolicyとTerms of Serviceの日本語版を作成
3. **Cookie同意バナー**: GDPR準拠のためCookie同意バナーを追加
4. **更新履歴**: 規約変更時の履歴管理システムを実装
5. **メール通知**: 重要な規約変更時のユーザー通知機能
6. **アーカイブ**: 過去のバージョンの規約を保存

