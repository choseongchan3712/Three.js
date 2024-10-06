import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
//? StandardMaterial 사용
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//# MeshStandardMaterial을 사용해, 조명에 따라 색상이 변하는 좀 더 현실적인 머티리얼을 적용했습니다. 기본적으로 MeshBasicMaterial은 조명을 반영하지 않기 때문에 조명을 제대로 활용하려면 MeshStandardMaterial이나 MeshPhongMaterial을 사용해야 합니다.

//! 조명 추가
//? 부드러운 주변광
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//? 강한 점광원
const pointLight = new THREE.PointLight(0xffffff, 1000);
//? 조명의 위치 설정
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

 //! 화면 크기가 변경될 때마다 카메라와 렌더러 크기 조정
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

animate();