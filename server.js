const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

// -----------------------------
// Middleware JSON pour les formulaires
// -----------------------------
app.use(express.json());

// -----------------------------
// Trouver dynamiquement le dossier contenant index.html
// -----------------------------
let publicFolder = null;

// On regarde dans le dossier courant et sous-dossiers courants
const possibleFolders = ["public", "dist", "build", "www"];
for (const folder of possibleFolders) {
  const fullPath = path.join(__dirname, folder, "index.html");
  if (fs.existsSync(fullPath)) {
    publicFolder = path.join(__dirname, folder);
    break;
  }
}

if (!publicFolder) {
  console.warn(
    "⚠️ Aucun dossier contenant index.html trouvé ! Vérifie ton projet."
  );
} else {
  console.log("✅ Dossier public trouvé :", publicFolder);
  app.use(express.static(publicFolder));
}

// -----------------------------
// ROUTES API
// -----------------------------
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message, token } = req.body;
  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  console.log("Nouveau message reçu :", { name, email, message, token });
  res.status(200).json({ message: "Message envoyé avec succès ✅" });
});

// -----------------------------
// FALLBACK SPA
// Toutes les routes non-API renvoient index.html
// -----------------------------
app.get("*", (req, res) => {
  if (!publicFolder) {
    return res.status(404).send("404 Not Found - index.html introuvable");
  }
  res.sendFile(path.join(publicFolder, "index.html"));
});

// -----------------------------
// Lancement serveur
// -----------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
