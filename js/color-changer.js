var colorChangers = Array.from(document.getElementsByClassName("color-changer")).reverse();

window.onscroll = function() {
    for (var i = 0; i < colorChangers.length; i++) {
        var colorChanger = colorChangers[i];

        if (window.scrollY > colorChanger.offsetTop - 10) {
            document.querySelector('meta[name="theme-color"]').setAttribute("content", colorChanger.dataset.color);
            document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", colorChanger.dataset.color);
            break;
        }
    }
};