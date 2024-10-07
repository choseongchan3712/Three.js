//! 1. 애니메이션 만들기 (requestAnimationFrame 사용)
//? Three.js에서 애니메이션을 만드는 방법은 아주 간단합니다. requestAnimationFrame()을 사용해 프레임마다 렌더링을 반복하는 애니메이션 루프를 구성하면 됩니다. 지금까지 우리가 사용했던 애니메이션도 이 방식으로 구현되었습니다.
//! 2. 사용자 상호작용 (마우스, 키보드)
//? Three.js에서 제공하는 OrbitControls를 이용해 마우스를 사용한 카메라 제어를 추가할 수 있습니다. 이를 통해 사용자가 카메라를 회전, 줌, 팬으로 조작할 수 있게 되죠. 또한, Three.js에서는 키보드 입력도 쉽게 처리할 수 있어서 물체를 이동시키거나 회전하는 상호작용을 구현할 수 있습니다.


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//! HTML에서 importmap 사용함
{/* <script type="importmap">
    {
        "imports": {
            "three": "https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js",
            "three/examples/jsm/controls/OrbitControls": "https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js"
        }
    }
</script> */}


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

//! OrbitControls 추가** (마우스 상호작용)
const controls = new OrbitControls(camera, renderer.domElement);

//! 애니메이션 생성
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();  //! 카메라 제어 업데이트
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//! 키보드 입력 처리
window.addEventListener('keydown', (event) => {
  switch (event.key) {
      case 'ArrowUp':
          cube.position.y += 0.1;  //? 위로 이동
          break;
      case 'ArrowDown':
          cube.position.y -= 0.1;  //? 아래로 이동
          break;
      case 'ArrowLeft':
          cube.position.x -= 0.1;  //? 왼쪽으로 이동
          break;
      case 'ArrowRight':
          cube.position.x += 0.1;  //? 오른쪽으로 이동
          break;
  }
});
