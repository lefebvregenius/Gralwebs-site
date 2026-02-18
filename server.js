// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// =======================
// MIDDLEWARES
// =======================
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// =======================
// FICHIERS STATIQUES
// =======================
app.use(express.static(path.join(__dirname, "public")));

// =======================
// ROUTE TEST
// =======================
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// =======================
// ROUTE CONTACT
// =======================
app.post("/api/contact", async (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Champs manquants ❌" });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET;

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`
      }
    );

    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      return res.status(403).json({ message: "CAPTCHA invalide ❌" });
    }

    res.json({ message: "Message reçu ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});

// =======================
// FALLBACK (IMPORTANT)
// =======================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// =======================
// START SERVER
// =======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
