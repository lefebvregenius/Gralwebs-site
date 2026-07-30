
/*=========================================================
    GRALWEBS PORTFOLIO
    portfolio.js (1/3)

    THREE.JS + AVATAR GLB + GSAP SCROLL
=========================================================*/


import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";



gsap.registerPlugin(ScrollTrigger);





/*=========================================================
CONFIGURATION
=========================================================*/


const CONFIG={


    model:"./models/Avatar.glb",



  camera:{

    fov:32,

    near:0.1,

    far:100,

    position:new THREE.Vector3(

        2.0,

        1.75,

        5.2

    )

},

avatar:{

    scale:3.1,

    position:new THREE.Vector3(

        2.25,

        -2.15,

        -0.25

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

let avatar=null;

let mixer=null;


const clock =
new THREE.Clock();







/*=========================================================
INITIALISATION
=========================================================*/


init();



function init(){


    scene=new THREE.Scene();


    camera=new THREE.PerspectiveCamera(

        CONFIG.camera.fov,

        window.innerWidth/window.innerHeight,

        CONFIG.camera.near,

        CONFIG.camera.far

    );


    camera.position.copy(

        CONFIG.camera.position

    );



    renderer=new THREE.WebGLRenderer({

        canvas,

        alpha:true,

        antialias:true,

        powerPreference:"high-performance"

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



    renderer.outputColorSpace=

    THREE.SRGBColorSpace;




    controls=new OrbitControls(

        camera,

        renderer.domElement

    );


    controls.enabled=false;



    createLights();


    loadAvatar();



    window.addEventListener(

        "resize",

        onResize

    );


}









/*=========================================================
LUMIERES
=========================================================*/


function createLights(){



    scene.add(

        new THREE.AmbientLight(

            0xffffff,

            2

        )

    );



    const light=new THREE.DirectionalLight(

        0xffffff,

        3

    );


    light.position.set(

        5,

        6,

        5

    );


    scene.add(light);





    const rim=new THREE.PointLight(

        0xff3355,

        2,

        10

    );


    rim.position.set(

        -3,

        3,

        -3

    );


    scene.add(rim);


}








/*=========================================================
LOAD AVATAR GLB
=========================================================*/


function loadAvatar(){



    const loader=new GLTFLoader();



    loader.load(


        CONFIG.model,



        (gltf)=>{



            avatar=gltf.scene;





            avatar.scale.setScalar(

                CONFIG.avatar.scale

            );



            avatar.position.copy(

                CONFIG.avatar.position

            );



            avatar.rotation.y=

            CONFIG.avatar.rotation;





            avatar.traverse(

                child=>{


                    if(child.isMesh){


                        child.castShadow=true;


                        child.receiveShadow=true;


                    }


                }


            );



            scene.add(avatar);







            if(gltf.animations.length){



                mixer=new THREE.AnimationMixer(

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







           startPortfolio();

ScrollTrigger.refresh();



/* Démarrage du rendu UNE SEULE FOIS */
renderer.setAnimationLoop(animate);

console.log(
    "Avatar.glb chargé"
);


        },



        xhr=>{


            if(xhr.total){


                const progress=

                xhr.loaded/xhr.total*100;



                const bar=

                document.getElementById(

                    "progress"

                );



                if(bar){

                    bar.style.width=

                    progress+"%";

                }


            }


        },



        error=>{


            console.error(

                "Erreur GLB",

                error

            );


        }


    );


}




/*=========================================================
RESPONSIVE AVATAR
=========================================================*/

function updateAvatarResponsive(){

    if(!avatar) return;

    if(window.innerWidth <= 768){

        avatar.scale.set(
            CONFIG.avatar.scale * 0.32,
            CONFIG.avatar.scale * 0.32,
            CONFIG.avatar.scale * 0.32
        );

        camera.position.z = 4.2;

    }

    else if(window.innerWidth <= 1024){

        avatar.scale.set(
            CONFIG.avatar.scale * 0.38,
            CONFIG.avatar.scale * 0.38,
            CONFIG.avatar.scale * 0.38
        );

        camera.position.z = 4.2;

    }

}

window.addEventListener("resize", updateAvatarResponsive);


/*=========================================================
    GRALWEBS PORTFOLIO
    portfolio.js (2/3)

    Animation
    GSAP
    ScrollTrigger
    Render
=========================================================*/



/*=========================================================
BOUCLE DE RENDU UNIQUE
=========================================================*/


function animate(){


    const delta = clock.getDelta();



    if(mixer){


        mixer.update(delta);


    }



    renderer.render(

        scene,

        camera

    );


}





/*=========================================================
RESIZE
=========================================================*/


function onResize(){



    camera.aspect =

        window.innerWidth /

        window.innerHeight;



    camera.updateProjectionMatrix();



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );



}



window.addEventListener(

    "resize",

    onResize

);





/*=========================================================
SCROLLTELLING AVATAR GLB
UNE SEULE TIMELINE
=========================================================*/

function createScrollAnimation(){

    if(!avatar) return;

    const tl = gsap.timeline({

        scrollTrigger:{

            trigger:"body",

            start:"top top",

            end:"bottom bottom",

            scrub:1.5,

            invalidateOnRefresh:true

        }

    });



    /*
    =========================================
    HERO → ABOUT
    Avatar bien centré à droite
    Visage orienté vers le visiteur
    Taille visuellement réduite
    =========================================
    */

    tl.to(

        avatar.rotation,

        {

            y:0.0,

            duration:1

        }

    )

    .to(

        avatar.position,

        {

            x:0.95,

            y:-1.45,

            z:0,

            duration:1

        },

        "<"

    )
.to(

    avatar.scale,

    {

        x:CONFIG.avatar.scale*0.58,

        y:CONFIG.avatar.scale*0.58,

        z:CONFIG.avatar.scale*0.58,

        duration:1

    },

    "<"

)

    .to(

        camera.position,

        {

            x:0.85,

            z:3.6,

            duration:1

        },

        "<"

    );





    /*
    =========================================
    ABOUT → SKILLS
    Légère rotation uniquement
    =========================================
    */

    tl.to(

        avatar.rotation,

        {

            y:0.10,

            duration:1

        }

    )

    .to(

        avatar.position,

        {

            x:1.00,

            y:-1.50

        },

        "<"

    )

    .to(

        camera.position,

        {

            z:3.15

        },

        "<"

    );





    /*
    =========================================
    SKILLS → EXPERIENCE
    Toujours de face
    =========================================
    */

    tl.to(

        avatar.rotation,

        {

            y:-0.10

        }

    )

    .to(

        avatar.position,

        {

            x:0.90,

            y:-1.42

        },

        "<"

    )

    .to(

        camera.position,

        {

            x:0.70,

            z:2.95

        },

        "<"

    );





    /*
    =========================================
    EXPERIENCE → CONTACT
    Position finale
    =========================================
    */

    tl.to(

        avatar.rotation,

        {

            y:0.0

        }

    )

    .to(

        avatar.position,

        {

            x:1.05,

            y:-1.48

        },

        "<"

    )

    .to(

        camera.position,

        {

            x:0.95,

            z:3.75

        },

        "<"

    );

}







/*=========================================================
INTRO PREMIUM
=========================================================*/


function introAnimation(){



    if(!avatar)return;




    gsap.from(


        avatar.scale,


        {


            x:0.2,


            y:0.2,


            z:0.2,


            duration:1.5,


            ease:"back.out(1.7)"


        }



    );




    gsap.from(


        camera.position,


        {


            z:6,


            duration:2,


            ease:"power3.out"


        }



    );



}









/*=========================================================
MOUVEMENT RESPIRATION
=========================================================*/


function idleAvatarMotion(){



    if(!avatar)return;




    gsap.to(


        avatar.position,


        {


            y:CONFIG.avatar.position.y+0.06,


            duration:2.8,


            repeat:-1,


            yoyo:true,


            ease:"sine.inOut"


        }



    );



}











/*=========================================================
PARALLAX SOURIS
=========================================================*/


window.addEventListener(


"mousemove",


(event)=>{


    if(!avatar)return;




    const mouseX =


    (event.clientX /

    window.innerWidth -0.5)*0.12;




    gsap.to(


        avatar.rotation,


        {


            y:avatar.rotation.y+mouseX,


            duration:0.4,


            overwrite:"auto"


        }



    );



}



);









/*=========================================================
LANCEMENT PORTFOLIO
=========================================================*/


function startPortfolio(){



    createScrollAnimation();



    introAnimation();



    idleAvatarMotion();



    ScrollTrigger.refresh();



}



/*=========================================================
AUTO HIDE NAVBAR
=========================================================*/

const navbar = document.querySelector(".navbar");

if(navbar){

    const hoverZone = document.createElement("div");

    hoverZone.className = "nav-hover-zone";

    document.body.appendChild(hoverZone);

    let lastScroll = 0;

    let isHidden = false;



    function hideNavbar(){

        if(isHidden) return;

        navbar.classList.add("navbar-hidden");

        isHidden = true;

    }



    function showNavbar(){

        if(!isHidden) return;

        navbar.classList.remove("navbar-hidden");

        isHidden = false;

    }



    window.addEventListener("scroll",()=>{

        const current = window.scrollY;

        if(current < 80){

            showNavbar();

            lastScroll = current;

            return;

        }

        if(current > lastScroll){

            hideNavbar();

        }else{

            showNavbar();

        }

        lastScroll = current;

    });



    hoverZone.addEventListener("mouseenter",showNavbar);

    navbar.addEventListener("mouseenter",showNavbar);

    navbar.addEventListener("mouseleave",()=>{

        if(window.scrollY > 80){

            hideNavbar();

        }

    });

}

