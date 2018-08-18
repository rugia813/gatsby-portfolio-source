import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6'
import { BloomPass, FilmPass, GlitchPass } from "postprocessing";
import { FocusShader, DotScreenShader, RGBShiftShader, OrbitControls } from 'three-addons';
import { Stats } from 'three-stats';


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
    this.tube = 28.2;
    this.radialSegments = 600;
    this.tubularSegments = 12;
    this.p = 5;
    this.q = 4;
    this.heightScale = 4;
    this.rotate = true;

    this.redraw = function () {
        // remove the old plane
        if (knot) scene.remove(knot);
        // create a new one
        var geom = new THREE.TorusKnotGeometry(particleControl.radius, particleControl.tube, Math.round(particleControl.radialSegments), Math.round(particleControl.tubularSegments), Math.round(particleControl.p), Math.round(particleControl.q), particleControl.heightScale);

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

    controls = new OrbitControls( camera );
    controls.enableZoom  = true

    scene = new THREE.Scene();

    particleControl.redraw();
    
    renderer = new THREE.WebGLRenderer( { antialias: false, alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.getElementById('___gatsby').appendChild( renderer.domElement );
    
}
    
export function animate() {
    
    requestAnimationFrame( animate );
    
    mesh && (mesh.rotation.y += 0.02);
    renderer.render( scene, camera );
    var delta = clock.getDelta();
    // composer.render(delta)

    if (particleControl.rotate) {
        knot.rotation.y = step += 0.01;
    }

}

function generateSprite() {

    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,0.8)');
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
        size: 3,
        alphaTest: 0.5,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generateSprite()
    });

    var system = new THREE.Points(geom, material);
    system.sortParticles = true;
    return system;
}