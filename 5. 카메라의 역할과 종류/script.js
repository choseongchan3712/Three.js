// # 1. PerspectiveCamera(원근 카메라)
//% 현실 세계에서 보는 것과 비슷한 방식으로, 가까운 물체는 크게, 먼 물체는 작게 보이도록 렌더링하는 카메라입니다.
//% FOV(시야각), 화면 비율, 가까운 평면과 먼 평면의 거리(클리핑)를 설정할 수 있습니다.
//# 2. OrthographicCamera(직교 카메라)
//% 원근감을 제거한 카메라로, 모든 물체의 크기가 거리와 상관없이 일정하게 보이게 합니다.
//% 건축도면이나 2D 게임의 맵을 그릴 때 유용하게 사용됩니다.

//& 두 카메라 비교 예시

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

//! PerspectiveCamera(원근 카메라) 생성
const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//? PerspectiveCamera(시야각, 화면비율, 가까운 평면, 먼 평면)
perspectiveCamera.position.z = 5;

//! OrthographicCamera(직교 카메라) 생성
const aspectRatio = window.innerWidth / window.innerHeight;
const orthographicCamera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2, 0.1, 1000);
//? OrthographicCamera(왼쪽, 오른쪽, 위, 아래, 가까운 평면, 먼 평면)
orthographicCamera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let usePerspective = true;  //? 처음에는 PerspectiveCamera 사용
function animate() {
    requestAnimationFrame(animate);

    //? 카메라 전환
    const camera = usePerspective ? perspectiveCamera : orthographicCamera;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);

  //? 카메라 화면 비율 업데이트
  perspectiveCamera.aspect = width / height;
  perspectiveCamera.updateProjectionMatrix();

  orthographicCamera.left = -2 * (width / height);
  orthographicCamera.right = 2 * (width / height);
  orthographicCamera.updateProjectionMatrix();
});

//! 카메라 전환 이벤트
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
      usePerspective = !usePerspective;  //? 스페이스바로 카메라 전환
  }
});












