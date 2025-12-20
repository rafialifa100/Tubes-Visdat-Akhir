document.addEventListener("DOMContentLoaded", () => {
  // Observer setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    .forEach((el) => observer.observe(el));

  // Navigation Dots & Scroll Logic
  const sections = document.querySelectorAll("section");
  const dots = document.querySelectorAll(".dot");

  function updateActiveDot() {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200)
        currentSection = section.getAttribute("id");
    });
    dots.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-target") === currentSection)
        dot.classList.add("active");
    });
  }

  // ... kode observer dan navigasi yang sudah ada ...

  // --- LOGIKA KHUSUS CASE 2 (CHART.JS) ---
  const case2Canvas = document.getElementById("case2Chart");
  if (case2Canvas && typeof Chart !== "undefined") {
    const years = JSON.parse(case2Canvas.dataset.years);
    const values = JSON.parse(case2Canvas.dataset.values);

    new Chart(case2Canvas, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Cumulative Benefit (£ Million)",
            data: values,
            borderColor: "#1a5276", // Warna Garis (Primary Color)
            backgroundColor: "rgba(88, 214, 141, 0.5)", // Warna Area (Secondary Color + transparan)
            borderWidth: 2,
            fill: true, // Mengaktifkan Area Chart
            tension: 0.4, // Membuat garis sedikit melengkung (smooth)
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "£ Million",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // ... kode Case 2 sebelumnya ...

  // --- LOGIKA KHUSUS CASE 3 (BUBBLE CHART LOG SCALE) ---
  const case3Canvas = document.getElementById("case3Chart");
  if (case3Canvas && typeof Chart !== "undefined") {
    // Ambil data dari atribut data-points
    const chartData = JSON.parse(case3Canvas.dataset.points);

    new Chart(case3Canvas, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Area Kecil",
            data: chartData,
            backgroundColor: "rgba(26, 82, 118, 0.6)", // Primary Color Transparan
            borderColor: "#1a5276",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Pop: ${context.raw.x}, Benefit: ${context.raw.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            type: "logarithmic", // Fitur kunci Case 3
            title: {
              display: false,
              text: "Population (Log Scale)",
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Benefit / Capita",
            },
            ticks: {
              callback: function (value) {
                return value.toFixed(5); // Format angka desimal kecil
              },
            },
          },
        },
      },
    });
  }

  // Event Listeners
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.getAttribute("data-target"));
      if (target)
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target)
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    updateActiveDot();
    const nav = document.querySelector(".nav-container");
    if (window.scrollY > 100) {
      nav.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      nav.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    } else {
      nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    }
  });

  updateActiveDot();

  // Visual interactions
  document.querySelectorAll(".case-visual").forEach((visual) => {
    visual.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i");
      if (icon) icon.style.transform = "scale(1.2)";
    });
    visual.addEventListener("mouseleave", function () {
      const icon = this.querySelector("i");
      if (icon) icon.style.transform = "scale(1)";
    });
  });
});
