import * as THREE from 'three'
import OBJLoader from 'three-obj-loader';
import EffectComposer, { RenderPass, ShaderPass } from 'three-effectcomposer-es6'
import { BloomPass, FilmPass } from "postprocessing";
import { FocusShader, DotScreenShader, RGBShiftShader, OrbitControls } from 'three-addons';
import { Stats } from 'three-stats';


let camera, scene, renderer, mesh, renderTarget;

let parent, meshes = [], clonemeshes = [];
let geometry, material;

let composer, effectFocus;
var controls
let clock = new THREE.Clock();
console.log('THREE: ', THREE);
const container = document.getElementById('___gatsby')

let stats;
// init();
// animate();
export function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 2000 );
    console.log('camera: ', camera);
    camera.position.z = 260;
    camera.position.y = 170;

    controls = new OrbitControls( camera );
    controls.enableZoom  = true

    scene = new THREE.Scene();

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    // geometry = new THREE.BoxGeometry( 0.4, 0.4, 0.4 );
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

    // mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    let loader = new THREE.ObjectLoader();
    let x = new OBJLoader(THREE);
    let y = new THREE.OBJLoader();
        console.log(x.load)
    y.load( 'female02.obj', function ( object ) {

        object.scale.x = object.scale.y = object.scale.z = 0.1
        let positions = combineBuffer( object, 'position' );

        let g = new THREE.BufferGeometry();
        mesh = new THREE.Points( g, new THREE.PointsMaterial( { size: 1, color: 0xff9922 } ) );
        camera.target = mesh
        window['m'] = mesh
        g.addAttribute( 'position', positions.clone() );
        g.addAttribute( 'initialPosition', positions.clone() );

        g.attributes.position.setDynamic( true );
        scene.add(mesh)
    } );
    
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
    composer = new EffectComposer( renderer, renderTarget );

    // new
    composer.addPass( new RenderPass( scene, camera ) );
    var effect = new ShaderPass( DotScreenShader );
    effect.uniforms[ 'scale' ].value = 4;
    composer.addPass( effect );
    var effect = new ShaderPass( RGBShiftShader );
    // effect.uniforms[ 'amount' ].value = 0.0015;
    // effect.renderToScreen = true;
    // composer.addPass( effect );

    // old
    let renderModel = new RenderPass( scene, camera );
    let effectBloom = new BloomPass( 10 );
    let effectFilm = new FilmPass( 0.5, 0.5, 1448, false );

    effectFocus = new ShaderPass( FocusShader );

    effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
    effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;

    effectFocus.renderToScreen = true;

    // composer = new EffectComposer( renderer );

    composer.addPass( renderModel );
    composer.addPass( effectBloom );
    composer.addPass( effectFilm );
    composer.addPass( effectFocus );

    scene.add( new THREE.AmbientLight( 0x222222 ) );
    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );

    document.getElementById('___gatsby').appendChild( renderer.domElement );
    
}
    
export function animate() {
    
    requestAnimationFrame( animate );
    
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;
    renderer.render( scene, camera );
    composer.render()
    
}
// export function init() {

//     camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 50000 );
//     camera.position.set( 0, 700, 7000 );

//     scene = new THREE.Scene();
//     scene.background = new THREE.Color( 0x000104 );
//     scene.fog = new THREE.FogExp2( 0x000104, 0.0000675 );

//     camera.lookAt( scene.position );
//     let loader = new THREE.ObjectLoader();
//     let x = new OBJLoader(THREE);
//     let y = new THREE.OBJLoader();

//     console.log('model: ', model);
//     y.load('female02.obj', (a) => {
//         console.log(a)
//     })
//     console.log(x.load)
//     y.load( 'female02.obj', function ( object ) {

//         let positions = combineBuffer( object, 'position' );

//         createMesh( positions, scene, 4.05,  -500, -350,   600, 0xff7744 );
//         createMesh( positions, scene, 4.05,   500, -350,     0, 0xff5522 );
//         createMesh( positions, scene, 4.05,  -250, -350,  1500, 0xff9922 );
//         createMesh( positions, scene, 4.05,  -250, -350, -1500, 0xff99ff );
//         let g = new THREE.BufferGeometry();
//         let m = new THREE.Points( g, new THREE.PointsMaterial( { size: 30, color: 0xff9922 } ) );
//         m.scale.x = m.scale.y = m.scale.z = 4.05;
//         console.log(m,'m')
//         window['m'] = m
//         g.addAttribute( 'position', positions.clone() );
//         g.addAttribute( 'initialPosition', positions.clone() );

//         g.attributes.position.setDynamic( true );
//         scene.add(m)
//     } );

//     // loader.load( 'female02.obj', function ( object ) {

//     //     let positions = combineBuffer( object, 'position' );

//         // createMesh( positions, scene, 4.05, -1000, -350,    0, 0xffdd44 );
//         // createMesh( positions, scene, 4.05,     0, -350,    0, 0xffffff );
//         // createMesh( positions, scene, 4.05,  1000, -350,  400, 0xff4422 );
//         // createMesh( positions, scene, 4.05,   250, -350, 1500, 0xff9955 );
//         // createMesh( positions, scene, 4.05,   250, -350, 2500, 0xff77dd );

//     // } );


//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio( window.devicePixelRatio );
//     renderer.setSize( window.innerWidth,window.innerHeight );
//     renderer.autoClear = false;
//     container.appendChild( renderer.domElement );

//     parent = new THREE.Object3D();
//     scene.add( parent );

//     let grid = new THREE.Points( new THREE.PlaneBufferGeometry( 15000, 15000, 64, 64 ), new THREE.PointsMaterial( { color: 0xff0000, size: 10 } ) );
//     grid.position.y = -400;
//     grid.rotation.x = - Math.PI / 2;
//     parent.add( grid );

//     // postprocessing

//     let renderModel = new RenderPass( scene, camera );
//     let effectBloom = new BloomPass( 1 );
//     let effectFilm = new FilmPass( 0.5, 0.5, 1448, false );

//     console.log('THREE.FocusShader: ', FocusShader);
//     effectFocus = new ShaderPass( FocusShader );

//     effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
//     effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;

//     effectFocus.renderToScreen = true;

//     composer = new EffectComposer( renderer );

//     composer.addPass( renderModel );
//     composer.addPass( effectBloom );
//     composer.addPass( effectFilm );
//     composer.addPass( effectFocus );

//     //stats
//     stats = new Stats();
//     container.appendChild( stats.dom );

//     window.addEventListener( 'resize', onWindowResize, false );
// }
    

// function onWindowResize( event ) {

//     renderer.setSize( window.innerWidth, window.innerHeight );

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     camera.lookAt( scene.position );

//     composer.reset();

//     effectFocus.uniforms[ "screenWidth" ].value = window.innerWidth;
//     effectFocus.uniforms[ "screenHeight" ].value = window.innerHeight;

// }

function combineBuffer( model, bufferName ) {

    let count = 0;

    model.traverse( function ( child ) {

        if ( child.isMesh ) {

            let buffer = child.geometry.attributes[ bufferName ];

            count += buffer.array.length;

        }

    } );

    let combined = new Float32Array(count);

    let offset = 0;

    model.traverse( function ( child ) {

        if ( child.isMesh ) {

            let buffer = child.geometry.attributes[ bufferName ];

            combined.set( buffer.array, offset );
            offset += buffer.array.length;

        }

    } );

    return new THREE.BufferAttribute( combined, 3 );

}

// function createMesh( positions, scene, scale, x, y, z, color ) {

//     let geometry = new THREE.BufferGeometry();
//     geometry.addAttribute( 'position', positions.clone() );
//     geometry.addAttribute( 'initialPosition', positions.clone() );

//     geometry.attributes.position.setDynamic( true );

//     let clones = [

//         [  6000, 0, -4000 ],
//         [  5000, 0, 0 ],
//         [  1000, 0, 5000 ],
//         [  1000, 0, -5000 ],
//         [  4000, 0, 2000 ],
//         [ -4000, 0, 1000 ],
//         [ -5000, 0, -5000 ],

//         [ 0, 0, 0 ]

//     ];

//     for ( let i = 0; i < clones.length; i ++ ) {

//         let c = ( i < clones.length -1 ) ? 0x252525 : color;

//         mesh = new THREE.Points( geometry, new THREE.PointsMaterial( { size: 30, color: c } ) );
//         mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

//         mesh.position.x = x + clones[ i ][ 0 ];
//         mesh.position.y = y + clones[ i ][ 1 ];
//         mesh.position.z = z + clones[ i ][ 2 ];

//         parent.add( mesh );

//         clonemeshes.push( { mesh: mesh, speed: 0.5 + Math.random() } );

//     }

//     meshes.push( {
//         mesh: mesh, verticesDown: 0, verticesUp: 0, direction: 0, speed: 15, delay: Math.floor( 200 + 200 * Math.random() ),
//         start: Math.floor( 100 + 200 * Math.random() ),
//     } );

// }

// export function animate () {

//     requestAnimationFrame( animate );
//     render();
//     stats.update();

// }

// function render () {

//     let delta = 10 * clock.getDelta();

//     delta = delta < 2 ? delta : 2;

//     parent.rotation.y += -0.02 * delta;

//     for( let j = 0; j < clonemeshes.length; j ++ ) {

//         let cm = clonemeshes[ j ];
//         cm.mesh.rotation.y += -0.1 * delta * cm.speed;

//     }

//     for( let j = 0; j < meshes.length; j ++ ) {

//         let data = meshes[ j ];
//         let positions = data.mesh.geometry.attributes.position;
//         let initialPositions = data.mesh.geometry.attributes.initialPosition;

//         let count = positions.count;

//         if ( data.start > 0 ) {

//             data.start -= 1;

//         } else {

//             if ( data.direction === 0 ) {

//                 data.direction = -1;

//             }

//         }

//         for ( let i = 0; i < count; i ++ ) {

//             let px = positions.getX( i );
//             let py = positions.getY( i );
//             let pz = positions.getZ( i );

//             // falling down
//             if ( data.direction < 0 ) {

//                 if ( py > 0 ) {

//                     positions.setXYZ(
//                         i,
//                         px + 1.5 * ( 0.50 - Math.random() ) * data.speed * delta,
//                         py + 3.0 * ( 0.25 - Math.random() ) * data.speed * delta,
//                         pz + 1.5 * ( 0.50 - Math.random() ) * data.speed * delta
//                     );

//                 } else {

//                     data.verticesDown += 1;

//                 }

//             }

//             // rising up
//             if ( data.direction > 0 ) {

//                 let ix = initialPositions.getX( i );
//                 let iy = initialPositions.getY( i );
//                 let iz = initialPositions.getZ( i );

//                 let dx = Math.abs( px - ix );
//                 let dy = Math.abs( py - iy );
//                 let dz = Math.abs( pz - iz );

//                 let d = dx + dy + dx;

//                 if ( d > 1 ) {

//                     positions.setXYZ(
//                         i,
//                         px - ( px - ix ) / dx * data.speed * delta * ( 0.85 - Math.random() ),
//                         py - ( py - iy ) / dy * data.speed * delta * ( 1 + Math.random() ),
//                         pz - ( pz - iz ) / dz * data.speed * delta * ( 0.85 - Math.random() ),
//                     );

//                 } else {

//                     data.verticesUp += 1;

//                 }

//             }

//         }

//         // all vertices down
//         if ( data.verticesDown >= count ) {

//             if ( data.delay <= 0 ) {

//                 data.direction = 1;
//                 data.speed = 5;
//                 data.verticesDown = 0;
//                 data.delay = 320;

//             } else {

//                 data.delay -= 1;

//             }

//         }

//         // all vertices up
//         if ( data.verticesUp >= count ) {

//             if ( data.delay <= 0 ) {

//                 data.direction = -1;
//                 data.speed = 15;
//                 data.verticesUp = 0;
//                 data.delay = 120;

//             } else {

//                 data.delay -= 1;

//             }

//         }

//         positions.needsUpdate = true;

//     }

//     composer.render( 0.01 );

// }