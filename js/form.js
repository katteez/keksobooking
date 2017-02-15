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

  var changeFields = function (element1, element2, element1Array, element2Array, property) {
    element2[property] = element2Array[element1.selectedIndex];
  };

  timeField.addEventListener('change', function () {
    window.synchronizeFields(changeFields(
        timeField,
        timeoutField,
        [12, 13, 14],
        [12, 13, 14],
        'value'
    ));
  });
  timeoutField.addEventListener('change', function () {
    window.synchronizeFields(changeFields(
        timeoutField,
        timeField,
        [12, 13, 14],
        [12, 13, 14],
        'value'
    ));
  });
  roomNumberField.addEventListener('change', function () {
    window.synchronizeFields(changeFields(
        roomNumberField,
        capacityField,
        [1, 2, 100],
        [0, 3, 3],
        'value'
    ));
  });
  typeField.addEventListener('change', function () {
    window.synchronizeFields(changeFields(
        typeField,
        priceField,
        ['flat', 'cabin', 'palace'],
        [1000, 0, 10000],
        'min'
    ));
  });

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
