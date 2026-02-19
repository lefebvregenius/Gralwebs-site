const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Railway fournit automatiquement le port
const PORT = process.env.PORT || 8080;

// Middleware pour parser le JSON des formulaires
app.use(express.json());

// Servir les fichiers statiques (index.html + assets)
const publicPath = path.join(__dirname, "public");
if (!fs.existsSync(publicPath)) {
  console.error("❌ Dossier public introuvable ! Assurez-vous que 'public/index.html' existe.");
  process.exit(1);
}
app.use(express.static(publicPath));
console.log(`📂 Fichiers statiques servis depuis ${publicPath}`);

// ================= ROUTES API =================

// Route test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// Route POST pour le formulaire de contact
app.post("/api/contact", (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  console.log("📩 Nouveau message reçu :", { name, email, message, token });

  res.status(200).json({ message: "Message envoyé avec succès ✅" });
});

// ================= FALLBACK SPA =================
// Toujours en dernier : redirige toutes les routes non-API vers index.html
app.get("*", (req, res) => {
  const indexPath = path.join(publicPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("❌ Index.html introuvable !");
  }
});

// ================= LANCEMENT SERVEUR =================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
