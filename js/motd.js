/* This script pseudo-randomly changes the MOTD */
String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length == 0) return hash;
  for (let i = 0; i < this.length; i++) {
    let char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
}

/* https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed */
function shuffle(array, seed) {
  var copy = array.slice(0);
  var n = copy.length;
  var shuffled = new Array(0);

  while (n) {
    var i = Math.floor(random(seed--) * n--);
    shuffled.push(copy.splice(i, 1)[0]);
  }
  return shuffled;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const motd = document.getElementById("motd-printer").getElementsByTagName("p")[0];
if (motd) {
  /* These are not secrets, they are just messages that are randomly displayed */
  const motdList =
    `This message updates pseudo-randomly once a day
    Is Cubicus out yet?
    Memes. The DNA of the soul
    I am a Set It Off fan
    I am a Bo Burnham fan
    I am a Jack Stauber fan
    I am a Tally Hall fan
    I am a My Chemical Romance fan
    The greatest RunWithGuitar fan!
    gamejolt kid
    Cubicus earned me 1.35 dollars so far!
    Hello, world!
    miniDVs and camcorders are my hobby
    Silence speaks every language
    Yo, you are currently at danielpancake.github.io
    THIS IS SMOKE FREE WEB SITE
    The father of The Great Simulation
    The mother of The Great Simulation`.split("\n");

  const motdOneLine = motdList.join("");
  const motdListShuffled = shuffle(motdList, motdOneLine.hashCode());

  const magicIndex = Math.floor(Date.now() / 86400000)
  motd.innerHTML = motdListShuffled[magicIndex % motdListShuffled.length];
}
