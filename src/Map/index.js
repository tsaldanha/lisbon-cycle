
import React, {Component} from "react";
import {Geolocation} from "../Geolocation.js"

import mapboxgl from 'mapbox-gl';
import MapboxDirections from '../libs/mapbox-gl-directions-w-language.js';
import MapboxLanguage from '@mapbox/mapbox-gl-language';



import './map.scss';
import 'mapbox-gl/dist/mapbox-gl.css';


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
					//this.goToLocation(response.response);

            	});
            }
        });

	    this.map;

  	}
  	goToLocation(coords) {
  		this.state.lng = coords.longitude;
  		this.state.lat = coords.latitude;

  		this.map.easeTo({
  			center: [this.state.lng, this.state.lat]
  		});
		this.directions.setOrigin([this.state.lng,this.state.lat]);    		
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
	    this.directions = new MapboxDirections({
		    accessToken: mapboxgl.accessToken,
		    profile : 'mapbox/cycling',
			unit : 'metric',
			alternatives: true,
			language: 'pt',
		    controls: {
		    	profileSwitcher: false,
		    	instructions: true,
		    	inputs: false		    
		    }
		}) 

		document.getElementById('app').appendChild(this.directions.onAdd(this.map));

		this.map.addControl(new MapboxLanguage({
  			defaultLanguage: 'pt'
		}));
		
		this.map.on('load', () => {
			this.directions.setOrigin([this.state.lng,this.state.lat]);  
		});

	}
	render() {
	    return (
	        <div id="map" />
	    );
  	}
}
