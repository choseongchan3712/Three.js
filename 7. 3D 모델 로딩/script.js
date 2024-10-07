//! 1. GLTFLoader 사용: Three.js에서 제공하는 GLTFLoader를 사용해 GLTF 또는 GLB 형식의 3D 모델을 불러옵니다.
//! 2. DamagedHelmet 예제: 위 예제에서는 Three.js에서 제공하는 DamagedHelmet 모델을 로드했습니다. 로컬 파일 또는 다른 URL의 GLTF 파일로 교체할 수 있습니다.
//! 3. 씬에 모델 추가: 로드된 모델을 scene.add()를 통해 씬에 추가하여 렌더링합니다.
//! 4. 조명 추가: 3D 모델을 잘 보이도록 방향성 조명(DirectionalLight)을 추가했습니다.


import * as THREE from 'three';
import { GLTFLoader } from 'three/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//! 씬(Scene), 카메라(Camera), 렌더러(Renderer) 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//! 카메라 위치 조정
camera.position.z = 5;

//! **GLTFLoader로 3D 모델 로드**
const loader = new GLTFLoader();
loader.load('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', 
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);  //? 씬에 모델 추가
    },
    undefined,
    function (error) {
        console.error(error);  //? 로딩 에러 처리
    }
);

//! 조명 추가
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

//! 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
animate();

//! 화면 크기 변경 처리
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


//! 3D 모델 파일 교체
//! GLTF/GLB 형식의 3D 모델을 직접 만들거나 다운로드해서 URL 경로만 바꿔주면 해당 모델을 Three.js 씬에 불러올 수 있습니다.
// loader.load('your-model-path.gltf', function (gltf) {
//   const model = gltf.scene;
//   scene.add(model);
// });
