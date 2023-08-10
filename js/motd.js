/* This script pseudo-randomly changes the MOTD */
String.prototype.hashCode = function () {
  let hash = 0;

  for (let i = 0; i < this.length; i++) {
    let char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
};

/* https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed */
function shuffle(array, seed) {
  let copy = array.slice(0);
  let n = copy.length;
  let shuffled = new Array(0);

  while (n) {
    let i = Math.floor(random(seed--) * n--);
    shuffled.push(copy.splice(i, 1)[0]);
  }

  return shuffled;
}

function random(seed) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const motd = document
  .getElementById("motd-printer")
  .getElementsByTagName("p")[0];
if (motd) {
  /* These are not secrets, they are just messages that are randomly displayed */
  const motdList = `This message updates pseudo-randomly once a day
  🍌 Banana man me want a tan 🍌
  My possessions are causing me suspicion
  Memes. The DNA of the soul
  gamejolt kid since 2017
  Is Cubicus out yet?
  Accuracy 99%. Sanity 0%
  I've tasted friendship and it tasted good!
  Lies, damned lies, and statistics -- but mostly lies
  This is grammer error free web site!
  Cubicus earned me 1.35 dollars so far!
  Welcome to the Internet!
  One must imagine danielpancake happy
  Hello, world!
  Most whimsical MOTD
  Working on "Joka: Businesswave"
  Diese Website läuft mit Wasser und Brezeln. Prost!
  I'm Not Okay (I Promise)
  The greatest RunWithGuitar fan!
  Yo, you are currently at danielpancake.github.io. We know where you live!
  THIS IS SMOKE FREE WEB SITE
  Today's forecast: Cloudy with a chance of runtime errors, because JavaScript
  The father of The Great Simulation
  this website was made with [Pancakes] and [HeartShapedObject]!
  The mother of The Great Simulation
  Today's forecast: a 90% chance of regressions`.split("\n");

  const motdOneLine = motdList.join("");
  const motdListShuffled = shuffle(motdList, motdOneLine.hashCode());

  const magicIndex = Math.floor(Date.now() / 86400000);
  motd.innerHTML = motdListShuffled[magicIndex % motdListShuffled.length];
}
