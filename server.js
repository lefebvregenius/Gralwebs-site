const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

/* ===============================
   CONFIGURATION PORT RAILWAY
================================= */
const PORT = process.env.PORT || 3000;

/* ===============================
   SÉCURITÉ HEADERS
================================= */
app.use(helmet({
  contentSecurityPolicy: false // évite blocage CSS/JS inline
}));

/* ===============================
   CORS CONFIGURATION
================================= */
app.use(cors({
  origin: "*", // tu peux restreindre plus tard
  methods: ["GET", "POST"],
}));

/* ===============================
   LIMITATION ANTI-SPAM
================================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP
  message: "Trop de requêtes, réessayez plus tard."
});

app.use(limiter);

/* ===============================
   PARSE JSON & FORM
================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===============================
   SERVIR DOSSIER PUBLIC
================================= */
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"]
}));

/* ===============================
   ROUTE TEST API
================================= */
app.get("/api/test", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend GralWebs opérationnel ✅"
  });
});

/* ===============================
   ROUTE PRINCIPALE
================================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===============================
   ROUTE 404 PERSONNALISÉE
================================= */
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===============================
   GESTION ERREURS GLOBALES
================================= */
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack);
  res.status(500).json({
    error: "Erreur interne du serveur"
  });
});

/* ===============================
   LANCEMENT SERVEUR
================================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log("=================================");
  console.log(`🚀 Serveur GralWebs lancé`);
  console.log(`🌍 Port : ${PORT}`);
  console.log("=================================");
});