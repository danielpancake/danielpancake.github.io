// Mobile Theme Color Changer
//
// Changes the theme color meta tags on scroll
// to match section-specific colors
//
// Assumptions:
// - Color changer elements have 'data-color' with the color value
// - Only enables on mobile devices
//
// Limitations:
// - Only tested on Android Chrome
// - Doesn't work on non-mobile browsers
//
window.onload = makeDoubleDelegate(window.onload, () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const colourChangers = Array.from(document.getElementsByClassName("colour-changer")).reverse();
    const appleThemeColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    let tick = false;

    function changeColour() {
      for (let colourChanger of colourChangers) {
        if (colourChanger.getBoundingClientRect().top < 10) {
          let colour = colourChanger.dataset.colour;

          metaThemeColor.setAttribute("content", colour);
          appleThemeColor.setAttribute("content", colour);

          break;
        }
      }
    }

    window.onscroll = makeDoubleDelegate(window.onscroll, () => {
      if (!tick) {
        window.requestAnimationFrame(() => {
          changeColour();
          tick = false;
        });

        tick = true;
      }
    });
  }
});
