class Background {
    constructor(element, size, duration) {
        this.element = element;
        this.size = size;
        this.duration = (duration == null ? 10 : duration);
    }

    reset() {
        this.element.style.transition = "none";
        this.element.style.backgroundPosition = "0px 0px";
    };

    show() {
        this.element.style.transition = this.duration + "s linear";
        this.element.style.backgroundPosition = this.size + "px " + this.size + "px";
    };
}

function init() {
    var elements = document.querySelectorAll(".background");

    elements.forEach((element) => {
        var size = JSON.parse(element.getAttribute("data-size"));
        var duration = JSON.parse(element.getAttribute("data-duration"));
        var backgound = new Background(element, size, duration);

        backgound.show();

        element.addEventListener("transitionend", function(event) {
            if (event.propertyName == "background-position-x") {
                backgound.reset();
                setTimeout(() => backgound.show(), 2);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", init);