const express = require("express");
const path = require("path");

const app = express();

// Railway fournit automatiquement le bon port
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, "public")));

// Route API test (optionnel)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// IMPORTANT : Toujours renvoyer index.html pour toutes les routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Démarrage serveur
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});