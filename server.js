const express = require('express');
const fetch = require('node-fetch'); // use global fetch in Node 18+
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const targetUrl = req.query.target;
  if (!targetUrl) return res.status(400).json({ error: "Missing target URL" });

  try {
    const response = await fetch(targetUrl, { method: 'HEAD' });

    res.status(200).json({
      status: response.status,
      statusText: response.statusText
    });
  } catch (err) {
    res.status(500).json({ error: "Fetch failed", message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
});
