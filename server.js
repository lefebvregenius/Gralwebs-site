const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

/* ===================== SÉCURITÉ ===================== */

// Protection headers
app.use(helmet());

// CORS sécurisé
app.use(cors());

// Limite les requêtes (anti attaque brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json());

// Sert les fichiers du dossier public
app.use(express.static("public"));

/* ===================== ROUTES ===================== */

// Test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// Contact sécurisé
app.post("/api/contact", async (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Champs manquants ❌" });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`
      }
    );

    const data = await response.json();

    if (!data.success || data.score < 0.5) {
      return res.status(403).json({ message: "Vérification CAPTCHA échouée ❌" });
    }

    res.json({ message: "Message envoyé avec succès ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});

/* ===================== LANCEMENT ===================== */

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
