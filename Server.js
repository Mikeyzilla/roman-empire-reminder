import express from 'express';
import sqlite3Module from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import session from 'express-session';

const sqlite3 = sqlite3Module.verbose();

const app = express();
const PORT = 5000;

app.use(cors({
  origin: (origin, callback) => {
    console.log('Origin attempting to access:', origin); // helpful debug to find out where frontend is running
    callback(null, true);  // allow all origins during dev (don't know where our frontend is running right now)
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'mikesecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

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

    const insertQuery = "INSERT into Roman_Empire (userName, password, reminderTime) VALUES (?, ?, ?)";

    db.run(insertQuery, [username, hashedPassword, 1]);
    
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ error });
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

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: "Logged out successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
