/* This script pseudo-randomly changes the MOTD */
const motd = document.getElementById("motd-printer");

const motdList =
  `Is Cubicus out yet?
  Memes. The DNA of the soul
  This message updates pseudo-randomly once a day`
  .split("\n");

const magicIndex = Math.floor((1 + Math.sin(Math.floor(Date.now() / 86400000))) * 2369482342)
motd.innerHTML = motdList[magicIndex % motdList.length];
