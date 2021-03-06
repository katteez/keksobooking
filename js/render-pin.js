'use strict';

window.renderPin = (function () {
  var templateElement = document.querySelector('#pin-template');
  var elementToClone = templateElement.content.querySelector('.pin');

  return function (pinData, tabIndex) {
    var pinElement = elementToClone.cloneNode(true);

    pinElement.setAttribute('tabindex', tabIndex);
    pinElement.setAttribute('role', 'button');
    pinElement.setAttribute('aria-pressed', 'false');

    pinElement.style.top = pinData.location.y + 'px';
    pinElement.style.left = pinData.location.x + 'px';

    var avatar = pinElement.querySelector('img');
    avatar.setAttribute('src', pinData.author.avatar);
    avatar.setAttribute('alt', 'user photo');

    return pinElement;
  };
})();
