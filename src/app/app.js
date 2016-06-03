"use strict";
require.config({
	"baseUrl" :"../src/lib",
	"paths":{
		"leaflet": 'leaflet/leaflet',
		"jquery": 'jquery/jquery',
		"esri-leaflet": "esri-leaflet/esri-leaflet",
		"esrileafletgeocoder": 'esri-leaflet-geocoder/esri-leaflet-geocoder',
		"leafletcluster": 'leaflet-markercluster/leaflet.markercluster',
		"esrileafletcluster": 'esri-leaflet-clustered-feature-layer/esri-leaflet-clustered-feature-layer',
		"zoomhome": 'leaflet.zoomhome/leaflet.zoomhome',
		"config":"../config"
	},
	"shim":{
		"esrileafletgeocoder" : ["leaflet", "esri-leaflet"],
		"zoomhome" : ["leaflet"],
		"leafletcluster" : ["leaflet"],
		"esrileaflet" : ["leaflet"],
		"esrileafletcluster" :["leaflet", "esri-leaflet"]
	},
	"parseOnLoad": true
});


require(['leaflet','jquery','esri-leaflet','config','esrileafletgeocoder','esrileafletcluster','leafletcluster','zoomhome'], function(L, $, esri, app, Geocoding, Cluster){
	
	//extend L.LayerGroup
	L.LayerGroup.prototype.getLayer = function (id) {
		var layers = this._layers;
		var layer;
		for (var key in layers) {
			if (layers[key].options.id == id)
				layer = layers[key];
		}
		return layer;
	}
	//main function
	function init() {
		console.log('initting');
		var map = L.map('mapDiv', {
				zoomControl : false
			});
		map.on('load', function () {
			addLayers(map);
		});
		//this kicks off onload event
		map.setView(app.center, app.zoom)
	}
	//add Layers
	function addLayers(map) {
		//basemap
		esri.basemapLayer(app.basemap).addTo(map);
		//clusteredlayer
		var clusteredLayer = new Cluster.clusteredFeatureLayer({
				url : app.serviceUrl,
				id : "clusteredLayer"
			}).addTo(map);
		clusteredLayer.bindPopup(function (features) {
			return getPopupContent(features);
		});
		var unclusteredLayer = esri.featureLayer({
				url : app.serviceUrl,
				id : "unclusteredLayer"
			}).bindPopup(function (features) {
				return getPopupContent(features);
			});
		var layerGroup = L.layerGroup([clusteredLayer, unclusteredLayer]);
		setLayerHandlers(map, layerGroup);
		addControls(map, layerGroup);
	}

	function convertToLink(content)  {
		return content.replace(/((http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(\/*)(:(\d+))?([A-Z0-9_\/.=?&;~-]*))/gi, "<a href='$1' target='_blank'>More Info</a>");
	}
	function getPopupContent(features) {
		//accounts for differences in layer properties
		var feature;
		if ('feature' in features) {
			feature = features.feature;
		} else {
			feature = features;
		}
		var fieldsToSkip = app.fieldsNotInPopup;
		var dateFields = []
		var popup = $('<dl></dl>');
		for (var key in feature.properties) {
			if (fieldsToSkip.indexOf(key) == -1) {
				popup.append($('<dt></dt>').text(key));
				if (dateFields.indexOf(key) > -1) {
					popup.append($('<dd></dd>').text(new Date(feature.properties[key])));
				} else {
					popup.append($('<dd></dd>').text(feature.properties[key]));
				}
			}
		}
		return convertToLink(popup.html());
	}

	function setLayerHandlers(map, layerGroup) {
		var clusteredLayer = layerGroup.getLayer('clusteredLayer');
		var unclusteredLayer = layerGroup.getLayer('unclusteredLayer');
		clusteredLayer.on('remove', function (layer) {
			map.addLayer(unclusteredLayer);
		});
		clusteredLayer.on('add', function (layer) {
			map.removeLayer(unclusteredLayer);
		});

	}

	function addControls(map, layerGroup) {
		getZoomHome().addTo(map);
		getLayerControl(layerGroup).addTo(map);
		getSearchControl().addTo(map);
		$('.leaflet-touch .leaflet-control-layers-toggle').css({
			"width" : "30px",
			"height" : "30px"
		});
	}

	function getLayerControl(layerGroup) {
		var Streets = esri.basemapLayer('Streets');
		var Topo = esri.basemapLayer("Topographic");
		var Oceans = esri.basemapLayer("Oceans");
		var NatGeo = esri.basemapLayer("NationalGeographic");
		var Gray = esri.basemapLayer("Gray");
		var DarkGray = esri.basemapLayer("DarkGray");
		var Imagery = esri.basemapLayer('Imagery');
		var Terrain = esri.basemapLayer("Terrain");
		var ShadedRelief = esri.basemapLayer("ShadedRelief");
		
		var baseMaps = {
			"Streets" :Streets,
			"Topo" : Topo,
			"Oceans" : Oceans,
			"Nat Geo" :NatGeo,
			"Grayscale" : Gray,
			"Dark Gray" : DarkGray,
			"Imagery": Imagery,
			"Terrain":Terrain,
			"Relief" : ShadedRelief
		};
		var layerChoice = {
			"Clustered View" : layerGroup.getLayer('clusteredLayer')
		};

		var layerControl = new L.control.layers(baseMaps, layerChoice, {
				position : app.controlsPosition
			});
		return layerControl;

	}

	function getZoomHome() {
		var zoomHome = L.Control.zoomHome({
				position : app.controlsPosition
			});
		return zoomHome;
	}

	function getSearchControl() {
		var arcgisOnline = Geocoding.arcgisOnlineProvider();
		var providers = [arcgisOnline];
		
		for (var i=0; i<app.searchProviders.length; i++){
			providers.push(new Geocoding.FeatureLayerProvider(app.searchProviders[i]));
		}
		
		var searchControl = new Geocoding.geosearch({
				placeholder : "Search for locations",
				useMapBounds : false,
				position : app.controlsPosition,
				providers : providers
			});
		return searchControl;
	}
	init();
});