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



/* ================================
   VARIABLES GLOBALES
================================ */


let scene;

let camera;

let renderer;

let avatar;

let mixer;


let clock =
new THREE.Clock();



let canvas =
document.querySelector("#portfolio-canvas");



/* ================================
   CONFIGURATION
================================ */


const CONFIG = {


    modelPath:
    "/models/portrait.glb",


    camera:


    {


        position:

        {

            x:0,

            y:1.6,

            z:5

        },


        fov:45

    },


    avatar:


    {


        scale:1,

        rotationSpeed:0.003

    }


};




/* ================================
   INITIALISATION THREE
================================ */


function initThree(){



    scene =
    new THREE.Scene();



    /*
       Fond transparent
       pour laisser le CSS OLED
       gérer l'ambiance
    */


    scene.background =
    null;




    camera =
    new THREE.PerspectiveCamera(

        CONFIG.camera.fov,

        window.innerWidth /
        window.innerHeight,

        0.1,

        100

    );



    camera.position.set(

        CONFIG.camera.position.x,

        CONFIG.camera.position.y,

        CONFIG.camera.position.z

    );





    renderer =
    new THREE.WebGLRenderer({

        canvas,

        alpha:true,

        antialias:true,

        powerPreference:
        "high-performance"

    });





    renderer.setPixelRatio(

        Math.min(
            window.devicePixelRatio,
            2
        )

    );



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );





    renderer.outputColorSpace =
    THREE.SRGBColorSpace;



    renderer.shadowMap.enabled =
    true;



    renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;




    createLights();



    loadAvatar();



    window.addEventListener(

        "resize",

        resizeRenderer

    );



}





/* ================================
   LUMIERES REALISTES
================================ */


function createLights(){



    /*
       Lumière principale
       type studio
    */


    const keyLight =
    new THREE.DirectionalLight(

        0xffffff,

        2

    );



    keyLight.position.set(

        3,

        5,

        4

    );



    keyLight.castShadow =
    true;



    scene.add(keyLight);





    /*
       Lumière rouge ambiance
       GralWebs identité
    */


    const redLight =
    new THREE.PointLight(

        0xff3030,

        3,

        8

    );



    redLight.position.set(

        -3,

        2,

        2

    );



    scene.add(redLight);






    /*
       Lumière de remplissage
    */


    const fillLight =
    new THREE.HemisphereLight(

        0xffffff,

        0x222222,

        1.5

    );



    scene.add(fillLight);



}





/* ================================
   CHARGEMENT GLB PROGRESSIF
================================ */


function loadAvatar(){



    const loader =
    new GLTFLoader();



    loader.load(


        CONFIG.modelPath,



        function(gltf){



            avatar =
            gltf.scene;



            avatar.scale.set(

                CONFIG.avatar.scale,

                CONFIG.avatar.scale,

                CONFIG.avatar.scale

            );




            avatar.position.set(

                0,

                -1.5,

                0

            );





            avatar.traverse(

                child => {



                    if(child.isMesh){



                        child.castShadow =
                        true;



                        child.receiveShadow =
                        true;



                    }



                }

            );




            scene.add(avatar);




            console.log(

            "Avatar GLB chargé avec succès"

            );



        },



        function(progress){



            const percent =

            (
                progress.loaded /
                progress.total
            ) * 100;



            console.log(

            `Chargement avatar : ${percent.toFixed(0)}%`

            );



        },



        function(error){



            console.error(

            "Erreur chargement GLB",

            error

            );



        }



    );



}





/* ================================
   RESPONSIVE
================================ */


function resizeRenderer(){



    camera.aspect =

    window.innerWidth /
    window.innerHeight;



    camera.updateProjectionMatrix();



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );



}




/* ================================
   DEMARRAGE
================================ */


initThree();



/* FIN PARTIE 1/6 */

/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   portfolio.js
   PARTIE 2/6

   Three.js Scene + GLB Loader + Lighting
========================================================== */


/* ==========================================================
   VARIABLES THREE.JS
========================================================== */

let scene;
let camera;
let renderer;

let avatarModel = null;

let mixer = null;

let clock = new THREE.Clock();


/* ==========================================================
   CONFIGURATION
========================================================== */

const canvas = document.querySelector("#portfolio-canvas");

const MODEL_PATH = "/models/portrait.glb";


/* ==========================================================
   CREATION DE LA SCENE
========================================================== */

function createScene(){

    scene = new THREE.Scene();


    // Fond transparent pour intégrer au design OLED
    scene.background = new THREE.Color(0x050505);


    /*
        Brouillard léger pour profondeur
    */

    scene.fog = new THREE.Fog(
        0x050505,
        8,
        30
    );


}



/* ==========================================================
   CAMERA
========================================================== */


function createCamera(){


    camera = new THREE.PerspectiveCamera(

        45,

        window.innerWidth /
        window.innerHeight,

        0.1,

        100

    );


    camera.position.set(
        0,
        1.7,
        5
    );


    camera.lookAt(
        0,
        1.5,
        0
    );


}



/* ==========================================================
   RENDERER
========================================================== */


function createRenderer(){


    renderer = new THREE.WebGLRenderer({

        canvas:canvas,

        antialias:true,

        alpha:true,

        powerPreference:"high-performance"

    });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;



    renderer.shadowMap.enabled = true;


}




/* ==========================================================
   LUMIERES REALISTES
========================================================== */


function createLights(){



    // Lumière principale studio

    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );


    keyLight.position.set(

        3,
        5,
        5

    );


    keyLight.castShadow=true;


    scene.add(
        keyLight
    );




    // Lumière rouge ambiance GralWebs

    const redLight =
        new THREE.PointLight(

            0xff0033,

            1.5,

            10

        );


    redLight.position.set(

        -3,

        2,

        2

    );


    scene.add(
        redLight
    );





    // Lumière arrière

    const rimLight =
        new THREE.DirectionalLight(

            0xffffff,

            1

        );


    rimLight.position.set(

        0,

        3,

        -4

    );


    scene.add(
        rimLight
    );



}



/* ==========================================================
   CHARGEMENT AVATAR GLB
========================================================== */


function loadAvatar(){


    const loader =
    new THREE.GLTFLoader();



    loader.load(


        MODEL_PATH,



        function(gltf){



            avatarModel =
                gltf.scene;



            avatarModel.scale.set(

                1,

                1,

                1

            );



            avatarModel.position.set(

                0,

                -1.5,

                0

            );



            /*
              Activation ombres
            */

            avatarModel.traverse(
                function(child){

                    if(child.isMesh){

                        child.castShadow=true;

                        child.receiveShadow=true;

                    }

                }
            );



            scene.add(
                avatarModel
            );



            console.log(
                "Avatar GLB chargé"
            );



            /*
                Si le modèle contient
                des animations Mixamo
            */

            if(gltf.animations.length>0){


                mixer =
                new THREE.AnimationMixer(
                    avatarModel
                );


                gltf.animations.forEach(
                    clip=>{

                        const action =
                        mixer.clipAction(
                            clip
                        );


                        action.play();

                    }
                );


            }



            hideLoader();



        },



        function(progress){


            const percent =
            (
                progress.loaded /
                progress.total
            ) * 100;



            updateLoader(
                percent
            );



        },



        function(error){


            console.error(
                "Erreur GLB:",
                error
            );


        }



    );


}




/* ==========================================================
   LOADER VISUEL
========================================================== */


function updateLoader(value){


    const loader =
    document.querySelector(
        ".loading-progress"
    );


    if(loader){

        loader.style.width =
        value+"%";

    }


}



function hideLoader(){


    const screen =
    document.querySelector(
        ".portfolio-loader"
    );


    if(screen){


        gsap.to(
            screen,
            {

                opacity:0,

                duration:1,

                onComplete(){

                    screen.remove();

                }

            }
        );


    }


}



/* ==========================================================
   INITIALISATION COMPLETE
========================================================== */


function initPortfolio3D(){


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



/* ==========================================================
   RESPONSIVE
========================================================== */


function resizePortfolio(){


    camera.aspect =
    window.innerWidth /
    window.innerHeight;


    camera.updateProjectionMatrix();



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );


}



/* ==========================================================
   BOUCLE ANIMATION
========================================================== */


function animate(){


    requestAnimationFrame(
        animate
    );


    const delta =
    clock.getDelta();



    if(mixer){

        mixer.update(
            delta
        );

    }



    /*
       Rotation douce avatar
       (sera remplacée par GSAP scroll)
    */


    if(avatarModel){


        avatarModel.rotation.y +=
        0.002;


    }



    renderer.render(

        scene,

        camera

    );


}



/* ==========================================================
   START
========================================================== */


initPortfolio3D();

/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   portfolio.js
   PARTIE 3/6

   GSAP Scroll Animation
   Avatar Presentation System
========================================================== */


/* ==========================================================
   IMPORT GSAP
========================================================== */


gsap.registerPlugin(
    ScrollTrigger
);



/* ==========================================================
   CONFIGURATION ANIMATION
========================================================== */


const avatarAnimation = {

    startRotation: Math.PI,

    endRotation: 0,


    cameraStartZ: 7,

    cameraEndZ: 4.5,


    cameraStartY: 2,

    cameraEndY:1.7


};




/* ==========================================================
   CREATION TIMELINE PRINCIPALE
========================================================== */


function createPortfolioTimeline(){



    if(!avatarModel){

        console.warn(
            "Avatar non chargé"
        );

        return;

    }




    const timeline = gsap.timeline({

        scrollTrigger:{


            trigger:
            ".portfolio-container",


            start:
            "top top",


            end:
            "+=4000",


            scrub:
            1.5,


            pin:
            true,



        }

    });





    /*
    ======================================================
    ETAPE 1
    Avatar visible de dos
    0% -> 20%
    ======================================================
    */



    timeline.to(

        avatarModel.rotation,

        {


            y:
            avatarAnimation.startRotation,


            duration:1



        },


        0

    );





    /*
    ======================================================
    ETAPE 2
    Rotation vers visage
    20% -> 40%
    ======================================================
    */


    timeline.to(

        avatarModel.rotation,

        {

            y:
            avatarAnimation.endRotation,


            ease:
            "power2.inOut",


            duration:2


        }

    );






    /*
    ======================================================
    ETAPE 3
    Zoom caméra professionnel
    ======================================================
    */


    timeline.to(

        camera.position,

        {


            z:
            avatarAnimation.cameraEndZ,


            y:
            avatarAnimation.cameraEndY,


            ease:
            "power2.out",


            duration:2


        },

        "-=1"



    );





    /*
    ======================================================
    ETAPE 4
    Petit mouvement dynamique
    ======================================================
    */


    timeline.to(

        avatarModel.position,

        {


            x:
            0.35,


            duration:1,


            ease:
            "power3.out"


        }


    );





}




/* ==========================================================
   ANIMATION PAR SECTION
========================================================== */


function createSectionAnimations(){



    const sections =
    document.querySelectorAll(
        ".portfolio-section"
    );



    sections.forEach(
        (section,index)=>{


            ScrollTrigger.create({



                trigger:
                section,



                start:
                "top center",



                onEnter(){



                    animateAvatarState(
                        index
                    );



                }



            });



        }

    );


}





/* ==========================================================
   ETATS AVATAR
========================================================== */


function animateAvatarState(section){



    if(!avatarModel)
    return;



    switch(section){



        /*
        =====================================
        INTRO
        =====================================
        */

        case 0:


            gsap.to(

                avatarModel.rotation,

                {


                    y:0,


                    duration:1.5,


                    ease:
                    "power3.out"


                }

            );


        break;





        /*
        =====================================
        EXPERIENCE
        =====================================
        */


        case 1:


            gsap.to(

                avatarModel.rotation,

                {


                    y:
                    Math.PI / 8,


                    duration:1


                }

            );



        break;







        /*
        =====================================
        TECHNOLOGIES
        =====================================
        */


        case 2:



            gsap.to(

                avatarModel.rotation,

                {


                    y:
                    -Math.PI / 6,


                    duration:1


                }

            );



        break;






        /*
        =====================================
        PROJETS
        =====================================
        */


        case 3:


            gsap.to(

                avatarModel.position,

                {


                    y:
                    -1.3,


                    duration:1


                }


            );



        break;







        /*
        =====================================
        CONTACT
        =====================================
        */


        case 4:



            gsap.to(

                avatarModel.rotation,

                {


                    y:
                    Math.PI,


                    duration:1.5


                }


            );



        break;



    }



}





/* ==========================================================
   EFFET FLOATING AVATAR
========================================================== */


function addFloatingEffect(){



    if(!avatarModel)
    return;



    gsap.to(

        avatarModel.position,

        {


            y:
            -1.35,


            duration:2.5,


            repeat:-1,


            yoyo:true,


            ease:
            "sine.inOut"



        }


    );


}




/* ==========================================================
   CAMERA MOUSE PARALLAX
========================================================== */


function cameraParallax(){



    window.addEventListener(

        "mousemove",

        (event)=>{


            const x =
            (
                event.clientX /
                window.innerWidth
            ) - 0.5;



            const y =
            (
                event.clientY /
                window.innerHeight
            ) - 0.5;





            gsap.to(

                camera.position,

                {


                    x:
                    x * 0.4,


                    y:
                    1.7 -
                    y * 0.3,


                    duration:1


                }

            );



        }

    );



}





/* ==========================================================
   INITIALISATION ANIMATIONS
========================================================== */


function initScrollAnimations(){



    createPortfolioTimeline();


    createSectionAnimations();


    addFloatingEffect();


    cameraParallax();



}



/*
Cette fonction sera appelée après
le chargement du GLB
*/


setTimeout(()=>{


    initScrollAnimations();


},1500);

/* ==========================================================
   GRALWEBS PORTFOLIO 3D
   portfolio.js
   PARTIE 4/6

   External Visual Effects
   (NO GLB MODIFICATION)
========================================================== */


/*
    IMPORTANT :

    Tous les effets sont ajoutés dans la scène
    autour du modèle.

    Le GLB reste intact :
    - matériaux originaux conservés
    - textures intactes
    - animations intactes
    - rig intact
*/



let avatarEffects = {};



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