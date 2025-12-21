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

  // ... logika Case 3 sebelumnya ...

    // --- LOGIKA KHUSUS CASE 4 (HORIZONTAL BAR CHART) ---
    const case4Canvas = document.getElementById('case4Chart');
    if (case4Canvas && typeof Chart !== 'undefined') {
        const labels = JSON.parse(case4Canvas.dataset.labels);
        const values = JSON.parse(case4Canvas.dataset.values);

        new Chart(case4Canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Value (£ Million)',
                    data: values,
                    backgroundColor: [
                        '#1a5276', // Juara 1 (Gelap)
                        '#2980b9',
                        '#3498db',
                        '#5dade2',
                        '#85c1e9',
                        '#aed6f1'  // Juara 6 (Terang)
                    ],
                    borderColor: '#154360',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // KUNCI: Membuat bar menjadi horizontal
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '£ ' + context.parsed.x.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Value (£)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // ... logika Case 4 sebelumnya ...

    // --- LOGIKA KHUSUS CASE 5 (BOXPLOT) ---
    const case5Canvas = document.getElementById('case5Chart');
    if (case5Canvas && typeof Chart !== 'undefined') {
        try {
            const rawData = case5Canvas.dataset.values;
            const stats = JSON.parse(rawData);

            new Chart(case5Canvas, {
                type: 'boxplot',
                data: {
                    labels: ['Noise Benefits'],
                    datasets: [{
                        label: 'Statistik Distribusi',
                        backgroundColor: 'rgba(231, 76, 60, 0.5)',
                        borderColor: '#c0392b',
                        borderWidth: 2,
                        
                        // --- SETTING AGAR OUTLIERS MUNCUL ---
                        outlierColor: '#e74c3c',  // Warna titik merah
                        outlierRadius: 3,         // Ukuran titik lebih besar
                        itemRadius: 3,            // Ukuran item
                        padding: 10,
                        // ------------------------------------

                        data: [stats] 
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y', 
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const r = context.raw;
                                    return `Min: ${r.min.toFixed(2)} | Q1: ${r.q1.toFixed(2)} | Med: ${r.median.toFixed(2)} | Q3: ${r.q3.toFixed(2)} | Max: ${r.max.toFixed(2)}`;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Nilai Manfaat (£)' },
                            min: 0
                        }
                    }
                }
            });
        } catch (e) {
            console.error("Gagal render Boxplot:", e);
        }
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

// --- LOGIKA KHUSUS CASE 6 (MULTI-LINE CHART) ---
    const case6Canvas = document.getElementById('case6Chart');
    if (case6Canvas && typeof Chart !== 'undefined') {
        const rawSeries = JSON.parse(case6Canvas.dataset.series);
        
        // Ambil label tahun dari salah satu kota (misal Birmingham)
        const years = Object.keys(rawSeries['Birmingham']);
        
        // Warna untuk setiap kota
        const colors = ['#3498db', '#e67e22', '#2ecc71', '#e74c3c', '#9b59b6'];
        
        // Buat dataset
        const datasets = Object.keys(rawSeries).map((city, index) => {
            return {
                label: city,
                data: Object.values(rawSeries[city]),
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length],
                borderWidth: 2,
                tension: 0.4, // Kurva halus
                pointRadius: 3,
                fill: false
            };
        });

        new Chart(case6Canvas, {
            type: 'line',
            data: {
                labels: years,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { boxWidth: 10, usePointStyle: true, font: { size: 10 } }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: £ ${context.raw.toFixed(4)} M`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Benefit (£ Million)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

// --- LOGIKA KHUSUS CASE 7 (NEGATIVE BAR CHART) ---
    const case7Canvas = document.getElementById('case7Chart');
    if (case7Canvas && typeof Chart !== 'undefined') {
        const labels = JSON.parse(case7Canvas.dataset.labels);
        const values = JSON.parse(case7Canvas.dataset.values);

        new Chart(case7Canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Negative Impact (£ Million)',
                    data: values,
                    backgroundColor: 'rgba(231, 76, 60, 0.6)', // Merah Transparan
                    borderColor: '#c0392b', // Merah Solid
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Horizontal Bar
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return new Intl.NumberFormat('en-GB', {
                                    style: 'currency', 
                                    currency: 'GBP'
                                }).format(context.raw) + ' Million';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Nilai Dampak (£ Million)'
                        },
                        // Memastikan sumbu X mengakomodasi nilai negatif
                        suggestedMin: Math.min(...values) * 1.1, 
                        grid: {
                            color: function(context) {
                                // Highlight garis 0 agar jelas perbatasannya
                                if (context.tick.value === 0) {
                                    return '#333';
                                }
                                return 'rgba(0,0,0,0.1)';
                            },
                            lineWidth: function(context) {
                                if (context.tick.value === 0) {
                                    return 2;
                                }
                                return 1;
                            }
                        }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

// --- LOGIKA KHUSUS CASE 8 (SLOPE GRAPH) ---
    const case8Canvas = document.getElementById('case8Chart');
    if (case8Canvas && typeof Chart !== 'undefined') {
        const rawData = JSON.parse(case8Canvas.dataset.slope);
        
        // Warna-warni untuk membedakan setiap garis (Palet warna distingtif)
        const colors = [
            '#e74c3c', '#8e44ad', '#3498db', '#1abc9c', 
            '#f1c40f', '#e67e22', '#2ecc71', '#34495e', '#95a5a6'
        ];

        // Transformasi data: Setiap item menjadi 1 dataset (garis)
        const datasets = rawData.map((item, index) => ({
            label: item.type,
            data: [item['2025'], item['2050']],
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length],
            tension: 0,       // Garis lurus (slope)
            borderWidth: 2,
            pointRadius: 6,   // Titik besar di ujung
            pointHoverRadius: 8
        }));

        new Chart(case8Canvas, {
            type: 'line',
            data: {
                labels: ['2025', '2050'], // Hanya 2 label X-axis
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right', // Legend di kanan agar tidak menumpuk
                        labels: { boxWidth: 10, font: { size: 10 } }
                    },
                    tooltip: {
                        mode: 'dataset',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: £ ${context.raw.toLocaleString()} M`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: { display: true, text: 'Value (£ Million)' },
                        grid: { color: '#f0f0f0' } // Grid tipis
                    },
                    x: {
                        offset: true, // Memberi jarak di kiri/kanan agar titik tidak terpotong
                        grid: {
                            display: false, // Hilangkan grid vertikal tengah
                            drawBorder: true
                        }
                    }
                }
            }
        });
    }

// --- LOGIKA KHUSUS CASE 10 (TOTAL COMPOSITION) ---
    const case10Canvas = document.getElementById('case10Chart');
    if (case10Canvas && typeof Chart !== 'undefined') {
        const labels = JSON.parse(case10Canvas.dataset.labels);
        const values = JSON.parse(case10Canvas.dataset.values);

        // Pewarnaan dinamis: Hijau jika positif, Merah jika negatif
        const colors = values.map(v => v >= 0 ? '#27ae60' : '#c0392b');

        new Chart(case10Canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Value (£ Million)',
                    data: values,
                    backgroundColor: colors,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return new Intl.NumberFormat('en-GB', {
                                    style: 'currency', currency: 'GBP'
                                }).format(context.raw) + ' Million';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: { size: 10 },
                            autoSkip: false, // Tampilkan semua label
                            maxRotation: 45, // Miringkan label agar muat
                            minRotation: 45
                        },
                        grid: { display: false }
                    },
                    y: {
                        title: { display: true, text: '£ Million' },
                        grid: { color: '#f0f0f0' },
                        // Garis 0 (Zero Line) yang tebal untuk memisahkan positif/negatif
                        grid: {
                            lineWidth: context => context.tick.value === 0 ? 2 : 1,
                            color: context => context.tick.value === 0 ? '#333' : 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
    }
