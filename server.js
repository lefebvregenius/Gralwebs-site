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
// Pour parser le JSON du formulaire
app.use(express.json());

// Route POST pour le formulaire de contact
app.post("/api/contact", (req, res) => {
  const { name, email, message, token } = req.body;

  // Vérification basique des champs
  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  // Ici tu peux ajouter la vérification reCAPTCHA côté serveur si besoin
  // et envoyer un e-mail ou stocker le message dans une base de données
  console.log("Nouveau message reçu :", { name, email, message, token });

  // Réponse côté front
  res.status(200).json({ message: "Message envoyé avec succès ✅" });
});

// Écoute sur 0.0.0.0 pour Railway
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
