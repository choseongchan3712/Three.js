//! 1. Cannon.js 월드 생성:

//? new CANNON.World()를 사용해 물리 엔진의 세계를 생성하고, 중력을 설정합니다. world.gravity.set(0, -9.82, 0)에서 중력을 y축으로 -9.82로 설정했어요, 이 값은 지구의 중력과 비슷한 값입니다.

//! 2. Three.js와 Cannon.js의 객체 동기화:

//? Three.js에서는 BoxGeometry와 Mesh로 3D 물체를 생성하고, Cannon.js에서는 CANNON.Box와 CANNON.Body로 물리적인 속성을 가진 물체를 생성합니다.
//? world.step()로 물리 시뮬레이션을 업데이트한 후, boxMesh.position.copy(boxBody.position)을 통해 물리 객체의 위치를 Three.js 객체에 반영합니다.

//! 3. 바닥 객체:

//? 바닥은 질량이 0인 고정된 객체로 설정해, 박스가 바닥에 부딪혀도 바닥은 움직이지 않도록 했습니다.

//! 4. 애니메이션 루프:

//? world.step()을 통해 매 프레임마다 물리 세계를 업데이트하고, 그 결과를 Three.js 객체에 반영해 장면을 렌더링합니다.



import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';


//! Three.js 씬 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;


//! Cannon.js 월드(물리 세계) 생성
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);  //? 중력 설정 (y 방향으로 중력 작용)


//! Three.js와 Cannon.js의 박스 생성
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);


//! Cannon.js의 물리적인 박스 (Body)
const boxShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));  //? Box 크기
const boxBody = new CANNON.Body({
    mass: 1,  //? 질량
    position: new CANNON.Vec3(0, 5, 0),  //? 초기 위치
    shape: boxShape
});
world.addBody(boxBody);


//! 바닥 생성 (Three.js와 Cannon.js)
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.x = - Math.PI / 2;
scene.add(groundMesh);

const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({
    mass: 0  //? 질량 0 (고정된 바닥)
});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);  //? 바닥 각도 조정
world.addBody(groundBody);


//! 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);


//! 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);

  //! Cannon.js 월드 스텝 업데이트
  world.step(1 / 60);  //? 60 FPS로 업데이트

  //! Three.js 박스 위치를 Cannon.js 물리 박스의 위치로 동기화
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  //! 렌더링
  renderer.render(scene, camera);
}
animate();


//! 화면 크기 변경 처리
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
















