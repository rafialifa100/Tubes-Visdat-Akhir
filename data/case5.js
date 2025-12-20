// File: data/case5.js
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'json', 'case5_noise_distribution.json');
let boxplotData = null;

function getQuantile(array, quantile) {
    const index = (array.length - 1) * quantile;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    if (upper === lower) return array[index];
    return (1 - weight) * array[lower] + weight * array[upper];
}

try {
    if (fs.existsSync(jsonPath)) {
        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const cleanText = rawData.replace(/:\s*NaN/g, ': null');
        const jsonData = JSON.parse(cleanText);
        
        // Filter & Sort
        let values = (jsonData.values || []).filter(v => v !== null && v >= 0);
        values.sort((a, b) => a - b);

        if (values.length > 0) {
            // 1. Hitung Statistik Dasar
            const min = values[0];
            const q1 = getQuantile(values, 0.25);
            const median = getQuantile(values, 0.50);
            const q3 = getQuantile(values, 0.75);
            const max = values[values.length - 1];

            // 2. Hitung IQR untuk menentukan Outliers
            const iqr = q3 - q1;
            const upperFence = q3 + (1.5 * iqr);
            const lowerFence = q1 - (1.5 * iqr);

            // 3. Ambil Outliers (Data di luar batas fence)
            // Kita limit maksimal 500 outliers agar browser tidak crash/berat
            const outliers = values.filter(v => v > upperFence || v < lowerFence);
            
            // Sampling outliers jika terlalu banyak (> 500)
            const finalOutliers = outliers.length > 500 
                ? outliers.filter((_, i) => i % Math.ceil(outliers.length / 500) === 0)
                : outliers;

            boxplotData = {
                min: min,
                q1: q1,
                median: median,
                q3: q3,
                max: max,
                outliers: finalOutliers // KIRIM DATA OUTLIERS
            };
        }
    }
} catch (err) {
    console.error("Error processing Case 5:", err);
}

module.exports = {
    id: "case5",
    number: "Case Study 5",
    title: "Apakah Manfaatnya Merata? (Boxplot)",
    icon: "fas fa-chart-bar",
    
    visualTitle: "Distribusi Manfaat Kebisingan",
    visualDesc: "Rentang nilai minimum ke maksimum",

    chartData: boxplotData,

    content: `
        <p>Visualisasi <strong>Boxplot</strong> ini merangkum sebaran data menjadi 5 statistik utama.</p>
        
        <div class="highlight">
            <div class="highlight-title">
                <i class="fas fa-ruler-horizontal"></i>
                <span>Interpretasi Outliers</span>
            </div>
            <p>Titik-titik yang muncul di sebelah kanan adalah <strong>Outliers</strong>. Mereka mewakili area "Hotspot" yang mendapatkan manfaat penurunan kebisingan jauh di atas rata-rata area lain.</p>
        </div>

        <p style="margin-top: 1rem;">
            Karena kotak (median) berada sangat rendah (dekat 0), keberadaan banyak outliers ini mengonfirmasi ketimpangan ekstrem: sedikit area untung besar, mayoritas area untung kecil.
        </p>
    `
};