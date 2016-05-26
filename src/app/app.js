"use strict";
$(function () {
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
		var map = L.map('mapDiv', {
				zoomControl : false
			});
		map.on('load', function () {
			addLayers(map);
		});
		//this kicks off onload event
		map.setView([38, -97], 5)
	}
	//add Layers
	function addLayers(map) {
		//basemap
		L.esri.basemapLayer('DarkGray').addTo(map);
		//clusteredlayer
		var clusteredLayer = new L.esri.Cluster.clusteredFeatureLayer({
				url : 'https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0',
				id : "clusteredLayer"
			}).addTo(map);
		clusteredLayer.bindPopup(function (features) {
			return getPopupContent(features);
		});
		var unclusteredLayer = L.esri.featureLayer({
				url : 'https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0',
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
		var fieldsToSkip = ["OBJECTID", "Shape", "Units"];
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
		var Gray = L.esri.basemapLayer("Gray");
		var DarkGray = L.esri.basemapLayer("DarkGray");
		var Oceans = L.esri.basemapLayer("Oceans");
		var Topographic = L.esri.basemapLayer("Topographic");
		var ShadedRelief = L.esri.basemapLayer("ShadedRelief");
		var baseMaps = {
			"Grayscale" : Gray,
			"Dark Gray" : DarkGray,
			"Oceans" : Oceans,
			"Topo" : Topographic,
			"Relief" : ShadedRelief
		};
		var layerChoice = {
			"Clustered View" : layerGroup.getLayer('clusteredLayer')
		};

		var layerControl = new L.control.layers(baseMaps, layerChoice, {
				position : "topleft"
			});
		return layerControl;

	}

	function getZoomHome() {
		var zoomHome = L.Control.zoomHome({
				position : "topleft"
			});
		return zoomHome;
	}

	function getSearchControl() {

		var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();
		
		var extraProvider = new L.esri.Geocoding.FeatureLayerProvider({
				url : 'https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0',
				searchFields : ['Waterbody',"Status"],
				label : 'Stream Gaugues',
				bufferRadius : 0,
				formatSuggestion : function (feature) {
					return feature.properties.Waterbody + "-" + feature.properties.Status;
				}
			});

		var searchControl = new L.esri.Geocoding.geosearch({
				placeholder : "Search for locations",
				useMapBounds : false,
				position : "topleft",
				providers : [arcgisOnline, extraProvider]
			});
		return searchControl;

	}
	init();
});