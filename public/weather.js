/* ===== Premium Weather Script ===== */
document.addEventListener("DOMContentLoaded", () => {
  const apiKey = process.env.WEATHER_KEY; // ➤  clé gratuite
  const effectsCanvas = document.getElementById("weather-effects");
  const ctx = effectsCanvas.getContext("2d");

  const elCity = document.getElementById("weather-city");
  const elDesc = document.getElementById("weather-desc");
  const elTemp = document.getElementById("weather-temp");
  const elHumidity = document.getElementById("weather-humidity");
  const elWind = document.getElementById("weather-wind");
  const elSun = document.getElementById("weather-sun");
  const elIcon = document.getElementById("weather-icon");
  const cardBG = document.querySelector(".weather-bg");

  // 💧 Resize canvas
  function resizeCanvas() {
    effectsCanvas.width = effectsCanvas.offsetWidth;
    effectsCanvas.height = effectsCanvas.offsetHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 🌍 Fetch weather (geolocation or fallback)
  function fetchWeather(lat, lon, city) {
    let url;
    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => updateWeather(data))
      .catch(err => {
        elCity.textContent = "Erreur météo";
        elDesc.textContent = err.message;
      });
  }

  // 📊 Update DOM with weather
  function updateWeather(data) {
    elCity.textContent = `${data.name}, ${data.sys.country}`;
    elDesc.textContent = data.weather[0].description;
    elTemp.textContent = `🌡️ ${Math.round(data.main.temp)}°C`;
    elHumidity.textContent = `💧 ${data.main.humidity}%`;
    elWind.textContent = `💨 ${Math.round(data.wind.speed * 3.6)} km/h`;
    elSun.textContent = `🌅 ${new Date(data.sys.sunrise*1000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} — 🌇 ${new Date(data.sys.sunset*1000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;

    const weatherMain = data.weather[0].main.toLowerCase();

    // 🌀 Set icon
    if (weatherMain.includes("rain")) elIcon.textContent = "🌧️";
    else if (weatherMain.includes("snow")) elIcon.textContent = "❄️";
    else if (weatherMain.includes("cloud")) elIcon.textContent = "☁️";
    else elIcon.textContent = "☀️";

    // 🌆 Day/Night
    const nowHour = new Date().getHours();
    if (nowHour >= 6 && nowHour <= 18) {
      cardBG.style.background = "linear-gradient(to bottom, #4facfe, #00f2fe)"; // jour
    } else {
      cardBG.style.background = "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)"; // nuit
    }

    // ☔ Animations
    startEffects(weatherMain);
  }

  // ☁️ Weather animations (rain/snow)
  function startEffects(weather) {
    const particles = [];
    const max = 150;

    for (let i = 0; i < max; i++) {
      particles.push({
        x: Math.random() * effectsCanvas.width,
        y: Math.random() * effectsCanvas.height,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 3 + 2
      });
    }

    function animate() {
      ctx.clearRect(0,0,effectsCanvas.width,effectsCanvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        if (weather.includes("rain")) {
          ctx.strokeStyle = "rgba(174,194,224,0.5)";
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(p.x,p.y + p.length);
          ctx.stroke();
        } else if (weather.includes("snow")) {
          ctx.fillStyle = "rgba(255,255,255,0.8)";
          ctx.arc(p.x,p.y, p.length/8, 0, Math.PI*2);
          ctx.fill();
        }
        p.y += p.speed;
        if (p.y > effectsCanvas.height) p.y = -10;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 🧭 Try geolocation first
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchWeather(pos.coords.latitude, pos.coords.longitude);
    }, () => {
      // Fallback city if geolocation denied
      fetchWeather(null, null, "Antananarivo");
    });
  } else {
    fetchWeather(null, null, "Antananarivo");
  }
});