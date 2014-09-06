// This file is for initializing all other components and kicking games main loop in the action.

// TODO init model
var mapid = location.hash.substring(1);

// Board model
var map = new MapModel( );
if ( !isNaN( mapid ) && mapid != undefined && mapid != "" ) {
	map.init( mapid );
} else {
	map.init( 2 );
}

//var board = new MockupModel( );

// init controller
var controller = new MapController( map );

// Init graph engine
var canvas = document.getElementById("testCanvas");
var graph = new GraphEngine( canvas, map, controller );
graph.init();

// Draw initial setup
graph.draw();




