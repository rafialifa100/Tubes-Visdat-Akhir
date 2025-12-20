
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
    console.log(`Server is running at http://localhost:${PORT}`);
});
