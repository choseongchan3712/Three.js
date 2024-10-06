import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

//! 씬 생성
const scene = new THREE.Scene();

//! 카메라 생성 (원근 투영)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//? 카메라 뒤로 이동
camera.position.z = 5;

//! 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//! 정육면체(BoxGeometry) 생성
const geometry = new THREE.BoxGeometry();
//? 초록색
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//! 애니메이션 루프 함수
function animate() {
  requestAnimationFrame(animate);

  //? 정육면체 회전
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();