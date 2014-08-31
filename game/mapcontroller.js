
// Controller between graphengine (View) and mapmodel (Model)

function MapController( boardModel ) {
	this.board = boardModel;
	
	this.addElement = function(element, x, y) {
		console.log( "addElement: " + x + "," + y + "/" + (this.board.activeBoard[x][y]));
		this.board.activeBoard[x][y] = element;
	}

	this.addBlockToModel = function( element, x1, y1, x2, y2, x3, y3, x4, y4 )  {
		this.board.activeBoard[x1][y1] = element;
		this.board.activeBoard[x2][y2] = element;
		this.board.activeBoard[x3][y3] = element;
		this.board.activeBoard[x4][y4] = element;
	}
	
	this.addBlock = function(  element, type, x, y, orientation)  {
		console.log( "adding block: ", element, type, x, y, orientation );
		switch ( type ) {
			case 's':
				if ( orientation == 0 || orientation == 2 ) {
					this.addBlockToModel( element, x, y, x + 1, y, x + 1, y + 1, x + 2, y + 1 );
				} else {
					this.addBlockToModel( element, x + 1, y, x, y + 1, x + 1, y + 1, x, y + 2 );
				}
				break;
			case 'sq':
				this.addBlockToModel( element, x, y, x + 1, y, x , y  + 1, x + 1, y + 1 );
				break;
			case 'l':
				switch ( orientation ) {
					case 0:
						this.addBlockToModel( element, x, y, x + 1, y, x + 2, y, x, y + 1 );
						break;
					case 1:
						this.addBlockToModel( element, x, y, x + 1, y, x + 1, y + 1, x + 1, y + 2 );
						break;
					case 2:
						this.addBlockToModel( element, x, y + 1, x + 1, y + 1, x + 2, y + 1, x + 2, y );
						break;
					case 3:
						this.addBlockToModel( element, x, y, x, y + 1, x, y + 2, x + 1, y + 2 );
						break;
				}
				// TODO Flip
				break;
			case 't':
				if ( orientation == 0 || orientation == 2 ) {
					if (  orientation == 0 ) {
						this.addBlockToModel( element, x, y, x + 1, y, x + 2, y, x + 1, y + 1 );
					} else {
						this.addBlockToModel( element, x, y + 1, x + 1, y + 1, x + 2, y + 1, x + 1, y );
					}
				} else {
					if ( orientation == 1 ) {
						this.addBlockToModel( element, x + 1, y, x + 1, y + 1, x + 1, y + 2, x, y + 1 );
					} else {
						this.addBlockToModel( element, x, y, x, y + 1, x, y + 2, x + 1, y + 1 );
					}
				}
				break;
			case 'i':
				if ( this.orientation == 0 || this.orientation == 2 ) {
					this.addBlockToModel( element, x, y, x + 1, y, x + 2, y, x + 3, y );
				} else {
					this.addBlockToModel( element, x, y, x , y + 1, x, y + 2, x, y + 3 );
				}

				break;
		}
		
		// TODO remove added block from map model's available blocks
		this.board.blocks[element][type]--;
	}
}

