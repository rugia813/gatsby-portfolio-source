import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6'
import { BloomPass, FilmPass, GlitchPass } from "postprocessing";
import { FocusShader, DotScreenShader, RGBShiftShader, OrbitControls } from 'three-addons';
import { Stats } from 'three-stats';
import TWEEN from "@tweenjs/tween.js";


let camera, scene, renderer, mesh, renderTarget;

let parent, meshes = [], clonemeshes = [];
let geometry, material, knot;
let step = 0;
let composer, effectFocus;
var controls
let clock = new THREE.Clock();
console.log('THREE: ', THREE);
const container = document.getElementById('___gatsby')

let stats;
// init();
// animate();

const particleControl = new function () {
    this.radius = 40;
    this.tube = 9;
    this.radialSegments = 200;
    this.tubularSegments = 15;
    this.p = 5;
    this.q = 4;
    this.heightScale = 4;
    this.rotate = true;

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
}
console.log('particleControl: ', particleControl);

export function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // controls = new OrbitControls( camera );
    // controls.enableZoom  = true

    scene = new THREE.Scene();

    particleControl.redraw();

    setTimeout(() => {
        new TWEEN.Tween(particleControl)
            .to({ radius: 1, heightScale: 1 }, 3000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                particleControl.redraw();
            })
            .start();
    }, 1500);
    
    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.getElementById('___gatsby').appendChild( renderer.domElement );
    
    window.addEventListener('resize', onWindowResize, false);
}
    
export function animate(time) {
    
    requestAnimationFrame( animate );
    
    // mesh && (mesh.rotation.y += 0.02);
    renderer.render( scene, camera );
    // var delta = clock.getDelta();
    // composer.render(delta)
	TWEEN.update(time);
    if (particleControl.rotate) {
        knot.rotation.y = step += 0.005;
    }

}

function onWindowResize() {
    const _width = window.innerWidth;
    const _height = window.innerHeight;
    renderer.setSize(_width, _height);
    camera.aspect = _width / _height;
    camera.updateProjectionMatrix();
    console.log('- resize -');
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