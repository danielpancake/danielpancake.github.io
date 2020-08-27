// Attention! Javascript ahead
// Copy menu options to mobile menu
var menu = document.getElementById("menu").children;
var menu_mobile = document.getElementById("menu-mobile").getElementsByClassName("inner")[0];

for (var element of menu) {
    menu_mobile.appendChild(element.cloneNode(true));
}

// Set up togglers and inners
var inners = document.getElementsByClassName("inner");
for (const element of inners) {
    element.classList.add("hidden");
    element.addEventListener("transitionend", e => autoheight(e, element), false);
}

function autoheight(e, element) {
    if (e.propertyName == "height") { element.style.height = "auto"; }
}

var togglers = document.getElementsByClassName("toggler");
for (const element of togglers) {
    element.addEventListener("click",
        function() {
            var inner = findNextElementByClassName(element, "inner");

            if (!element.classList.contains("active")) {
                element.classList.add("active");

                var current_height = window.getComputedStyle(inner, null).getPropertyValue("height");

                inner.classList.remove("hidden");

                inner.style.height = "auto";
                var initial_height = window.getComputedStyle(inner, null).getPropertyValue("height");
                inner.style.height = current_height;

                setTimeout(function() { inner.style.height = initial_height; }, 50);
            } else {
                inner.style.height = window.getComputedStyle(inner, null).getPropertyValue("height");

                element.classList.remove("active");
                setTimeout(function() { inner.classList.add("hidden"); }, 50);
            }
        }
    );
}

function findNextElementByClassName(element, className) {
    var next = element.nextElementSibling;

    if (next.classList.contains(className)) {
        return next;
    } else {
        findNextElementByClassName(next, className);
    }
}

function sendemail(name, email, subject, body) {
    switch (document.documentElement.lang) {
        case "en": 
            var message = name + " wrote to you: " + body;
            if (email != "") { message += "Write back, " + email; }
        break;

        case "ru": 
            var message = name + " написал вам: " + body;
            if (email != "") { message += "Пишите мне, " + email; }
        break;
    }

    Email.send({
        SecureToken : "2d60c5e6-b738-4a95-8e38-45075cf81d32",
        To : "inboxpancake@gmail.com", From : "inboxpancake@gmail.com",
        Subject : subject, Body : message
    }).then(response => reload(response, name));
}

function reload(response, name) {
    switch (document.documentElement.lang) {
        case "en": alert(response == "OK" ? "❤ Thank you for you letter, " + name + "!" : "< ! > Error occurred!"); break;
        case "ru": alert(response == "OK" ? "❤ Спасибо тебе за письмо, " + name + "!" : "< ! > Произошла ошибка!"); break;
    }

    location.reload()
}

// Change example name
var list_of_name;

switch (document.documentElement.lang) {
    case "en": list_of_name = ["Steve", "Maria", "David", "Owen", "Daisy", "George", "Dolores"]; break;
    case "ru": list_of_name = ["Даниил", "Мария", "Илья", "Егор", "Дарья", "Владислав", "Владимир"]; break;
}

var list_of_name_position = 0;
var list_of_name_length = list_of_name.length;

var name_input = document.getElementById("name");

setInterval(function() {
    list_of_name_position = ++list_of_name_position % list_of_name_length;

    switch (document.documentElement.lang) {
        case "en": name_input.placeholder = "* For example, " + list_of_name[list_of_name_position]; break;
        case "ru": name_input.placeholder = "* Например, " + list_of_name[list_of_name_position];break;
    }
}, 5000);

// Sync pointer animation with highlighting
var pointer = document.getElementById("pointer");
pointer.classList.add("pointer_animation");

function sendfeedback() {
    sendemail(document.getElementById("name").value, document.getElementById("email").value, document.getElementById("subject").value, document.getElementById("body").value);
}