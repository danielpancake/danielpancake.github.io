var inners = document.getElementsByClassName("inner");
for (const element of inners) {
    addClass(element, "hidden");
    element.addEventListener("transitionend", (event) => autoheight(event, element), false);
}

function autoheight(event, element) {
    if (event.propertyName == "height") { element.style.height = "auto"; }
}

var togglers = document.getElementsByClassName("toggler");
for (const element of togglers) {
    element.addEventListener("click",
        function() {
            var inner = findNextElementByClassName(element, "inner");

            if (!containsClass(element, "active")) {
                addClass(element, "active");

                var current_height = window.getComputedStyle(inner, null).getPropertyValue("height");

                removeClass(inner, "hidden");

                inner.style.height = "auto";
                var initial_height = window.getComputedStyle(inner, null).getPropertyValue("height");
                inner.style.height = current_height;

                setTimeout(function() { inner.style.height = initial_height; }, 20);
            } else {
                inner.style.height = window.getComputedStyle(inner, null).getPropertyValue("height");

                removeClass(element, "active");
                setTimeout(function() { addClass(inner, "hidden"); }, 20);
            }
        }
    );
}

function findNextElementByClassName(element, className) {
    var next = element.nextElementSibling;

    while (next) {
        if (containsClass(next, className)) {
            return next;
        }
        
        next = next.nextElementSibling;
    }
}