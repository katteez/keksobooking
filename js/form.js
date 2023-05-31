'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = pinMap.querySelector('.pin--active');
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var noticeForm = document.querySelector('.notice__form');
  var priceField = noticeForm.querySelector('#price');
  var timeField = noticeForm.querySelector('#time');
  var timeoutField = noticeForm.querySelector('#timeout');
  var typeField = noticeForm.querySelector('#type');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  dialog.style.display = 'none';

  window.initializePins(dialog, dialogClose, pinMap, activePin);

  var syncValues = function (secondField, newValue) {
    secondField.value = newValue;
  };

  window.synchronizeFields(
      timeField,
      timeoutField,
      ['12', '13', '14'],
      ['12', '13', '14'],
      syncValues
  );

  window.synchronizeFields(
      timeoutField,
      timeField,
      ['12', '13', '14'],
      ['12', '13', '14'],
      syncValues
  );

  window.synchronizeFields(
      roomNumberField,
      capacityField,
      ['1', '2', '100'],
      ['0', '3', '3'],
      syncValues
  );

  var syncValueWithMin = function (element2, newValue) {
    element2.min = newValue;
  };

  window.synchronizeFields(
      typeField,
      priceField,
      ['bungalow', 'flat', 'house', 'palace', 'hotel'],
      ['1000', '0', '10000'],
      syncValueWithMin
  );
})();
