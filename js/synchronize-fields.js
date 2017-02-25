'use strict';

window.synchronizeFields = (function () {
  return function (element1, element2, element1Array, element2Array, callback) {
    element1.addEventListener('change', function () {
      var newValue = element2Array[element1Array.indexOf(element1.value)];
      callback(element2, newValue);
    });
  };
})();
