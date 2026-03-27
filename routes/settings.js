
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.send(`
    <h2>Router Settings</h2>
    <form action="/settings/update" method="POST">
      <label>SSID (Wi-Fi Name):</label><br>
      <input type="text" name="ssid" placeholder="Enter new SSID"><br><br>
      
      <label>Password:</label><br>
      <input type="password" name="password" placeholder="Enter new password"><br><br>
      
      <button type="submit">Update Settings</button>
    </form>
  `);
});

router.post('/update', (req, res) => {
  const { ssid, password } = req.body;
  res.send(`<h3>Settings Updated!</h3>
            <p>New SSID: ${ssid}</p>
            <p>New Password: ${password}</p>
            <a href="/dashboard">Back to Dashboard</a>`);
});

module.exports = router;
