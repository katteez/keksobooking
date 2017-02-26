'use strict';

window.load = (function () {
  var xhr = new XMLHttpRequest();

  return function (url, onLoad) {
    xhr.addEventListener('load', function (event) {
      onLoad(event.target.response);
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();
