// Railway用サーバー：共通レイアウト（views/layout.html）に各ページを差し込んで返す
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Railwayが割り当てるPORTを必ず使う（固定ポートだと502の原因になる）
const PORT = process.env.PORT || 3000;

// ページ一覧（URL → ページファイル・タイトル・説明）
const pages = {
  "/":           { file: "home",       nav: "home",       title: "サンプル自動車｜車検・修理・整備・車販売",    desc: "車検・修理・整備から新車・中古車販売、洗車まで。地域の認証工場サンプル自動車。" },
  "/inspection": { file: "inspection", nav: "inspection", title: "車検｜サンプル自動車",                      desc: "認証工場で点検から整備まで。代車の無料貸出もあります。" },
  "/repair":     { file: "repair",     nav: "repair",     title: "修理・整備｜サンプル自動車",                desc: "ブレーキ、タイヤ、オイル、バッテリーなど、修理・整備はおまかせください。" },
  "/care":       { file: "care",       nav: "care",       title: "洗車・クリーニング｜サンプル自動車",        desc: "エアコン洗浄、車内クリーニング、エンジンケアの進化剤。" },
  "/care/steam-cleaner": { file: "steam", nav: "care", title: "スーパースチームクリーナーⅡ（車内クリーニング）｜サンプル自動車", desc: "約75℃の高温水でシートを洗って吸い取る車内クリーニング。シミ・ニオイ・ダニやカビに。" },
  "/sale":       { file: "sale",       nav: "sale",       title: "新車・中古車販売｜サンプル自動車",          desc: "国内外の多数メーカーの新車から中古車まで。購入後のメンテナンスも一貫対応。" },
  "/news":       { file: "news",       nav: "news",       title: "お知らせ｜サンプル自動車",                  desc: "サンプル自動車からのお知らせ。" },
  "/company":    { file: "company",    nav: "company",    title: "会社案内・アクセス｜サンプル自動車",        desc: "会社概要、所在地、お問い合わせ先。" },
};

const viewsDir = path.join(__dirname, "views");
const layout = fs.readFileSync(path.join(viewsDir, "layout.html"), "utf8");

// 起動時に全ページを組み立ててキャッシュする
const rendered = {};
for (const [url, p] of Object.entries(pages)) {
  const body = fs.readFileSync(path.join(viewsDir, "pages", `${p.file}.html`), "utf8");
  rendered[url] = layout
    .replaceAll("{{TITLE}}", p.title)
    .replaceAll("{{DESC}}", p.desc)
    .replaceAll("{{PAGE}}", p.nav)
    .replace("{{BODY}}", body)
    // 今いるページのメニューに印をつける
    .replaceAll(`data-nav="${p.nav}"`, `data-nav="${p.nav}" aria-current="page"`)
    // トップは最初から背景が青なので、ヘッダーも白文字で表示しておく（読み込み時のチラつき防止）
    .replace('<header class="header">', p.nav === "home" ? '<header class="header is-on-blue">' : '<header class="header">');
}

app.use(express.static(path.join(__dirname, "public")));

// ヘルスチェック用
app.get("/health", (_req, res) => res.send("ok"));

for (const url of Object.keys(pages)) {
  app.get(url, (_req, res) => res.type("html").send(rendered[url]));
}

// 未定義パスはトップへ
app.use((_req, res) => res.redirect("/"));

// 0.0.0.0で待ち受けて外部から届くようにする
app.listen(PORT, "0.0.0.0", () => {
  console.log(`サンプル自動車 サイト起動: ポート ${PORT}`);
});
