'use strict';

window.load = function (url, onLoad) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    onLoad(event.target.response);
  });

  xhr.open('GET', url);
  xhr.send();
};
