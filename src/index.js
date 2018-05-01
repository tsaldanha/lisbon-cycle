//import mapboxgl from 'mapbox-gl';
import './style.css';


(function(){

	mapboxgl.accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNqZ2p4cDhqZjFrOGkyd3FvaXVzdmN2MHMifQ.e0i8Mrl2Z738v3FPQsH_0w';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/tsaldanha/cjgl7uxqe000i2sqive3fsfsm',
		center: [-9.17,38.74], // starting position [lng, lat]
    	zoom: 12 // starting zoom
	});	
	
})();
