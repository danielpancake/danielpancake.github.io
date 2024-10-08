(() => {
  // ns-hugo:/home/runner/work/danielpancake.github.io/danielpancake.github.io/assets/js/modules/constants.js
  var MOTD_LIST = `
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
  \u{10418}\u{1F91D}\u0D9E
  I made "Burger Kombat". Hate me!
  BITE ME!
  Innopolis graduation ceremony 2025
`.split("\n");

  // ns-hugo:/home/runner/work/danielpancake.github.io/danielpancake.github.io/assets/js/modules/rng.js
  var RNG = class {
    constructor(seed) {
      this.m = 2147483648;
      this.a = 1103515245;
      this.c = 12345;
      this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }
    nextInt() {
      this.state = (this.a * this.state + this.c) % this.m;
      return this.state;
    }
    nextFloat() {
      return this.nextInt() / (this.m - 1);
    }
    nextRange(start, end) {
      var rangeSize = end - start;
      var randomUnder1 = this.nextInt() / this.m;
      return start + Math.floor(randomUnder1 * rangeSize);
    }
    choice(array) {
      return array[this.nextRange(0, array.length)];
    }
  };

  // <stdin>
  (() => {
    const motdParent = document.getElementById("motd-printer");
    if (!motdParent) return;
    const els = motdParent.getElementsByTagName("p");
    if (!els || els.length < 2) return;
    const magicIndex = Math.floor(Date.now() / 864e5);
    const rng = new RNG(magicIndex);
    els[0].innerText = rng.choice(MOTD_LIST);
    els[1].innerText = els[0].innerText;
  })();
})();
