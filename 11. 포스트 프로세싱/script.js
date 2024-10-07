import * as THREE from 'three';
import { EffectComposer } from 'three/EffectComposer';
import { RenderPass } from 'three/RenderPass';
import { UnrealBloomPass } from 'three/UnrealBloomPass';
import { BokehPass } from 'three/BokehPass';
import { FilmPass } from 'three/FilmPass';
//! Anti-aliasing (계단 현상 방지)
import { ShaderPass } from 'three/ShaderPass';
import { FXAAShader } from 'three/FXAAShader';

// 씬, 카메라, 렌더러 설정
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// 정육면체 생성
const geometry = new THREE.BoxGeometry();

//? (Bloom 효과)
// const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, emissive: 0x0fffff, emissiveIntensity: 1.5 });

const material = new THREE.MeshStandardMaterial({ color: 0x0077ff});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 조명 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);


//! **포스트 프로세싱 설정**
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

//! **UnrealBloomPass** 추가 (Bloom 효과)
// const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
// //? (첫 번째 매개변수: 화면 크기, 두 번째 매개변수: 강도(strength) 값, 높을수록 더 강한 Bloom 효과, 세 번째 매개변수: 반경(radius) 값, 빛이 번지는 반경, 네 번째 매개변수: 임계값(threshold), 이 값보다 밝은 영역만 Bloom 효과가 적용됩니다)
// composer.addPass(bloomPass);

//! BokehPass 설정 (피사계 심도)
// const bokehPass = new BokehPass(scene, camera, {
//   focus: 1.0,        //? 초점 거리
//   aperture: 0.025,   //? 조리개 크기 (작을수록 더 선명)
//   maxblur: 0.01      //? 최대 블러 정도
// });
// composer.addPass(bokehPass);

// //! FilmPass 설정 (필름 그레인 효과)
// const filmPass = new FilmPass(
//   0.8,   //? 노이즈 강도
//   0.325, //? 스캔 라인 강도
//   256,   //? 스캔 라인 카운트
//   false  //? 그레인의 색상 여부 (흑백 or 컬러)
// );
// composer.addPass(filmPass);

//! Anti-aliasing (계단 현상 방지)
const fxaaPass = new ShaderPass(FXAAShader);
const pixelRatio = renderer.getPixelRatio();
fxaaPass.material.uniforms['resolution'].value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));
composer.addPass(fxaaPass);


// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);

  // 정육면체 회전
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 포스트 프로세싱으로 렌더링
  composer.render();
}
animate();

// 화면 크기 변경 처리
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  composer.setSize(window.innerWidth, window.innerHeight);  // composer 크기도 변경
});
























