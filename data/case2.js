// File: data/case2.js

module.exports = {
  id: "case2",
  number: "Case Study 2",
  title: "Akumulasi Manfaat Udara (Area Chart)",
  icon: "fas fa-chart-area",

  visualTitle: "Tren Kumulatif",
  visualDesc: "Pertumbuhan manfaat hingga 2050",

  // HAPUS bagan chart dari sini, biarkan hanya teks saja
  content: `
        <p>Analisis tren kumulatif menjawab pertanyaan penting: <em>"Kapan dampaknya mulai terasa?"</em></p>
        
        <div class="highlight">
            <div class="highlight-title">
                <i class="fas fa-chart-line"></i>
                <span>Lonjakan Manfaat</span>
            </div>
            <p>Grafik di samping menunjukkan akumulasi manfaat moneter (£ Miliar) yang tumbuh secara eksponensial seiring berjalannya waktu.</p>
        </div>

        <p style="margin-top: 1.5rem; font-size: 0.9rem; color: #666;">
            *Grafik menunjukkan total akumulasi nilai manfaat (Cumulative Sum) dari tahun ke tahun. Area yang terisi merepresentasikan total nilai yang tersimpan.
        </p>
    `,
};
