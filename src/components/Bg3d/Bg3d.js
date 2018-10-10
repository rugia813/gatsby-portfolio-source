import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6'
import { BloomPass, FilmPass, GlitchPass } from "postprocessing";
import { FocusShader, DotScreenShader, RGBShiftShader, OrbitControls } from 'three-addons';
import { Stats } from 'three-stats';
import TWEEN from "@tweenjs/tween.js";
// import * as dat from 'dat.gui';

let camera, scene, renderer, mesh, renderTarget;

let parent, meshes = [], clonemeshes = [];
let geometry, material, knot;
let step = 0;
let composer, effectFocus;
var controls
let isMobile = false
let clock = new THREE.Clock();
console.log('THREE: ', THREE);
const _window = (typeof window !== 'undefined') ? window : {}
// const container = document.getElementById('___gatsby')

let stats;
// init();
// animate();

const defaultState = {
    radius: 40,
    tube: 9,
    radialSegments: 0,
    tubularSegments: 0,
    p: 5,
    q: 4,
    heightScale: 4,
}
const particleStates = {
    default: defaultState,
    ballBig: {
        radius: 1,
        tube: 10.8,
        radialSegments: 389,
        tubularSegments: 20,
        p: 5,
        q: 8,
        heightScale: 1.6,
    },
    ballSmall: {
        ...defaultState,
        radialSegments: 200,
        radius: 1,
        heightScale: 1,
    },
    logo: {
        radius: 14,
        tube: 2,
        radialSegments: 284,
        tubularSegments: 1,
        p: 5,
        q: 6,
        heightScale: 0.1,
    }
}
const cameraState = {
    default: {
        x: -70,
        y: 5,
        z: 1
    },
    mobile: {
        x: -100,
        y: 15,
        z: 1
    },
    logo: {
        y: -21,
    },
    logoMobile: {
        y: -24,
    },
    apply: function(preset) {
        camera.position.x = preset.x || camera.position.x
        camera.position.y = preset.y || camera.position.y
        camera.position.z = preset.z || camera.position.z
    }
}
camera = new THREE.PerspectiveCamera(45, _window.innerWidth / _window.innerHeight, 0.1, 1000);
cameraState.apply(cameraState.default)
camera.lookAt(new THREE.Vector3(0, 0, 0));
adjustCamPos()

// const gui = new dat.GUI();

export const particleControl = new function () {
    this.radius = defaultState.radius;
    this.tube = defaultState.tube;
    this.radialSegments = defaultState.radialSegments;
    this.tubularSegments = defaultState.tubularSegments;
    this.p = defaultState.p;
    this.q = defaultState.q;
    this.heightScale = defaultState.heightScale;
    this.rotate = true;
    this.move = true;

    this.redraw = function () {
        // remove the old plane
        if (knot) scene.remove(knot);
        // create a new one
        var geom = new THREE.TorusKnotGeometry(particleControl.radius, particleControl.tube, Math.round(particleControl.radialSegments), Math.round(particleControl.tubularSegments), Math.round(particleControl.p), Math.round(particleControl.q));
        geom.scale(particleControl.heightScale, particleControl.heightScale, particleControl.heightScale)
        knot = createParticleSystem(geom);

        // add it to the scene.
        scene.add(knot);
    };

    this.transitToLogo = function(isToLogo) {
        let cState, pState, speed

        if (isToLogo) {
            cState = cameraState.logo
            pState = particleStates.logo
            speed = 250
        } else {
            cState = cameraState.default
            pState = particleStates.ballBig
            speed = 150
        }

        new TWEEN.Tween(camera.position)
            .to(cState, speed)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onComplete(function() {
                if (!isToLogo)
                    particleControl.move = true
            })
            .start();

        new TWEEN.Tween(this)
            .to(pState, speed)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                particleControl.redraw();
            })
            .start();
    }

    this.transitToInit = function(isToInit) {
        let pState, speed

        if (isToInit) {
            pState = particleStates.default
            speed = 500
        } else {
            pState = particleStates.ballBig
            speed = 2000
        }

        new TWEEN.Tween(this)
            .to(pState, speed)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                particleControl.redraw();
            })
            .start();
    }
}

export function init() {
    // controls = new OrbitControls( camera );
    // controls.enableZoom  = true

    scene = new THREE.Scene();

    particleControl.redraw();

    setTimeout(() => {
        // new TWEEN.Tween(particleControl)
        //     // .to(particleStates.ballSmall, 3000)
        //     .to(particleStates.ballBig, 2000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .onUpdate(function() {
        //         particleControl.redraw();
        //     })
        //     .start();
        particleControl.transitToInit(false)
    }, 100);

    // DAT GUI
    // gui.add(particleControl, 'radius', 0, 40).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'tube', 0, 40).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'radialSegments', 0, 600).step(1).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'tubularSegments', 1, 20).step(1).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'p', 1, 10).step(1).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'q', 1, 15).step(1).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'heightScale', 0, 5).onChange(particleControl.redraw).listen();
    // gui.add(particleControl, 'rotate').onChange(particleControl.redraw).listen();
    // gui.add(camera.position, 'x', -100, 100).onChange().listen();
    // gui.add(camera.position, 'y', -100, 100).onChange().listen();
    // gui.add(camera.position, 'z', -100, 100).onChange().listen();

    // gui.remember(particleStates.default)
    // gui.close();
    
    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
    renderer.setSize( _window.innerWidth, _window.innerHeight );

    document.getElementById('___gatsby').appendChild( renderer.domElement );
    
    // Event
    _window.addEventListener('resize', on_WindowResize, false);
    _window.addEventListener('mousemove', onMouseMove, false);
}
    
export function animate() {
    
    requestAnimationFrame( animate );
    
    // mesh && (mesh.rotation.y += 0.02);
    renderer.render( scene, camera );
    // var delta = clock.getDelta();
    // composer.render(delta)
	TWEEN.update();
    if (particleControl.rotate) {
        knot.rotation.y = step += 0.004;
        knot.rotation.z = step += 0.0001;
    }

}

function on_WindowResize() {
    const _width = _window.innerWidth;
    const _height = _window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();

    adjustCamPos()
    console.log('- resize -');
}

function onMouseMove(e) {
    if (!particleControl.move) return
    const { x, y } = e
    const base = getCamRWDPreset()
    camera.position.z = base.z + x / 900
    camera.position.y = base.y - y / 900
}

function adjustCamPos() {
    cameraState.apply(getCamRWDPreset())
}

function getCamRWDPreset() {
    const _width = _window.innerWidth;
    return (_width <= 768) ? cameraState.mobile : cameraState.default
}








function generateSprite() {

    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(200,200,200,1)');
    gradient.addColorStop(0.2, 'rgba(65,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,255,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;

}

function createParticleSystem(geom) {
    var material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        alphaTest: 0.8,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generateSprite()
    });

    var system = new THREE.Points(geom, material);
    system.sortParticles = true;
    return system;
}