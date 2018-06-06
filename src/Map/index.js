//import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js';

import 'mapbox-gl/dist/mapbox-gl.css';
//import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import mapboxgl from 'mapbox-gl';
import React, {Component} from "react";
import {Geolocation} from "../Geolocation.js"

import './map.scss';



mapboxgl.accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNqZ2p4cDhqZjFrOGkyd3FvaXVzdmN2MHMifQ.e0i8Mrl2Z738v3FPQsH_0w';

export default class extends Component {
	constructor(props: Props) {
	    super(props);

	    this.state = {
	      lng: -9.17,
	      lat: 38.74,
	      zoom: 14
	    };

	    Geolocation.checkPermission().then(permission => {
            if (permission.state === 'granted') {
            	Geolocation.getLocation().then(response =>{
					this.goToLocation(response.response);

            	});
            }
        });

	    this.map;

  	}
  	goToLocation(coords) {
  		const LngLat = new mapboxgl.LngLat(coords.longitude, coords.latitude);
  		this.state.lng = coords.longitude;
  		this.state.lat = coords.latitude;

  		this.map.easeTo({
  			center: LngLat
  		});

  		/*const marker = new mapboxgl.Marker();
  		marker.setLngLat(LngLat);
  		marker.addTo(this.map);*/
  		
  	}
  	componentDidMount() {
	    const { lng, lat, zoom } = this.state; 

	    this.map = new mapboxgl.Map({
	      container: 'map',
		  style: 'mapbox://styles/tsaldanha/cjgnpy13m00512snzldvoqrtw',
	      center: [lng, lat],
	      zoom,
          pitch: 60,
          unit : 'metric'
	    });
	    
	    
	    const geolocate = new mapboxgl.GeolocateControl({
		    positionOptions: {
		        enableHighAccuracy: true
		    },
		    trackUserLocation: true
		});
	    const directions = new MapboxDirections({
		    accessToken: mapboxgl.accessToken,
		    profile : 'mapbox/cycling',
			unit : 'metric',
			alternatives: true,
		    controls: {
		    	profileSwitcher: false,
		    	instructions: false		    }
		}) 

		document.getElementById('header').appendChild(directions.onAdd(this.map));

		
		this.map.on('load', () => {
			directions.setOrigin([this.state.lng,this.state.lat]);  
		});

	}
	render() {
	    return (
	        <div id="map" />
	    );
  	}
}
