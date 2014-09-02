//Model object of the game map. Initialized by reading from json from text file.
function MapModel( canvas ) {
	
	var lookup = {};
	this.pointsMultiplier = 0;
	
	// Initialization function
	this.init = function( id ) {
		for (var i = 0, len = jsonstr.length; i < len; i++) {
			lookup[jsonstr[i].id] = jsonstr[i]; 
		}
		
		// Load current data
		this.id = id;
		this.name = lookup[id].name;
		this.specials = lookup[id].special_squares;
		this.size = lookup[id].size;
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
				var xArr = [position[0],position[2] || position[0]].sort();
				var yArr = [position[1],position[3] || position[1]].sort();

				if(xArr[ 0 ] == xArr[ 1 ]){
					x = xArr[0];
					for(y = yArr[ 0 ]; y <= yArr[ 1 ]; y++){
						console.log( "position: " + x + "/" + y + "/" + element );
						this.activeBoard[ x ][ y ] = element;
						this.countMultiplier(element);
					}
				}
				else if(yArr[ 0 ] == yArr[ 1 ]){
					y = yArr[0];
					for(x = xArr[ 0 ]; x <= xArr[ 1 ]; x++){
						console.log( "position: " + x + "/" + y + "/" + element );
						this.activeBoard[ x ][ y ] = element;
						this.countMultiplier(element);
					}
				}
				else{
					for(x = xArr[ 0 ]; x <= xArr[ 1 ] ; x++){
						for(y = yArr[ 0 ]; y < yArr[ 1 ]; y++){
							console.log( "position: " + x + "/" + y + "/" + element );
							this.activeBoard[ x ][ y ] = element;
							this.countMultiplier(element);
						}
					}
				}
			}
		}
	}

	this.countMultiplier = function( element ) {
		if(element == 'optional'){
			this.pointsMultiplier--;
		}
		else{
			this.pointsMultiplier++;
		}
	}
}