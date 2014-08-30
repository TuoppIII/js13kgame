
// Controller between graphengine (View) and mapmodel (Model)

function MapController( boardModel ) {
	this.board = boardModel;
	
	this.addElement = function(element, x, y) {
		console.log( "addElement: " + x + "," + y + "/" + (this.board.activeBoard[x][y]));
		this.board.activeBoard[x][y] = element;
	}
	
	
	this.addBlock = function(  element, type, x, y )  {
		console.log( "adding block: ", element, type, x, y );
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
				// TODO
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

