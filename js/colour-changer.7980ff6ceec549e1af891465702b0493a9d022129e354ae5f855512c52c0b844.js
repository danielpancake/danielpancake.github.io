(() => {
  // ns-hugo:/home/runner/work/danielpancake.github.io/danielpancake.github.io/assets/js/modules/common.js
  function chainFunctions(fn1, fn2) {
    return function() {
      if (fn1) fn1();
      if (fn2) fn2();
    };
  }

  // <stdin>
  window.onload = chainFunctions(window.onload, () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      let changeColour = function() {
        for (let colourChanger of colourChangers) {
          if (colourChanger.getBoundingClientRect().top < 10) {
            let colour = colourChanger.dataset.colour;
            metaThemeColor.setAttribute("content", colour);
            appleThemeColor.setAttribute("content", colour);
            break;
          }
        }
      };
      const colourChangers = Array.from(document.getElementsByClassName("colour-changer")).reverse();
      const appleThemeColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      let tick = false;
      window.onscroll = chainFunctions(window.onscroll, () => {
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
})();
