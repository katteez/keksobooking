'use strict';

window.synchronizeFields = function (element1, element2, element2Array, callback) {
  var newValue = element2Array[element1.selectedIndex];
  callback(element2, newValue);
};
