const fs = require('fs');
const path = require('path');

// 1. Baca data JSON
const jsonPath = path.join(__dirname, 'json', 'case4_ranking.json');
let topBenefits = [];

try {
    if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const jsonData = JSON.parse(rawData);

        // Ambil data ranking
        const ranking = jsonData.ranking || [];

        // Ambil Top 6 Saja
        topBenefits = ranking.slice(0, 6).map(item => {
            // Handle kunci yang mungkin berbeda (underscore vs dash)
            const rawLabel = item.co_benefit_type || item['co-benefit_type'] || "Unknown";

            return {
                label: rawLabel
                    .replace(/_/g, ' ')
                    .replace(/-/g, ' ') // jaga-jaga kalau ada dash
                    .replace(/\b\w/g, l => l.toUpperCase()), // Title Case
                value: parseFloat((item.sum || 0).toFixed(2))
            };
        });
    } else {
        console.warn("Warning: File case4_ranking.json tidak ditemukan. Menggunakan data dummy.");
        // Data dummy agar tidak crash jika file belum ada
        topBenefits = [
            { label: "Data Missing", value: 0 }
        ];
    }

} catch (err) {
    console.error("Error reading Case 4 data:", err);
    // Fallback data
    topBenefits = [];
}

module.exports = {
    id: "case4",
    number: "Case Study 4",
    title: "Mana Manfaat Terbesar? (Ranked Bar)",
    icon: "fas fa-trophy",

    visualTitle: "Peringkat Co-Benefit",
    visualDesc: "Top 6 kontributor nilai manfaat",

    // Kirim data chart ke frontend
    chartData: {
        labels: topBenefits.map(b => b.label),
        values: topBenefits.map(b => b.value)
    },

    content: `
        <p>Analisis peringkat ini menjawab pertanyaan fundamental: <strong>"Mana manfaat terbesar?"</strong></p>

        <div class="highlight">
            <div class="highlight-title">
                <i class="fas fa-medal"></i>
                <span>Juara Utama: Physical Activity</span>
            </div>
            <p>Data menunjukkan bahwa <strong>Aktivitas Fisik</strong> memberikan nilai manfaat moneter terbesar, jauh melampaui Kualitas Udara dan Kebisingan.</p>
        </div>

        <p style="margin-top: 1rem;">
            Dominasi manfaat aktivitas fisik menggarisbawahi pentingnya infrastruktur yang mendorong gaya hidup aktif (berjalan kaki & bersepeda) sebagai strategi kesehatan publik yang paling bernilai tinggi.
        </p>
    `
};