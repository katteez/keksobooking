'use strict';

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

var ENTER_KEY_CODE = 13;

var isEnterKeyPressed = function (event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
};

var openDialogByEnterKey = function (event) {
  if (isEnterKeyPressed(event)) {
    openDialog(event);
  }
};

var openDialog = function (event) {
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
  dialogClose.setAttribute('aria-pressed', false);

  var target = event.target;
  if (!target.classList.contains('pin')) {
    target = target.parentNode;
  }
  target.setAttribute('aria-pressed', true);
  target.classList.add('pin--active');
  activePin = target;
  dialog.style.display = 'block';
};

var closeDialogByEnterKey = function () {
  if (isEnterKeyPressed(event)) {
    closeDialog();
  }
};

var closeDialog = function () {
  dialogClose.setAttribute('aria-pressed', true);
  activePin.setAttribute('aria-pressed', false);
  dialog.style.display = 'none';
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
};

pinMap.addEventListener('click', openDialog, true);
pinMap.addEventListener('keydown', openDialogByEnterKey, true);
dialogClose.addEventListener('click', closeDialog);
dialogClose.addEventListener('keydown', closeDialogByEnterKey);

timeField.addEventListener('change', function () {
  timeoutField.value = timeField.value;
});

timeoutField.addEventListener('change', function () {
  timeField.value = timeoutField.value;
});

typeField.addEventListener('change', function () {
  priceField.min = typeField.options[typeField.selectedIndex].value;
  priceField.addEventListener('invalid', function () {
    priceField.setCustomValidity('Пожалуйста, введите цену от ' + priceField.min + ' до 1000000');
  });
});

roomNumberField.addEventListener('change', function () {
  if (roomNumberField.value === '1') {
    capacityField.value = '0';
  } else {
    capacityField.value = '3';
  }
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
