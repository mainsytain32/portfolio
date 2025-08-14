// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(254, 254, 254, 0.98)';
        header.style.borderBottomColor = 'rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(254, 254, 254, 0.95)';
        header.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
});

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 監視対象の要素を追加
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// パフォーマンス最適化：スクロールイベントのスロットリング
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', updateOnScroll);