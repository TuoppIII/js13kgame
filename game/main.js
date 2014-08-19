// This file is for initializing all other components and kicking games main loop in the action.

// TODO init model

// Board model
var board = new MockupModel( );

var map = new MapModel()
map.init();


// TODO init controller

// Init graph engine
var canvas = document.getElementById("testCanvas");
var graph = new GraphEngine( canvas, board );
graph.init();

// Draw initial setup
graph.draw();




