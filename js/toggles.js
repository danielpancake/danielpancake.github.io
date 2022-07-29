/* This script handles blocks visibility of which can be toggle switched */
const inners = document.getElementsByClassName("inner");
for (let e of inners) {
  e.classList.add("hidden") // Hide all inner elements
  e.addEventListener("transitionend", (event) => {
    // Transition-end listener sets height back to auto
    if (event.propertyName == "height") {
      e.style.height = "auto";
    }
  }, false);
}

const toggles = document.getElementsByClassName("toggle");
for (let e of toggles) {
  const inner = findNextElementByClassName(e, "inner");

  e.addEventListener("click", () => {
    if (e.classList.contains("active")) {
      e.classList.remove("active");

      inner.style.height = getHeight(inner);
      setTimeout(() => { inner.classList.add("hidden") }, 20);
    } else {
      e.classList.add("active");

      const currentHeight = getHeight(inner);
      inner.classList.remove("hidden");
      inner.style.height = "auto";

      const initialHeight = getHeight(inner);
      inner.style.height = currentHeight;
      setTimeout(() => { inner.style.height = initialHeight; }, 20);
    }
  });
}

function findNextElementByClassName(element, className) {
  let next = element.nextElementSibling;
  while (next) {
    if (next.classList.contains(className)) {
      return next;
    }

    next = next.nextElementSibling;
  }
}

const getHeight = (el) => {
  return window.getComputedStyle(el, null).getPropertyValue("height");
};
