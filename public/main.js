// ===== スマホメニューの開閉 =====
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ===== コピーライトの年を自動更新 =====
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== トップのヒーロー：スクロールに合わせて青→白に変える =====
const hero = document.getElementById("hero");
const heroInner = document.getElementById("heroInner");
const floatCall = document.querySelector(".float-call");

if (hero) {
  const from = [47, 106, 163]; // #2f6aa3
  const to = [255, 255, 255];  // 白
  const mix = (t) => from.map((c, i) => Math.round(c + (to[i] - c) * t)).join(",");

  const update = () => {
    // ヒーローの高さの7割スクロールしたら完全に白になる
    const t = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.7), 0), 1);
    hero.style.setProperty("--hero-bg", `rgb(${mix(t)})`);
    // 文字は背景が白くなりきる前にフェードアウトさせて、読みにくい中間色の時間をなくす
    const fade = Math.max(1 - t * 1.6, 0);
    heroInner.style.opacity = fade;
    if (!reduceMotion) heroInner.style.transform = `translateY(${t * -40}px)`;
    hero.querySelector(".hero__scroll").style.opacity = fade * 0.8;
    // ヒーロー表示中は固定電話ボタンを隠す（ヒーロー内に電話ボタンがあるため）
    if (floatCall) floatCall.classList.toggle("is-hidden", t < 0.5);
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

// ===== 表示時のふわっとアニメーション（動きを減らす設定の人には無効） =====
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(".purpose__item, .feature, .flow__step, .repair-item, .care-card, .news__item");
  targets.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  targets.forEach((el) => io.observe(el));
}
