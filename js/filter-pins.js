'use strict';

window.filterPins = (function () {
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var filterType = tokyoFilters.querySelector('#housing_type');
  var filterPrice = tokyoFilters.querySelector('#housing_price');
  var filterRooms = tokyoFilters.querySelector('#housing_room-number');
  var filterGuests = tokyoFilters.querySelector('#housing_guests-number');
  var filterFeatures = tokyoFilters.querySelector('#housing_features').querySelectorAll('input[type=checkbox]');

  var ANY_VALUE = 'any';
  var MIDDLE_PRICE_VALUE = 'middle';
  var LOW_PRICE_VALUE = 'low';
  var HIGH_PRICE_VALUE = 'high';
  var MIN_MIDDLE_PRICE_VALUE = 10000;
  var MAX_MIDDLE_PRICE_VALUE = 50000;

  var isInRangeType = function (apartmentType) {
    return (filterType.value === ANY_VALUE) || (apartmentType === filterType.value);
  };

  var isInRangePrice = function (apartmentPrice) {
    switch (filterPrice.value) {
      case MIDDLE_PRICE_VALUE:
        return (apartmentPrice >= MIN_MIDDLE_PRICE_VALUE && apartmentPrice <= MAX_MIDDLE_PRICE_VALUE);
      case LOW_PRICE_VALUE:
        return (apartmentPrice < MIN_MIDDLE_PRICE_VALUE);
      case HIGH_PRICE_VALUE:
        return (apartmentPrice > MAX_MIDDLE_PRICE_VALUE);
    }
    return false;
  };

  var isInRangeRooms = function (apartmentRooms) {
    return (filterRooms.value === ANY_VALUE) || (apartmentRooms === parseInt(filterRooms.value, 10));
  };

  var isInRangeGuests = function (apartmentGuests) {
    return (filterGuests.value === ANY_VALUE) || (apartmentGuests === parseInt(filterGuests.value, 10));
  };

  var isInRangeFeatures = function (apartmentFeatures) {
    var getCheckedFeature = function (feature) {
      return feature.checked;
    };

    var getFeatureName = function (feature) {
      return feature.value;
    };

    var checkedFeaturesNames = Array.prototype.filter.call(filterFeatures, getCheckedFeature).map(getFeatureName);

    var isCheckedApartmentFeatures = function (feature) {
      return apartmentFeatures.indexOf(feature) >= 0;
    };
    return (checkedFeaturesNames.length === 0) || (checkedFeaturesNames.every(isCheckedApartmentFeatures));
  };

  return function (apartments) {
    return apartments.filter(function (apartment) {
      return isInRangeType(apartment.offer.type) &&
             isInRangePrice(apartment.offer.price) &&
             isInRangeRooms(apartment.offer.rooms) &&
             isInRangeGuests(apartment.offer.guests) &&
             isInRangeFeatures(apartment.offer.features);
    });
  };
})();
