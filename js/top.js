// ヘッダーのスクロール連動（パッシブ + 1回だけ要素参照）
(() => {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // 初期状態を反映
  onScroll();
})();

