window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
if (window.pageYOffset > sticky) {
    header.classList.add("Sticky");
} else {
    header.classList.remove("Sticky");
}
}