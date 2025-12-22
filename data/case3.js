const fs = require("fs");
const path = require("path");

// --- BAGIAN PERBAIKAN ---
// Kita baca file sebagai text dulu untuk membersihkan "NaN"
// Tambahkan 'json' agar masuk ke folder tersebut
const jsonPath = path.join(__dirname, 'json', 'case3_population_weighted.json');
let allPoints = [];

try {
  const rawText = fs.readFileSync(jsonPath, "utf8");
  // Regex untuk mengganti ': NaN' (invalid) menjadi ': null' (valid)
  const cleanText = rawText.replace(/:\s*NaN/g, ": null");
  const jsonData = JSON.parse(cleanText);
  allPoints = jsonData.points || [];
} catch (error) {
  console.error("Gagal memproses data JSON:", error.message);
  allPoints = []; // Fallback agar tidak crash
}

// 2. Fungsi Helper: Sampling & Scaling
function getProcessedData(data, sampleSize = 20000) {
  // FILTER PENTING: Hapus data yang null (bekas NaN tadi)
  const validData = data.filter(
    (p) => p.population != null && p.per_capita != null && p.households != null
  );

  if (validData.length === 0) return [];

  // Ambil nilai max households untuk skala ukuran bubble
  const maxHouseholds = Math.max(...validData.map((p) => p.households));

  // Acak data (Shuffle)
  const shuffled = validData.sort(() => 0.5 - Math.random());

  // Ambil sebagian saja (slice)
  const selected = shuffled.slice(0, sampleSize);

  // Format sesuai kebutuhan Chart.js {x, y, r}
  return selected.map((p) => ({
    x: p.population,
    y: parseFloat(p.per_capita.toFixed(6)),
    // Skala radius: minimal 2px, maksimal 10px
    r: (p.households / maxHouseholds) * 8 + 2,
  }));
}

// Proses data
const chartData = getProcessedData(allPoints);

module.exports = {
  id: "case3",
  number: "Case Study 3",
  title: "Siapa yang Paling Merasakan? (Dot Plot)",
  icon: "fas fa-users",

  visualTitle: "Distribusi Populasi",
  visualDesc: "Kepadatan memperkuat dampak",

  // Kirim data yang sudah diproses
  chartData: chartData,

  content: `        
        <div class="highlight">
            <div class="highlight-title">
                <i class="fas fa-bullseye"></i>
                <span>Temuan Kunci</span>
            </div>
            <p>Terdapat korelasi positif yang kuat. Area dengan <strong>populasi lebih padat</strong> (diwakili oleh titik di sebelah kanan) cenderung menerima manfaat kualitas udara per kapita yang lebih tinggi.</p>
        </div>

        <p style="margin-top: 1rem;">
            Ukuran titik merepresentasikan jumlah rumah tangga. Pola "awan" yang naik ke kanan atas menunjukkan bahwa kebijakan ini secara efektif menargetkan pusat-pusat populasi dimana intervensi paling dibutuhkan.
        </p>
        <p style="font-size: 0.8rem; color: #888; margin-top: 10px;">
            *Menampilkan 2000 sampel titik data dari total ${allPoints.length.toLocaleString()} area untuk performa optimal.
        </p>
    `,
};
