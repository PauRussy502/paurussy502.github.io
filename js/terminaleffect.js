document.addEventListener('DOMContentLoaded', function () {

  function loadJSON(file) {
    return fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error loading JSON file: ${response.statusText}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function mezclarVariables(nwords, ncolors) {
    var indices = Array.from({ length: nwords.length }, (_, i) => i);
    for (var i = indices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    var words = indices.map(i => nwords[i]);
    var colors = indices.map(i => ncolors[i]);
    return { words, colors };
  }

  loadJSON("/js/terminaleffect.json")
    .then(jsonData => {
      if (jsonData) {
        var nwords = jsonData.consoleTextData.messages;
        var ncolors = jsonData.consoleTextData.colors;
        var id = 'terminaleffect';
        var { words, colors } = mezclarVariables(nwords, ncolors);
        consoleText(words, id, colors);
      }
    });

  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
  
    if (target) {
      target.setAttribute('style', 'color:' + colors[0]);
  
      window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function() {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
  
      window.setInterval(function() {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
      }, 400);
    } else {
      console.error("Elemento con ID '" + id + "' no encontrado.");
    }
  }
});