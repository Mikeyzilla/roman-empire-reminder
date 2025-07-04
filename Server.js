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

    const insertQuery = "INSERT into Roman_Empire (userName, password, reminderTime, reminderSetAt) VALUES (?, ?, ?, ?)";

    const currentDate = new Date().toISOString();

    await db.run(insertQuery, [username, hashedPassword, 1, currentDate]);
    
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
            reminderTime: user.reminderTime,
            reminderSetAt: user.reminderSetAt
        };
        const userReminderDays = user.reminderTime;
        const setTime = user.reminderSetAt;
        const currentTime = Date.now();
        const timeSetAtNumber = new Date(setTime).getTime();
        const timeSinceReminder = currentTime - timeSetAtNumber;
        const userRemainingDaysAsMilliseconds = userReminderDays * 24 * 60 * 60 * 1000;
        const remainingTime = userRemainingDaysAsMilliseconds - timeSinceReminder;
        //then calculate the timer status. if timer <= 0, timer failure.
        // return res.json({ timerStatus: "timerFailure", remainingDays: 0 });
        //add what's in res.json above to the res.json below, as a comma separated list.
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

app.post('/getUserName', async (req, res) => {
  const { username } = req.body;
  const searchForName = "SELECT * FROM Roman_Empire WHERE userName = ?";
  try {
    const foundName = await db.get(searchForName, username);
    if (foundName) {
      return res.status(200).json({ message: "That name is in our system." });
    } else {
      return res.status(404).json({ error: "Couldn't find a user with that name." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Database error." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/setRemainingDays', async (req, res) => {
  const {numberOfDays} = req.body;
  const sessionUserName = req.session?.user?.username;

  const searchForUserName = "SELECT * FROM Roman_Empire WHERE userName = ?";
  
  const UserNameFound = db.get(searchForUserName, sessionUserName);
  
  if (!UserNameFound) {
    return res.status(400).json({error: "Could not find a user with that name."});
  } else {
    const updateQuery = ` UPDATE Roman_Empire SET reminderTime = ?, reminderSetAt = ? WHERE userName = ?`; 
    const reminderSetAtTime = new Date().toISOString(); //this is the exact time the user clicked on the button to set the reminder.
    await db.run(updateQuery, numberOfDays, reminderSetAtTime, sessionUserName);
    return res.status(200).json({ message: "Reminder time updated successfully." });
  }
    //add error checking
});

app.get('/getRemainingDays', async (req, res) => {
  const username = req.session?.user?.username;

  const searchForUser = "SELECT * FROM Roman_Empire WHERE userName = ?";

  const userFindRequest = await db.get(searchForUser, username);

  if (!userFindRequest) {
      return res.status(404).json({ error: "Could not find that user in our system" });
  } else {
    const userReminderDays = userFindRequest.reminderTime; //number of days user originally set as countdown
    const setTime = userFindRequest.reminderSetAt; //The exact time they set that reminder (when the user clicked submit)
    const currentTime = Date.now(); //the current date
    const timeSetAtNumber = new Date(setTime).getTime(); //the reminder start time, but as a number 
    const timeSinceReminder = currentTime - timeSetAtNumber; //the amount of time that has passed since the reminder set, in milliseconds
    const userRemainingDaysAsMilliseconds = userReminderDays * 24 * 60 * 60 * 1000; //you now have the number of countdown days the user originally set, but in milliseconds
    const remainingTime = userRemainingDaysAsMilliseconds - timeSinceReminder; //the amount of time that has passed since the countdown started, but in milliseconds
    if (remainingTime <= 0) {
      return res.json({ timerStatus: "timerFailure", remainingTime: 0 });
    } else {
      return res.json({timerStatus: "timerActive", remainingTime});
    } //add more error checking if need be.
  }
});
