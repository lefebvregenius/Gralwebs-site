/* ==========================================================
   PORTFOLIO.JS - PARTIE 1/6

   GralWebs Solutions Portfolio 3D

   Fonction :
   - Initialisation Three.js
   - Chargement Avatar GLB
   - Lumières réalistes
   - Renderer
   - Responsive
   ========================================================== */



/* ================================
   IMPORT THREE.JS
================================ */


import * as THREE from 
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";


import { GLTFLoader } from
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js";



/* ==========================================================
   VARIABLES GLOBALES
========================================================== */

let scene = null;
let camera = null;
let renderer = null;

let avatar = null;
let mixer = null;

const clock = new THREE.Clock();

const canvas = document.getElementById("webgl");

/* ==========================================================
   CONFIGURATION
========================================================== */

const CONFIG = {

    modelPath: "models/Avatar.glb",

    camera: {

        fov: 35,

        near: 0.1,

        far: 100,

        position: {
            x: 1.15,
            y: 1.65,
            z: 3.25
        }

    },

    avatar: {

        scale: 1.55,

        position: {
            x: 0.65,
            y: -1.35,
            z: 0
        },

        rotationSpeed: 0.002

    }

};

/* ==========================================================
   INITIALISATION THREE.JS
========================================================== */

function initThree() {

    scene = new THREE.Scene();

    scene.background = null;

    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );

    camera.position.set(
        CONFIG.camera.position.x,
        CONFIG.camera.position.y,
        CONFIG.camera.position.z
    );

    camera.lookAt(0, 1.3, 0);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

    renderer.setSize(window.innerWidth,window.innerHeight);

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    createLights();

    loadAvatar();

    window.addEventListener("resize",resizeRenderer);

}

/* ==========================================================
   LUMIERES
========================================================== */

function createLights(){

    const ambient = new THREE.AmbientLight(
        0xffffff,
        1.8
    );

    scene.add(ambient);

    const key = new THREE.DirectionalLight(
        0xffffff,
        3
    );

    key.position.set(4,6,5);

    key.castShadow = true;

    scene.add(key);

    const fill = new THREE.DirectionalLight(
        0xff2a55,
        1.5
    );

    fill.position.set(-4,3,2);

    scene.add(fill);

    const rim = new THREE.DirectionalLight(
        0x55ccff,
        1
    );

    rim.position.set(0,4,-5);

    scene.add(rim);

}
/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   AVATAR + LOADER + GSAP
========================================================== */

gsap.registerPlugin(ScrollTrigger);

let avatarModel = null;
let mixer = null;
const clock = new THREE.Clock();

/* ==========================================================
   CONFIG
========================================================== */

const avatarAnimation = {

    startRotation: Math.PI,
    endRotation: 0,

    cameraStartZ: 7,
    cameraEndZ: 4.5,

    cameraStartY: 2,
    cameraEndY: 1.7

};

/* ==========================================================
   CHARGEMENT AVATAR
========================================================== */

function loadAvatar() {

    const loader = new GLTFLoader();

    loader.load(

        CONFIG.modelPath,

        (gltf) => {

            avatarModel = gltf.scene;

            avatarModel.scale.setScalar(CONFIG.avatar.scale);

            avatarModel.position.set(

                CONFIG.avatar.position.x,
                CONFIG.avatar.position.y,
                CONFIG.avatar.position.z

            );

            avatarModel.rotation.y =
                avatarAnimation.startRotation;

            avatarModel.traverse((child) => {

                if (child.isMesh) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            });

            scene.add(avatarModel);

            if (gltf.animations.length > 0) {

                mixer = new THREE.AnimationMixer(
                    avatarModel
                );

                gltf.animations.forEach((clip) => {

                    mixer
                        .clipAction(clip)
                        .play();

                });

            }

            hideLoader();

            createPortfolioTimeline();

            initScrollAnimations();

            console.log("Avatar chargé");

        },

        (progress) => {

            if (progress.total) {

                const percent =
                    (progress.loaded / progress.total) * 100;

                updateLoader(percent);

            }

        },

        (error) => {

            console.error("Erreur GLB :", error);

        }

    );

}

/* ==========================================================
   BARRE DE CHARGEMENT
========================================================== */

function updateLoader(value) {

    const progress = document.querySelector(
        ".loading-progress"
    );

    if (progress) {

        progress.style.width =
            value + "%";

    }

}

/* ==========================================================
   MASQUER LE LOADER
========================================================== */

function hideLoader() {

    const loader = document.querySelector(
        ".portfolio-loader"
    );

    if (!loader) return;

    gsap.to(loader, {

        opacity: 0,
        duration: 1,

        onComplete() {

            loader.remove();

        }

    });

}

/* ==========================================================
   TIMELINE PRINCIPALE
========================================================== */

function createPortfolioTimeline() {

    if (!avatarModel) return;

    gsap.timeline({

        scrollTrigger: {

            trigger: ".portfolio-container",

            start: "top top",

            end: "+=5000",

            scrub: 1.5,

            pin: true,

            anticipatePin: 1

        }

    })

    /* Rotation vers le visage */

    .to(

        avatarModel.rotation,

        {

            y: avatarAnimation.endRotation,

            duration: 3,

            ease: "power2.inOut"

        }

    )

    /* Zoom caméra */

    .to(

        camera.position,

        {

            z: avatarAnimation.cameraEndZ,

            y: avatarAnimation.cameraEndY,

            duration: 3,

            ease: "power2.out"

        },

        "<"

    )

    /* Léger déplacement */

    .to(

        avatarModel.position,

        {

            y: CONFIG.avatar.position.y + 0.15,

            duration: 2,

            ease: "sine.inOut"

        },

        "-=1"

    )

    /* Petit mouvement naturel */

    .to(

        avatarModel.rotation,

        {

            x: 0.05,

            duration: 1,

            repeat: 1,

            yoyo: true,

            ease: "sine.inOut"

        }

    );

}

/* ==========================================================
   RESPONSIVE
========================================================== */

function resizePortfolio() {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

}

/* ==========================================================
   BOUCLE RENDER
========================================================== */

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) {

        mixer.update(delta);

    }

    renderer.render(

        scene,

        camera

    );

}

/* ==========================================================
   INITIALISATION
========================================================== */

function initPortfolio3D() {

    createScene();

    createCamera();

    createRenderer();

    createLights();

    loadAvatar();

    window.addEventListener(

        "resize",

        resizePortfolio

    );

    animate();

}

initPortfolio3D();


   /* ==========================================================
   ETAPE 4
   POSITION PREMIUM
========================================================== */

timeline.to(

    avatarModel.position,

    {

        x: 2.2,
        y: -1.15,

        duration: 2,

        ease: "power3.out"

    },

    "<"

);

/* ==========================================================
   ETAPE 5
   LEGER AGRANDISSEMENT
========================================================== */

timeline.to(

    avatarModel.scale,

    {

        x: CONFIG.avatar.scale * 1.18,
        y: CONFIG.avatar.scale * 1.18,
        z: CONFIG.avatar.scale * 1.18,

        duration: 2,

        ease: "power2.out"

    },

    "<"

);

function createSectionAnimations() {

    document.querySelectorAll(".portfolio-section")

        .forEach((section, index) => {

            ScrollTrigger.create({

                trigger: section,

                start: "top 60%",

                onEnter: () => {

                    animateAvatarState(index);

                }

            });

        });

}

function animateAvatarState(index) {

    if (!avatarModel) return;

    switch (index) {

        case 0:

            gsap.to(avatarModel.rotation, {

                y: 0,

                duration: 1.2,

                ease: "power2.out"

            });

        break;

        case 1:

            gsap.to(avatarModel.rotation, {

                y: Math.PI * 0.08,

                duration: 1.2,

                ease: "power2.out"

            });

        break;

        case 2:

            gsap.to(avatarModel.rotation, {

                y: -Math.PI * 0.12,

                duration: 1.2,

                ease: "power2.out"

            });

        break;

        case 3:

            gsap.to(avatarModel.position, {

                x: 2.35,

                y: -1.05,

                duration: 1.4,

                ease: "power2.out"

            });

        break;

        case 4:

            gsap.to(avatarModel.rotation, {

                y: Math.PI * 0.20,

                duration: 1.5,

                ease: "power2.out"

            });

        break;

    }

}

function addFloatingEffect() {

    if (!avatarModel) return;

    gsap.to(

        avatarModel.position,

        {

            y: "-=0.08",

            duration: 2.8,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        }

    );

    gsap.to(

        avatarModel.rotation,

        {

            z: 0.015,

            duration: 3,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        }

    );

}

function cameraParallax() {

    window.addEventListener("mousemove", (event) => {

        const mouseX =
            (event.clientX / window.innerWidth) - 0.5;

        const mouseY =
            (event.clientY / window.innerHeight) - 0.5;

        gsap.to(

            camera.position,

            {

                x: mouseX * 0.35,

                y: 1.7 - mouseY * 0.18,

                duration: 1.4,

                ease: "power2.out"

            }

        );

        if (avatarModel) {

            gsap.to(

                avatarModel.rotation,

                {

                    y:
                        avatarAnimation.endRotation +
                        mouseX * 0.10,

                    x:
                        mouseY * 0.04,

                    duration: 1.2,

                    ease: "power2.out"

                }

            );

        }

    });

}

function initScrollAnimations() {

    createSectionAnimations();

    addFloatingEffect();

    cameraParallax();

}





/* ==========================================================
   HALO LUMINEUX AUTOUR AVATAR
========================================================== */


function createAvatarHalo(){



    const geometry =
    new THREE.RingGeometry(

        1.5,

        1.55,

        128

    );



    const material =
    new THREE.MeshBasicMaterial({

        color:
        0xff0033,

        transparent:true,

        opacity:
        0.35,

        side:
        THREE.DoubleSide

    });



    const halo =
    new THREE.Mesh(

        geometry,

        material

    );



    halo.rotation.x =
    Math.PI / 2;



    halo.position.set(

        0,

        -1.45,

        0

    );



    scene.add(
        halo
    );



    avatarEffects.halo =
    halo;



}






/* ==========================================================
   ANNEAU ENERGETIQUE ROTATIF
========================================================== */


function createEnergyRing(){



    const geometry =
    new THREE.TorusGeometry(

        1.7,

        0.008,

        16,

        150

    );



    const material =
    new THREE.MeshBasicMaterial({

        color:
        0xff3355,


        transparent:true,


        opacity:
        0.7


    });



    const ring =
    new THREE.Mesh(

        geometry,

        material

    );



    ring.position.set(

        0,

        0,

        0

    );



    scene.add(
        ring
    );



    avatarEffects.ring =
    ring;



}






/* ==========================================================
   PARTICULES FLOTTANTES LEGERE
========================================================== */


function createParticles(){



    const count =
    180;



    const positions =
    new Float32Array(
        count * 3
    );




    for(
        let i=0;
        i<count;
        i++
    ){


        positions[i*3]
        =
        (Math.random()-0.5)
        *5;



        positions[i*3+1]
        =
        Math.random()
        *4
        -1;



        positions[i*3+2]
        =
        (Math.random()-0.5)
        *3;


    }




    const geometry =
    new THREE.BufferGeometry();



    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(

            positions,

            3

        )

    );





    const material =
    new THREE.PointsMaterial({

        color:
        0xffffff,


        size:
        0.015,


        transparent:true,


        opacity:
        0.5


    });




    const particles =
    new THREE.Points(

        geometry,

        material

    );



    scene.add(
        particles
    );



    avatarEffects.particles =
    particles;



}







/* ==========================================================
   LUMIERE QUI SUIT L'AVATAR
========================================================== */


function createFollowLight(){



    const light =
    new THREE.PointLight(

        0xff0033,

        0.8,

        6

    );



    scene.add(
        light
    );



    avatarEffects.followLight =
    light;



}






/* ==========================================================
   ANIMATION DES EFFETS
========================================================== */


function animateAvatarEffects(){



    requestAnimationFrame(
        animateAvatarEffects
    );




    /*
       Rotation anneau
    */


    if(
        avatarEffects.ring
    ){


        avatarEffects.ring.rotation.y
        +=
        0.005;



    }





    /*
       Mouvement particules
    */


    if(
        avatarEffects.particles
    ){


        avatarEffects.particles.rotation.y
        +=
        0.0008;



        avatarEffects.particles.rotation.x
        +=
        0.0003;


    }






    /*
       Respiration lumière
    */


    if(
        avatarEffects.halo
    ){


        const time =
        Date.now()*0.002;



        avatarEffects.halo.material.opacity
        =
        0.25
        +
        Math.sin(time)
        *
        0.1;



    }





    /*
       Position lumière
       attachée au déplacement
       sans toucher au GLB
    */


    if(

        avatarModel &&
        avatarEffects.followLight

    ){


        avatarEffects.followLight.position.copy(

            avatarModel.position

        );


        avatarEffects.followLight.position.y
        +=2;



    }


}







/* ==========================================================
   PROFONDEUR CINEMATIQUE
========================================================== */


function addDepthEffects(){



    const ambient =
    new THREE.HemisphereLight(

        0xffffff,

        0x222222,

        0.6

    );



    scene.add(
        ambient
    );



}








/* ==========================================================
   INITIALISATION
========================================================== */


function initExternalEffects(){



    createAvatarHalo();


    createEnergyRing();


    createParticles();


    createFollowLight();


    addDepthEffects();



    animateAvatarEffects();



}






/*
   Activation après chargement GLB
*/


setTimeout(()=>{


    initExternalEffects();


},2000);

/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   portfolio.js
   PARTIE 5/6

   Portfolio UI 3D System
   Cards + Skills + Timeline
========================================================== */



/* ==========================================================
   DONNEES PORTFOLIO
========================================================== */


const portfolioData = {


    projects:[


        {
            title:
            "GralWebs Solutions",

            description:
            "Création de sites web premium et solutions numériques.",

            tech:[
                "HTML",
                "CSS",
                "JavaScript",
                "Three.js"
            ]

        },



        {

            title:
            "Zarabesso Cloud",

            description:
            "Plateforme cloud média avec stockage et streaming.",

            tech:[

                "Cloudflare R2",
                "API",
                "React",
                "Node.js"

            ]

        },



        {

            title:
            "ASSW Monitoring",

            description:
            "Solution SaaS de surveillance et analyse web.",

            tech:[

                "React",
                "Express",
                "SQLite"

            ]

        }


    ],





    skills:[

        "Three.js",

        "JavaScript",

        "React",

        "CSS",

        "UI/UX",

        "Cloud",

        "SEO"

    ]

};






/* ==========================================================
   CREATION CARTE PROJET 3D
========================================================== */


function createProjectCards(){



    const container =
    document.querySelector(
        ".projects-3d-container"
    );



    if(!container)
    return;




    portfolioData.projects.forEach(

        (project,index)=>{


            const card =
            document.createElement(
                "div"
            );



            card.className =
            "project-card-3d";



            card.innerHTML = `


            <h3>
            ${project.title}
            </h3>


            <p>
            ${project.description}
            </p>


            <div class="tech-list">

            ${
                project.tech
                .map(
                    tech=>
                    `
                    <span>
                    ${tech}
                    </span>
                    `
                )
                .join("")
            }


            </div>


            `;



            container.appendChild(
                card
            );



            animateCard(
                card,
                index
            );



        }


    );



}







/* ==========================================================
   ANIMATION CARTES
========================================================== */


function animateCard(card,index){



    gsap.from(

        card,

        {


            opacity:0,


            y:80,


            rotationX:45,


            duration:1.2,


            delay:
            index*0.2,


            ease:
            "power3.out",



            scrollTrigger:{


                trigger:card,


                start:
                "top 85%"



            }



        }


    );





    /*
      Interaction souris
    */


    card.addEventListener(

        "mousemove",

        (e)=>{


            const rect =
            card.getBoundingClientRect();



            const x =
            e.clientX -
            rect.left;



            const y =
            e.clientY -
            rect.top;




            gsap.to(

                card,

                {


                    rotateY:
                    (x /
                    rect.width
                    -0.5)
                    *20,


                    rotateX:
                    -(y /
                    rect.height
                    -0.5)
                    *20,


                    duration:
                    0.3


                }

            );



        }

    );




    card.addEventListener(

        "mouseleave",

        ()=>{


            gsap.to(

                card,

                {


                    rotateX:0,

                    rotateY:0,

                    duration:0.5


                }

            );


        }

    );



}









/* ==========================================================
   BADGES TECHNOLOGIES FLOTTANTS
========================================================== */


function createSkillBadges(){



    const container =
    document.querySelector(
        ".skills-floating"
    );



    if(!container)
    return;




    portfolioData.skills.forEach(

        (skill,index)=>{


            const badge =
            document.createElement(
                "div"
            );



            badge.className =
            "skill-badge";



            badge.textContent =
            skill;



            container.appendChild(
                badge
            );




            gsap.to(

                badge,

                {


                    y:
                    -20,


                    duration:
                    2+
                    index*0.2,


                    repeat:-1,


                    yoyo:true,


                    ease:
                    "sine.inOut"


                }

            );



        }

    );



}









/* ==========================================================
   TIMELINE EXPERIENCE
========================================================== */


function animateTimeline(){



    const items =
    document.querySelectorAll(

        ".timeline-item"

    );



    items.forEach(

        (item,index)=>{



            gsap.from(

                item,

                {


                    opacity:0,


                    x:
                    index%2===0
                    ?
                    -80
                    :
                    80,



                    duration:1,



                    scrollTrigger:{


                        trigger:item,


                        start:
                        "top 80%"



                    }



                }


            );



        }

    );



}










/* ==========================================================
   PROFONDEUR GLASS EFFECT
========================================================== */


function createGlassMovement(){



    document.querySelectorAll(

        ".glass-panel"

    )

    .forEach(

        panel=>{


            gsap.to(

                panel,

                {


                    backgroundPosition:
                    "200% center",


                    duration:
                    8,


                    repeat:-1,


                    ease:
                    "linear"



                }


            );


        }

    );



}










/* ==========================================================
   INITIALISATION
========================================================== */


function initPortfolioInterface(){



    createProjectCards();


    createSkillBadges();


    animateTimeline();


    createGlassMovement();



}




setTimeout(()=>{


    initPortfolioInterface();


},2500);

/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   portfolio.js
   PARTIE 6/6

   Optimization + Production System
========================================================== */



/* ==========================================================
   DETECTION PERFORMANCE APPAREIL
========================================================== */


const deviceSettings = {


    particles:180,

    shadows:true,

    pixelRatio:2,

    effects:true


};




function detectPerformance(){



    const mobile =
    /Android|iPhone|iPad|iPod/i
    .test(
        navigator.userAgent
    );



    const lowMemory =
    navigator.deviceMemory &&
    navigator.deviceMemory <=4;



    const slowGPU =
    navigator.hardwareConcurrency &&
    navigator.hardwareConcurrency <=4;





    if(
        mobile ||
        lowMemory ||
        slowGPU
    ){


        deviceSettings.particles =
        60;


        deviceSettings.shadows =
        false;


        deviceSettings.pixelRatio =
        1;



        deviceSettings.effects =
        false;



    }



}





detectPerformance();








/* ==========================================================
   OPTIMISATION RENDERER
========================================================== */


function optimizeRenderer(){



    if(!renderer)
    return;



    renderer.setPixelRatio(

        Math.min(

            window.devicePixelRatio,

            deviceSettings.pixelRatio

        )

    );



    renderer.shadowMap.enabled =
    deviceSettings.shadows;



}









/* ==========================================================
   CHARGEMENT PROGRESSIF GLB
========================================================== */


function progressiveModelLoad(){



    if(!avatarModel)
    return;




    avatarModel.traverse(

        object=>{


            if(object.isMesh){


                object.frustumCulled =
                true;



                if(
                    object.material
                ){


                    object.material
                    .precision =
                    "highp";



                }



            }



        }


    );



}










/* ==========================================================
   GESTION VISIBILITE PAGE
========================================================== */


let renderingPaused =
false;




document.addEventListener(

    "visibilitychange",

    ()=>{


        renderingPaused =
        document.hidden;



    }

);









/* ==========================================================
   MODIFICATION BOUCLE ANIMATION
========================================================== */


function optimizedAnimate(){



    requestAnimationFrame(
        optimizedAnimate
    );



    if(
        renderingPaused
    )
    return;




    const delta =
    clock.getDelta();




    if(mixer){

        mixer.update(
            delta
        );

    }





    /*
       Rotation douce uniquement
       si pas contrôlé par GSAP
    */


    if(
        avatarModel &&
        !ScrollTrigger.isScrolling()
    ){


        avatarModel.rotation.y
        +=
        0.0015;



    }




    if(renderer && scene && camera){


        renderer.render(

            scene,

            camera

        );


    }



}









/* ==========================================================
   REDUCTION EFFETS SUR MOBILE
========================================================== */


function optimizeEffects(){



    if(
        deviceSettings.effects
        ===
        false
    ){



        if(
            avatarEffects.halo
        ){

            avatarEffects.halo.visible =
            false;

        }



        if(
            avatarEffects.ring
        ){

            avatarEffects.ring.visible =
            false;

        }



        if(
            avatarEffects.particles
        ){

            avatarEffects.particles.visible =
            false;

        }



    }



}








/* ==========================================================
   CLEAN MEMORY WEBGL
========================================================== */


function disposePortfolio(){



    if(!scene)
    return;




    scene.traverse(

        object=>{


            if(object.geometry){


                object.geometry.dispose();


            }



            if(object.material){



                if(
                    Array.isArray(
                        object.material
                    )
                ){


                    object.material.forEach(

                        mat=>
                        mat.dispose()

                    );


                }

                else{


                    object.material.dispose();


                }



            }



        }

    );





    renderer.dispose();



}









/* ==========================================================
   RESIZE OPTIMISE
========================================================== */


let resizeTimer;



window.addEventListener(

    "resize",

    ()=>{


        clearTimeout(
            resizeTimer
        );



        resizeTimer =
        setTimeout(

            ()=>{


                resizePortfolio();



            },

            200

        );



    }

);









/* ==========================================================
   INITIALISATION FINALE
========================================================== */


function finalizePortfolio(){



    optimizeRenderer();



    progressiveModelLoad();



    optimizeEffects();



    optimizedAnimate();



}





window.addEventListener(

    "beforeunload",

    ()=>{


        disposePortfolio();


    }

);






setTimeout(()=>{


    finalizePortfolio();


},3000);






const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});



const burger =
document.querySelector(".burger");

const menu =
document.querySelector(".mobile-menu");

const overlay =
document.querySelector(".menu-overlay");



burger.onclick=()=>{

    burger.classList.toggle("active");

    menu.classList.toggle("active");

    overlay.classList.toggle("active");

};



overlay.onclick=()=>{

    burger.classList.remove("active");

    menu.classList.remove("active");

    overlay.classList.remove("active");

};

let lastScroll=0;

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".header");

const current=window.pageYOffset;

if(current>lastScroll){

nav.classList.add("hide-nav");

}

else{

nav.classList.remove("hide-nav");

}

lastScroll=current;

});






const burger=document.querySelector(".menu-toggle");
const menu=document.querySelector(".mobile-menu");
const close=document.querySelector(".close-menu");
const overlay=document.querySelector(".menu-overlay");

burger.onclick=()=>{
    menu.classList.add("active");
    overlay.classList.add("active");
}

close.onclick=()=>{
    menu.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.onclick=()=>{
    menu.classList.remove("active");
    overlay.classList.remove("active");
}