'use strict';

window.renderPin = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');

  return function (pinData, tabIndex) {
    var pinElement = elementToClone.cloneNode(true);

    pinElement.setAttribute('tabindex', tabIndex);
    pinElement.setAttribute('role', 'button');
    pinElement.setAttribute('aria-pressed', 'false');

    // Math.random из-за того, что на новом потоке курса используется карта вместо картинки,
    // и координаты точек почти одинаковые. Чтобы они не отображались все в одном месте.
    pinElement.style.top = pinData.location.lng + Math.floor(Math.random() * 450) + 'px';
    pinElement.style.left = pinData.location.lat + Math.floor(Math.random() * 450) + 'px';

    var avatar = pinElement.querySelector('img');
    avatar.setAttribute('src', pinData.author.avatar);
    avatar.setAttribute('alt', 'user photo');

    return pinElement;
  };
})();
