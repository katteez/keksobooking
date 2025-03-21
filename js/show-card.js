'use strict';

window.showCard = (function () {
  return function (target, pinData, dialog, dialogClose, activeClickedElementHolder, dialogCloseClickHandler, dialogCloseKeyDownHandler, callback) {
    var authorAvatar = dialog.querySelector('.dialog__title img');
    var offerTitle = dialog.querySelector('.lodge__title');
    var offerAddress = dialog.querySelector('.lodge__address');
    var offerPrice = dialog.querySelector('.lodge__price');
    var offerType = dialog.querySelector('.lodge__type');
    var offerRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
    var offerCheckinTime = dialog.querySelector('.lodge__checkin-time');
    var offerFeatures = dialog.querySelector('.lodge__features');
    var offerDescription = dialog.querySelector('.lodge__description');
    var offerPhotos = dialog.querySelector('.lodge__photos');

    var fillFeatures = function (dialogData) {
      var features = dialogData.offer.features;
      offerFeatures.innerHTML = '';

      if (features && features.length) {
        features.forEach(function (item) {
          var featureElement = document.createElement('span');
          featureElement.classList.add('feature__image');
          featureElement.classList.add('feature__image--' + item);
          offerFeatures.appendChild(featureElement);
        });
      }
    };

    var fillPhotos = function (dialogData) {
      var photos = dialogData.offer.photos;
      offerPhotos.innerHTML = '';

      if (photos && photos.length) {
        photos.forEach(function (item) {
          var img = document.createElement('img');
          img.setAttribute('src', item);
          img.setAttribute('width', '52');
          img.setAttribute('height', '42');
          img.setAttribute('alt', 'appartment photo');
          offerPhotos.appendChild(img);
        });
      }
    };

    var fillDialog = function (dialogData) {
      var typesApartments = {
        'flat': 'Квартира',
        'bungalow': 'Лачуга',
        'house': 'Дом',
        'palace': 'Дворец',
        'hotel': 'Отель'
      };

      authorAvatar.setAttribute('src', dialogData.author.avatar);
      offerTitle.innerText = dialogData.offer.title;
      offerAddress.innerText = dialogData.offer.address;
      offerPrice.innerText = dialogData.offer.price + ' ₽/ночь';
      offerType.innerText = typesApartments[dialogData.offer.type];
      offerRoomsAndGuests.innerText = dialogData.offer.rooms + ' комнаты для ' + dialogData.offer.guests + ' гостей';
      offerCheckinTime.innerText = 'Заезд после ' + dialogData.offer.checkin + ', выезд до ' + dialogData.offer.checkout;
      fillFeatures(dialogData);
      offerDescription.innerText = dialogData.offer.description ?? '';
      fillPhotos(dialogData);
    };

    if (activeClickedElementHolder && activeClickedElementHolder.value) {
      activeClickedElementHolder.value.classList.remove('pin--active');
    }
    dialogClose.setAttribute('aria-pressed', false);
    target.setAttribute('aria-pressed', true);
    target.classList.add('pin--active');
    activeClickedElementHolder.value = target;

    fillDialog(pinData);
    dialog.style.display = 'block';

    dialogClose.addEventListener('click', function () {
      dialogCloseClickHandler(callback);
    });
    dialogClose.addEventListener('keydown', function () {
      dialogCloseKeyDownHandler(callback);
    });
  };
})();
