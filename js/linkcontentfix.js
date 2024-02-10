document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll("a, .textgradient");

    elements.forEach(function(element) {
        var textToShow = getTextToShow(element);
        element.setAttribute("data-text", textToShow);
    });

    function getTextToShow(element) {
        var text = element.innerText.trim();
        var displayText = text || element.getAttribute('href');
        return displayText;
    }
});
