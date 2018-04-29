import mapboxgl from 'mapbox-gl';
import './style.css';
import Data from './lisbon.json'


(function(){

	mapboxgl.accessToken = 'pk.eyJ1IjoidHNhbGRhbmhhIiwiYSI6ImNqZ2p4cDhqZjFrOGkyd3FvaXVzdmN2MHMifQ.e0i8Mrl2Z738v3FPQsH_0w';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/tsaldanha/cjgl7uxqe000i2sqive3fsfsm',
		center: [-9.17,38.74], // starting position [lng, lat]
    	zoom: 12 // starting zoom
	});	

	map.on('load', function() {
		map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": Data
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 2
        }
    });

	});
	

})();
