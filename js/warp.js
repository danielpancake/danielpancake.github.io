/* This scripts draws warping background in the home section */
const home = document.getElementById("home");

const homeGetWidth = () => {
  return home.innerWidth || home.clientWidth;
}

const homeGetHeight = () => {
  return home.innerHeight || home.clientHeight;
}

// Setup 3d environment
const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, homeGetWidth() / homeGetHeight());

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x2020e0, 1);
renderer.setSize(home.offsetWidth, home.offsetHeight);

home.prepend(renderer.domElement);

// Create warp scene
const wackyTorusGeometry = new THREE.TorusGeometry(30, 20, 36, 72);
const wackyTorusMaterial = new THREE.ShaderMaterial({
  vertexShader: [
    "varying vec2 vUv;",
    "varying vec3 vPos;",
    "uniform float uTime;",

    "void main() {",
      "float time = uTime * 0.05;",
      "vUv = uv;",

      "vec3 transformed = position;",
      "transformed.x *= 1.5;",
      "transformed += sin((position.x / 25.0 - time) * 5.0);",
      "transformed += cos((position.y / 25.0 - time) * 5.0);",

      "vPos = transformed;",

      "gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.5);",
    "}"
  ].join("\n"),

  fragmentShader: [
    "varying vec2 vUv;",
    "varying vec3 vPos;",
    "uniform float uTime;",
    "uniform sampler2D uTexture;",

    "void main() {",
      "float time = uTime * 0.05;",
      "vec2 uv = vUv;",
      "vec2 repeat = vec2(1.0, 8.0);",
      "uv = fract(uv * repeat - vec2(time / 3.0, time));",
      
      "vec4 tex = texture2D(uTexture, uv);",
      "tex.a *= clamp(vPos.z / 20.0, 0.0, 1.0);",

      "gl_FragColor = tex;",
    "}"
  ].join("\n"),

  uniforms: {
    uTime: { value: 0 },
    uTexture: {
      value: new THREE.TextureLoader().load("./images/genius.png")
    }
  },
  transparent: true
});

const wackyTorus = new THREE.Mesh(wackyTorusGeometry, wackyTorusMaterial);
wackyTorus.position.z = -20;
scene.add(wackyTorus);

// Handling animation of the torus and resizing of the warp frame
const animateWarpFrame = () => {
  renderer.render(scene, camera);
  wackyTorusMaterial.uniforms.uTime.value = clock.getElapsedTime();
  requestAnimationFrame(animateWarpFrame);
}

const resizeWarpFrame = () => {
  camera.aspect = homeGetWidth() / homeGetHeight();
  camera.updateProjectionMatrix();
  renderer.setSize(homeGetWidth(), homeGetHeight());
}

window.onresize = () => resizeWarpFrame();

animateWarpFrame();
resizeWarpFrame();
