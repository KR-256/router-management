const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'crypton-secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const dashboardRoute = require('./routes/dashboard');
const settingsRoute = require('./routes/settings');
app.use('/dashboard', dashboardRoute);
app.use('/settings', settingsRoute);

const ADMIN_USER = "Krypton";
const ADMIN_PASS = "splendour@256";

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.send("Invalid credentials. Try again.");
  }
});

app.listen(3000, () => console.log("Router management running on http://localhost:3000"));
