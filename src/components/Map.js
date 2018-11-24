import React, { Component } from "react";

export default class Map extends Component {
  state = {
    mapCenter: { lat: -33.8688, lng: 151.2195 },
    places: []
  };
  componentDidMount = () => {
    let map = new window.google.maps.Map(this.refs.map, {
      center: this.state.mapCenter,
      zoom: 13,
      mapTypeId: "roadmap"
    });

    navigator.geolocation.getCurrentPosition(position => {
      const mapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.setState({ mapCenter });

      map.setCenter(mapCenter);

      this.marker(mapCenter, map);

      let service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: mapCenter,
          radius: "5000",
          type: ["restaurant"]
        },
        (results, status) => {
          // console.log("places", results);
          this.createMarkers(results, map);
          this.props.fetchPlaces(results);
          this.setState({ places: results });
          // console.log("places", results);
        }
      );
    });
  };

  render() {
    return (
      <div ref="map" style={{ width: "100%", height: "calc(100vh - 56px)" }} />
    );
  }

  marker = (position, map) => {
    let marker = new window.google.maps.Marker({
      map,
      position
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: "<h1>It works!</h1>"
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  };

  createMarkers = (places, map) => {
    var bounds = new window.google.maps.LatLngBounds();

    for (var i = 0, place; (place = places[i]); i++) {
      const image = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };

      const marker = new window.google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: "<h1>It works!</h1>"
      });

      marker.addListener("click", function() {
        infoWindow.open(map, marker);
      });

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  };
}
