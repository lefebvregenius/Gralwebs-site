document.addEventListener("DOMContentLoaded", function () {

  const CACHE_DURATION = 15 * 60 * 1000;
  const canvas = document.getElementById("weather-effects");
  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);

  async function getWeather() {

    const cached = localStorage.getItem("weatherData");
    const cachedTime = localStorage.getItem("weatherTime");

    if (cached && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
      displayWeather(JSON.parse(cached));
      return;
    }

    if (!navigator.geolocation) {
      console.log("Geolocation non supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(async position => {

      try {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`
        );

        const cityRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=fr`
        );

        const weatherData = await weatherRes.json();
        const cityData = await cityRes.json();

        weatherData.city = cityData.results?.[0]?.name || "Votre position";

        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        localStorage.setItem("weatherTime", Date.now());

        displayWeather(weatherData);

      } catch (error) {
        console.error("Erreur API météo :", error);
      }

    }, error => {
      console.log("Utilisateur a refusé la localisation");
      document.getElementById("weather-city").textContent = "Localisation refusée";
    });
  }

  function displayWeather(data) {

    resizeCanvas();

    const temp = Math.round(data.current_weather.temperature);
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weathercode;
    const isDay = data.current_weather.is_day;

    document.getElementById("weather-temp").textContent = temp + "°C";
    document.getElementById("weather-wind").textContent = "🌬 " + wind + " km/h";
    document.getElementById("weather-city").textContent = data.city;

    if (data.hourly?.relativehumidity_2m) {
      document.getElementById("weather-humidity").textContent =
        "💧 " + data.hourly.relativehumidity_2m[0] + "%";
    }

    setDesign(code, isDay);
  }

  function setDesign(code, isDay) {

    const bg = document.getElementById("weather-bg");
    const icon = document.getElementById("weather-icon");
    const desc = document.getElementById("weather-desc");

    if (code === 0) {
      bg.style.background = isDay
        ? "linear-gradient(135deg,#f7971e,#ffd200)"
        : "linear-gradient(135deg,#141e30,#243b55)";
      icon.textContent = isDay ? "☀️" : "🌙";
      desc.textContent = "Ciel dégagé";
    }
    else if (code >= 51 && code <= 67) {
      bg.style.background = "linear-gradient(135deg,#355c7d,#6c5b7b)";
      icon.textContent = "🌧️";
      desc.textContent = "Pluie";
    }
    else if (code >= 71 && code <= 77) {
      bg.style.background = "linear-gradient(135deg,#83a4d4,#b6fbff)";
      icon.textContent = "❄️";
      desc.textContent = "Neige";
    }
    else {
      bg.style.background = "linear-gradient(135deg,#4b79a1,#283e51)";
      icon.textContent = "⛅";
      desc.textContent = "Nuageux";
    }
  }

  getWeather();

});
document.addEventListener("DOMContentLoaded", async () => {
  const locationEl = document.getElementById("location");
  const descriptionEl = document.getElementById("description");
  const tempEl = document.getElementById("temperature");
  const humidityEl = document.getElementById("humidity");
  const windEl = document.getElementById("wind");
  const sunEl = document.getElementById("sun");
  const iconEl = document.getElementById("weather-icon");
  const canvas = document.getElementById("weather-effects");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = 500;

  // 🎯 Localisation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const apiKey = "TA_CLEF_API_OPENWEATHER"; // Remplace par ta clé OpenWeatherMap
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`);
      const data = await res.json();

      locationEl.textContent = `${data.name}, ${data.sys.country}`;
      descriptionEl.textContent = data.weather[0].description;
      tempEl.textContent = `${Math.round(data.main.temp)}°C`;
      humidityEl.textContent = `💧 Humidité: ${data.main.humidity}%`;
      windEl.textContent = `💨 Vent: ${Math.round(data.wind.speed)} km/h`;
      sunEl.textContent = `🌅 Soleil: ${new Date(data.sys.sunrise*1000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} - 🌇 ${new Date(data.sys.sunset*1000).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;

      // Déterminer l’icône et animation
      const weatherMain = data.weather[0].main.toLowerCase();
      if(weatherMain.includes("rain")) iconEl.textContent = "🌧️";
      else if(weatherMain.includes("snow")) iconEl.textContent = "❄️";
      else if(weatherMain.includes("cloud")) iconEl.textContent = "☁️";
      else iconEl.textContent = "☀️";

      // Animation pluie/neige
      initWeatherEffect(weatherMain);
    });
  }

  // 💦 Effets météo canvas
  function initWeatherEffect(type) {
    const particles = [];
    const maxParticles = 150;

    for(let i=0;i<maxParticles;i++){
      particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        length: Math.random()*20 + 10,
        speed: Math.random()*3 + 2,
        type: type
      });
    }

    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        if(p.type.includes("rain")){
          ctx.strokeStyle = 'rgba(174,194,224,0.5)';
          ctx.lineWidth = 2;
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(p.x,p.y+p.length);
          ctx.stroke();
        } else if(p.type.includes("snow")){
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.arc(p.x,p.y,p.length/10,0,Math.PI*2);
          ctx.fill();
        }
        p.y += p.speed;
        if(p.y>canvas.height) p.y = -p.length;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

});
document.addEventListener("DOMContentLoaded", () => {

  const weatherCard = document.querySelector(".weather-card");
  const tempEl = document.getElementById("temperature");

  // 🌥 Ajouter des nuages animés
  const cloudCount = 5;
  for(let i=0;i<cloudCount;i++){
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.width = `${50 + Math.random()*150}px`;
    cloud.style.height = `${20 + Math.random()*60}px`;
    cloud.style.top = `${Math.random()*50 + 20}px`;
    cloud.style.animationDuration = `${30 + Math.random()*40}s`;
    document.querySelector(".weather-card").appendChild(cloud);
  }

  // 🌗 Transition jour/nuit selon l'heure locale
  function setDayNight(hour){
    if(hour >= 6 && hour < 18){
      weatherCard.classList.add("day");
      weatherCard.classList.remove("night");
    } else {
      weatherCard.classList.add("night");
      weatherCard.classList.remove("day");
    }
  }

  // 🔥 Température couleur
  function setTempColor(temp){
    tempEl.classList.remove("cold","mild","hot");
    if(temp <= 10) tempEl.classList.add("cold");
    else if(temp <= 25) tempEl.classList.add("mild");
    else tempEl.classList.add("hot");
  }

  // Appel après récupération météo
  const hour = new Date().getHours();
  setDayNight(hour);

  // Si tu as déjà temp, applique couleur
  if(tempEl.textContent !== "--°C"){
    const tempVal = parseInt(tempEl.textContent);
    setTempColor(tempVal);
  }

  // Refaire couleur à chaque mise à jour météo
  const observer = new MutationObserver(() => {
    const tempVal = parseInt(tempEl.textContent);
    if(!isNaN(tempVal)) setTempColor(tempVal);
  });
  observer.observe(tempEl, {childList: true});

});