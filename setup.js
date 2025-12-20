const fs = require('fs');
const path = require('path');

// ==========================================
// 1. DEFINISI DATA RAW (Untuk dipecah nanti)
// ==========================================
const rawCases = [
    {
        id: "case1",
        number: "Case Study 1",
        title: "Pola Spasial Kualitas Udara (2025-2050)",
        icon: "fas fa-wind",
        visualTitle: "Visualisasi Pola Spasial Kualitas Udara",
        visualDesc: "Peningkatan kualitas udara 2025-2050",
        content: `<p>Analisis ini mengungkap pola peningkatan kualitas udara di area kecil selama periode 25 tahun. Data menunjukkan bahwa area dengan kode <strong>E01000001</strong> (City of London) mengalami peningkatan kualitas udara sebesar <strong>1.216085</strong> dalam skala manfaat kumulatif.</p>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-chart-line"></i><span>Tren Kunci</span></div>
            <p>Kualitas udara meningkat secara konsisten dari 0.003375 di tahun 2025 menjadi 0.078011 di tahun 2050. Peningkatan paling signifikan terjadi antara tahun 2027-2032 dengan pertumbuhan lebih dari 300%.</p>
        </div>
        <p>Visualisasi peta menunjukkan area dengan peningkatan tertinggi terkonsentrasi di pusat kota, mengindikasikan efektivitas kebijakan transportasi rendah emisi dan zona udara bersih yang diterapkan di wilayah perkotaan.</p>`
    },
    {
        id: "case2",
        number: "Case Study 2",
        title: "Dampak Kebijakan Transportasi pada Kemacetan",
        icon: "fas fa-traffic-light",
        visualTitle: "Tren Kemacetan 2025-2050",
        visualDesc: "Perubahan tingkat kemacetan di area kecil",
        content: `<p>Data kemacetan menunjukkan pola yang menarik: manfaat positif di awal periode (2025-2030) berubah menjadi dampak negatif setelah tahun 2040. Area <strong>E01000001</strong> mengalami penurunan kemacetan sebesar <strong>-0.369011</strong> secara kumulatif.</p>
        <table class="data-table">
            <thead><tr><th>Tahun</th><th>Nilai Kemacetan</th><th>Perubahan</th></tr></thead>
            <tbody>
                <tr><td>2025</td><td>0.005570</td><td>+</td></tr>
                <tr><td>2030</td><td>0.014798</td><td>+165.7%</td></tr>
                <tr><td>2040</td><td>-0.029961</td><td>-302.5%</td></tr>
                <tr><td>2050</td><td>-0.048975</td><td>-979.3%</td></tr>
            </tbody>
        </table>
        <p>Perubahan dari positif ke negatif ini mengindikasikan bahwa kebijakan transportasi berkelanjutan mulai menunjukkan efek signifikan setelah 15 tahun implementasi.</p>`
    },
    {
        id: "case3",
        number: "Case Study 3",
        title: "Dampak Kelembapan pada Kesehatan Perumahan",
        icon: "fas fa-tint",
        visualTitle: "Tingkat Kelembapan 2025-2050",
        visualDesc: "Dampak kelembapan pada kesehatan perumahan",
        content: `<p>Analisis kelembapan (dampness) menunjukkan nilai yang relatif kecil namun konsisten selama periode 25 tahun. Area <strong>E01000001</strong> memiliki dampak kumulatif hanya <strong>0.001297</strong>.</p>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-home"></i><span>Insight Penting</span></div>
            <p>Nilai kelembapan yang stabil dan rendah menunjukkan efektivitas standar bangunan dan regulasi ventilasi yang telah diterapkan di area perkotaan.</p>
        </div>
        <p>Data ini penting untuk mengalokasikan sumber daya perbaikan perumahan secara efektif, dengan fokus pada area yang memiliki nilai kelembapan lebih tinggi berdasarkan data lookup populasi dan rumah tangga.</p>`
    },
    {
        id: "case4",
        number: "Case Study 4",
        title: "Perubahan Pola Diet dan Dampak Kesehatan",
        icon: "fas fa-apple-alt",
        visualTitle: "Perubahan Pola Diet 2027-2050",
        visualDesc: "Dampak positif perubahan pola makan",
        content: `<p>Data perubahan diet menunjukkan peningkatan signifikan mulai tahun 2027, dengan nilai kumulatif <strong>0.128954</strong> untuk area <strong>E01000001</strong>. Ini mencerminkan efektivitas program kesehatan masyarakat dan kesadaran nutrisi.</p>
        <p>Pola yang menarik: setelah peningkatan awal di tahun 2027-2028, terjadi penurunan bertahap namun stabil hingga tahun 2050. Hal ini mungkin mengindikasikan bahwa:</p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li>Intervensi awal sangat efektif</li>
            <li>Perubahan perilaku membutuhkan penguatan berkelanjutan</li>
            <li>Faktor eksternal (seperti harga makanan sehat) mempengaruhi pola konsumsi</li>
        </ul>`
    },
    {
        id: "case5",
        number: "Case Study 5",
        title: "Dampak Dingin Berlebih pada Kesehatan",
        icon: "fas fa-snowflake",
        visualTitle: "Dampak Dingin Berlebih 2025-2050",
        visualDesc: "Tren peningkatan risiko kesehatan terkait suhu dingin",
        content: `<p>Dampak dingin berlebih (excess cold) menunjukkan pola peningkatan yang stabil dari waktu ke waktu, dengan nilai kumulatif <strong>0.024851</strong> untuk area <strong>E01000001</strong>.</p>
        <table class="data-table">
            <thead><tr><th>Periode</th><th>Nilai Rata-rata</th><th>Interpretasi</th></tr></thead>
            <tbody>
                <tr><td>2025-2030</td><td>0.000032</td><td>Dampak minimal</td></tr>
                <tr><td>2031-2040</td><td>0.000512</td><td>Peningkatan signifikan</td></tr>
                <tr><td>2041-2050</td><td>0.001865</td><td>Dampak tinggi, perlu intervensi</td></tr>
            </tbody>
        </table>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-thermometer-empty"></i><span>Rekomendasi Kebijakan</span></div>
            <p>Peningkatan dampak dingin berlebih menunjukkan kebutuhan akan program retrofit perumahan dan subsidi energi yang ditargetkan.</p>
        </div>`
    },
    {
        id: "case6",
        number: "Case Study 6",
        title: "Analisis Perbandingan antar Jenis Co-Benefit",
        icon: "fas fa-balance-scale",
        visualTitle: "Perbandingan Co-Benefit",
        visualDesc: "Analisis komparatif dampak berbagai kebijakan",
        content: `<p>Dengan membandingkan kelima jenis co-benefit, kita dapat mengidentifikasi prioritas kebijakan berdasarkan efektivitas dan dampak kumulatif:</p>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li><strong>Kualitas Udara</strong> (1.216085) - Dampak tertinggi</li>
            <li><strong>Perubahan Diet</strong> (0.128954) - Dampak signifikan</li>
            <li><strong>Dingin Berlebih</strong> (0.024851) - Meningkat, perlu perhatian</li>
            <li><strong>Kelembapan</strong> (0.001297) - Dampak minimal</li>
            <li><strong>Kemacetan</strong> (-0.369011) - Dampak negatif, sukses kebijakan</li>
        </ol>
        <p>Analisis ini menunjukkan bahwa kebijakan lingkungan dan transportasi memiliki dampak paling signifikan, sementara isu perumahan (kelembapan) relatif terkendali.</p>`
    },
    {
        id: "case7",
        number: "Case Study 7",
        title: "Korelasi antara Kepadatan Populasi dan Dampak Co-Benefit",
        icon: "fas fa-map-marked-alt",
        visualTitle: "Peta Kepadatan dan Dampak",
        visualDesc: "Visualisasi korelasi spasial populasi dan co-benefit",
        content: `<p>Dengan menggabungkan data level 2 dengan data lookup (populasi dan rumah tangga), kita dapat menganalisis korelasi antara kepadatan populasi dan efektivitas berbagai kebijakan co-benefit.</p>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-users"></i><span>Temuan Utama</span></div>
            <p>Area dengan kepadatan populasi tinggi (seperti City of London) menunjukkan respons lebih baik terhadap kebijakan kualitas udara dan transportasi.</p>
        </div>
        <p>Analisis spatial menggunakan shapefile mengungkapkan pola kluster di mana area dengan karakteristik demografis serupa menunjukkan pola dampak co-benefit yang mirip.</p>`
    },
    {
        id: "case8",
        number: "Case Study 8",
        title: "Analisis Temporal: Perubahan Dampak dari Waktu ke Waktu",
        icon: "fas fa-chart-area",
        visualTitle: "Analisis Temporal Co-Benefit",
        visualDesc: "Perubahan dampak dari 2025 hingga 2050",
        content: `<p>Analisis temporal mengungkapkan bagaimana dampak berbagai kebijakan berubah selama 25 tahun:</p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li><strong>2025-2035</strong>: Periode implementasi awal dengan pertumbuhan dampak yang variatif</li>
            <li><strong>2035-2045</strong>: Periode stabilisasi di mana sebagian besar kebijakan mencapai efektivitas optimal</li>
            <li><strong>2045-2050</strong>: Periode matang dengan dampak yang konsisten atau sedikit menurun</li>
        </ul>
        <p>Pola temporal ini mengindikasikan bahwa kebijakan membutuhkan waktu 10-15 tahun untuk mencapai dampak maksimal dan beberapa kebijakan menunjukkan efek J-curve.</p>`
    },
    {
        id: "case9",
        number: "Case Study 9",
        title: "Identifikasi Area Prioritas untuk Intervensi Kebijakan",
        icon: "fas fa-bullseye",
        visualTitle: "Peta Prioritas Intervensi",
        visualDesc: "Identifikasi area untuk intervensi berbasis data",
        content: `<p>Berdasarkan analisis gabungan dari data level 2, lookup, dan shapefile, kita dapat mengidentifikasi area prioritas untuk berbagai jenis intervensi kebijakan:</p>
        <table class="data-table">
            <thead><tr><th>Jenis Intervensi</th><th>Area Prioritas</th><th>Indikator Kunci</th></tr></thead>
            <tbody>
                <tr><td>Kualitas Udara</td><td>Pusat Kota</td><td>Kepadatan tinggi</td></tr>
                <tr><td>Kemacetan</td><td>Koridor Transportasi</td><td>Pola komuter</td></tr>
                <tr><td>Kesehatan Perumahan</td><td>Perumahan Tua</td><td>Tahun konstruksi</td></tr>
                <tr><td>Program Diet</td><td>Akses Terbatas</td><td>Jarak ke market</td></tr>
            </tbody>
        </table>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-bullseye"></i><span>Strategi Penargetan</span></div>
            <p>Data menunjukkan bahwa pendekatan "satu ukuran untuk semua" tidak efektif. Intervensi harus ditargetkan berdasarkan karakteristik spesifik area.</p>
        </div>`
    },
    {
        id: "case10",
        number: "Case Study 10",
        title: "Rekomendasi Kebijakan Integratif Berbasis Bukti",
        icon: "fas fa-handshake",
        visualTitle: "Kebijakan Integratif",
        visualDesc: "Pendekatan holistik untuk co-benefit maksimal",
        content: `<p>Berdasarkan analisis komprehensif 10 studi kasus, berikut rekomendasi kebijakan integratif:</p>
        <ol style="margin-left: 1.5rem; margin-bottom: 1.5rem;">
            <li><strong>Paket Kebijakan Terkoordinasi</strong>: Mengintegrasikan transportasi, udara, dan kesehatan.</li>
            <li><strong>Pendekatan Berbasis Area</strong>: Menggunakan data shapefile untuk konteks lokal.</li>
            <li><strong>Monitoring Real-time</strong>: Membangun sistem pemantauan berkelanjutan.</li>
            <li><strong>Alokasi Sumber Daya Dinamis</strong>: Menyesuaikan anggaran berdasarkan efektivitas.</li>
        </ol>
        <div class="highlight">
            <div class="highlight-title"><i class="fas fa-lightbulb"></i><span>Kesimpulan Utama</span></div>
            <p>Data menunjukkan bahwa pendekatan kebijakan yang terintegrasi dan berbasis bukti dapat menghasilkan co-benefit yang signifikan untuk kesehatan, lingkungan, dan kualitas hidup.</p>
        </div>`
    }
];

// ==========================================
// 2. KONTEN CSS & JS Client (Sama seperti sebelumnya)
// ==========================================
const cssContent = `
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
:root { --primary-color: #1a5276; --secondary-color: #58d68d; --accent-color: #f4d03f; --dark-color: #2c3e50; --light-color: #f8f9fa; --text-color: #333; --shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
body { background-color: #f5f7fa; color: var(--text-color); line-height: 1.6; overflow-x: hidden; }

/* Navigation */
.nav-container { position: fixed; top: 0; width: 100%; background-color: rgba(255, 255, 255, 0.95); box-shadow: var(--shadow); z-index: 1000; transition: all 0.3s ease; }
nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 5%; max-width: 1400px; margin: 0 auto; }
.logo { font-size: 1.8rem; font-weight: 700; color: var(--primary-color); display: flex; align-items: center; gap: 0.5rem; }
.logo i { color: var(--secondary-color); }
.nav-links { display: flex; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--dark-color); font-weight: 500; transition: color 0.3s; position: relative; }
.nav-links a:hover { color: var(--primary-color); }
.nav-links a::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background-color: var(--secondary-color); transition: width 0.3s; }
.nav-links a:hover::after { width: 100%; }

/* Hero Section */
.hero { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: linear-gradient(135deg, #1a5276 0%, #2c3e50 100%); color: white; padding: 0 5%; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; width: 300%; height: 300%; background: radial-gradient(circle, rgba(88, 214, 141, 0.1) 0%, transparent 70%); top: -100%; left: -100%; animation: pulse 20s infinite linear; }
@keyframes pulse { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.hero h1 { font-size: 3.5rem; margin-bottom: 1rem; z-index: 1; position: relative; }
.hero p { font-size: 1.2rem; max-width: 700px; margin-bottom: 2rem; z-index: 1; position: relative; opacity: 0.9; }
.hero .subtitle { font-size: 1.5rem; color: var(--secondary-color); margin-bottom: 0.5rem; }
.scroll-indicator { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; color: rgba(255, 255, 255, 0.7); animation: bounce 2s infinite; }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); } 40% { transform: translateX(-50%) translateY(-10px); } 60% { transform: translateX(-50%) translateY(-5px); } }

/* Case Sections */
.case-container { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
.case-section { padding: 100px 0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; position: relative; }
.case-number { font-size: 1rem; font-weight: 600; color: var(--secondary-color); margin-bottom: 0.5rem; letter-spacing: 2px; text-transform: uppercase; }
.case-title { font-size: 2.5rem; color: var(--primary-color); margin-bottom: 1.5rem; line-height: 1.2; }
.case-content { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
.case-text { font-size: 1.1rem; }
.case-text p { margin-bottom: 1.5rem; }

.case-visual { position: relative; height: 400px; border-radius: 10px; overflow: hidden; box-shadow: var(--shadow); background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.visual-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f8f9fa; color: #6c757d; }
.visual-placeholder i { font-size: 4rem; margin-bottom: 1rem; color: var(--primary-color); }

/* Data Table & Highlights */
.data-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); }
.data-table th { background-color: var(--primary-color); color: white; text-align: left; padding: 12px 15px; font-weight: 600; }
.data-table td { padding: 10px 15px; border-bottom: 1px solid #e0e0e0; }
.data-table tr:nth-child(even) { background-color: #f8f9fa; }
.data-table tr:hover { background-color: #e8f4f8; }
.highlight { background-color: rgba(88, 214, 141, 0.1); border-left: 4px solid var(--secondary-color); padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 5px 5px 0; }
.highlight-title { font-weight: 600; color: var(--primary-color); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }

/* Sticky Navigation Dots */
.nav-dots { position: fixed; right: 30px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 15px; z-index: 999; }
.dot { width: 12px; height: 12px; border-radius: 50%; background-color: rgba(44, 62, 80, 0.3); cursor: pointer; transition: all 0.3s; position: relative; }
.dot.active { background-color: var(--secondary-color); transform: scale(1.3); }
.dot:hover::after { content: attr(data-label); position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background-color: var(--dark-color); color: white; padding: 5px 10px; border-radius: 4px; font-size: 0.8rem; white-space: nowrap; }

/* Footer */
footer { background-color: var(--dark-color); color: white; padding: 4rem 5% 2rem; margin-top: 4rem; }
.footer-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
.footer-section h3 { font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--secondary-color); }
.footer-section p { opacity: 0.8; margin-bottom: 1rem; }
.footer-bottom { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); opacity: 0.7; font-size: 0.9rem; }

/* Responsive & Animation */
@media (max-width: 992px) { .case-content { grid-template-columns: 1fr; gap: 2rem; } .hero h1 { font-size: 2.8rem; } .footer-content { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { nav { flex-direction: column; gap: 1rem; padding: 1rem; } .nav-links { gap: 1rem; } .hero h1 { font-size: 2.2rem; } .case-title { font-size: 2rem; } .case-section { padding: 80px 0; } .nav-dots { right: 15px; } .footer-content { grid-template-columns: 1fr; } }
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.8s, transform 0.8s; } .fade-in.visible { opacity: 1; transform: translateY(0); }
.slide-in-left { opacity: 0; transform: translateX(-50px); transition: opacity 0.8s, transform 0.8s; } .slide-in-left.visible { opacity: 1; transform: translateX(0); }
.slide-in-right { opacity: 0; transform: translateX(50px); transition: opacity 0.8s, transform 0.8s; } .slide-in-right.visible { opacity: 1; transform: translateX(0); }
`;

const jsContent = `
document.addEventListener('DOMContentLoaded', () => {
    // Observer setup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));
    
    // Navigation Dots & Scroll Logic
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.dot');
    
    function updateActiveDot() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) currentSection = section.getAttribute('id');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-target') === currentSection) dot.classList.add('active');
        });
    }

    // Event Listeners
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.getElementById(dot.getAttribute('data-target'));
            if(target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        });
    });
    
    window.addEventListener('scroll', () => {
        updateActiveDot();
        const nav = document.querySelector('.nav-container');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    updateActiveDot();

    // Visual interactions
    document.querySelectorAll('.case-visual').forEach(visual => {
        visual.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'scale(1.2)';
        });
        visual.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) icon.style.transform = 'scale(1)';
        });
    });
});
`;

// ==========================================
// 3. KONTEN EJS
// ==========================================
const ejsContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analisis Co-Benefit Area Kecil 2025-2050</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="nav-container">
        <nav>
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                <span>Co-Benefit Analysis</span>
            </div>
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#case1">Case 1</a>
                <a href="#case5">Case 5</a>
                <a href="#case10">Case 10</a>
            </div>
        </nav>
    </div>
    
    <div class="nav-dots">
        <div class="dot active" data-label="Home" data-target="home"></div>
        <% cases.forEach(function(item) { %>
            <div class="dot" data-label="<%= item.number %>" data-target="<%= item.id %>"></div>
        <% }); %>
    </div>
    
    <section class="hero" id="home">
        <h1 class="fade-in">Analisis Co-Benefit Area Kecil</h1>
        <p class="subtitle fade-in">2025 - 2050</p>
        <p class="fade-in">Visualisasi interaktif dari 10 studi kasus berdasarkan data level 2, shapefile, dan lookup untuk memahami dampak kebijakan lingkungan di area kecil Inggris dan Wales.</p>
        <div class="scroll-indicator">
            <span>Scroll untuk menjelajahi</span>
            <i class="fas fa-chevron-down"></i>
        </div>
    </section>
    
    <div class="case-container">
        <% cases.forEach(function(item, index) { 
            // Logic untuk zig-zag layout (text kiri vs kanan)
            let isEven = index % 2 === 0;
            let textAnim = isEven ? 'slide-in-left' : 'slide-in-right';
            let visualAnim = isEven ? 'slide-in-right' : 'slide-in-left';
        %>
        <section class="case-section" id="<%= item.id %>">
            <div class="case-number"><%= item.number %></div>
            <h2 class="case-title"><%= item.title %></h2>
            
            <div class="case-content">
                <% if (isEven) { %>
                    <div class="case-text <%= textAnim %>">
                        <%- item.content %>
                    </div>
                    <div class="case-visual <%= visualAnim %>">
                        <div class="visual-placeholder">
                            <i class="<%= item.icon %>"></i>
                            <h3><%= item.visualTitle %></h3>
                            <p><%= item.visualDesc %></p>
                        </div>
                    </div>
                <% } else { %>
                    <div class="case-visual <%= visualAnim %>">
                        <div class="visual-placeholder">
                            <i class="<%= item.icon %>"></i>
                            <h3><%= item.visualTitle %></h3>
                            <p><%= item.visualDesc %></p>
                        </div>
                    </div>
                    <div class="case-text <%= textAnim %>">
                        <%- item.content %>
                    </div>
                <% } %>
            </div>
        </section>
        <% }); %>
    </div>
    
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Tentang Analisis Ini</h3>
                <p>Visualisasi interaktif ini didasarkan pada analisis data co-benefit area kecil di Inggris dan Wales untuk periode 2025-2050.</p>
            </div>
            <div class="footer-section">
                <h3>Metodologi</h3>
                <p>Analisis dilakukan menggunakan Python dengan library Pandas, GeoPandas, dan Matplotlib untuk pemrosesan data dan visualisasi awal.</p>
            </div>
            <div class="footer-section">
                <h3>Kontak</h3>
                <p>Visualisasi ini dibuat untuk tujuan edukasi dan perencanaan kebijakan berbasis bukti.</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Analisis Co-Benefit Area Kecil.</p>
        </div>
    </footer>
    
    <script src="/js/script.js"></script>
</body>
</html>`;

// ==========================================
// 4. KONTEN SERVER (App.js)
// ==========================================
// Perhatikan: require('./data') secara otomatis mencari index.js dalam folder tersebut
const serverContent = `
const express = require('express');
const path = require('path');
const casesData = require('./data'); // Akan membaca data/index.js

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { cases: casesData });
});

app.listen(PORT, () => {
    console.log(\`Server is running at http://localhost:\${PORT}\`);
});
`;

// ==========================================
// 5. PEMBUAT KONTEN DATA INDEX
// ==========================================
// Ini membuat file data/index.js yang menggabungkan 10 file tersebut
function generateIndexContent(count) {
    let imports = "";
    let exportsList = "";
    
    for (let i = 1; i <= count; i++) {
        imports += `const case${i} = require('./case${i}');\n`;
        exportsList += `case${i}, `;
    }
    
    return `${imports}\nmodule.exports = [${exportsList}];`;
}

// ==========================================
// FUNGSI EKSEKUSI
// ==========================================
async function runSetup() {
    try {
        console.log("🚀 Memulai proses setup multi-file...");

        // 1. Buat folder
        const dirs = ['views', 'public/css', 'public/js', 'data'];
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        });

        // 2. Tulis File Statis (CSS, JS, EJS, Server)
        fs.writeFileSync('public/css/style.css', cssContent);
        fs.writeFileSync('public/js/script.js', jsContent);
        fs.writeFileSync('views/index.ejs', ejsContent);
        fs.writeFileSync('app.js', serverContent);

        // 3. LOOP: Tulis 10 File Kasus
        console.log("📂 Membuat file data terpisah...");
        rawCases.forEach((item, index) => {
            const fileName = `case${index + 1}.js`;
            const filePath = path.join('data', fileName);
            
            // Format konten file individual
            const fileContent = `module.exports = ${JSON.stringify(item, null, 4)};`;
            
            fs.writeFileSync(filePath, fileContent);
            console.log(`   ✅ ${fileName}`);
        });

        // 4. Tulis File Aggregator (index.js di dalam folder data)
        const indexDataContent = generateIndexContent(rawCases.length);
        fs.writeFileSync('data/index.js', indexDataContent);
        console.log("   ✅ index.js (Aggregator)");

        console.log("\n🎉 Selesai! Struktur file data Anda sekarang:");
        console.log("   /data");
        console.log("     ├── case1.js");
        console.log("     ├── case2.js");
        console.log("     ├── ... (sampai case10)");
        console.log("     └── index.js");
        console.log("\nSilakan jalankan: node app.js");

    } catch (err) {
        console.error("❌ Error:", err);
    }
}

runSetup();