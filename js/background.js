class Background {
    constructor(element, size) {
        this.shift = 0;

        this.element = element;
        this.size = size;

        this.show();
        setInterval(() => this.show(), 20);
    }

    show () {
        this.shift = (this.shift - 0.5) % this.size;
        
        $(this.element).css({
            "background-position": + this.shift + "px " + this.shift + "px"
        });
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