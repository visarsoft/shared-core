import React from 'react';
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from 'react-google-maps';

const defaultOptions = {
  maxZoom: 19,
  minZoom: 3,
  disableDefaultUI: true,
  zoomControl: false,
  panControl: false,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  overviewMapControl: false,
  disableDoubleClickZoom: false,
  scrollwheel: false,
  backgroundColor: '#1C2531',
  zoomControlOptions: {
    position: null
  },
  styles: [
    {
      elementType: 'geometry', stylers: [{ color: '#242f3e' }]
    },
    {
      elementType: 'labels.text.stroke', stylers: [{ color: '#342f3e' }]
    },
    {
      elementType: 'labels.text.fill', stylers: [{ color: '#646855' }]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{
        color: '#646855'
      }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      stylers: [
        {
          visibility: 'off'
        }]
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ]
};

type Props = {
  isMarkerShown: boolean,
};

const Map = (props: Props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 48.1462406, lng: 11.4218455 }}
    defaultOptions={defaultOptions}
  >
    {props.isMarkerShown &&
      <Marker
        position={{ lat: 48.1462406, lng: 11.4218455 }}
        icon={{
          path: (typeof window.google !== 'undefined' && window.google.maps.SymbolPath.CIRCLE),
          scale: 10,
          strokeColor: '#fff'
        }}
      />}
  </GoogleMap>
);

export default withScriptjs(withGoogleMap(Map));
