import express from 'express';
import sqlite3Module from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const sqlite3 = sqlite3Module.verbose();
const app = express();
const PORT = 5000;

const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);

app.use(express.json({ limit: '16kb' }));

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    req.user = { username: payload.username };
    return next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    await dbRun(
      "INSERT INTO Roman_Empire (userName, password, reminderTime, reminderSetAt) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, 1, now]
    );

    const token = jwt.sign(
      { username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  db.get("SELECT * FROM Roman_Empire WHERE userName = ?", [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const now = new Date().toISOString();
    await dbRun("UPDATE Roman_Empire SET reminderTime = ?, reminderSetAt = ? WHERE userName = ?", [1, now, username]);

    const token = jwt.sign({ username: user.userName }, JWT_SECRET, { expiresIn: '1d' });

    return res.json({ token });
  });
});

app.get('/getRemainingDays', authenticateJWT, async (req, res) => {
  const username = req.user.username;

  try {
    const user = await dbGet("SELECT * FROM Roman_Empire WHERE userName = ?", username);
    if (!user) return res.status(404).json({ error: "User not found" });

    const reminderDays = Number(user.reminderTime);
    const setTime = new Date(user.reminderSetAt).getTime();
    const now = Date.now();
    const msRemaining = reminderDays * 24 * 60 * 60 * 1000 - (now - setTime);

    if (msRemaining <= 0) {
      return res.json({ timerStatus: "timerFailure", remainingTime: 0 });
    } else {
      return res.json({ timerStatus: "timerActive", remainingTime: msRemaining });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/setRemainingDays', authenticateJWT, async (req, res) => {
  let { numberOfDays } = req.body;
  const username = req.user.username;

  numberOfDays = Number(numberOfDays);
  if (!numberOfDays || numberOfDays <= 0) return res.status(400).json({ error: "Invalid numberOfDays" });

  try {
    const now = new Date().toISOString();
    await dbRun("UPDATE Roman_Empire SET reminderTime = ?, reminderSetAt = ? WHERE userName = ?", [numberOfDays, now, username]);
    res.json({ message: "Reminder time updated" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.post('/getUserName', async (req, res) => {
  const { username } = req.body;
  try {
    const found = await dbGet("SELECT 1 FROM Roman_Empire WHERE userName = ?", [username]);
    if (found) res.status(200).json({ message: "Username exists" });
    else res.status(404).json({ error: "Username not found" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`JWT server running at http://localhost:${PORT}`);
});