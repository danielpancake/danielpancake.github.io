// call when the banner is loaded
const addWarpBanner = () => {
  const banner = document.getElementById("banner");
  if (!banner) return;

  if (document.getElementById("warp")) {
    console.log("Warp banner already exists");
    return;
  }

  const bannerGetWidth = () => {
    return banner.innerWidth || banner.clientWidth;
  }

  const bannerGetHeight = () => {
    return banner.innerHeight || banner.clientHeight;
  }

  // Setup 3d environment
  const clock = new THREE.Clock();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, bannerGetWidth() / bannerGetHeight());

  const renderer = new THREE.WebGLRenderer( { antialias : false } );
  renderer.setClearColor( 0x2020e0, 1 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(bannerGetWidth(), bannerGetHeight());

  // Prepending the canvas to the wrapper div
  let div = banner.getElementsByClassName("wrapper")[0];
  renderer.domElement.setAttribute("id", "warp");
  div.prepend(renderer.domElement);

  const wackyTorusGeometry = new THREE.TorusGeometry(30, 20, 16, 100);
  const wackyTorusMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      uniform float uTime;

      void main() {
        float time = uTime * 0.05;
        vUv = uv;
        vec3 transformed = position;
        transformed.x *= 1.5;
        transformed += sin((position.x / 25.0 - time) * 5.0);
        transformed += cos((position.y / 25.0 - time) * 5.0);
        vPos = transformed;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.5);
      }
    `,

    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      uniform float uTime;
      uniform sampler2D uTexture;

      void main() {
        float time = uTime * 0.05;
        vec2 uv = vUv;
        vec2 repeat = vec2(1.0, 8.0);
        uv = fract(uv * repeat - vec2(time / 3.0, time));
        vec4 tex = texture2D(uTexture, uv);
        tex.a *= clamp(vPos.z / 20.0, 0.0, 1.0);
        gl_FragColor = tex;
      }
    `,

    uniforms: {
      uTime: { value: 0 },
      uTexture: {
        value: new THREE.TextureLoader().load("./images/the-most-creative-i-could-come-up-with.png")
      }
    },
    transparent: true
  });

  const wackyTorus = new THREE.Mesh(wackyTorusGeometry, wackyTorusMaterial);
  wackyTorus.position.z = -20;
  scene.add(wackyTorus);

  // Handling animation of the torus and resizing of the warp frame
  const animateWarpFrame = () => {
    wackyTorusMaterial.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
    requestAnimationFrame(animateWarpFrame);
  }

  const resizeWarpFrame = () => {
    camera.aspect = bannerGetWidth() / bannerGetHeight();
    camera.updateProjectionMatrix();
    renderer.setSize(bannerGetWidth(), bannerGetHeight());
  }

  window.onresize = () => resizeWarpFrame();

  animateWarpFrame();
  resizeWarpFrame();
}

window.onload = makeDoubleDelegate(window.onload, addWarpBanner);
