'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var MAX_PINS_DEFAULT = 3;
  var APARTMENTS_DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
  var filteredPins = [];
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var isEnterKeyPressed = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  return function (dialog, dialogClose, pinMap, activeClickedElement) {
    // Записываем активный элемент в свойство объекта, чтобы его можно было менять в другом модуле (show-card)
    var activeClickedElementHolder = {value: activeClickedElement};

    var clearPinMap = function () {
      var pinMapDescendants = pinMap.querySelectorAll('*');
      pinMapDescendants = Array.prototype.slice.call(pinMapDescendants);
      pinMapDescendants.forEach(function (item) {
        if (!item.classList.contains('pin__main') && !item.parentNode.classList.contains('pin__main')) {
          item.remove();
        }
      });
    };

    var renderFilteredPins = function () {
      clearPinMap();
      filteredPins.forEach(function (item, i) {
        var pinElement = window.renderPins(item, i + 1);
        pinElement.setAttribute('data-index', i);
        pinMap.appendChild(pinElement);
      });
    };

    window.load(APARTMENTS_DATA_URL, function (data) {
      similarApartments = JSON.parse(data);
      filteredPins = similarApartments.slice(0, MAX_PINS_DEFAULT);
      renderFilteredPins();
    });

    tokyoFilters.addEventListener('change', function () {
      filteredPins = window.filterPins(similarApartments);
      renderFilteredPins();
    });

    var focusActiveClickedElement = function () {
      activeClickedElementHolder.value.focus();
    };

    var getCorrectEventTarget = function (event) {
      var target = event.target;
      if (!event.target.classList.contains('pin')) {
        target = event.target.parentNode;
      }
      return target;
    };

    var localShowCard = function (event, callback) {
      var target = getCorrectEventTarget(event);
      var similarApartmentsItem = filteredPins[target.getAttribute('data-index')];
      window.showCard(target, similarApartmentsItem, dialog, dialogClose, activeClickedElementHolder, closeDialog, closeDialogByEnterKey, callback);
    };

    var openDialog = function (event) {
      localShowCard(event);
    };

    var openDialogByEnterKey = function (event) {
      if (isEnterKeyPressed(event)) {
        localShowCard(event, focusActiveClickedElement);
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
