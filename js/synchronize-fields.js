'use strict';

window.synchronizeFields = function (element1, element2, element1Array, element2Array, property) {
  element2[property] = element2Array[element1.selectedIndex];
};
