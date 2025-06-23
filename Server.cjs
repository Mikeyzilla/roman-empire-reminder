const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

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

app.get('/getReminder', (req, res) => {
    const { username } = req.query;

});

app.post('/setReminder', (req, res) => {
    const { reminderTime } = req.body;

})

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});