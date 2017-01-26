# Esri Leaflet Cluster Starterkit

An excellent starter kit for those wishing to quickly deploy a lightning fast map displaying the contents of an ArcGIS for Server feature layer. 

This kit uses bower, npm, and grunt to bundle a couple Leaflet plugins that enhance the application:

1. [Zoomhome](https://github.com/torfsen/leaflet.zoomhome) - Adds a home button allowing a reset of the map to its initial extent
2. [Esri Leaflet Geocoder](https://github.com/Esri/esri-leaflet-geocoder) - Allows for searching and zooming to locations using Esri's public geocoder.  A developer can configure to include other search sources or locators.  The config.js file contains an example of adding a second source to the geocoder.  
3. [Esri Leaflet Clustered Feature Layer](https://github.com/Esri/esri-leaflet-clustered-feature-layer) - Displays feature layer as clusters.  A necessary plugin if you have a large number of points or multiple records in the same location. 

This starter kit is deployment ready.  Follow the Getting Started instructions below and a simple map is ready in a matter of minutes
.  
### Requirements
* [node & npm](https://nodejs.org/)
* [bower](http://bower.io/)
* [grunt](http://gruntjs.com/)

### Usage
* `npm install -g bower` - installs bower
* `npm install -g grunt-cli` - installs global grunt
* `npm install` - installs required node and bower packages.  The application is ready to test in the `src` folder  
* `npm run build` - builds the application into the `dist` folder
* `grunt clean:dist` - removes built files from `dist` directory


###Getting Started<a id="getting-started"></a>

1. Make sure you have all requirements from above installed.

2. Fork or clone the repo.

3. Use `npm install` which downloads all dependencies (leaflet, plugins, jquery, bootstrap) and copies them to your src folder.

4. Modify config.js to configure the application at minimum.  You can speficy feature service for display, app defaults, search widget behaviour, etc. etc.  config.js is well documented and contains examples to get you started.  To change behavior or look/feel of the application, modify index.html app.js, and app.css. 

5. Use `npm run build` which builds and minifies your JavaScript and CSS, and copies necessary files to your dist folder. 

6. Deploy your dist folder to any web server.  It's that easy.
