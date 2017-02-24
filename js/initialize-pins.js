'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var APARTMENTS_DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];

  var isEnterKeyPressed = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  return function (dialog, dialogClose, pinMap, activeClickedElement) {
    // Записываем активный элемент в свойство объекта, чтобы его можно было менять в другом модуле (show-card)
    var activeClickedElementHolder = {value: activeClickedElement};

    var pinMapDescendants = pinMap.querySelectorAll('*');
    pinMapDescendants = Array.prototype.slice.call(pinMapDescendants);
    pinMapDescendants.forEach(function (item) {
      if (!item.classList.contains('pin__main') && !item.parentNode.classList.contains('pin__main')) {
        item.remove();
      }
    });

    window.load(APARTMENTS_DATA_URL, function (data) {
      similarApartments = JSON.parse(data);
      for (var i = 0; i < 3; i++) {
        pinMap.appendChild(window.renderPins(similarApartments[i], i));
      }
    });

    var focusActiveClickedElement = function () {
      activeClickedElementHolder.value.focus();
    };

    var openDialog = function (event) {
      window.showCard(event.target, similarApartments, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey);
    };

    var openDialogByEnterKey = function (event) {
      if (isEnterKeyPressed(event)) {
        window.showCard(event.target, similarApartments, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey, focusActiveClickedElement);
      }
    };

    var closeDialog = function (callback) {
      dialogClose.setAttribute('aria-pressed', true);
      activeClickedElementHolder.value.setAttribute('aria-pressed', false);
      dialog.style.display = 'none';
      if (activeClickedElementHolder && activeClickedElementHolder.value) {
        activeClickedElementHolder.value.classList.remove('pin--active');
      }
      dialogClose.removeEventListener('click', closeDialog);
      dialogClose.removeEventListener('keydown', closeDialogByEnterKey);
      if (typeof callback === 'function') {
        callback();
      }
    };

    var closeDialogByEnterKey = function (callback) {
      if (isEnterKeyPressed(event)) {
        closeDialog(callback);
      }
    };

    pinMap.addEventListener('click', openDialog, true);
    pinMap.addEventListener('keydown', openDialogByEnterKey, true);
  };
})();
