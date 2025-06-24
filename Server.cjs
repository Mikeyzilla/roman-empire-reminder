const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});

const db = new sqlite3.Database("C://Users//mikej//Desktop//romanEmpire.db", (err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
});

app.post('/register', async (req, res) => {
        const { username, password } = req.body;
        
});

app.post('/login', (req, res) => {
        const { username, password } = req.body;

});