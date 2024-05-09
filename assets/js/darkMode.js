/*******************   Dark Theme Function *******************/

const icon = document.getElementById("icon");

icon.onclick = function() {

    document.body.classList.toggle("darkTheme");

    if (document.body.classList.contains("darkTheme")) {
        icon.src ="./assets/img/sun.png"
    } else {
        icon.src = "./assets/img/moon.png"
    }

}