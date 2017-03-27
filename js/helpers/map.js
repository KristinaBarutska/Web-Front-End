  function initMap() {
      var pyrmont = { lat: 42.6492994, lng: 23.3723664 };
      map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 16
      });

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['restaurant']
      }, callback);
  }