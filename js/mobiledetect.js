window.onload = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var elements = document.getElementsByClassName('mobiledisplay');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }
    else {
        var elements = document.getElementsByClassName('pcdisplay');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }
};
