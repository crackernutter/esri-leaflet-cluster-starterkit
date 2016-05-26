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
				'dist/bootstrap/css/bootstrap.css': ['src/bootstrap/css/bootstrap.css'],
				'dist/leaflet/leaflet.css': ['src/leaflet/leaflet.css'],
				'dist/esri-leaflet-geocoder/esri-leaflet-geocoder.css': ['src/esri-leaflet-geocoder/esri-leaflet-geocoder.css'],
				'dist/leaflet-markercluster/MarkerCluster.Default.css': ['src/leaflet-markercluster/MarkerCluster.Default.css'],
				'dist/leaflet-markercluster/MarkerCluster.css': ['src/leaflet-markercluster/MarkerCluster.css'],
				'dist/leaflet.zoomhome/dist/leaflet.zoomhome.css': ['src/leaflet.zoomhome/dist/leaflet.zoomhome.css'],
				'dist/font-awesome/css/font-awesome.css': ['src/font-awesome/css/font-awesome.css'],
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
				'dist/leaflet/leaflet.js': ['src/leaflet/leaflet.js'],
				'dist/jquery/jquery.js': ['src/jquery/jquery.js'],
				'dist/bootstrap/js/bootstrap.js': ['src/bootstrap/js/bootstrap.js'],
				'dist/esri-leaflet/esri-leaflet.js': ['src/esri-leaflet/esri-leaflet.js'],
				'dist/esri-leaflet-geocoder/esri-leaflet-geocoder.js': ['src/esri-leaflet-geocoder/esri-leaflet-geocoder.js'],
				'dist/leaflet-markercluster/leaflet.markercluster.js': ['src/leaflet-markercluster/leaflet.markercluster.js'],
				'dist/esri-leaflet-clustered-feature-layer/esri-leaflet-clustered-feature-layer.js': ['src/esri-leaflet-clustered-feature-layer/esri-leaflet-clustered-feature-layer.js'],
				'dist/leaflet.zoomhome/dist/leaflet.zoomhome.js': ['src/leaflet.zoomhome/dist/leaflet.zoomhome.js'],
				
			}
		}
	},
	//Copyto//hadtochangesourcetoreflectnestedboostrap-sass
	'copy': {
		leafletmarkerclusterdev: {
			expand: true,
			cwd: './node_modules/leaflet.markercluster/dist',
			src: '**/*',
			dest: './src/leaflet-markercluster/'
		},
		esrileafletmarkerclusterdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet-clustered-feature-layer/dist',
			src: '**/*',
			dest: './src/esri-leaflet-clustered-feature-layer/'
		},
		esrileafletdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet/dist',
			src: '**/*',
			dest: './src/esri-leaflet/'
		},
		fontawesomedev: {
			expand: true,
			cwd: './node_modules/font-awesome',
			src: '**/*',
			dest: './src/font-awesome/'
		},
		leafletdev: {
			expand: true,
			cwd: './node_modules/leaflet/dist',
			src: '**/*',
			dest: './src/leaflet/'
		},
		leafletgeocoderdev: {
			expand: true,
			cwd: './node_modules/esri-leaflet-geocoder/dist',
			src: '**/*',
			dest: './src/esri-leaflet-geocoder/'
		},
		jquerydev: {
			expand: true,
			cwd: './node_modules/jquery/dist',
			src: '**/*',
			dest: './src/jquery/'
		},
		bootstrapdev: {
			expand: true,
			cwd: './node_modules/bootstrap/dist',
			src: '**/*',
			dest: './src/bootstrap/'
		},
		layerimagedev: {
			expand: true,
			src: './layers.png',
			dest: './src/leaflet/images/'
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
			cwd: './src/esri-leaflet-geocoder/img',
			src: '**/*',
			dest: './dist/esri-leaflet-geocoder/img'
		},
		leafletprod: {
			expand: true,
			cwd: './src/leaflet/images',
			src: '**/*',
			dest: './dist/leaflet/images'
		},
		fontawesomeprod: {
			expand: true,
			cwd: './src/font-awesome/fonts',
			src: '**/*',
			dest: './dist/font-awesome/fonts'
		},
	},
	//clean
	clean: {
		build: {
			src: ['dist/']
		}
	}
});
	// Default task.
	grunt.registerTask('devbuild', ['copy:leafletmarkerclusterdev','copy:esrileafletmarkerclusterdev','copy:esrileafletdev','copy:fontawesomedev','copy:leafletdev','copy:leafletgeocoderdev','copy:jquerydev','copy:bootstrapdev', 'copy:layerimagedev']);
	grunt.registerTask('default', ['clean:build', 'cssmin', 'uglify','copy:fontawesomeprod','copy:leafletprod','copy:main','copy:leafletgeocoderprod']);
	
};