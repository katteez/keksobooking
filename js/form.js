'use strict';

var pinArray = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
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

var pinClickHandler = function (event) {
  for (var k = 0; k < pinArray.length; k++) {
    pinArray[k].classList.remove('pin--active');
  }
  event.currentTarget.classList.add('pin--active');
  dialog.style.display = 'block';
};

for (var i = 0; i < pinArray.length; i++) {
  pinArray[i].addEventListener('click', pinClickHandler);
}

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  for (var k = 0; k < pinArray.length; k++) {
    pinArray[k].classList.remove('pin--active');
  }
});

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
