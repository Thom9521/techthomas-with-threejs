import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg'),
// });

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(9, 2.5, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x6719b0 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfcf1ae });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('images/me.jpg');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

jeff.position.z = -5;
jeff.position.x = 2;

// Moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


// const moon2 = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );

// scene.add(moon2);

// moon2.position.z = 55;
// moon2.position.setX(-10);
// moon2.position.setY(-1);

// Toucan

const loader = new GLTFLoader();

loader.load( 'toucan/scene.gltf', function ( gltf ) {

  gltf.scene.scale.set(0.25, 0.25, 0.25);
  gltf.scene.rotateY(2.6);
  gltf.scene.position.z = 45;
  gltf.scene.position.setX(-10);
  gltf.scene.position.setY(-1);
	scene.add( gltf.scene );
  gltf.scene.rotation.x += 0.005;

  
function animateToucan() {
  requestAnimationFrame(animateToucan);

  gltf.scene.rotation.x += 0.01;
  gltf.scene.rotation.y += 0.005;
  gltf.scene.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animateToucan();

}, undefined, function ( error ) {

	console.error( error );

} );
// const loader = new THREE.ObjectLoader();

// loader.load('toucan/12260_Bird_Toucan_v3_l2.obj', function(m,g){
// var obj = new THREE.Mesh(g,m);
// scene.add(obj); 
// obj.position.z = 45;
// obj.position.setX(-15);
// obj.position.setY(-1); 
// })
// loader.load('toucan/12260_Bird_Toucan_v3_l2.obj', function ( obj ) {

// 	scene.add(obj);

// },

// // onProgress callback
// function ( xhr ) {
//   console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
// },

// // onError callback
// function ( err ) {
//   console.error( 'An error happened' );
// });
// toucan.position.z = 50;
// toucan.position.setX(-20);
// toucan.position.setY(-1);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  // moon2.rotation.x += 0.05;
  // moon2.rotation.y += 0.075;
  // moon2.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  // moon2.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
