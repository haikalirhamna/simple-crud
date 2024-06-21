// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

// Database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API get data
app.get('/api/items', (req, res) => {
    connection.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// API post data 
app.post('/api/items', (req, res) => {
    const { nim, name } = req.body;
    connection.query('INSERT INTO items (nim, name) VALUES (?, ?)', [nim, name], (err) => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

// API delete data 
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.sendStatus(204);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});