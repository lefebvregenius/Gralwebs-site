const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Servir fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// API test
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connecté ✅" });
});

// Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port " + PORT);
});