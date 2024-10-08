/**
 * Pseudo-randomly changes the MOTD on the homepage.
 */

import { MOTD_LIST } from "./modules/constants";
import { RNG } from "./modules/rng";

(() => {
  const motdParent = document.getElementById("motd-printer");
  if (!motdParent) return;

  const els = motdParent.getElementsByTagName("p");
  if (!els || els.length < 2) return;

  const magicIndex = Math.floor(Date.now() / 86400000); // once a day
  const rng = new RNG(magicIndex);

  els[0].innerText = rng.choice(MOTD_LIST);
  els[1].innerText = els[0].innerText;
})();
