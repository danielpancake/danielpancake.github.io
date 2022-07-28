window.onload = () => {
    let colours = new Set();

    document.querySelectorAll(".highlight").forEach((e) => {
        let letters = e.textContent.split("");
        let length = letters.length;

        e.classList.add("__hglght" + (e.dataset.colour || "#2020e0").substring(1));
        e.textContent = "";

        for (let i = 0; i < length; i++) {
            var span = document.createElement("span");

            span.innerHTML = letters[i];
            span.style.animationDelay = `${i * 100}ms`;

            e.append(span);
        }

        colours.add(e.dataset.colour || "#2020e0");
    });
    
    let styles = document.createElement("style");
    styles.innerHTML += ".highlight span{will-change:background-color;animation:highlighting 20s steps(7) infinite;}@keyframes highlighting{0%,15%,85%,100%{background-color:transparent;}20%,80%{background-color:var(--highlight-colour);color:white;}}";

    colours.forEach((colour) => {
        styles.innerHTML += `.__hglght${colour.substring(1)} { --highlight-colour: ${colour}; }`;
    });
    
    document.getElementsByTagName("head")[0].appendChild(styles);
};