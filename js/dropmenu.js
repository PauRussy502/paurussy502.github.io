function toggleMenu(menuId) {
    var menu = document.getElementById(menuId);
    var icongoals = document.getElementById('menuicongoals');
    var iconcve = document.getElementById('menuiconcve');
    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
        menu.style.maxHeight = menu.scrollHeight + "px";

        if (menuId === 'goals') {
            toggleIcon(icongoals, 'ai-chevron-down', 'ai-chevron-up');
        } else if (menuId === 'cvemenu') {
            toggleIcon(iconcve, 'ai-chevron-down', 'ai-chevron-up');
        }
    } else {
        menu.style.maxHeight = "0";

        if (menuId === 'goals') {
            toggleIcon(icongoals, 'ai-chevron-up', 'ai-chevron-down');
        } else if (menuId === 'cvemenu') {
            toggleIcon(iconcve, 'ai-chevron-up', 'ai-chevron-down');
        }
    }
}

function toggleIcon(iconElement, addClass, removeClass) {
    if (iconElement.classList.contains(removeClass)) {
        iconElement.classList.add(addClass);
        iconElement.classList.remove(removeClass);
    }
}