window.onload = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var elements = document.getElementsByClassName('mobiledisplay');
        var elementsalert = document.getElementsByClassName('mobilealert');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
        for (var i = 0; i < elementsalert.length; i++) {
            elementsalert[i].addEventListener("click", onclickmb);
            elementsalert[i].setAttribute('href', "#");
            elementsalert[i].classList.add("mobilealerton");
        }
    }
    else {
        var elements = document.getElementsByClassName('pcdisplay');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }
};

function onclickmb() {
    alert("No avaliable in Mobile")
}