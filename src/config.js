"use strict";
define([], function(){
	return {
////////////////////////////////////////////////////////////////////////////////////////////
///////serviceURL: ArcGIS REST endpoint of feature service//////////////////////////////////
		"serviceUrl" : "https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0",
////////////////////////////////////////////////////////////////////////////////////////////
///////fieldsNotInPopup: list of fields from REST endpoint to omit from popup////////////////////
		"popupFields" : ["status", "waterbody","stage","obstime","id","link"],
////////////////////////////////////////////////////////////////////////////////////////////
///////dateFields: list of fields from REST endpoint that should be formatted as a date/////
		"dateFields" : ["obstime"],		
////////////////////////////////////////////////////////////////////////////////////////////
///////center: initial center point of app//////////////////////////////////////////////////
		"center":[38, -97],
////////////////////////////////////////////////////////////////////////////////////////////
///////zoom:initial zoom of app/////////////////////////////////////////////////////////////
		"zoom": 5,
////////////////////////////////////////////////////////////////////////////////////////////
///////basemap: initial basemap/////////////////////////////////////////////////////////////
//////options: Streets, Topographic,Oceans, NationalGeographic, Gray, DarkGray, Imagery/////
//////options cnt'd: Terrain, ShadedRelief///////////////////////////
	"basemap" : "DarkGray",
////////////////////////////////////////////////////////////////////////////////////////////
///////controlsPosition: position of zoom, layer, and search controls///////////////////////
//////options: topright, topleft, bottomright, bottomleft///////////////////////////////////
	"controlsPosition" : "topleft",
////////////////////////////////////////////////////////////////////////////////////////////
///////searchProviders: search widget sources and behavior//////////////////////////////////
	"searchProviders":[
			{
				url : 'https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0',
				searchFields : ['waterbody',"status"],
				label : 'Stream Gaugues',
				bufferRadius : 0,
				formatSuggestion : function (feature) {
					return feature.properties.waterbody + "-" + feature.properties.status;
				}
			}
//////////////////////////add additional providers here////////////////////////////////////
		]
///////////////////////////////////////////////////////////////////////////////////////////
	}
});