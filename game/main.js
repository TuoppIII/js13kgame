// This file is for initializing all other components and kicking games main loop in the action.


// Part of the (non-existing) GameEngine, but placed in main.js
initSelectBox = function ( ) {
	var selectBox = document.getElementById("ChangeLevelLst");
  
	for (var i = 0, len = jsonstr.length; i < len; i++) {
		var map = new Option( jsonstr[i].name, jsonstr[i].id );
		selectBox.options.add( map ); 
	}

}


// Init model
var mapid = location.hash.substring(1);

// Board model
var map = new MapModel( );
if ( !isNaN( mapid ) && mapid != undefined && mapid != "" ) {
	map.init( mapid );
} else {
	map.init( 1 );
}

initSelectBox();

// init controller
var controller = new MapController( map );

// Init graph engine
var canvas = document.getElementById("testCanvas");
var graph = new GraphEngine( canvas, map, controller );
graph.init();

// Draw initial setup
graph.draw();


// Init change level button
var buttonClickEvent = function( event ) {
	// Load level based on ChangeLevetLst
	var selectBox = document.getElementById("ChangeLevelLst");	
	if ( selectBox.selectedIndex >= 0 ) {
		location.replace( location.origin + location.pathname + "#" +  selectBox.options[ selectBox.selectedIndex ].value ); // select new level...
		location.reload(); // ... and reload it
	}
}

var selectBtn = document.getElementById("ChangeLevelBtn");
selectBtn.addEventListener( "click", buttonClickEvent );


