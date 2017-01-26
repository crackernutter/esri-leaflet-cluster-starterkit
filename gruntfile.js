// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
	'*  <%= pkg.homepage %>\n' +
	'*  Copyright (c) <%= grunt.template.today("yyyy") %> Your bannder here!\n' +
	'*  Apache 2.0 License */\n';

module.exports = function (grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	//BuildCSSfromSASS//MinifyCSS
	cssmin: {
		prod: {
			options: {
				banner: banner
			},
			files: {
				'dist/lib/bootstrap/css/bootstrap.css': ['src/lib/bootstrap/css/bootstrap.css'],
				'dist/lib/leaflet/leaflet.css': ['src/lib/leaflet/leaflet.css'],
				'dist/lib/esri-leaflet-geocoder/esri-leaflet-geocoder.css': ['src/lib/esri-leaflet-geocoder/esri-leaflet-geocoder.css'],
				'dist/lib/leaflet-markercluster/MarkerCluster.Default.css': ['src/lib/leaflet-markercluster/MarkerCluster.Default.css'],
				'dist/lib/leaflet-markercluster/MarkerCluster.css': ['src/lib/leaflet-markercluster/MarkerCluster.css'],
				'dist/lib/leaflet.zoomhome/leaflet.zoomhome.css': ['src/lib/leaflet.zoomhome/leaflet.zoomhome.css'],
				'dist/lib/font-awesome/css/font-awesome.css': ['src/lib/font-awesome/css/font-awesome.css'],
				'dist/app/app.css': ['src/app/app.css']
			}
		}
	},
	uglify: {
		options: {
			compress: {
				drop_console: true
			}
		},
		prod: {
			files: {
				'dist/app/app.js': ['src/app/app.js'],
				'dist/lib/leaflet/leaflet.js': ['src/lib/leaflet/leaflet.js'],
				'dist/lib/jquery/jquery.js': ['src/lib/jquery/jquery.js'],
				'dist/lib/esri-leaflet/esri-leaflet.js': ['src/lib/esri-leaflet/esri-leaflet.js'],
				'dist/lib/esri-leaflet-geocoder/esri-leaflet-geocoder.js': ['src/lib/esri-leaflet-geocoder/esri-leaflet-geocoder.js'],
				'dist/lib/leaflet-markercluster/leaflet.markercluster.js': ['src/lib/leaflet-markercluster/leaflet.markercluster.js'],
				'dist/lib/esri-leaflet-clustered-feature-layer/esri-leaflet-clustered-feature-layer.js': ['src/lib/esri-leaflet-clustered-feature-layer/esri-leaflet-clustered-feature-layer.js'],
				'dist/lib/leaflet.zoomhome/leaflet.zoomhome.js': ['src/lib/leaflet.zoomhome/leaflet.zoomhome.js'],
				'dist/app/require.js':['src/app/require.js']
			}
		}
	},
	//Copyto//hadtochangesourcetoreflectnestedboostrap-sass
	'copy': {
		leafletmarkerclusterdev: {
			expand: true,
			cwd: './node_modules/leaflet.markercluster/dist',
			src: '**/*',
			dest: './src/lib/leaflet-markercluster/'
		},
		esrileafletmarkerclusterdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet-clustered-feature-layer/dist',
			src: '**/*',
			dest: './src/lib/esri-leaflet-clustered-feature-layer/'
		},
		esrileafletdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet/dist',
			src: '**/*',
			dest: './src/lib/esri-leaflet/'
		},
		fontawesomedev: {
			expand: true,
			cwd: './node_modules/font-awesome',
			src: '**/*',
			dest: './src/lib/font-awesome/'
		},
		leafletdev: {
			expand: true,
			cwd: './node_modules/leaflet/dist',
			src: '**/*',
			dest: './src/lib/leaflet/'
		},
		leafletgeocoderdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet-geocoder/dist',
			src: '**/*',
			dest: './src/lib/esri-leaflet-geocoder/'
		},
		jquerydev: {
			expand: true,
			cwd: './node_modules/jquery/dist',
			src: '**/*',
			dest: './src/lib/jquery/'
		},
		bootstrapdev: {
			expand: true,
			cwd: './node_modules/bootstrap/dist',
			src: '**/*',
			dest: './src/lib/bootstrap/'
		},
		layerimagedev: {
			expand: true,
			src: './layers.png',
			dest: './src/lib/leaflet/images/'
		},
		requiredev:{
			expand: true,
			flatten: true,
			src: './node_modules/requirejs/require.js',
			dest: './src/app/'
		},
		zoomhomedev:{
			expand: true,
			cwd: './src/leaflet.zoomhome/dist',
			src: '**/*',
			dest: './src/lib/leaflet.zoomhome/'
		},
		//production copy
		main: {
			files: [{
				expand: true,
				cwd: 'src/',
				src: ['index.html'],
				dest: './dist/',
				
			}]
		},
		leafletgeocoderprod: {
			expand: true,
			cwd: './src/lib/esri-leaflet-geocoder/img',
			src: '**/*',
			dest: './dist/lib/esri-leaflet-geocoder/img'
		},
		leafletprod: {
			expand: true,
			cwd: './src/lib/leaflet/images',
			src: '**/*',
			dest: './dist/lib/leaflet/images'
		},
		fontawesomeprod: {
			expand: true,
			cwd: './src/lib/font-awesome/fonts',
			src: '**/*',
			dest: './dist/lib/font-awesome/fonts'
		},
		configprod:{
			expand: true,
			flatten: true,
			src: './src/config.js',
			dest: './dist/'
		}
	},
	//clean
	clean: {
		dist: {
			src: ['dist/']
		},
		zoomhome:
		{
			src: ['src/leaflet/','src/leaflet.zoomhome/']
		}
	}
});
	// Default task.
	grunt.registerTask('devbuild', ['copy:leafletmarkerclusterdev','copy:esrileafletmarkerclusterdev','copy:esrileafletdev','copy:fontawesomedev','copy:leafletdev','copy:leafletgeocoderdev','copy:jquerydev','copy:bootstrapdev', 'copy:layerimagedev', 'copy:requiredev','copy:zoomhomedev', 'clean:zoomhome']);
	grunt.registerTask('default', ['clean:dist', 'cssmin', 'uglify','copy:fontawesomeprod','copy:leafletprod','copy:main','copy:leafletgeocoderprod', 'copy:configprod']);
	
};