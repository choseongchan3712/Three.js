import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//! BoxGeometry (정육면체)
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.x = -2;  //? 왼쪽으로 이동
scene.add(cube);

//! SphereGeometry (구)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); //? (반지름, 수평 세그먼트, 수직 세그먼트)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 2;  //? 오른쪽으로 이동
scene.add(sphere);

//! TorusGeometry (도넛 모양)
const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);//? (전체반지름, 도넛모양 반지름, 관을 따라 세그먼트, 관 둘레 세그먼트)
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.y = -2;  //? 아래쪽으로 이동
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);


  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

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











