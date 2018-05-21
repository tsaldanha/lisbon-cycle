import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
//import MapboxDirections from '@mapbox/mapbox-gl-directions';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import mapboxgl from 'mapbox-gl';
import React, {Component} from "react";

import './map.scss';



mapboxgl.accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNqZ2p4cDhqZjFrOGkyd3FvaXVzdmN2MHMifQ.e0i8Mrl2Z738v3FPQsH_0w';

export default class extends Component {
	constructor(props: Props) {
	    super(props);
	    this.state = {
	      lng: -9.17,
	      lat: 38.74,
	      zoom: 12
	    };
  	}
  	componentDidMount() {
	    const { lng, lat, zoom } = this.state; 

	    const map = new mapboxgl.Map({
	      container: 'map',
		  style: 'mapbox://styles/tsaldanha/cjgnpy13m00512snzldvoqrtw',
	      center: [lng, lat],
	      zoom
	    });
	    
	    const geocoder = new MapboxGeocoder({
		    accessToken: mapboxgl.accessToken,
		    contry: 'Portugal',
		});

	    const nav = new mapboxgl.NavigationControl();

	    const geolocate = new mapboxgl.GeolocateControl({
		    positionOptions: {
		        enableHighAccuracy: true
		    },
		    trackUserLocation: true
		});

		map.addControl(nav, 'bottom-right');
		map.addControl(geolocate, 'bottom-right');

		document.getElementById('header').appendChild(geocoder.onAdd(map));

		map.on('load', updateGeocoderProximity); // set proximity on map load
		map.on('moveend', updateGeocoderProximity);
		function updateGeocoderProximity() {
		    // proximity is designed for local scale, if the user is looking at the whole world,
		    // it doesn't make sense to factor in the arbitrary centre of the map
		    if (map.getZoom() > 9) {
		        var center = map.getCenter().wrap(); // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
		        geocoder.setProximity({ longitude: center.lng, latitude: center.lat });
		    } else {
		        geocoder.setProximity(null);
		    }
		}
		map.on('load', function() {
		    map.addSource('single-point', {
		        "type": "geojson",
		        "data": {
		            "type": "FeatureCollection",
		            "features": []
		        }
		    });

		    map.addLayer({
		        "id": "point",
		        "source": "single-point",
		        "type": "circle",
		        "paint": {
		            "circle-radius": 10,
		            "circle-color": "#007cbf"
		        }
		    });

		    // Listen for the `geocoder.input` event that is triggered when a user
		    // makes a selection and add a symbol that matches the result.
		    geocoder.on('result', function(ev) {
		        map.getSource('single-point').setData(ev.result.geometry);
		    });
		});

	}
	render() {
	    return (
	        <div id="map" />
	    );
  	}
}
