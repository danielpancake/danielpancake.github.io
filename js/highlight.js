class Highlight {
    constructor(element) {
        this.element = element;

        this.setup();
        this.show();

        setInterval(() => this.show(), 5000);
    }

    setup() {
        var letters = this.element.textContent.split("");
        this.element.textContent = "";

        letters.forEach((letter) => {
            var span = document.createElement("span");
            span.innerHTML = letter;

            this.element.append(span);
        });
    }

    show() {
        var spans = this.element.children;

        for (var i = 0; i < spans.length; i++) {
            const span = spans[i];
            setTimeout(function() { toggleClass(span, "highlighted"); }, i * 100);
        }
    }
}

function init() {
    var elements = document.querySelectorAll(".highlight");

    elements.forEach(function(element) {
        new Highlight(element);
    });
}

document.addEventListener("DOMContentLoaded", init);