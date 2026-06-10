const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {

card.addEventListener('mousemove',(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = ((x / rect.width) - 0.5) * 10;
const rotateX = ((y / rect.height) - 0.5) * -10;

card.style.transform =
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener('mouseleave',()=>{

card.style.transform =
'perspective(1000px) rotateX(0) rotateY(0)';

});

});


/* ==========================================
   NAVBAR RETRACTABLE
========================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});
/* ==========================================
   BURGER MENU PREMIUM
========================================== */

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {

    burger.classList.toggle("active");
    navLinks.classList.toggle("active");

});

/* Fermeture automatique après clic */

document.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        burger.classList.remove("active");
        navLinks.classList.remove("active");

    });

});


document.addEventListener("click", (e) => {

    if(
        !burger.contains(e.target) &&
        !navLinks.contains(e.target)
    ){

        burger.classList.remove("active");
        navLinks.classList.remove("active");

    }

});