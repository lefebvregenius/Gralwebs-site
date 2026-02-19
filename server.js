const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// ✅ Railway fournit AUTOMATIQUEMENT le port
const PORT = process.env.PORT;

// Sécurité : si Railway ne fournit pas de port → erreur
if (!PORT) {
  console.error("❌ PORT non défini. Railway doit fournir process.env.PORT.");
  process.exit(1);
}

// Middleware JSON
app.use(express.json());

// Servir les fichiers statiques
const publicPath = path.join(__dirname, "public");

if (!fs.existsSync(publicPath)) {
  console.error("❌ Dossier 'public' introuvable !");
  process.exit(1);
}

app.use(express.static(publicPath));
console.log(`📂 Static depuis : ${publicPath}`);

// ================= API =================

// Test backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// Contact
app.post("/api/contact", (req, res) => {
  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  console.log("📩 Nouveau message :", { name, email, message });

  res.json({ message: "Message envoyé avec succès ✅" });
});

// ================= FALLBACK =================

// ⚠️ IMPORTANT : toujours APRÈS les routes API
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ================= START =================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Railway écoute sur le port ${PORT}`);
});
