document.addEventListener("DOMContentLoaded", () => {

  const tempEl = document.querySelector(".weather-temp");
  const descEl = document.querySelector(".weather-description");
  const cityEl = document.querySelector(".weather-city");
  const iconEl = document.querySelector(".weather-icon");

  async function loadWeather(lat, lon) {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();

      if (!data || !data.main) {
        tempEl.textContent = "Erreur";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const city = data.name;
      const condition = data.weather[0].main.toLowerCase();

      tempEl.textContent = `${temp}°C`;
      descEl.textContent = desc;
      cityEl.textContent = city;

      setWeatherMood(condition);

    } catch (error) {
      console.error("Erreur météo :", error);
      tempEl.textContent = "Erreur réseau";
    }
  }

  // 🌍 Géolocalisation automatique
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        loadWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        loadWeather(-18.8792, 47.5079); // fallback Antananarivo
      }
    );
  } else {
    loadWeather(-18.8792, 47.5079);
  }
});


/* ============================= */
/* ===== HUMEUR DU TEMPS ======= */
/* ============================= */

function setWeatherMood(condition) {

  document.body.classList.remove("sunny", "rainy", "snowy", "night");
  clearEffects();

  const hour = new Date().getHours();
  if (hour >= 19 || hour <= 5) {
    document.body.classList.add("night");
  }

  if (condition.includes("rain")) {
    document.body.classList.add("rainy");
    createRain();
  } 
  else if (condition.includes("snow")) {
    document.body.classList.add("snowy");
    createSnow();
  } 
  else {
    document.body.classList.add("sunny");
    createSun();
  }
}


/* ============================= */
/* ========= SOLEIL ============ */
/* ============================= */

function createSun() {

  const sun = document.createElement("div");
  sun.classList.add("sun");

  sun.style.position = "fixed";
  sun.style.top = "80px";
  sun.style.right = "100px";
  sun.style.width = "150px";
  sun.style.height = "150px";
  sun.style.borderRadius = "50%";
  sun.style.background = "radial-gradient(circle, #ffdd00, #ff9900)";
  sun.style.boxShadow = "0 0 120px #ffcc00";
  sun.style.animation = "pulse 4s infinite ease-in-out";

  document.body.appendChild(sun);
}


/* ============================= */
/* ========= PLUIE ============= */
/* ============================= */

function createRain() {

  for (let i = 0; i < 120; i++) {
    const drop = document.createElement("div");

    drop.style.position = "fixed";
    drop.style.width = "2px";
    drop.style.height = "15px";
    drop.style.background = "rgba(255,255,255,0.6)";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.top = "-20px";
    drop.style.animation = `rain ${0.5 + Math.random()}s linear infinite`;

    drop.classList.add("rain");
    document.body.appendChild(drop);
  }
}


/* ============================= */
/* ========= NEIGE ============= */
/* ============================= */

function createSnow() {

  for (let i = 0; i < 70; i++) {
    const snow = document.createElement("div");

    snow.innerHTML = "❄";
    snow.style.position = "fixed";
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.top = "-20px";
    snow.style.fontSize = "14px";
    snow.style.animation = `snow ${4 + Math.random() * 4}s linear infinite`;

    snow.classList.add("snow");
    document.body.appendChild(snow);
  }
}


/* ============================= */
/* ========= CLEAR ============= */
/* ============================= */

function clearEffects() {
  document.querySelectorAll(".sun, .rain, .snow").forEach(el => el.remove());
}