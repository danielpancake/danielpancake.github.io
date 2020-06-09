class Highlight {
    constructor(element) {
        this.element = element;

        this.setup();
        this.show();

        setInterval(() => this.show(), 5000);
    }

    setup () {
        var letters = $(this.element).text().split("");
        var length = letters.length;

        $(this.element).text("")

        for (var i = 0; i < length; i++) {
            var span = $("<span/>").text(letters[i]);
            span.appendTo(this.element);
        }
    }

    show () {
        var spans = $(this.element).children();
        var length = spans.length;

        for (var i = 0; i < length; i++) {
            const span = $(spans[i]);

            setTimeout(function () { $(span).toggleClass('highlighted'); }, i * 100);
        }
    }
}

function init() {
    var elements = document.querySelectorAll(".highlight");

    if (elements != null) {
        var length = elements.length;

        for (i = 0; i < length; i++) {
            new Highlight(elements[i]);
        }
    }
}

document.addEventListener("DOMContentLoaded", init);