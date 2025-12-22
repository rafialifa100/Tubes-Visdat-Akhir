const express = require('express');
const path = require('path');

// Import Data Kasus (case 1 - 10)
const casesData = require('./data'); 

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Kita langsung hardcode angka total data di sini
    res.render('index', { 
        cases: casesData,
        stats: {
            totalData: 557113, // Angka manual (Total dataset Case 1-10)
            years: "2025 - 2050",
            totalCases: casesData.length,
            region: "Inggris & Wales"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});