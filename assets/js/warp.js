/**
 * Initializes the warp banner.
 */

import { chainFunctions } from "./modules/common";
import { warpVertexShader, warpFragmentShader } from "./modules/constants";

// On load because we need to wait for THREE.js to load.
window.onload = chainFunctions(window.onload, () => {
  const banner = document.getElementById("banner");
  if (!banner) return;

  if (document.getElementById("warp")) {
    console.log("Warp banner already exists");
    return;
  }

  const bannerGetWidth = () => {
    return banner.innerWidth || banner.clientWidth;
  };

  const bannerGetHeight = () => {
    return banner.innerHeight || banner.clientHeight;
  };

  // Setup 3D environment
  const clock = new window.THREE.Clock();
  const scene = new window.THREE.Scene();
  const camera = new window.THREE.PerspectiveCamera(100, bannerGetWidth() / bannerGetHeight());

  const renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setClearColor(0x2020e0, 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(bannerGetWidth(), bannerGetHeight());

  // Prepending the canvas to the wrapper div
  let div = banner.getElementsByClassName("wrapper")[0];
  renderer.domElement.setAttribute("id", "warp");
  div.prepend(renderer.domElement);

  // Load and init warp
  const textureLoader = new THREE.TextureLoader();
  // With a chance of 1% load a different texture
  const warpTexture = textureLoader.load((Math.random() < 0.01) ? "./images/warp-weird.png" : "./images/warp.png");

  const wackyTorusGeometry = new THREE.TorusGeometry(32, 24, 24, 128);
  const wackyTorusMaterial = new THREE.ShaderMaterial({
    vertexShader: warpVertexShader,
    fragmentShader: warpFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: warpTexture },
      uRepeat: { value: new THREE.Vector2(1, 8) },
    },
    transparent: true,
  });

  const wackyTorus = new THREE.Mesh(wackyTorusGeometry, wackyTorusMaterial);
  wackyTorus.position.z = -20;

  scene.add(wackyTorus);

  // Load and init fish model
  let fishBlock = null;

  new GLTFLoader().load("./objects/japanese_koi_fish_in_psxps1_style/scene.gltf", (result) => {
    // Retrive the lowest level object
    fishBlock = result.scene.children[0];

    while (fishBlock.children.length > 0) {
      fishBlock = fishBlock.children[0];
    }

    fishBlock.position.y = -1;

    // Make transparent those parts that should be
    fishBlock.material.transparent = true;

    scene.add(fishBlock);
  });

  // Handling torus animation and frame resizing
  const animateWarpFrame = () => {
    wackyTorusMaterial.uniforms.uTime.value = clock.getElapsedTime();

    // Make the fish move forward at an angle (slightly to the right)
    if (fishBlock != null) {
      fishBlock.position.sub(new THREE.Vector3(0, 0, 0.0085));
      fishBlock.position.x = Math.sin(clock.getElapsedTime() / 2) * 3;

      fishBlock.rotation.x = clock.getElapsedTime() / 3;
      fishBlock.rotation.y = clock.getElapsedTime() / 9;

      fishBlock.material.opacity = (fishBlock.position.z + 64) / 74;
      fishBlock.material.opacity = fishBlock.material.opacity * 2 - 1;

      if (fishBlock.position.z < -64) {
        fishBlock.position.z = 10;
      }
    }

    requestAnimationFrame(animateWarpFrame);
    renderer.render(scene, camera);
  };

  const resizeWarpFrame = () => {
    camera.aspect = bannerGetWidth() / bannerGetHeight();
    camera.updateProjectionMatrix();

    renderer.setSize(bannerGetWidth(), bannerGetHeight());
  };

  window.onresize = chainFunctions(window.onresize, resizeWarpFrame);

  animateWarpFrame();
  resizeWarpFrame();
});
