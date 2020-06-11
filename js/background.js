class Background {
    constructor(element, size) {
        this.shift = 0;

        this.element = element;
        this.size = size;

        this.show();
        setInterval(() => this.show(), 30);
    }

    show () {
        this.shift = --this.shift % this.size;
        this.element.style.backgroundPosition = this.shift + "px " + this.shift + "px";
    };
}

function init() {
    var elements = document.querySelectorAll(".background");

    if (elements != null) {
        var length = elements.length;

        for (var i = 0; i < length; i++) {
            var size = JSON.parse(elements[i].getAttribute("data-size"));
            new Background(elements[i], size);
        }
    }
}

document.addEventListener("DOMContentLoaded", init);