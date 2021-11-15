// import './style.css';
// import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('ball_Normal.png');

// buddha laden
const objLoader = new THREE.OBJLoader();
// Material
const material = new THREE.MeshStandardMaterial();

let bhuddaObj;

// Debug
const gui = new dat.GUI();
gui.close();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
	antialias: true
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

objLoader.load('richy.obj', (o) => {
	o.traverse(function(child) {
		if (child instanceof THREE.Mesh) {
			child.material.color = new THREE.Color(0xffffff);
			child.material.metalness = 1;
			child.roughness = 0.2;
			child.normalMap = normalTexture;
		}
	});

	bhuddaObj = o;

	scene.add(bhuddaObj);
});

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light1
const pointLight2 = new THREE.PointLight(0xffffff, 0.1);
pointLight2.position.set(-1.18, -1.85, 2.32);
pointLight2.intensity = 7.21;
scene.add(pointLight2);

const light1 = gui.addFolder('Light 1');
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const light1Color = { color: 0xff0000 };
light1.addColor(light1Color, 'color').onChange(() => {
	pointLight2.color.set(light1Color.color);
});

// Light2
const pointLight3 = new THREE.PointLight(0xffffff, 0.1);
pointLight3.position.set(2, -0.6, 2.85);
pointLight3.intensity = 8.2;
scene.add(pointLight3);

const light2 = gui.addFolder('Light 2');
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

const light2Color = { color: 0xff0000 };
light2.addColor(light2Color, 'color').onChange(() => {
	pointLight3.color.set(light2Color.color);
});
// Light3
const pointLight4 = new THREE.PointLight(0xffffff, 0.1);
pointLight4.position.set(16, -15, 0);
pointLight4.intensity = 2.03;
scene.add(pointLight4);

const light3 = gui.addFolder('Light 3');
light3.add(pointLight4.position, 'x').min(-16).max(16).step(0.01);
light3.add(pointLight4.position, 'y').min(-16).max(16).step(0.01);
light3.add(pointLight4.position, 'z').min(-16).max(16).step(0.01);
light3.add(pointLight4, 'intensity').min(0).max(10).step(0.01);

const light3Color = { color: 0xff0000 };
light3.addColor(light3Color, 'color').onChange(() => {
	pointLight4.color.set(light3Color.color);
});

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = -6;
camera.position.z = 7;
camera.rotation.x = 45;
camera.rotation.y = 0;
camera.rotation.z = 0;
scene.add(camera);
const cameraFolder = gui.addFolder('camera');
cameraFolder.add(camera.position, 'x').min(-100).max(100).step(0.01);
cameraFolder.add(camera.position, 'y').min(-100).max(100).step(0.01);
cameraFolder.add(camera.position, 'z').min(-100).max(100).step(0.01);

const cameraFolderRot = gui.addFolder('camera rotation');
cameraFolderRot.add(camera.rotation, 'x').min(-90).max(90).step(0.001);
cameraFolderRot.add(camera.rotation, 'y').min(-90).max(90).step(0.001);
cameraFolderRot.add(camera.rotation, 'z').min(-90).max(90).step(0.001);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Animate
 */

document.addEventListener('mousemove', onMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientX - windowHalfY;
}

const clock = new THREE.Clock();

const tick = () => {
	targetX = mouseX * 0.001;
	targetY = mouseY * 0.001;

	const elapsedTime = clock.getElapsedTime();

	if (bhuddaObj) {
		bhuddaObj.rotation.z = 0.75 * elapsedTime;
	}
	// Render
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

tick();
