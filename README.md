# Esri Leaflet Cluster Starterkit

An excellent starter kit for those wishing to quickly deploy a lightning fast map displaying the contents of an ArcGIS for Server feature layer.  
This build uses bower and npm to bundle a couple Leaflet plugins that enhance the application:

1. [Zoomhome](https://github.com/torfsen/leaflet.zoomhome) - Adds a home button allowing a reset of the map to its initial extent
2. [Esri Leaflet Geocoder](https://github.com/Esri/esri-leaflet-geocoder) - Allows for searching and zooming to locations using Esri's public geocoder.  A developer can configure to include other search sources or locators.  
3. [Esri Leaflet Clustered Feature Layer](https://github.com/Esri/esri-leaflet-clustered-feature-layer) - Displays feature layer as clusters.  A necessary plugin if you have a large number of points or multiple records in the same location. 

This starter kit is deployment ready.  Follow the Getting Started instructions below and a simple map is ready in a matter of minutes
.  
### Requirements
* [node & npm](https://nodejs.org/)
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)
* [java 7 or greater](https://java.com/en/download/) - for [Closure Compiler](https://github.com/google/closure-compiler) used during build

### Usage
* `npm install -g bower` - installs bower
* `npm install -g grunt-cli` - installs global grunt
* `npm install` - installs required node and bower packages
* `bower clean` - removes built files from `dist` directory
* `npm run build` - builds the application

###Getting Started<a id="getting-started"></a>

1. Make sure you have all requirements from above installed.

2. Fork or clone the repo.

3. Use `npm install` which downloads all dependencies (leaflet, plugins, jquery, bootstrap) and copies them to your src folder.

4. Modify index.html and the main.js and app.css in src/app to build out your application.  At minimum, in app.js, lines 30 and 37 should contain the url of the feature layer you'd like diplayed, and line 58 should contain a list of fields that you do not want included in your feature popup.  

5. Use `npm run build` which builds and minifies your JavaScript and CSS, and copies necessary files to your dist folder. 

6. Deploy your dist folder to any web server.  It's that easy.
