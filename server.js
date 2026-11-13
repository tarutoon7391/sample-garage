// Railway用の静的サイト配信サーバー
const express = require("express");
const path = require("path");

const app = express();

// Railwayが割り当てるPORTを必ず使う（固定ポートだと502の原因になる）
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

// ヘルスチェック用
app.get("/health", (_req, res) => res.send("ok"));

// 未定義パスはトップへ
app.use((_req, res) => res.redirect("/"));

// 0.0.0.0で待ち受けて外部から届くようにする
app.listen(PORT, "0.0.0.0", () => {
  console.log(`サンプル自動車 サイト起動: ポート ${PORT}`);
});
