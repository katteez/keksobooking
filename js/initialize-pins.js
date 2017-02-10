'use strict';

var ENTER_KEY_CODE = 13;

var isEnterKeyPressed = function (event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
};

window.initializePins = function (dialog, dialogClose, clickedElement, activeClickedElement) {
  var openDialogByEnterKey = function (event) {
    if (isEnterKeyPressed(event)) {
      openDialog(event);
    }
  };

  var openDialog = function (event) {
    if (activeClickedElement) {
      activeClickedElement.classList.remove('pin--active');
    }
    dialogClose.setAttribute('aria-pressed', false);

    var target = event.target;
    if (!target.classList.contains('pin')) {
      target = target.parentNode;
    }
    target.setAttribute('aria-pressed', true);
    target.classList.add('pin--active');
    activeClickedElement = target;
    dialog.style.display = 'block';
  };

  var closeDialogByEnterKey = function () {
    if (isEnterKeyPressed(event)) {
      closeDialog();
    }
  };

  var closeDialog = function () {
    dialogClose.setAttribute('aria-pressed', true);
    activeClickedElement.setAttribute('aria-pressed', false);
    dialog.style.display = 'none';
    if (activeClickedElement) {
      activeClickedElement.classList.remove('pin--active');
    }
  };

  clickedElement.addEventListener('click', openDialog, true);
  clickedElement.addEventListener('keydown', openDialogByEnterKey, true);
  dialogClose.addEventListener('click', closeDialog);
  dialogClose.addEventListener('keydown', closeDialogByEnterKey);
};