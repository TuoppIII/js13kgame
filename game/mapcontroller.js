
// Controller between graphengine (View) and mapmodel (Model)

function MapController( boardModel ) {
	this.board = boardModel;
	
	this.addElement = function(element, x, y) {
		console.log( "addElement: " + x + "," + y + "/" + (this.board.activeBoard[x][y]));
		this.board.activeBoard[x][y] = element;
	}
}

