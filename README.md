# SAMPLE GARAGE（自動車整備工場サイト デザイン試作）

自動車整備工場のWebサイトのデザイン・UI試作。店名・住所・電話番号などはすべてダミー。

## 構成

- `server.js` … Express で `public/` を配信（Railway の `PORT` を使用、`0.0.0.0` で待ち受け）
- `public/index.html` … 1ページ構成（サービス／車検／修理・整備／ケア／販売／お知らせ／会社概要・アクセス）
- `public/style.css` / `public/main.js`
- `railway.json` … 起動コマンドとヘルスチェック（`/health`）

## ローカル起動

```bash
npm install
npm start
# http://localhost:3000
```

## Railway デプロイ

1. GitHub にプッシュ
2. Railway で「Deploy from GitHub repo」→ このリポジトリを選択
3. Settings → Networking → Generate Domain

## 本番化する前にやること

- [ ] 店名・住所・電話番号・営業時間などのダミーを本物に差し替える
- [ ] 地図のダミーをGoogleマップ埋め込みに戻す
- [ ] 画面下のデモ表示バー（`.demo-bar`）を消す
- [ ] 実際の写真（工場・設備・スタッフ）を追加する
- [ ] 料金の目安を載せられるなら載せる
- [ ] `<meta name="robots" content="noindex, nofollow">` を外す（試作中は検索に出さないため入れている）
