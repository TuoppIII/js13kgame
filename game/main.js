// This file is for initializing all other components and kicking games main loop in the action.

// TODO init model

// Board model
var map = new MapModel();
map.init( 1 );

//var board = new MockupModel( );

// TODO init controller

// Init graph engine
var canvas = document.getElementById("testCanvas");
var graph = new GraphEngine( canvas, map );
graph.init();

// Draw initial setup
graph.draw();




