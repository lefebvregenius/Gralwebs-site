const express = require("express");
const path = require("path");

const app = express();

// Railway fournit automatiquement le port
const PORT = process.env.PORT || 8080;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// IMPORTANT : toujours renvoyer index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Écoute sur 0.0.0.0 pour Railway
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
