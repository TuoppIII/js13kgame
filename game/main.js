// This file is for initializing all other components and kicking games main loop in the action.

// TODO init model
var map = new MapModel()
map.init();

// Init graph engine
var canvas = document.getElementById("testCanvas");
var graph = new GraphEngine( canvas );
graph.init();

// Draw initial setup
graph.draw();


// TODO init controller


