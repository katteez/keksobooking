'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;

  var isEnterKeyPressed = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  return function (dialog, dialogClose, clickedElement, activeClickedElement) {
    // Записываем активный элемент в свойство объекта, чтобы его можно было менять в другом модуле (show-card)
    var activeClickedElementHolder = {value: activeClickedElement};

    var focusActiveClickedElement = function () {
      activeClickedElementHolder.value.focus();
    };

    var openDialog = function (event) {
      window.showCard(event.target, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey);
    };

    var openDialogByEnterKey = function (event) {
      if (isEnterKeyPressed(event)) {
        window.showCard(event.target, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey, focusActiveClickedElement);
      }
    };

    var closeDialog = function (callback) {
      dialogClose.setAttribute('aria-pressed', true);
      activeClickedElement.setAttribute('aria-pressed', false);
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

    clickedElement.addEventListener('click', openDialog, true);
    clickedElement.addEventListener('keydown', openDialogByEnterKey, true);

    // Чтобы у открытого по умолчанию диалога были необходимые лиснеры для его закрытия
    window.showCard(activeClickedElement, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey);
  };
})();
