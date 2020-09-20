class Background {
    constructor(element, size, duration) {
        this.element = element;
        this.size = size;
        this.duration = duration;
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
        var size = element.dataset.size;
        var duration = (element.dataset.duration == null ? 10 : element.dataset.duration);
        var background = new Background(element, size, duration);

        background.show();

        element.addEventListener("transitionend", function(event) {
            if (event.propertyName == "background-position-x") {
                background.reset();
                setTimeout(() => background.show(), 2);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", init);