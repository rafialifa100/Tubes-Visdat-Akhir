module.exports = {
    "id": "case9",
    "number": "Case Study 9",
    "title": "Peta Sebaran Dampak (High Impact Areas)",
    "icon": "fas fa-map-marked-alt",
    "visualTitle": "5 Area dengan Dampak Tertinggi",
    "visualDesc": "Lingkaran hijau menunjukkan besaran akumulasi benefit",
    "content": `<p>Pertanyaan: <em>"Di mana dampak terbesar terjadi?"</em></p>
        <p>Analisis geospasial mengidentifikasi "hotspots" atau titik panas di mana intervensi memberikan hasil maksimal. Peta di samping menyoroti 5 area teratas (Top 5 Small Areas).</p>
        <div class="highlight" style="border-left-color: #2e7d32; background-color: rgba(46, 125, 50, 0.1);">
            <div class="highlight-title" style="color: #2e7d32;"><i class="fas fa-globe-europe"></i><span>Top Performer: Ceredigion (Wales)</span></div>
            <p>Area di <strong> Ceredigion </strong> mencatat total co-benefit tertinggi sebesar <strong>£141.9 Juta</strong>. Area lain yang signifikan meliputi Barnet, Three Rivers, Bristol, dan Tandridge.</p>
        </div>
        <p>Informasi spasial ini krusial untuk <em>Place-Based Policy</em>, memastikan sumber daya dialokasikan ke lokasi yang paling responsif terhadap intervensi.</p>`,
    "chartData": [
        { "small_area": "W01002002", "local_authority": "Ceredigion", "sum": 141.96, "lat": 52.1661, "lon": -4.3133 },
        { "small_area": "E01000253", "local_authority": "Barnet", "sum": 90.15, "lat": 51.6507, "lon": -0.2358 },
        { "small_area": "E01023839", "local_authority": "Three Rivers", "sum": 88.76, "lat": 51.6233, "lon": -0.4244 },
        { "small_area": "E01014714", "local_authority": "Bristol", "sum": 88.50, "lat": 51.4796, "lon": -2.6301 },
        { "small_area": "E01030831", "local_authority": "Tandridge", "sum": 87.72, "lat": 51.2644, "lon": 0.0036 }
    ]
};
