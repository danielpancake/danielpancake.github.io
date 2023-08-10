/* This script highlights text character by character */
window.onload = makeDoubleDelegate(window.onload, () => {
  let colours = new Set();

  document.querySelectorAll(".highlight").forEach((e) => {
    const letters = e.textContent.split("");

    e.classList.add("__hglght" + (e.dataset.colour || "#2020e0").substring(1));
    e.textContent = "";

    for (let i = 0; i < letters.length; ++i) {
      const span = document.createElement("span");
      span.innerHTML = letters[i];
      span.style.animationDelay = `${i * 100}ms`;
      e.append(span);
    }

    colours.add(e.dataset.colour || "#2020e0");
  });

  const styles = document.createElement("style");
  styles.innerHTML += ".highlight span{animation:highlighting 20s steps(7) infinite;}@keyframes highlighting{0%,15%,85%,100%{background-color:transparent;}20%,80%{background-color:var(--highlight-colour);color:white;}}";

  colours.forEach((col) => {
    styles.innerHTML += `.__hglght${col.substring(1)} {--highlight-colour: ${col};}`;
  });

  document.getElementsByTagName("head")[0].appendChild(styles);
});

/* Liteweight version of the highlighting */
document.querySelectorAll("#about mark").forEach((e) => {
  e.setAttribute("style",
    `animation-timing-function: steps(${e.textContent.length}, end);` + (e.getAttribute("style") || "")
  );
});
