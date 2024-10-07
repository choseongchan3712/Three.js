import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';


// 씬(Scene), 카메라(Camera), 렌더러(Renderer) 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

// Cannon.js 물리 세계 생성
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);  // 중력 설정 (y 방향)


//! Three.js와 Cannon.js 물체 추가 함수
function createPhysicsObject(meshGeometry, physicsShape, position, mass, color) {
  //? Three.js의 메쉬 생성
  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(meshGeometry, material);
  mesh.position.copy(position);
  scene.add(mesh);

  //? Cannon.js의 물리적인 바디 생성
  const body = new CANNON.Body({ mass: mass });
  body.addShape(physicsShape);
  body.position.copy(position);
  world.addBody(body);

  return { mesh, body };  //? 메쉬와 바디를 반환해 동기화 가능하게 설정
}


//! 박스 생성
const box = createPhysicsObject(
  new THREE.BoxGeometry(1, 1, 1),  //? Three.js 박스
  new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),  //? Cannon.js 박스
  new THREE.Vector3(-2, 5, 0),  //? 초기 위치
  1,  //? 질량
  0x0077ff  //? 색상
);

//! 구 생성
const sphere = createPhysicsObject(
  new THREE.SphereGeometry(0.5, 32, 32),  //? Three.js 구
  new CANNON.Sphere(0.5),  //? Cannon.js 구
  new THREE.Vector3(2, 5, 0),  //? 초기 위치
  1,  //? 질량
  0xff0000  //? 색상
);

//! 원기둥 생성
const cylinder = createPhysicsObject(
  new THREE.CylinderGeometry(0.5, 0.5, 2, 32),  //? Three.js 원기둥
  new CANNON.Cylinder(0.5, 0.5, 2, 32),  //? Cannon.js 원기둥
  new THREE.Vector3(0, 7, 0),  //? 초기 위치
  1,  //? 질량
  0x00ff00  //? 색상
);


// 바닥 생성 (Three.js 및 Cannon.js)
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;  // 바닥을 수평으로
scene.add(groundMesh);

const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
    mass: 0  // 바닥은 고정 (질량 0)
});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);


// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);

  // Cannon.js 물리 업데이트
  world.step(1 / 60);  // 60 FPS로 물리 업데이트

  // Three.js 메쉬와 Cannon.js 바디 동기화
  [box, sphere, cylinder].forEach(obj => {
      obj.mesh.position.copy(obj.body.position);
      obj.mesh.quaternion.copy(obj.body.quaternion);
  });

  // 렌더링
  renderer.render(scene, camera);
}
animate();


// 화면 크기 변경 처리
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//! 탄성 적용
boxBody.material.restitution = 0.9;  //? 박스의 탄성도를 0.9로 설정
sphereBody.material.restitution = 0.5;  //? 구의 탄성도를 0.5로 설정

