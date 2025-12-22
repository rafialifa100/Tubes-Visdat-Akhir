// File: data/case1.js

module.exports = {
  id: "case1",
  number: "Case Study 1",
  title: "KPI Kualitas Udara & Progress (2025-2050)",
  icon: "fas fa-wind",

  // Update bagian visual title sesuai data Python
  visualTitle: "Progress Udara Bersih",
  visualDesc: "Total Benefit: £48,259.41",
  chartData: {
    airQuality: 48259.41,
    otherBenefits: 242456.20, 
    percentage: 16.6
  },

  content: `
        <p>Analisis terbaru menunjukkan total manfaat kualitas udara yang signifikan.</p>
        
        <div class="highlight" style="background: rgba(26, 82, 118, 0.1); border-left-color: #1a5276;">
            <div class="highlight-title">
                <i class="fas fa-money-bill-wave"></i>
                <span>Total Air Quality Benefit</span>
            </div>
            <p style="font-size: 2rem; font-weight: bold; color: #1a5276; margin: 10px 0;">
                £48,259.41
            </p>
            <p style="font-size: 0.9rem; opacity: 0.8;">Akumulasi manfaat moneter hingga tahun 2050.</p>
        </div>

        <p style="margin-top: 1.5rem;">
            Angka ini menjawab pertanyaan: <em>"Apakah perubahan itu nyata?"</em>. 
            Dengan capaian <strong>16.6%</strong> dari total target, intervensi kualitas udara menunjukkan dampak awal yang positif namun memerlukan eskalasi kebijakan untuk mencapai target penuh di 2050.
        </p>
    `,
};
