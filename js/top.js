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

// ハンバーガーメニューのクリックイベント
(() => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('nav');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');
  const header = document.querySelector('header');
  const body = document.body;
  let scrollPosition = 0;
  let isFirstClick = true;

  if (!hamburgerMenu || !nav || !hamburgerLines.length || !header) return;

  // スクロールを防ぐ関数
  const preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  hamburgerMenu.addEventListener('click', () => {
    // 初回クリック時にanimatedクラスを追加
    if (isFirstClick) {
      hamburgerLines.forEach(line => {
        line.classList.add('animated');
      });
      isFirstClick = false;
    }

    // メニューの表示/非表示を切り替え
    nav.classList.toggle('menu-open');
    hamburgerMenu.classList.toggle('active');
    header.classList.toggle('menu-open');
    body.classList.toggle('menu-open');

    // 各ラインにactiveクラスを追加/削除
    hamburgerLines.forEach((line, index) => {
      const wasActive = line.classList.contains('active');
      line.classList.toggle('active');
      const isActive = line.classList.contains('active');
      const isAnimated = line.classList.contains('animated');
      
      console.log(`ライン${index + 1}: wasActive=${wasActive}, isActive=${isActive}, isAnimated=${isAnimated}`);
      
      // 閉じるアニメーションの制御（開いていた状態から閉じる場合のみ）
      if (wasActive && isAnimated && !isActive) {
        console.log(`ライン${index + 1}は閉じるアニメーションを開始`);
        
        // アニメーションを強制リセット
        line.style.animation = 'none';
        line.offsetHeight; // リフローを強制
        
        // closingクラスを追加
        line.classList.add('closing');
        
        // アニメーション完了後にclosingクラスを削除
        setTimeout(() => {
          line.classList.remove('closing');
          console.log(`ライン${index + 1}のアニメーション完了`);
        }, 600);
      } else if (!wasActive && isActive) {
        // 開く時はclosingクラスを確実に削除
        line.classList.remove('closing');
        
        // アニメーションを強制リセットして開くアニメーションを確実に実行
        line.style.animation = 'none';
        line.offsetHeight; // リフローを強制
        line.style.animation = ''; // アニメーションを有効化
        
        console.log(`ライン${index + 1}が開くアニメーションを開始`);
      }
    });

    // スクロールの有効/無効を切り替え
    if (nav.classList.contains('menu-open')) {
      // メニューが開いている時：スクロール無効
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      body.style.overflow = 'hidden';
      body.style.height = '100vh';
      // スクロールイベントを防ぐ
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
      document.addEventListener('keydown', (e) => {
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
        }
      }, { passive: false });
    } else {
      // メニューが閉じている時：スクロール有効
      body.style.overflow = '';
      body.style.height = '';
      // イベントリスナーを削除
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', preventScroll);
      // スクロール位置を復元
      window.scrollTo(0, scrollPosition);
    }
  });
})();