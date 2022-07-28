// Changes the MOTD pseudo-randomly
var motd = document.getElementById("motd-printer");

var motdList =
`Is Cubicus out yet?
This message updates pseudo-randomly once a day`
  .split("\n");

var magicIndex = Math.floor((1 + Math.sin(Math.floor(Date.now() / 86400000))) * 2369482342)
motd.innerHTML = motdList[magicIndex % motdList.length];
