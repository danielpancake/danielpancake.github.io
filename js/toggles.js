let inners = document.getElementsByClassName("inner");
for (let e of inners) {
    addClass(e, "hidden"); // Hide all inner elements
    e.addEventListener("transitionend", (event) => {
        if (event.propertyName == "height") {
            e.style.height = "auto";
        } // transition end listener sets height back to auto
    }, false);
}

let getHeight = (element) => { return window.getComputedStyle(element, null).getPropertyValue("height"); };

let toggles = document.getElementsByClassName("toggle");
for (let e of toggles) {
    const inner = findNextElementByClassName(e, "inner");
    e.addEventListener("click", () => {
        if (containsClass(e, "active")) {
            removeClass(e, "active");

            inner.style.height = getHeight(inner);
            setTimeout(() => { addClass(inner, "hidden"); }, 20);
        } else {
            addClass(e, "active");
            
            let currentHeight = getHeight(inner);
            removeClass(inner, "hidden");
            inner.style.height = "auto";
            let initialHeight = getHeight(inner);
            inner.style.height = currentHeight;
            setTimeout(() => { inner.style.height = initialHeight; }, 20);
        }
    });
}

function findNextElementByClassName(element, className) {
    var next = element.nextElementSibling;
    while (next) {
        if (containsClass(next, className)) { return next; }
        next = next.nextElementSibling;
    }
}