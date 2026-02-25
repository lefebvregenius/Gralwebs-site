document.addEventListener("DOMContentLoaded", () => {

  const cityEl = document.getElementById("weather-city");
  const descEl = document.getElementById("weather-desc");
  const tempEl = document.getElementById("weather-temp");
  const humidityEl = document.getElementById("weather-humidity");
  const windEl = document.getElementById("weather-wind");
  const iconEl = document.getElementById("weather-icon");

  async function loadWeather(lat, lon) {
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();

      if (!data || !data.main) {
        cityEl.textContent = "Impossible de charger la météo";
        return;
      }

      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].description;
      const city = data.name;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const condition = data.weather[0].main.toLowerCase();

      cityEl.textContent = city;
      descEl.textContent = desc;
      tempEl.textContent = `🌡 ${temp}°C`;
      humidityEl.textContent = `💧 ${humidity}%`;
      windEl.textContent = `🌬 ${wind} m/s`;

      setWeatherMood(condition);

    } catch (error) {
      console.error("Erreur météo :", error);
      cityEl.textContent = "Erreur réseau";
    }
  }

  // 🌍 Géolocalisation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => loadWeather(pos.coords.latitude, pos.coords.longitude),
      () => loadWeather(-18.8792, 47.5079)
    );
  } else {
    loadWeather(-18.8792, 47.5079);
  }

});


/* ================= HUMEUR ================= */

function setWeatherMood(condition) {

  document.body.classList.remove("sunny","rainy","snowy","night");
  clearEffects();

  const hour = new Date().getHours();
  if (hour >= 19 || hour <= 5) {
    document.body.classList.add("night");
  }

  const iconEl = document.getElementById("weather-icon");

  if (condition.includes("rain")) {
    document.body.classList.add("rainy");
    iconEl.textContent = "🌧️";
    createRain();
  } 
  else if (condition.includes("snow")) {
    document.body.classList.add("snowy");
    iconEl.textContent = "❄️";
    createSnow();
  } 
  else {
    document.body.classList.add("sunny");
    iconEl.textContent = "☀️";
    createSun();
  }
}


/* ================= EFFETS ================= */

function createSun() {
  const sun = document.createElement("div");
  sun.classList.add("sun");
  sun.style.position = "fixed";
  sun.style.top = "80px";
  sun.style.right = "100px";
  sun.style.width = "140px";
  sun.style.height = "140px";
  sun.style.borderRadius = "50%";
  sun.style.background = "radial-gradient(circle, #ffdd00, #ff9900)";
  sun.style.boxShadow = "0 0 120px #ffcc00";
  document.body.appendChild(sun);
}

function createRain() {
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain");
    drop.style.position = "fixed";
    drop.style.width = "2px";
    drop.style.height = "15px";
    drop.style.background = "rgba(255,255,255,0.6)";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.top = "-20px";
    drop.style.animation = `rain ${0.5 + Math.random()}s linear infinite`;
    document.body.appendChild(drop);
  }
}

function createSnow() {
  for (let i = 0; i < 60; i++) {
    const snow = document.createElement("div");
    snow.classList.add("snow");
    snow.innerHTML = "❄";
    snow.style.position = "fixed";
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.top = "-20px";
    snow.style.animation = `snow ${4 + Math.random()*4}s linear infinite`;
    document.body.appendChild(snow);
  }
}

function clearEffects() {
  document.querySelectorAll(".sun,.rain,.snow").forEach(e => e.remove());
}