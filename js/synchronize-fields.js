'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
    var syncValues = callback;
    firstField.addEventListener('change', function () {
      var newValue = secondFieldValues[firstFieldValues.indexOf(firstField.value)];
      if (typeof syncValues === 'function') {
        syncValues(secondField, newValue);
      }
    });
  };
})();
