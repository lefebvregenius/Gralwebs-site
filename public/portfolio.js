
/*=========================================================
    GRALWEBS PORTFOLIO
    portfolio.js (1/3)

    THREE.JS + AVATAR GLB + GSAP SCROLL
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


const CONFIG={


    model:"./models/Avatar.glb",



    camera:{


        fov:35,


        near:0.1,


        far:100,


        position:new THREE.Vector3(

            1.1,

            1.5,

            4

        )


    },



    avatar:{


        scale:2.2,


        position:new THREE.Vector3(

            1.35,

            -1.55,

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




            hideLoader();



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

    Avatar regarde le visiteur
    =========================================
    */


    tl.to(


        avatar.rotation,


        {


            y:Math.PI - 0.45,


            duration:1


        }



    )



    .to(


        avatar.position,


        {


            x:1.05,


            y:-1.45,


            duration:1


        },


        "<"



    )



    .to(


        camera.position,


        {


            x:1.0,


            z:3.5,


            duration:1


        },


        "<"



    );









    /*
    =========================================
    ABOUT → SKILLS

    Rapprochement
    =========================================
    */



    tl.to(


        avatar.rotation,


        {


            y:Math.PI+0.15,


            duration:1


        }



    )



    .to(


        avatar.position,


        {


            x:1.15,


            y:-1.55


        },


        "<"



    )



    .to(


        camera.position,


        {


            z:3


        },


        "<"



    );











    /*
    =========================================
    SKILLS → EXPERIENCE

    Nouvelle vue
    =========================================
    */



    tl.to(


        avatar.rotation,


        {


            y:Math.PI-0.15


        }



    )



    .to(


        avatar.position,


        {


            x:0.95,


            y:-1.40


        },


        "<"



    )



    .to(


        camera.position,


        {


            x:0.75,


            z:2.8


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


            y:Math.PI


        }



    )



    .to(


        avatar.position,


        {


            x:1.25,


            y:-1.50


        },


        "<"



    )



    .to(


        camera.position,


        {


            x:1.1,


            z:3.8


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
BOUCLE THREE.JS
=========================================================*/


renderer.setAnimationLoop(

    animate

);

/*=========================================================
portfolio.js (3/3)

FINITIONS
Optimisations
=========================================================*/


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


/*=========================================================
    GRALWEBS PORTFOLIO
    portfolio.js (3/3)

    FINITIONS
=========================================================*/



/*=========================================================
LOADER
=========================================================*/


function hideLoader(){


    const loader =

    document.getElementById("loader");



    if(!loader)return;



    gsap.to(

        loader,

        {


            opacity:0,


            duration:0.8,


            onComplete(){


                loader.remove();


            }


        }

    );


}







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

"GSAP Scroll actif"

);






/*=========================================================
FIN

✓ 1 Scene
✓ 1 Camera
✓ 1 Renderer
✓ 1 Animation Loop
✓ 1 Avatar.glb
✓ GSAP ScrollTrigger
✓ Avatar visible droite
✓ Scroll storytelling actif

=========================================================*/