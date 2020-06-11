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

        var length = letters.length;

        for (var i = 0; i < length; i++) {
            var span = document.createElement("span");
            span.innerHTML = letters[i];
            
            this.element.appendChild(span);
        }
    }

    show() {
        var spans = this.element.children;
        var length = spans.length;

        for (var i = 0; i < length; i++) {
            const span = spans[i];

            setTimeout(function () { span.classList.toggle("highlighted"); }, i * 100);
        }
    }
}

function init() {
    var elements = document.querySelectorAll(".highlight");

    if (elements != null) {
        var length = elements.length;

        for (var i = 0; i < length; i++) {
            new Highlight(elements[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", init);