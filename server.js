const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/xtream", async (req, res) => {
  const { host, username, password } = req.body;
  if (!host || !username || !password) {
    return res.status(400).send("Missing fields");
  }
  const url = `${host.replace(/\/+$/, "")}/get.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&type=m3u_plus&output=m3u8`;
  try {
    const r = await fetch(url);
    const text = await r.text();
    res.type("text/plain").send(text);
  } catch (e) {
    res.status(500).send(String(e));
  }
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
