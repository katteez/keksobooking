'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var activePin = pinMap.querySelector('.pin--active');
  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var noticeForm = document.querySelector('.notice__form');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var addressField = noticeForm.querySelector('#address');
  var buttonSubmit = noticeForm.querySelector('.form__submit');
  var timeField = noticeForm.querySelector('#time');
  var timeoutField = noticeForm.querySelector('#timeout');
  var typeField = noticeForm.querySelector('#type');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  window.initializePins(dialog, dialogClose, pinMap, activePin);

  var syncValues = function (element2, newValue) {
    element2.value = newValue;
  };

  window.synchronizeFields(
      timeField,
      timeoutField,
      [12, 13, 14],
      syncValues
  );

  window.synchronizeFields(
      timeoutField,
      timeField,
      [12, 13, 14],
      syncValues
  );

  window.synchronizeFields(
      roomNumberField,
      capacityField,
      [0, 3, 3],
      syncValues
  );

  var syncValueWithMin = function (element2, newValue) {
    element2.min = newValue;
  };

  window.synchronizeFields(
      typeField,
      priceField,
      [1000, 0, 10000],
      syncValueWithMin
  );

  priceField.addEventListener('invalid', function () {
    priceField.setCustomValidity('Пожалуйста, введите цену от ' + priceField.min + ' до 1000000');
  });

  titleField.addEventListener('invalid', function () {
    titleField.setCustomValidity('Пожалуйста, введите от 30 до 100 символов');
  });

  addressField.addEventListener('invalid', function () {
    addressField.setCustomValidity('Пожалуйста, заполните поле');
  });

  buttonSubmit.addEventListener('click', function () {
    titleField.setCustomValidity('');
    priceField.setCustomValidity('');
    addressField.setCustomValidity('');
  });
})();
