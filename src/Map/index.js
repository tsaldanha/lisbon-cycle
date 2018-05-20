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
		  style: 'mapbox://styles/tsaldanha/cjgl7uxqe000i2sqive3fsfsm',
	      center: [lng, lat],
	      zoom
	    });
	    map.addControl(new MapboxGeocoder({
	    	accessToken: mapboxgl.accessToken,
			country: 'pt'
		}));
		map.resize();

	}
	render() {
	    return (
	        <div id="map" />
	    );
  	}
}
