// ==============================
// SCRIPT.JS - TeraWeb (Version finale)
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // BURGER MENU MOBILE
  // ==============================
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('open');
  });

  // ==============================
  // NAVBAR HIDE/SHOW AU SCROLL
  // ==============================
  let lastScroll = 0;
  const header = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if(currentScroll > lastScroll && currentScroll > 100){
      header.style.top = "-100px";
    } else {
      header.style.top = "0";
    }

    if(currentScroll > 50){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ==============================
  // REVEAL ANIMATIONS
  // ==============================
  const revealElements = document.querySelectorAll('.reveal, [data-animate], .destination');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if(elementTop < windowHeight - revealPoint){
        el.classList.add('reveal-active', 'show', 'is-visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ==============================
  // INITIALISATION AOS
  // ==============================
  if(typeof AOS !== 'undefined'){
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }

  // ==============================
  // PAUSE SLIDER AU HOVER
  // ==============================
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(slider => {
    const track = slider.querySelector('.slider-track');
    slider.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    slider.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  });

  // ==============================
  // IMAGES DESTINATIONS - EFFECTS INTERACTIFS
  // ==============================
  const slides = document.querySelectorAll('.slider .slide');
  slides.forEach(slide => {
    slide.addEventListener('mousemove', e => {
      const rect = slide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const moveX = (x - rect.width/2) * 0.03;
      const moveY = (y - rect.height/2) * 0.03;
      slide.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    });
    slide.addEventListener('mouseleave', () => {
      slide.style.transform = 'scale(1) translate(0,0)';
    });
  });

  // ==============================
  // PRECHARGEMENT IMAGES POUR FLUIDITÉ
  // ==============================
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if(img.complete){
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
  });

  // ==============================
  // INTERSECTION OBSERVER POUR ANIMATIONS + DESTINATIONS
  // ==============================
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: "0px 0px -80px 0px"
  });
  document.querySelectorAll('.destination, [data-animate]').forEach(el => observer.observe(el));

  // ==============================
  // PACK DETAILS INTERACTIF
  // ==============================
  const packButtons = document.querySelectorAll('.pack-btn');
  const packContents = document.querySelectorAll('.pack-content');
  packButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pack = btn.dataset.pack;
      packContents.forEach(content => {
        if(content.id === pack){
          content.style.display = "block";
          setTimeout(() => content.classList.add('active'), 50);
        } else {
          content.style.display = "none";
          content.classList.remove('active');
        }
      });
    });
  });

  // ==============================
  // MODALES NOS SERVICES (fonctionnel)
  // ==============================
  const openPackButtons = document.querySelectorAll(".open-pack");
  const packModals = document.querySelectorAll(".pack-modal");

  function closeModal(modal){
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  openPackButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const packId = btn.dataset.pack;
      const modal = document.getElementById(packId);
      if(modal){
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  packModals.forEach(modal => {
    const closeBtn = modal.querySelector(".close");
    closeBtn?.addEventListener("click", () => closeModal(modal));
    modal.addEventListener("click", e => {
      if(e.target === modal) closeModal(modal);
    });
  });

  window.addEventListener("keydown", e => {
    if(e.key === "Escape"){
      packModals.forEach(modal => closeModal(modal));
    }
  });

  // ==============================
  // MENU MOBILE ALTERNATIF
  // ==============================
  const menuBtn = document.querySelector(".menu-toggle");
  menuBtn?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
    menuBtn.classList.toggle("active");
  });

  // ==============================
  // SCROLL FLUIDE
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ==============================
  // PAGE LOADED
  // ==============================
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // ==============================
  // SLIDER DESTINATIONS INFINI
  // ==============================
  const sliderTrack = document.querySelector(".slider-track");
  if(sliderTrack){
    const allSlides = Array.from(sliderTrack.children);
    allSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      sliderTrack.appendChild(clone);
    });
  }

  // ==============================
  // SLIDER PROJETS
  // ==============================
  const projectSlides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index){
    projectSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  if(projectSlides.length > 0){
    showSlide(currentSlide);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % projectSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // ==============================
  // BOUTONS FEEDBACK
  // ==============================
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 200);
    });
  });

  // ==============================
  // NAVBAR : hide on scroll
  // ==============================
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop && scrollTop > 80){
      navbar?.classList.add("nav-hide");
    } else {
      navbar?.classList.remove("nav-hide");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // ==============================
  // BACKEND CONNECTION (invisible)
  // ==============================
 const backendUrl = "/api/test";
  fetch(backendUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Backend connecté :", data.message);
    })
    .catch(err => console.error("Backend erreur :", err));

});
const popups = document.querySelectorAll(".popup");
const overlay = document.querySelector(".popup-overlay");
const openBtns = document.querySelectorAll(".open-popup");
const closeBtns = document.querySelectorAll(".close-popup");

openBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const popup = document.getElementById(btn.dataset.popup);
    popup.classList.add("active");
    overlay.classList.add("active");
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    popups.forEach(p => p.classList.remove("active"));
    overlay.classList.remove("active");
  });
});

overlay.addEventListener("click", () => {
  popups.forEach(p => p.classList.remove("active"));
  overlay.classList.remove("active");
});
document.querySelectorAll(".pack-modal-content").forEach(modal => {

  const light = document.createElement("div");
  light.style.position = "absolute";
  light.style.width = "300px";
  light.style.height = "300px";
  light.style.background = "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)";
  light.style.pointerEvents = "none";
  light.style.transition = "0.15s";
  modal.appendChild(light);

  modal.addEventListener("mousemove", e => {
    const rect = modal.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    light.style.left = x - 150 + "px";
    light.style.top = y - 150 + "px";
  });

});

/* ===============================
   PREMIUM GPU SLIDER 120FPS OLED
   Compatible tous appareils
   =============================== */

(function () {

  if (window.__premiumSliderLoaded) return;
  window.__premiumSliderLoaded = true;

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    if (!galleries.length) return;

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      if (!track) return;

      // ⚡ Protection contre double initialisation
      if (track.dataset.initialized) return;
      track.dataset.initialized = "true";

      // 🚀 Optimisation GPU
      track.style.willChange = "transform";
      track.style.transform = "translate3d(0,0,0)";
      track.style.backfaceVisibility = "hidden";

      // 🔁 Clone pour boucle infinie propre
      track.innerHTML += track.innerHTML;

      let position = 0;
      let speed = getSpeed();
      let running = true;

      function getSpeed() {
        if (window.innerWidth < 768) return 0.25;   // Mobile
        if (window.innerWidth < 1024) return 0.4;   // Tablette
        return 0.6;                                 // Desktop 120Hz
      }

      function animate() {
        if (!running) return;

        position -= speed;

        if (Math.abs(position) >= track.scrollHeight / 2) {
          position = 0;
        }

        track.style.transform = `translate3d(0, ${position}px, 0)`;

        requestAnimationFrame(animate);
      }

      animate();

      // 🔋 Pause si onglet caché
      document.addEventListener("visibilitychange", function () {
        running = !document.hidden;
        if (running) animate();
      });

      // 📱 Recalcule vitesse si resize
      window.addEventListener("resize", function () {
        speed = getSpeed();
      });

    });

  });

})();
/* ===============================
   IMAGE BY IMAGE SLOW SCROLL
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const images = track ? track.querySelectorAll("img") : [];

      if (!track || images.length === 0) return;

      let index = 0;
      let imageHeight = gallery.offsetHeight;
      let isAnimating = false;

      // 🔥 GPU activation
      track.style.willChange = "transform";
      track.style.transform = "translate3d(0,0,0)";

      function slideNext() {
        if (isAnimating) return;
        isAnimating = true;

        index++;

        if (index >= images.length) {
          index = 0;
        }

        track.style.transition = "transform 1.6s cubic-bezier(0.65,0,0.35,1)";
        track.style.transform = `translate3d(0, -${index * imageHeight}px, 0)`;

        setTimeout(() => {
          isAnimating = false;
        }, 1700);
      }

      // 🔥 animation lente (toutes les 4 secondes)
      setInterval(slideNext, 4000);

      // 🔄 recalcul si resize
      window.addEventListener("resize", function () {
        imageHeight = gallery.offsetHeight;
        track.style.transition = "none";
        track.style.transform = `translate3d(0, -${index * imageHeight}px, 0)`;
      });

    });

  });

})();
/* ===============================
   PREMIUM INFINITE SMOOTH SLIDER
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const images = track ? track.querySelectorAll("img") : [];

      if (!track || images.length < 2) return;

      // 🔥 Clone première image à la fin (boucle parfaite)
      const firstClone = images[0].cloneNode(true);
      track.appendChild(firstClone);

      let index = 0;
      let height = gallery.offsetHeight;
      let isAnimating = false;

      function slide() {
        if (isAnimating) return;
        isAnimating = true;

        index++;

        track.style.transition = "transform 1.8s cubic-bezier(0.65,0,0.35,1)";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;

        if (index === images.length) {
          setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = "translate3d(0, 0, 0)";
            index = 0;
          }, 1800);
        }

        setTimeout(() => {
          isAnimating = false;
        }, 2000);
      }

      // ⏱ change toutes les 4.5 secondes (smooth premium)
      setInterval(slide, 4500);

      // 🔄 Recalcul responsive
      window.addEventListener("resize", () => {
        height = gallery.offsetHeight;
        track.style.transition = "none";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;
      });

    });

  });

})();
/* ===============================
   FIX POPUPS AUTO OPEN
   =============================== */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".pack-content").forEach(popup => {
    popup.classList.remove("active");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  });

});
/* ===============================
   RESPONSIVE INFINITE SLIDER
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const images = track ? track.querySelectorAll("img") : [];

      if (!track || images.length < 2) return;

      // 🔁 Clone première image pour boucle infinie
      const firstClone = images[0].cloneNode(true);
      track.appendChild(firstClone);

      let index = 0;
      let height = gallery.offsetHeight;
      let isAnimating = false;

      function slide() {
        if (isAnimating) return;
        isAnimating = true;

        index++;

        track.style.transition = "transform 1.6s cubic-bezier(0.65,0,0.35,1)";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;

        if (index === images.length) {
          setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = "translate3d(0, 0, 0)";
            index = 0;
          }, 1600);
        }

        setTimeout(() => {
          isAnimating = false;
        }, 1800);
      }

      // ⏱ défilement lent
      setInterval(slide, 4500);

      // 🔄 recalcul responsive
      window.addEventListener("resize", () => {
        height = gallery.offsetHeight;
        track.style.transition = "none";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;
      });

    });

  });

})();
/* ===============================
   FIX POPUPS AUTO LOAD
   =============================== */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".pack-content").forEach(popup => {
    popup.classList.remove("active");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  });

});
/* ===============================
   WINDOWS SMOOTH INFINITE SCROLL
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const slides = track ? track.children : [];

      if (!track || slides.length < 2) return;

      // 🔁 Cloner toutes les slides pour boucle infinie parfaite
      track.innerHTML += track.innerHTML;

      let position = 0;
      let speed = 0.4; // 🔥 vitesse smooth style Windows
      let totalHeight = track.scrollHeight / 2;

      function animate() {

        position -= speed;

        if (Math.abs(position) >= totalHeight) {
          position = 0;
        }

        track.style.transform = `translate3d(0, ${position}px, 0)`;

        requestAnimationFrame(animate);
      }

      animate();

      // 🔄 responsive
      window.addEventListener("resize", () => {
        totalHeight = track.scrollHeight / 2;
      });

      // 🔋 pause si onglet caché
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) animate();
      });

    });

  });

})();
/* ===============================
   FIX POPUPS AUTO LOAD
   =============================== */

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".pack-content").forEach(popup => {
    popup.classList.remove("active");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  });

});
/* ===============================
   MODERN 2026 IMAGE SLIDER
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const images = track ? track.querySelectorAll("img") : [];

      if (!track || images.length < 2) return;

      let index = 0;
      let height = gallery.offsetHeight;
      let isAnimating = false;

      // Clone première image pour boucle infinie
      const clone = images[0].cloneNode(true);
      track.appendChild(clone);

      function showNext() {
        if (isAnimating) return;
        isAnimating = true;

        index++;

        track.style.transition = "transform 1.4s cubic-bezier(0.65,0,0.35,1)";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;

        // Si on atteint le clone → reset propre
        if (index === images.length) {
          setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = "translate3d(0,0,0)";
            index = 0;
          }, 1400);
        }

        setTimeout(() => {
          isAnimating = false;
        }, 1600);
      }

      // 🔥 Image reste affichée 4 secondes AVANT transition
      setInterval(showNext, 5000);

      // Responsive recalcul
      window.addEventListener("resize", () => {
        height = gallery.offsetHeight;
        track.style.transition = "none";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;
      });

    });

  });

})();
/* ===============================
   DOUBLE BOUNCE THEN SLIDE
   =============================== */

(function () {

  document.addEventListener("DOMContentLoaded", function () {

    const galleries = document.querySelectorAll(".pack-gallery");

    galleries.forEach(gallery => {

      const track = gallery.querySelector(".slider-inner");
      const images = track ? track.querySelectorAll("img") : [];

      if (!track || images.length < 2) return;

      let index = 0;
      let height = gallery.offsetHeight;
      let isAnimating = false;

      // Clone première image pour boucle infinie
      const clone = images[0].cloneNode(true);
      track.appendChild(clone);

      function bounceThenSlide() {

        if (isAnimating) return;
        isAnimating = true;

        const currentImage = images[index];
        currentImage.classList.add("bounce-effect");

        // Attendre fin rebond
        setTimeout(() => {

          currentImage.classList.remove("bounce-effect");

          index++;

          track.style.transition = "transform 1.4s cubic-bezier(0.65,0,0.35,1)";
          track.style.transform = `translate3d(0, -${index * height}px, 0)`;

          if (index === images.length) {
            setTimeout(() => {
              track.style.transition = "none";
              track.style.transform = "translate3d(0,0,0)";
              index = 0;
            }, 1400);
          }

          setTimeout(() => {
            isAnimating = false;
          }, 1600);

        }, 1200); // durée du double rebond
      }

      // 🔥 image reste affichée 3 secondes puis rebond + slide
      setInterval(bounceThenSlide, 5000);

      // Responsive
      window.addEventListener("resize", () => {
        height = gallery.offsetHeight;
        track.style.transition = "none";
        track.style.transform = `translate3d(0, -${index * height}px, 0)`;
      });

    });

  });

})();
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".pack-content").forEach(popup => {
    popup.classList.remove("active");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  });
});
/* ==== JS Slider & Popups Premium ==== */

(function(){
document.addEventListener("DOMContentLoaded", function(){

  const galleries = document.querySelectorAll(".pack-gallery");
  galleries.forEach(gallery=>{
    const track = gallery.querySelector(".slider-inner");
    const images = track.querySelectorAll("img");
    if(!track || images.length<2) return;

    let index=0;
    let height=gallery.offsetHeight;
    const clone = images[0].cloneNode(true);
    track.appendChild(clone);

    function bounceSlide(){
      const current = images[index];
      current.style.transform="scale(1.03)";
      setTimeout(()=>{current.style.transform="scale(0.97)";},300);
      setTimeout(()=>{
        current.style.transform="scale(1)";
        index++;
        track.style.transition="transform 1.4s cubic-bezier(0.65,0,0.35,1)";
        track.style.transform=`translate3d(0,-${index*height}px,0)`;
        if(index===images.length){setTimeout(()=>{track.style.transition="none";track.style.transform="translate3d(0,0,0)"; index=0;},1400);}
      },600);
    }

    setInterval(bounceSlide,5000);
    window.addEventListener("resize",()=>{height=gallery.offsetHeight; track.style.transition="none"; track.style.transform=`translate3d(0,-${index*height}px,0)`;});

  });

  // Popups : désactiver auto-open
  document.querySelectorAll(".pack-content").forEach(popup=>{popup.classList.remove("active"); popup.style.opacity="0"; popup.style.visibility="hidden";});

});
})();
document.addEventListener("DOMContentLoaded", function(){

  // désactiver auto-open
  document.querySelectorAll(".pack-modal").forEach(popup=>{
    popup.style.display="none";
  });

  // ouvrir popup sur clic (tu peux mettre ton bouton)
  document.querySelectorAll(".pack-btn").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const targetId = btn.getAttribute("data-target");
      const popup = document.getElementById(targetId);
      if(popup){
        popup.style.display="flex";
      }
    });
  });

  // fermer popup au clic sur X
  document.querySelectorAll(".pack-modal .close").forEach(closeBtn=>{
    closeBtn.addEventListener("click", e=>{
      const popup = closeBtn.closest(".pack-modal");
      popup.style.display="none";
    });
  });

  // fermer popup si clic en dehors du contenu
  document.querySelectorAll(".pack-modal").forEach(popup=>{
    popup.addEventListener("click", e=>{
      if(e.target === popup){
        popup.style.display="none";
      }
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {

  // Sélectionne uniquement les boutons / cartes Vos Choix
  const vosChoixCards = document.querySelectorAll(".vos-choix + .card.open-popup");
  const popups = {
    "popup-essentiel": document.getElementById("popup-essentiel"),
    "popup-pro": document.getElementById("popup-pro"),
    "popup-premium": document.getElementById("popup-premium")
  };

  vosChoixCards.forEach(card => {
    card.addEventListener("click", () => {
      const popupId = card.getAttribute("data-popup");
      const popup = popups[popupId];

      if (popup) {
        popup.classList.add("show");
      }
    });
  });

  // Fermer les popups au clic sur le X
  Object.values(popups).forEach(popup => {
    const closeBtn = popup.querySelector(".close-popup");
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show");
    });

    // Fermer si clic à l'extérieur
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("show");
      }
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne uniquement les cartes Vos Choix
  const vosChoixCards = document.querySelectorAll(".vos-choix + .card.open-popup");

  // Crée un mapping popup
  const popups = {
    "popup-essentiel": document.getElementById("popup-essentiel"),
    "popup-pro": document.getElementById("popup-pro"),
    "popup-premium": document.getElementById("popup-premium")
  };

  // Ouvrir popup au clic
  vosChoixCards.forEach(card => {
    card.addEventListener("click", () => {
      const popupId = card.getAttribute("data-popup");
      const popup = popups[popupId];
      if (popup) popup.classList.add("show");
    });
  });

  // Fermer popup
  Object.values(popups).forEach(popup => {
    const closeBtn = popup.querySelector(".close-popup");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => popup.classList.remove("show"));
    }
    // clic à l'extérieur
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("show");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne uniquement les cartes Vos Choix
  const vosChoixCards = document.querySelectorAll(".vos-choix + .card.open-popup");

  // Map des popups
  const popups = {
    "popup-essentiel": document.getElementById("popup-essentiel"),
    "popup-pro": document.getElementById("popup-pro"),
    "popup-premium": document.getElementById("popup-premium")
  };

  // Ouvrir popup au clic
  vosChoixCards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation(); // éviter propagation
      const popupId = card.getAttribute("data-popup");
      const popup = popups[popupId];
      if (popup) {
        popup.classList.add("show");
      }
    });
  });

  // Fermer popup au clic sur X
  Object.values(popups).forEach(popup => {
    const closeBtn = popup.querySelector(".close-popup");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => popup.classList.remove("show"));
    }

    // Fermer au clic en dehors du contenu
    popup.addEventListener("click", (e) => {
      if (e.target === popup) popup.classList.remove("show");
    });
  });

  // Fermer popup avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      Object.values(popups).forEach(p => p.classList.remove("show"));
    }
  });
});
// Empêcher les popups d'interférer avec les liens normaux
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");

    // Si c'est un vrai fichier (FAQ, contrat, etc.)
    if (href && href.endsWith(".html")) {
      e.stopPropagation(); // empêche popup
    }
  });
});
// Gestion propre des popups
document.addEventListener("DOMContentLoaded", function() {

  document.querySelectorAll(".open-popup").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const popupId = this.dataset.popup;
      document.getElementById(popupId).classList.add("active");
    });
  });

  document.querySelectorAll(".close-popup").forEach(button => {
    button.addEventListener("click", function() {
      this.closest(".popup").classList.remove("active");
    });
  });

});
// ===============================
// POPUPS PREMIUM - Activation après chargement complet
// ===============================
window.addEventListener("load", () => {

  // 1️⃣ Sélectionner toutes les popups
  const popups = document.querySelectorAll(".popup, .pack-popup, .pack-modal");
  popups.forEach(popup => {
    popup.classList.remove("active", "show");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
    popup.style.display = "none"; // pour modals style flex
  });

  // 2️⃣ Ajouter les triggers clics pour toutes les popups
  document.querySelectorAll(".open-popup, .pack-btn, [data-modal-target]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      // Si c'est un lien normal FAQ ou autre, ne rien faire
      if(btn.tagName === "A" && !btn.dataset.popup && !btn.dataset.modalTarget) return;

      // Déterminer la popup
      const popupId = btn.dataset.popup || btn.dataset.modalTarget;
      const popup = document.getElementById(popupId);
      if(!popup) return;

      // Affichage
      popup.classList.add("active", "show");
      popup.style.opacity = "1";
      popup.style.visibility = "visible";
      popup.style.display = "flex"; // ou block selon le style

      // Bloquer scroll page si nécessaire
      document.body.style.overflow = "hidden";
    });
  });

  // 3️⃣ Fermer popup au clic sur X
  document.querySelectorAll(".close-popup, .close-pack, .pack-modal .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      const popup = closeBtn.closest(".popup, .pack-popup, .pack-modal");
      if(!popup) return;

      popup.classList.remove("active", "show");
      popup.style.opacity = "0";
      popup.style.visibility = "hidden";
      popup.style.display = "none";

      document.body.style.overflow = "auto";
    });
  });

  // 4️⃣ Fermer popup si clic en dehors du contenu
  popups.forEach(popup => {
    popup.addEventListener("click", e => {
      if(e.target === popup){
        popup.classList.remove("active", "show");
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
        popup.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // 5️⃣ Fermer popup avec Échap
  document.addEventListener("keydown", e => {
    if(e.key === "Escape"){
      popups.forEach(popup => {
        popup.classList.remove("active", "show");
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
        popup.style.display = "none";
      });
      document.body.style.overflow = "auto";
    }
  });

});
// ================= POPUPS PREMIUM GLASS VOS CHOIX =================
window.addEventListener("load", () => {
  // Récupérer tous les boutons pack
  const packButtons = document.querySelectorAll(".pack-btn");
  const popups = document.querySelectorAll(".pack-content");

  // Ouvrir popup au clic sur un bouton
  packButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const pack = btn.getAttribute("data-pack");
      const targetPopup = document.getElementById(pack);

      // Fermer tous les popups avant d'ouvrir
      popups.forEach(p => p.classList.remove("active"));

      if(targetPopup){
        targetPopup.classList.add("active");
      }
    });
  });

  // Fermer popup au clic sur la croix
  const closeButtons = document.querySelectorAll(".close-pack");
  closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".pack-content").classList.remove("active");
    });
  });

  // Fermer popup au clic en dehors
  document.addEventListener("click", (e) => {
    popups.forEach(popup => {
      if(popup.classList.contains("active") && !popup.contains(e.target) && !e.target.classList.contains("pack-btn")){
        popup.classList.remove("active");
      }
    });
  });

  // Fermer avec Échap
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      popups.forEach(popup => popup.classList.remove("active"));
    }
  });
});
/* ===== LOADER ===== */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(()=>{
    loader.style.opacity="0";
    loader.style.transition="opacity 0.6s ease";

    setTimeout(()=>{
      loader.style.display="none";
    },600)

  },1500)

});
document.addEventListener("DOMContentLoaded", function(){

/* =============================
   CREATION LUNE
============================= */

const moonContainer = document.createElement("div");
moonContainer.id = "moon-container";

const moon = document.createElement("div");
moon.className = "moon";

const shadow = document.createElement("div");
shadow.className = "moon-shadow";

moon.appendChild(shadow);
moonContainer.appendChild(moon);

document.body.appendChild(moonContainer);


/* =============================
   PHASE LUNAIRE REELLE
============================= */

function getMoonPhase(){

const now = new Date();

/* nouvelle lune de référence */
const newMoon = new Date("2024-01-11");

const diff = now - newMoon;

const days = diff / (1000 * 60 * 60 * 24);

/* cycle lunaire */
const phase = days % 29.53;

return phase;

}

function updateMoon(){

const phase = getMoonPhase();

let offset;

/* calcul ombre */

if(phase < 14.76){

offset = (phase / 14.76) * 110;

}else{

offset = ((29.53 - phase) / 14.76) * 110;

}

shadow.style.transform = `translateX(${offset}px)`;

}

updateMoon();


/* =============================
   ETOILES
============================= */

function createStars(){

for(let i=0;i<100;i++){

const star = document.createElement("div");

star.className = "star";

star.style.left = Math.random()*100 + "vw";
star.style.top = Math.random()*100 + "vh";

document.body.appendChild(star);

}

}

createStars();


/* =============================
   MODE NUIT AUTOMATIQUE
============================= */

function nightMode(){

const hour = new Date().getHours();

if(hour >= 19 || hour <= 5){

document.body.classList.add("night");

}

}

nightMode();

});
document.addEventListener('DOMContentLoaded', () => {

  const sky = document.querySelector('.sky');
  const sun = document.querySelector('.sun');
  const moon = document.querySelector('.moon');
  const tempElem = document.querySelector('.temperature');
  const clouds = document.querySelectorAll('.cloud');

  // Simule la météo et le jour/nuit
  const weather = {
    isNight: false, // true = nuit
    temperature: 28, // °C
    cloudsShadow: true
  };

  function updateSky() {
    if(weather.isNight){
      sky.classList.add('night');
      sun.style.opacity = 0;
      moon.classList.add('show-moon');
    } else {
      sky.classList.remove('night');
      sun.style.opacity = 1;
      moon.classList.remove('show-moon');
    }
  }

  function updateTemperature() {
    if(weather.temperature <= 15){
      tempElem.classList.add('cold');
      tempElem.classList.remove('warm');
    } else {
      tempElem.classList.add('warm');
      tempElem.classList.remove('cold');
    }
    // animation légère pour simuler le changement
    tempElem.style.transform = 'scale(1.2)';
    setTimeout(() => tempElem.style.transform = 'scale(1)', 500);
  }

  function updateClouds() {
    clouds.forEach(cloud => {
      if(weather.cloudsShadow){
        cloud.classList.add('cloud-shadow');
      } else {
        cloud.classList.remove('cloud-shadow');
      }
    });
  }

  function updateWeather() {
    updateSky();
    updateTemperature();
    updateClouds();
  }

  // Appel initial
  updateWeather();

  // Exemple : changer la météo toutes les 10 secondes pour démonstration
  setInterval(() => {
    weather.isNight = !weather.isNight;
    weather.temperature = Math.floor(Math.random() * 35); // random temp
    weather.cloudsShadow = !weather.cloudsShadow;
    updateWeather();
  }, 10000);

});

document.addEventListener('DOMContentLoaded', () => {

  const tarifCards = document.querySelectorAll('.tarif-card');
  const popups = document.querySelectorAll('.popup');
  const closeButtons = document.querySelectorAll('.close-popup');

  // Ouvrir popup au clic sur la carte
  tarifCards.forEach(card => {
    card.addEventListener('click', () => {
      const pack = card.getAttribute('data-pack');
      const popup = document.getElementById(`popup-${pack}`);
      if(popup) popup.classList.add('active');
    });
  });

  // Fermer popup au clic sur la croix
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.remove('active');
    });
  });

  // Fermer popup si clic en dehors
  window.addEventListener('click', e => {
    popups.forEach(popup => {
      if (popup.classList.contains('active') &&
          !popup.contains(e.target) &&
          !e.target.classList.contains('tarif-card')) {
        popup.classList.remove('active');
      }
    });
  });

});
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

// sécurité anti bug
if (burger && nav) {

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
    burger.classList.toggle("toggle");
    burger.classList.remove("glow");
  });

  // 🔥 animation attention au chargement
  window.addEventListener("load", () => {
    setTimeout(() => {
      burger.classList.add("glow");
    }, 1200);
  });

  // 🔥 fermer menu si clique lien
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      burger.classList.remove("toggle");
    });
  });

}
// ================= AJOUT ANIMATION PULSE =================
const burgerPulse = document.querySelector(".burger");

if (burgerPulse) {

  // 🔥 lancer pulse après chargement
  window.addEventListener("load", () => {
    setTimeout(() => {
      burgerPulse.classList.add("pulse");
    }, 1200);
  });

  // ❌ enlever pulse quand utilisateur clique
  burgerPulse.addEventListener("click", () => {
    burgerPulse.classList.remove("pulse");
  });

}
// ================= PULSE ROUGE PREMIUM =================
const burgerRed = document.querySelector(".burger");

if (burgerRed) {

  // lancer effet après chargement
  window.addEventListener("load", () => {
    setTimeout(() => {
      burgerRed.classList.add("pulse-red");
    }, 1000);
  });

  // enlever effet au clic
  burgerRed.addEventListener("click", () => {
    burgerRed.classList.remove("pulse-red");
  });

  // 🔥 réactiver après inactivité
  let timeout;
  document.addEventListener("click", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      burgerRed.classList.add("pulse-red");
    }, 5000); // revient après 5s
  });

}
// ================= HAPTIC FEEDBACK PREMIUM ================= 
const burgerHaptic = document.querySelector(".burger");

if (burgerHaptic) {
  burgerHaptic.addEventListener("click", () => {
    // 📳 Vibration ultra douce sur Android
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }

    // 🍏 iOS / devices modernes
    // Note : la plupart des iPhones utilisent l'effet haptique natif sur click automatique, 
    // il n'y a pas de API standard. On laisse juste la vibration Android pour compatibilité.
  });
}

// ================= STYLE LIQUID GLASS POUR NAV =================
const allNavs = document.querySelectorAll('.nav-links');

allNavs.forEach(nav => {
  nav.style.background = "rgba(20, 20, 20, 0.55)";
  nav.style.backdropFilter = "blur(18px) saturate(160%)";
  nav.style.WebkitBackdropFilter = "blur(18px) saturate(160%)";
  nav.style.borderTop = "1px solid rgba(255,255,255,0.08)";
  nav.style.boxShadow = "0 8px 32px rgba(0,0,0,0.6)";
  nav.style.flexDirection = "column";
  nav.style.alignItems = "center";
  nav.style.padding = "20px 0";
  nav.style.zIndex = "99999";
  // cache par défaut
  nav.style.animation = "fadeGlass 0.3s ease";
});

// Ajoute keyframes pour l'animation (une seule fois)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes fadeGlass {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);

// Style pour tous les liens
const allLinks = document.querySelectorAll('.nav-links a');
allLinks.forEach(a => {
  a.style.display = "block";
  a.style.width = "90%";
  a.style.margin = "8px auto";
  a.style.padding = "12px 20px";
  a.style.borderRadius = "12px";
  a.style.color = "white";
  a.style.fontWeight = "500";
  a.style.letterSpacing = "0.5px";
  a.style.background = "rgba(255,255,255,0.05)";
  a.style.border = "1px solid rgba(255,255,255,0.08)";
  a.style.transition = "all 0.3s ease";
  a.style.position = "relative";

  a.addEventListener('mouseenter', () => {
    a.style.background = "rgba(255,255,255,0.12)";
    a.style.transform = "scale(1.05)";
    a.style.boxShadow = "0 4px 20px rgba(255,255,255,0.1)";
  });

  a.addEventListener('mouseleave', () => {
    a.style.background = "rgba(255,255,255,0.05)";
    a.style.transform = "scale(1)";
    a.style.boxShadow = "none";
  });
});



/*=========================================================
BURGER TOOLTIP
=========================================================*/

const burger = document.querySelector(".menu-toggle");

if(burger){

    const tip = document.createElement("div");

    tip.className = "burger-tooltip";

    tip.innerHTML = "👆 Cliquez pour découvrir toutes les pages de GralWebs";

    burger.appendChild(tip);



    setTimeout(()=>{

        tip.classList.add("show");

    },1500);



    setTimeout(()=>{

        tip.classList.remove("show");

    },7000);



    burger.addEventListener("mouseenter",()=>{

        tip.classList.add("show");

    });



    burger.addEventListener("mouseleave",()=>{

        tip.classList.remove("show");

    });

}