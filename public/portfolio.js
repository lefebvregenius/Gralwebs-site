/*=========================================================
    GRALWEBS PORTFOLIO
    portfolio.js (1/3)

    - Une seule scène Three.js
    - Un seul Renderer
    - Une seule Camera
    - Chargement unique de Avatar.glb
=========================================================*/

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

import { GLTFLoader } from
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js";

import { OrbitControls } from
"https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);

/*=========================================================
CONFIGURATION
=========================================================*/

const CONFIG = {

    model: "models/Avatar.glb",

    camera:{

        fov:35,

        near:0.1,

        far:100,

        position:new THREE.Vector3(
            0.9,
            1.55,
            3.8
        )

    },

    avatar:{

        scale:1.35,

        position:new THREE.Vector3(
            0.7,
            -1.45,
            0
        ),

        rotation:Math.PI

    }

};

/*=========================================================
VARIABLES
=========================================================*/

const canvas =
document.querySelector("#webgl");

let scene;

let camera;

let renderer;

let controls;

let avatar;

let mixer;

const clock =
new THREE.Clock();

/*=========================================================
INITIALISATION
=========================================================*/

init();

function init(){

    createScene();

    createCamera();

    createRenderer();

    createControls();

    createLights();

    loadAvatar();

    window.addEventListener(
        "resize",
        onResize
    );

}

/*=========================================================
SCENE
=========================================================*/

function createScene(){

    scene =
    new THREE.Scene();

}

/*=========================================================
CAMERA
=========================================================*/

function createCamera(){

    camera =
    new THREE.PerspectiveCamera(

        CONFIG.camera.fov,

        window.innerWidth/
        window.innerHeight,

        CONFIG.camera.near,

        CONFIG.camera.far

    );

    camera.position.copy(

        CONFIG.camera.position

    );

}

/*=========================================================
RENDERER
=========================================================*/

function createRenderer(){

    renderer =
    new THREE.WebGLRenderer({

        canvas,

        alpha:true,

        antialias:true,

        powerPreference:
        "high-performance"

    });

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.setPixelRatio(

        Math.min(

            window.devicePixelRatio,

            2

        )

    );

    renderer.outputColorSpace =
    THREE.SRGBColorSpace;

    renderer.shadowMap.enabled =
    true;

}

/*=========================================================
CONTROLS
(désactivés,
uniquement utiles
pour le développement)
=========================================================*/

function createControls(){

    controls =
    new OrbitControls(

        camera,

        renderer.domElement

    );

    controls.enabled=false;

}

/*=========================================================
LUMIERES
=========================================================*/

function createLights(){

    const ambient =
    new THREE.AmbientLight(

        0xffffff,

        1.8

    );

    scene.add(
        ambient
    );


    const key =
    new THREE.DirectionalLight(

        0xffffff,

        2.6

    );

    key.position.set(

        4,

        5,

        5

    );

    key.castShadow=true;

    scene.add(
        key
    );


    const rim =
    new THREE.DirectionalLight(

        0xff3355,

        1.1

    );

    rim.position.set(

        -4,

        3,

        -2

    );

    scene.add(
        rim
    );

}

/*=========================================================
CHARGEMENT DU GLB
(UNE SEULE FOIS)
=========================================================*/

function loadAvatar(){

    const loader =
    new GLTFLoader();

    loader.load(

        CONFIG.model,

        (gltf)=>{

            avatar =
            gltf.scene;

            avatar.scale.setScalar(

                CONFIG.avatar.scale

            );

            avatar.position.copy(

                CONFIG.avatar.position

            );

            avatar.rotation.y =
            CONFIG.avatar.rotation;

            avatar.traverse(

                mesh=>{

                    if(mesh.isMesh){

                        mesh.castShadow=true;

                        mesh.receiveShadow=true;

                    }

                }

            );

            scene.add(
                avatar
            );

            if(
                gltf.animations.length
            ){

                mixer =
                new THREE.AnimationMixer(
                    avatar
                );

                gltf.animations.forEach(

                    clip=>{

                        mixer
                        .clipAction(clip)
                        .play();

                    }

                );

            }

            document
            .getElementById("loader")
            .style.display="none";

            animate();

        },

        (xhr)=>{

            if(xhr.total){

                const value=
                (xhr.loaded/xhr.total)*100;

                document
                .getElementById("progress")
                .style.width=
                value+"%";

            }

        },

        (error)=>{

            console.error(error);

        }

    );

}

/*=========================================================
portfolio.js (2/3)

Animation
GSAP
ScrollTrigger
Render
=========================================================*/

/*=========================================================
BOUCLE DE RENDU
(UNE SEULE)
=========================================================*/

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) {

        mixer.update(delta);

    }

    renderer.render(scene, camera);

}

/*=========================================================
RESIZE
=========================================================*/

function onResize() {

    camera.aspect =

        window.innerWidth /

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

}

/*=========================================================
TIMELINE PRINCIPALE
=========================================================*/

createScrollAnimation();

function createScrollAnimation() {

    if (!avatar) return;

    gsap.timeline({

        scrollTrigger: {

            trigger: "#about",

            start: "top 80%",

            end: "bottom 20%",

            scrub: 1

        }

    })

    /*=========================================
    HERO → ABOUT
    =========================================*/

    .to(

        avatar.rotation,

        {

            y: Math.PI - 0.35,

            duration: 1

        }

    )

    .to(

        avatar.position,

        {

            x: 0.45,

            y: -1.38,

            duration: 1

        },

        0

    )

    .to(

        camera.position,

        {

            x: 0.55,

            z: 3.25,

            duration: 1

        },

        0

    );



    /*=========================================
    ABOUT → SKILLS
    =========================================*/

    gsap.timeline({

        scrollTrigger: {

            trigger: "#skills",

            start: "top center",

            end: "bottom center",

            scrub: 1

        }

    })

    .to(

        avatar.rotation,

        {

            y: Math.PI + 0.20

        }

    )

    .to(

        avatar.position,

        {

            x: 0.70,

            y: -1.45

        },

        0

    )

    .to(

        camera.position,

        {

            z: 2.90

        },

        0

    );



    /*=========================================
    SKILLS → EXPERIENCE
    =========================================*/

    gsap.timeline({

        scrollTrigger: {

            trigger: "#experience",

            start: "top center",

            end: "bottom center",

            scrub: 1

        }

    })

    .to(

        avatar.rotation,

        {

            y: Math.PI - 0.10

        }

    )

    .to(

        avatar.position,

        {

            x: 0.55,

            y: -1.35

        },

        0

    )

    .to(

        camera.position,

        {

            x: 0.35,

            z: 2.65

        },

        0

    );



    /*=========================================
    EXPERIENCE → CONTACT
    =========================================*/

    gsap.timeline({

        scrollTrigger: {

            trigger: "#contact",

            start: "top center",

            end: "bottom center",

            scrub: 1

        }

    })

    .to(

        avatar.rotation,

        {

            y: Math.PI

        }

    )

    .to(

        avatar.position,

        {

            x: 0.65,

            y: -1.42

        },

        0

    )

    .to(

        camera.position,

        {

            x: 0.80,

            z: 3.50

        },

        0

    );

}

/*=========================================================
LÉGER MOUVEMENT CONTINU
=========================================================*/

gsap.to(

    CONFIG.camera.position,

    {

        y: 1.62,

        duration: 3,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    }

);

/*=========================================================
portfolio.js (3/3)

FINITIONS
Optimisations
=========================================================*/

/*=========================================================
LANCEMENT DES ANIMATIONS
(après chargement du modèle)
=========================================================*/

function startPortfolio() {

    createScrollAnimation();

    introAnimation();

    floatingAnimation();

}

/*=========================================================
ANIMATION D'INTRODUCTION
=========================================================*/

function introAnimation() {

    if (!avatar) return;

    gsap.from(

        avatar.position,

        {

            y: avatar.position.y - 0.35,

            duration: 1.8,

            ease: "power3.out"

        }

    );

    gsap.from(

        avatar.rotation,

        {

            y: avatar.rotation.y + 0.35,

            duration: 2,

            ease: "power2.out"

        }

    );

    gsap.from(

        camera.position,

        {

            z: 5.2,

            duration: 2,

            ease: "power2.out"

        }

    );

}

/*=========================================================
EFFET RESPIRATION
=========================================================*/

function floatingAnimation() {

    if (!avatar) return;

    gsap.to(

        avatar.position,

        {

            y: avatar.position.y + 0.05,

            duration: 2.5,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        }

    );

}

/*=========================================================
LÉGÈRE ROTATION CONTINUE
=========================================================*/

gsap.to(

    CONFIG.avatar,

    {

        rotation: Math.PI + 0.03,

        duration: 4,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        onUpdate() {

            if (avatar) {

                avatar.rotation.y = CONFIG.avatar.rotation;

            }

        }

    }

);

/*=========================================================
PARALLAX SOURIS
=========================================================*/

window.addEventListener(

    "mousemove",

    (event) => {

        if (!avatar) return;

        const x =

            (event.clientX / window.innerWidth - 0.5) * 0.08;

        const y =

            (event.clientY / window.innerHeight - 0.5) * 0.04;

        gsap.to(

            avatar.rotation,

            {

                y: Math.PI + x,

                x: -y,

                duration: 0.6,

                overwrite: true

            }

        );

    }

);

/*=========================================================
AMÉLIORATION DU RENDU
=========================================================*/

renderer.setAnimationLoop(animate);

/*=========================================================
SUPPRESSION DU LOADER
=========================================================*/

function hideLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    gsap.to(

        loader,

        {

            opacity: 0,

            duration: 0.8,

            onComplete() {

                loader.remove();

            }

        }

    );

}

/*=========================================================
MODIFIER LA FIN DE loadAvatar()

Remplace simplement :

document
.getElementById("loader")
.style.display="none";

animate();

par :

=========================================================*/

hideLoader();

startPortfolio();

animate();

/*=========================================================
CONSOLE
=========================================================*/

console.log(

    "%cGRALWEBS PORTFOLIO",

    "color:#ff2b2b;font-size:18px;font-weight:bold"

);

console.log(

    "Three.js initialisé"

);

console.log(

    "Avatar.glb chargé"

);

console.log(

    "GSAP prêt"

);

/*=========================================================
ARCHITECTURE FINALE

✓ 1 Scene
✓ 1 Camera
✓ 1 Renderer
✓ 1 AnimationLoop
✓ 1 GLTFLoader
✓ 1 Avatar.glb
✓ GSAP + ScrollTrigger
✓ Aucun rechargement du modèle
=========================================================*/