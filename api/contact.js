import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Tous les champs sont requis"
    });
  }

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: "lefebvregenius@gmail.com",
      subject: "Nouveau message depuis Gralwebs",
      html: `
        <h2>Nouveau message client</h2>
        <p><b>Nom:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({
      message: "Message envoyé avec succès"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Erreur serveur"
    });

  }
}
document.getElementById("contactForm").addEventListener("submit", async function(e){

e.preventDefault()

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
message: document.getElementById("messageField").value
}

const res = await fetch("/api/contact",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

const result = await res.json()

alert(result.message)

})