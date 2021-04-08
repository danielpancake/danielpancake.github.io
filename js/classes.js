function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else {
        var classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ");
    }
}

function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        var classes = element.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
    }
}

function toggleClass(element, className) {
    if (element.classList) {
        element.classList.toggle(className);
    } else {
        var classes = element.className.split(" ");
        var i = classes.indexOf(className);
        if (i >= 0) {
            classes.splice(i, 1);
        } else {
            classes.push(className);
            element.className = classes.join(" ");
        }
    }
}

function containsClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return element.className.split(" ").indexOf(className) >= 0;
    }
}