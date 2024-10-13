(() => {
  // ns-hugo:/home/runner/work/danielpancake.github.io/danielpancake.github.io/assets/js/modules/common.js
  function chainFunctions(fn1, fn2) {
    return function() {
      if (fn1) fn1();
      if (fn2) fn2();
    };
  }

  // ns-hugo:/home/runner/work/danielpancake.github.io/danielpancake.github.io/assets/js/modules/constants.js
  var MOTD_LIST = `
  This message updates pseudo-randomly everyday
  most whimsical MOTD
  Hello, world!
  Welcome to the Internet!
  The greatest RunWithGuitar fan!
  my enemy's invisible, I don't know how to fight
  started on gamejolt in 2017
  Cubicus earned me 1.35 dollars so far!
  Is Cubicus out yet?
  Have you met Desmond and Jerk yet?
  The mother of The Great Simulation
  The father of The Great Simulation
  Welcome to the Underground! How was the fall?
  [HYPERLINK] Click here to download more RAM!
  the loveliest lies of all
  Yo, you are currently at [danielpancake.github.io]. We know where you live!
  Do you like my website?
  Mostly lyrics citations
  Keep all viruses away \u2014 get Dr. Helper today!
  Click it! Click it! Click it!
  Internet Ruined Me
  shibe.online does not work anymore
  My possessions are causing me suspicion
  \u{1F34C} Banana man me want a ton \u{1F34C}
  One must imagine danielpancake happy
  I've tasted friendship and it tasted good!
  This website is older than some of my friendships lasted
  don't ask a man to show his Geometry Dash profile
  you gouda be kidding me
  Online interactions not rated by the ESRB
  balls
  monlemonpelemononlemon
  \u{10418}\u{1F91D}\u0D9E
  I made "Burger Kombat". Hate me!
  BITE ME!
  Innopolis graduation ceremony 2025
  half boiled egg \u{1F423}
  Everything just works
  more passion, more passion, more energy, more energy, more footwork, more footwork
  meow meow meow meow
  The mother of all omelettes
`.split("\n");
  var warpVertexShader = `
varying vec2 vUv;
varying vec3 vPos;

uniform float uTime;

void main() {
  float time = uTime * 0.05;
  vec3 transformed = position;

  transformed.x *= 1.5;
  transformed += sin((position.x / 25.0 - time) * 5.0) + cos((position.y / 25.0 - time) * 5.0);

  vPos = transformed;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.5);
}`;
  var warpFragmentShader = `
varying vec2 vUv;
varying vec3 vPos;

uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uRepeat;

void main() {
  float time = uTime * 0.05;

  vec2 smooth_uv = vUv * uRepeat - vec2(time / 3.0, time);
  vec2 uv = fract(smooth_uv);
  vec4 duv = vec4(dFdx(smooth_uv), dFdy(smooth_uv));
  vec4 txl = textureGrad(uTexture, uv, duv.xy, duv.zw);

  txl.a *= clamp(vPos.z / 20.0, 0.0, 1.0);
  gl_FragColor = txl;
}`;

  // <stdin>
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
    const clock = new window.THREE.Clock();
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(100, bannerGetWidth() / bannerGetHeight());
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(2105568, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(bannerGetWidth(), bannerGetHeight());
    let div = banner.getElementsByClassName("wrapper")[0];
    renderer.domElement.setAttribute("id", "warp");
    div.prepend(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    const warpTexture = textureLoader.load(Math.random() < 0.01 ? "./images/warp-weird.png" : "./images/warp.png");
    const wackyTorusGeometry = new THREE.TorusGeometry(32, 24, 24, 128);
    const wackyTorusMaterial = new THREE.ShaderMaterial({
      vertexShader: warpVertexShader,
      fragmentShader: warpFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: warpTexture },
        uRepeat: { value: new THREE.Vector2(1, 8) }
      },
      transparent: true
    });
    const wackyTorus = new THREE.Mesh(wackyTorusGeometry, wackyTorusMaterial);
    wackyTorus.position.z = -20;
    scene.add(wackyTorus);
    let fishBlock = null;
    new GLTFLoader().load("./objects/japanese_koi_fish_in_psxps1_style/scene.gltf", (result) => {
      fishBlock = result.scene.children[0];
      while (fishBlock.children.length > 0) {
        fishBlock = fishBlock.children[0];
      }
      fishBlock.position.y = -1;
      fishBlock.material.transparent = true;
      scene.add(fishBlock);
    });
    const animateWarpFrame = () => {
      wackyTorusMaterial.uniforms.uTime.value = clock.getElapsedTime();
      if (fishBlock != null) {
        fishBlock.position.sub(new THREE.Vector3(0, 0, 85e-4));
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
})();
