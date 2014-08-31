
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
				// TODO
				break;
			case 'sq':
				this.board.activeBoard[x][y] = element;
				this.board.activeBoard[x+1][y] = element;
				this.board.activeBoard[x][y+1] = element;
				this.board.activeBoard[x+1][y+1] = element;
				break;
			case 'l':
				switch ( orientation ) {
					case 0:
						this.addBlockToModel( element, x, y, x + 1, y, x + 2, y, x, y + 1 );
						break;
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
				}
				break;
			case 't':
				// TODO
				break;
			case 'i':
				// TODO
				break;
		}
		
		// TODO remove added block from map model's available blocks
		this.board.blocks[element][type]--;
	}
}

