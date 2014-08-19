//Model object of the game map. Initialized by reading from json from text file.
function MapModel( canvas ) {
	var lookup = {};
	
	// Initialization function
	this.init = function(id = 1) {
		for (var i = 0, len = jsonstr.length; i < len; i++) {
          lookup[jsonstr[i].id] = jsonstr[i]; 
		}		
		this.id = id;
		this.name = lookup[id].name;
		this.size = lookup[id].size;
		this.specials = lookup[id].specialsquares;
		this.blocks = lookup[id].blocks;
		
	}
}