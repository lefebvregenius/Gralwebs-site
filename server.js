// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT; // ✅ Railway fournit le port automatiquement

// =======================
// MIDDLEWARES
// =======================
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100
}));

// =======================
// FICHIERS STATIQUES
// =======================
// Selon ton projet : "public" pour HTML/CSS ou "build" pour React
app.use(express.static(path.join(__dirname, "public"))); // si site statique
// app.use(express.static(path.join(__dirname, "build"))); // si React

// =======================
// ROUTES API
// =======================
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message, token } = req.body;
  if (!name || !email || !message || !token)
    return res.status(400).json({ message: "Champs manquants ❌" });

  try {
    const secretKey = process.env.RECAPTCHA_SECRET;
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      }
    );
    const data = await response.json();
    if (!data.success || data.score < 0.5)
      return res.status(403).json({ message: "Vérification CAPTCHA échouée ❌" });

    res.json({ message: "Message reçu ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});

// FALLBACK FRONTEND (pour SPA ou site statique)
app.get('/:path(*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // ou 'build' si React
});


// =======================
// LANCEMENT DU SERVEUR
// =======================
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
