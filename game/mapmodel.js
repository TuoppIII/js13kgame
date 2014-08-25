//Model object of the game map. Initialized by reading from json from text file.
function MapModel( canvas ) {
	
	var lookup = {};
	
	// Initialization function
	this.init = function( id ) {
		for (var i = 0, len = jsonstr.length; i < len; i++) {
			lookup[jsonstr[i].id] = jsonstr[i]; 
		}
		
		// Load current data
		this.id = id;
		this.name = lookup[id].name;
		this.specials = lookup[id].special_squares;
		this.size = { x: parseInt( lookup[id].size[0] ),
					y: parseInt( lookup[id].size[1] ) };
		this.blocks = lookup[id].blocks;
		
		// Init board & data
		this.activeBoard = new Array( this.size.x );
		for ( var i = 0; i < this.size.x; i++ ) {
			this.activeBoard[i] = new Array( this.size.y );
		}
		this.initBoard();
		
	}
	
	this.initBoard = function() {
		for ( var element in this.specials ) {
			//console.log( "special: " + element );
			for ( var block in this.specials[ element ] ) {
				var position = (this.specials[ element ])[ block ].split(",") ;
				console.log( "position: " + position[0] + "/" + position[1] + "/" + element );
				this.activeBoard[ position[0] ][ position[1] ] = element;
			}
		}
	}
	
}