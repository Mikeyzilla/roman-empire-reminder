const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

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

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        try {
            
            const hashedPassword = await bcrypt.hash(password, 10);

            const insertQuery = `
                INSERT INTO romanEmpire (userName, password, reminderTime)
                VALUES (?, ?, ?)
            `;

            db.run(insertQuery, [username, hashedPassword, 1], function (err) {
                if (err) {
                    console.error("Database insertion error:", err.message);
                    return res.status(500).json({ error: "Failed to register user." });
                }

                res.status(201).json({
                    message: "User registered successfully.",
                    user: {
                        username,
                        reminderTime: 1
                    }
                });
            });

        } catch (error) {
            console.error("Error hashing password:", error.message);
            res.status(500).json({ error: "Internal server error." });
        }
    });
    
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        const searchQuery = "SELECT * FROM Roman_Empire WHERE userName = ?";

        db.get(searchQuery, [username], async (err, user) => {
            if (err) {
                console.error("Database error:", err.message);
                return res.status(500).json({ error: "Internal server error." });
            }

            if (!user) {
                return res.status(401).json({ error: "Invalid username or password." });
            }

            try {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    req.session.user = {
                        username: user.userName,
                        reminderTime: user.reminderTime
                    };
                    return res.json({ message: "Login successful." });
                } else {
                    return res.status(401).json({ error: "Invalid username or password." });
                }
            } catch (bcryptError) {
                console.error("Error comparing passwords:", bcryptError);
                return res.status(500).json({ error: "Internal server error." });
            }
        });
    });


    app.get('/userSettings', (req, res) => {
        if (req.session.user) {
            res.json({ user: req.session.user });
        } else {
            res.status(401).json({ error: "Not logged in." });
        }
    });

    app.post('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
            return res.status(500).json({ error: "Logout failed." });
            }
            res.clearCookie('connect.sid');
            res.json({ message: "Logged out successfully." });
        });
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