'use strict';

window.initializePins = (function () {
  var ENTER_KEY_CODE = 13;
  var MAX_PINS_DEFAULT = 30;
  var APARTMENTS_DATA_URL =
    'https://32.javascript.htmlacademy.pro/keksobooking/data';
  var similarApartments = [];
  var filteredPins = [];
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var isEnterKeyPressed = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  return function (dialog, dialogClose, pinMap, activeClickedElement) {
    // Записываем активный элемент в свойство объекта, чтобы его можно было менять в другом модуле (show-card)
    var activeClickedElementHolder = { value: activeClickedElement };

    var clearPinMap = function () {
      var pinMapDescendants = pinMap.querySelectorAll('*');
      pinMapDescendants = Array.prototype.slice.call(pinMapDescendants);
      pinMapDescendants.forEach(function (item) {
        if (
          !item.classList.contains('pin__main') &&
          !item.parentNode.classList.contains('pin__main')
        ) {
          item.remove();
        }
      });
    };

    var renderFilteredPins = function () {
      clearPinMap();
      filteredPins.forEach(function (pin, i) {
        var pinElement = window.renderPin(pin, i + 1);
        pinElement.setAttribute('data-index', i);
        pinMap.appendChild(pinElement);
      });
    };

    window.load(APARTMENTS_DATA_URL, function (data) {
      similarApartments = JSON.parse(data);
      filteredPins = window.filterPins(
        similarApartments.slice(0, MAX_PINS_DEFAULT)
      );
      renderFilteredPins();
    });

    tokyoFilters.addEventListener('change', function () {
      filteredPins = window.filterPins(
        similarApartments.slice(0, MAX_PINS_DEFAULT)
      );
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
      if (
        target.classList.contains('pin') &&
        !target.classList.contains('pin__main')
      ) {
        var similarApartmentsItem =
          filteredPins[target.getAttribute('data-index')];
        window.showCard(
          target,
          similarApartmentsItem,
          dialog,
          dialogClose,
          activeClickedElementHolder,
          dialogCloseClickHandler,
          dialogCloseKeyDownHandler,
          callback
        );
      }
    };

    var pinClickHandler = function (event) {
      localShowCard(event);
    };

    var pinKeyDownHandler = function (event) {
      if (isEnterKeyPressed(event)) {
        localShowCard(event, focusActiveClickedElement);
      }
    };

    var dialogCloseClickHandler = function (callback) {
      focusActiveClickedElement = callback;
      dialogClose.setAttribute('aria-pressed', true);
      activeClickedElementHolder.value.setAttribute('aria-pressed', false);
      dialog.style.display = 'none';
      if (activeClickedElementHolder && activeClickedElementHolder.value) {
        activeClickedElementHolder.value.classList.remove('pin--active');
      }
      dialogClose.removeEventListener('click', dialogCloseClickHandler);
      dialogClose.removeEventListener('keydown', dialogCloseKeyDownHandler);
      if (typeof focusActiveClickedElement === 'function') {
        focusActiveClickedElement();
      }
    };

    var dialogCloseKeyDownHandler = function (callback) {
      if (isEnterKeyPressed(event)) {
        dialogCloseClickHandler(callback);
      }
    };

    pinMap.addEventListener('click', pinClickHandler, true);
    pinMap.addEventListener('keydown', pinKeyDownHandler, true);
  };
})();
