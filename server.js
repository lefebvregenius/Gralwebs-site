const express = require("express");
const path = require("path");

const app = express();

// Railway fournit automatiquement le port
const PORT = process.env.PORT || 8080;

// Middleware JSON
app.use(express.json());

// ======================
// SERVIR LES FICHIERS STATIQUES
// ======================
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// ======================
// ROUTES API
// ======================

// Route test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// Route contact
app.post("/api/contact", (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  console.log("📩 Nouveau message reçu :", {
    name,
    email,
    message,
  });

  res.status(200).json({ message: "Message envoyé avec succès ✅" });
});

// ======================
// FALLBACK POUR SPA
// ======================
// Toujours en dernier !
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ======================
// LANCEMENT SERVEUR
// ======================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
