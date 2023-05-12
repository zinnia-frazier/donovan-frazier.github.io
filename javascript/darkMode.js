function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    sessionStorage.setItem('darkMode', true);
}
function toggleButtonStyle() {
    var element = document.getElementById("modeButton");
    element.classList.toggle("modeButtonStyle");
}
function changeListColor() {
    var element = document.body;
    element.classList.toggle('listColor');
}

fetch('darkMode.json')
.then(response => response.json())
.then(json => {
    console.log(json);
})