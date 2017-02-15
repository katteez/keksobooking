'use strict';

window.showCard = function (target, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey, focusActiveClickedElement) {
  if (activeClickedElementHolder && activeClickedElementHolder.value) {
    activeClickedElementHolder.value.classList.remove('pin--active');
  }
  dialogClose.setAttribute('aria-pressed', false);

  if (!target.classList.contains('pin')) {
    target = target.parentNode;
  }
  target.setAttribute('aria-pressed', true);
  target.classList.add('pin--active');
  activeClickedElementHolder.value = target;
  dialog.style.display = 'block';
  dialogClose.addEventListener('click', function () {
    closeDialog(focusActiveClickedElement);
  });
  dialogClose.addEventListener('keydown', function () {
    closeDialogByEnterKey(focusActiveClickedElement);
  });
};
