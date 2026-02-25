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
const tarifData = {

"Pack Essentiel": {
title: "Pack Essentiel — À partir de 699 000 Ar",
text: `
<p class="fade-text">Prix d’entrée stratégique pour une présence professionnelle maîtrisée.</p>

<p class="fade-text">🔹 Inclus de base : jusqu’à 5 pages, design responsive, formulaire de contact, intégration WhatsApp et Google Maps.</p>

<p class="fade-text">🔹 Majorations possibles :</p>

<p class="fade-text">• Ajout de pages supplémentaires : +40 000 à 70 000 Ar / page</p>
<p class="fade-text">• Design personnalisé avancé : +80 000 à 150 000 Ar</p>
<p class="fade-text">• Optimisation SEO approfondie : +120 000 Ar</p>
<p class="fade-text">• Animations premium & effets interactifs : +90 000 Ar</p>

<p class="fade-text">💼 Selon les ajustements, le projet peut évoluer jusqu’à 750 000 Ar et plus.</p>
`
},

"Pack Pro": {
title: "Pack Business Pro — À partir de 899 000 Ar",
text: `
<p class="fade-text">Solution optimisée pour la croissance et la performance digitale.</p>

<p class="fade-text">🔹 Inclus : jusqu’à 10 pages, SEO de base, galerie, formulaires avancés, 30 jours support.</p>

<p class="fade-text">🔹 Majorations possibles :</p>

<p class="fade-text">• Branding graphique sur mesure : +150 000 Ar</p>
<p class="fade-text">• Fonctionnalités avancées spécifiques : +200 000 Ar</p>
<p class="fade-text">• Intégration système de réservation : +180 000 Ar</p>
<p class="fade-text">• Optimisation vitesse & sécurité avancée : +130 000 Ar</p>

<p class="fade-text">📈 Projet évolutif pouvant dépasser 1 200 000 Ar selon la complexité.</p>
`
},

"Pack Prémium": {
title: "Pack Premium Evolution — À partir de 2 300 000 Ar",
text: `
<p class="fade-text">L’investissement stratégique pour une domination digitale complète.</p>

<p class="fade-text">🔹 Inclus : multi-langue, SEO avancé, blog, e-commerce possible, support prolongé.</p>

<p class="fade-text">🔹 Majorations possibles :</p>

<p class="fade-text">• E-commerce complet personnalisé : +400 000 Ar</p>
<p class="fade-text">• Système paiement sécurisé international : +350 000 Ar</p>
<p class="fade-text">• Développement fonctionnalité sur mesure : devis personnalisé</p>
<p class="fade-text">• Stratégie SEO avancée + audit complet : +300 000 Ar</p>

<p class="fade-text">🚀 Budget évolutif pouvant dépasser 3 000 000 Ar selon ambition et objectifs.</p>
`
}

};
const tarifPopup = document.getElementById("tarifPopup");
const tarifOverlay = document.querySelector(".tarif-overlay");
const tarifTitle = document.getElementById("tarifTitle");
const tarifContent = document.getElementById("tarifContent");
const tarifClose = document.querySelector(".tarif-close");

/* OUVERTURE AU CLIC SUR CARTES TARIF */
document.querySelectorAll("#tarifs .card").forEach(card => {

card.addEventListener("click", () => {

const title = card.querySelector("h3").innerText;

if(tarifData[title]){
  tarifTitle.innerText = tarifData[title].title;
  tarifContent.innerHTML = tarifData[title].text;
}

tarifPopup.classList.add("active");
tarifOverlay.classList.add("active");

setTimeout(() => {
  document.querySelectorAll(".fade-text").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 200);
  });
}, 300);

});
});

/* FERMETURE */
tarifClose.onclick = closeTarif;
tarifOverlay.onclick = closeTarif;

function closeTarif(){
  tarifPopup.classList.remove("active");
  tarifOverlay.classList.remove("active");
}
document.body.style.overflow = "hidden";
document.addEventListener("DOMContentLoaded", function () {

  const packCards = document.querySelectorAll(".pack-card");
  const packPopups = document.querySelectorAll(".pack-popup");
  const closeButtons = document.querySelectorAll(".close-pack");

  packCards.forEach(card => {
    card.addEventListener("click", () => {

      const packId = card.getAttribute("data-pack");
      const popup = document.getElementById(packId);

      if (popup) {
        popup.classList.add("active");
        document.body.style.overflow = "hidden";
      }

    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".pack-popup").classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  packPopups.forEach(popup => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

});
document.addEventListener("DOMContentLoaded", function() {
  // Ouvre le popup
  const openButtons = document.querySelectorAll("[data-modal-target]");
  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.modalTarget);
      if(target) target.classList.add("show");
    });
  });

  // Ferme le popup
  const closeButtons = document.querySelectorAll(".pack-modal .close");
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".pack-modal").classList.remove("show");
    });
  });

  // Ferme si clic en dehors du contenu
  const modals = document.querySelectorAll(".pack-modal");
  modals.forEach(modal => {
    modal.addEventListener("click", e => {
      if(e.target === modal) modal.classList.remove("show");
    });
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