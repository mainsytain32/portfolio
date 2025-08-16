// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ヘッダーのスクロール効果
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(254, 254, 254, 0.98)";
    header.style.borderBottomColor = "rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(254, 254, 254, 0.95)";
    header.style.borderBottomColor = "rgba(0, 0, 0, 0.05)";
  }
});

// スクロールアニメーション
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// 監視対象の要素を追加
document.querySelectorAll(".fade-in").forEach((el) => {
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
window.addEventListener("scroll", updateOnScroll);

// 円グラフの初期化
document.addEventListener("DOMContentLoaded", function () {
  // モバイルメニューの制御
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // メニューリンクをクリックしたらメニューを閉じる
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // 外側をクリックしたらメニューを閉じる
    document.addEventListener("click", function(event) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnMenuBtn && navLinks.classList.contains("active")) {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
  // 共通の色パレット
  const colors = ["#d4847a", "#e8a085", "#f4d4c7", "#c7725f", "#b8634d"];

  // 中央にテキストを表示するプラグイン
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: function (chart) {
      if (chart.config.options.plugins.centerText) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;

        ctx.restore();
        const fontSize = (height / 200).toFixed(2);
        ctx.font = `600 ${fontSize}em Zen Maru Gothic, sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#666";

        const text = chart.config.options.plugins.centerText.text;
        const chartArea = chart.chartArea;
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const textX = Math.round(centerX - ctx.measureText(text).width / 2);
        const textY = centerY;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    },
  };

  Chart.register(centerTextPlugin);

  // Backend Development チャート
  const backendCtx = document.getElementById("backendChart");
  if (backendCtx) {
    new Chart(backendCtx, {
      type: "doughnut",
      data: {
        labels: ["PHP(Laravel)", "Ruby(Ruby on Rails)"],
        datasets: [
          {
            data: [65, 35],
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          centerText: {
            text: "2016〜",
          },
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              font: {
                size: 12,
                family: "Zen Maru Gothic",
              },
            },
          },
        },
      },
    });
  }

  // Frontend Development チャート
  const frontendCtx = document.getElementById("frontendChart");
  if (frontendCtx) {
    new Chart(frontendCtx, {
      type: "doughnut",
      data: {
        labels: ["TypeScript(Angular)", "JavaScript(jQuery)", "HTML/CSS"],
        datasets: [
          {
            data: [40, 30, 30],
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          centerText: {
            text: "2017〜",
          },
          legend: {
            position: "bottom",
            labels: {
              padding: 16,
              font: {
                size: 12,
                family: "Zen Maru Gothic",
              },
            },
          },
        },
      },
    });
  }

  // Mobile Development チャート
  const mobileCtx = document.getElementById("mobileChart");
  if (mobileCtx) {
    new Chart(mobileCtx, {
      type: "doughnut",
      data: {
        labels: ["Flutter"],
        datasets: [
          {
            data: [100],
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          centerText: {
            text: "2023〜",
          },
          legend: {
            position: "bottom",
            labels: {
              padding: 50,
              font: {
                size: 12,
                family: "Zen Maru Gothic",
              },
            },
          },
        },
      },
    });
  }
});
