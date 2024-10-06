import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//! 정육면체에 텍스처 추가
const boxGeometry = new THREE.BoxGeometry();
const boxTexture = textureLoader.load('https://threejs.org/examples/textures/crate.gif');  //? 텍스처 이미지 로드(사진이면 다 들어 감)
const boxMaterial = new THREE.MeshStandardMaterial({ map: boxTexture }); //? 텍스처를 적용하려면 map 속성에 로드한 텍스처를 넣으면 됩니다.
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});









