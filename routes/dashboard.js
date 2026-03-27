const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  const devices = [
    { name: "Laptop", ip: "192.168.0.2", mac: "AA:BB:CC:DD:EE:01" },
    { name: "Phone", ip: "192.168.0.3", mac: "AA:BB:CC:DD:EE:02" }
  ];
  res.send(`<h2>Connected Devices</h2>
            <ul>
              ${devices.map(d => `
                <li>${d.name} - ${d.ip} - ${d.mac}
                  <form action="/dashboard/block" method="POST" style="display:inline;">
                    <input type="hidden" name="mac" value="${d.mac}">
                    <button type="submit">Block</button>
                  </form>
                </li>`).join('')}
            </ul>
            <p><a href="/settings">Router Settings</a></p>`);
});

router.post('/block', (req, res) => {
  const { mac } = req.body;
  res.send(`<h3>Device Blocked!</h3>
            <p>MAC Address: ${mac}</p>
            <a href="/dashboard">Back to Dashboard</a>`);
});

module.exports = router;
