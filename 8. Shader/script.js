//! 1. Vertex Shader:

//? **정점(버텍스)**의 위치 데이터를 처리합니다. 이 쉐이더에서는 각 버텍스의 위치를 vPosition이라는 변수에 담아서 Fragment Shader로 전달하고 있습니다.

//! 2. Fragment Shader:

//? 각 픽셀의 색상을 계산합니다. 여기서는 정점의 위치 값(vPosition)을 이용해 색을 설정했습니다. 절대값(abs)을 사용해 RGB 값으로 변환하고, 물체의 좌표에 따라 색이 변화하도록 설정했습니다.

//! 3. ShaderMaterial:

//? ShaderMaterial을 사용해 우리가 작성한 Vertex Shader와 Fragment Shader를 적용한 머티리얼을 정육면체에 적용했습니다.

//! 쉐이더로 할 수 있는 것들
//? 쉐이더를 사용하면 다양한 시각 효과를 구현할 수 있습니다:

//? (1) 빛의 반사, 굴절, 투명도를 세밀하게 제어.
//? (2) 파도, 진동 같은 물체의 동적인 변형.
//? (3) 텍스처를 이용한 고급 효과 (예: 물, 유리, 금속 효과).
//? (4) Noise 함수를 이용해 구름, 불, 연기 같은 자연 현상을 시뮬레이션.

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

//! **Vertex Shader** (정점 쉐이더)
const vertexShader = `
varying vec3 vPosition;  //? Fragment Shader에 전달할 변수
void main() {
    vPosition = position;  //? 정점의 위치를 Fragment Shader에 전달
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

//! **Fragment Shader** (프래그먼트 쉐이더)
const fragmentShader = `
varying vec3 vPosition;  //? Vertex Shader에서 전달된 변수
void main() {
    gl_FragColor = vec4(abs(vPosition), 1.0);  //? 절대값을 사용해 색상 결정
}
`;

//! **ShaderMaterial** 적용
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
});

const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, shaderMaterial);
scene.add(cube);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});