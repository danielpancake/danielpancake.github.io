/* This script pseudo-randomly changes the MOTD */
const motd = document.getElementById("motd-printer");

/* These are not secrets, they are just messages that are randomly displayed */
const motdList =
  `This message updates pseudo-randomly once a day
  Is Cubicus out yet?
  Memes. The DNA of the soul
  You currently believe in 1.5 gods
  This line was written by a copilot
  I am a Set It Off fan
  I am a Bo Burnham fan
  I am a Jack Stauber fan
  I am a Tally Hall fan
  Gamejolt is a good website
  Cubicus earned me 1.35 dollars so far!
  Hello, world!
  I love miniDV tapes and camcorders
  Silence speaks every language
  The greatest RunWithGuitar fan!
  Yo, you are currently at danielpancake.github.io
  The father of The Great Simulation
  The mother of The Great Simulation
  Do not speak unless having something to say
  
  `
    .split("\n");

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

// https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
function shuffle(array, seed) {
  var copy = array.slice(0);
  var n = copy.length;
  var shuffled = new Array(0);

  while (n) {
    var i = Math.floor(random(seed--) * n--);
    shuffled.push(copy.splice(i, 1)[0]);
  }

  console.log(shuffled);
  return shuffled;
}

function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const motdOneLine = motdList.join("");
const motdListShuffled = shuffle(motdList, motdOneLine.hashCode());

const magicIndex = Math.floor(Date.now() / 86400000)
motd.innerHTML = motdListShuffled[magicIndex % motdListShuffled.length];
