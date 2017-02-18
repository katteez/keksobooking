'use strict';

window.synchronizeFields = function (element1, element2, element2Array, callback) {
  element1.addEventListener('change', function () {
    var newValue = element2Array[element1.selectedIndex];
    callback(element2, newValue);
  });
};
