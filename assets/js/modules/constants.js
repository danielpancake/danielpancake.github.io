/**
 * This module contains static values that are used in other places on the site.
 */

const MOTD_LIST = `
  This message updates pseudo-randomly once a day
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
  Keep all viruses away — get Dr. Helper today!
  Click it! Click it! Click it!
  Internet Ruined Me
  shibe.online does not work anymore
  My possessions are causing me suspicion
  🍌 Banana man me want a ton 🍌
  One must imagine danielpancake happy
  I've tasted friendship and it tasted good!
  This website is older than some of my friendships lasted
  don't ask a man to show his Geometry Dash profile
  you gouda be kidding me
  Online interactions not rated by the ESRB
  balls
  𐐘🤝ඞ
  I made "Burger Kombat". Hate me!
  BITE ME!
  Innopolis graduation ceremony 2025
`.split("\n");

const warpVertexShader = `
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

const warpFragmentShader = `
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

export { MOTD_LIST, warpVertexShader, warpFragmentShader };
