

// All drawing stuff goes to this file. 
// It uses somekind model where it gets its information for drawing current game situation

function GraphEngine( canvas ) {
	// Drawing canvas and context
	this.c = canvas;
	this.ctx = canvas.getContext("2d");
	
	// Settings for game board - perhaps from board model?
	this.rowCount = 10;
	this.colCount = 15;
	
	// Offsets for different game parts
	this.boardStartX = 200;
	this.boardStartY = 50;
	
	// defaults for block and cell sizes
	this.boardBlockSize = 16;
	this.boardCellSize = 18;
	
	// Initialization function - why use this?
	this.init = function ( ) {
	
		
	}
	
	// Draws current state of the game
	this.draw = function() {
		// clear everything first
		this.ctx.beginPath();
		this.ctx.clearRect( 0,0, this.c.width, this.c.height );
		
		// draw different parts
		this.drawInfo();
		this.drawBoard();
		
		this.drawGame();
	};
	

	this.drawBoard = function() {
		this.ctx.strokeStyle = "#909090"; 
		for ( var i = 0; i < this.rowCount + 1; i++ ) {
			this.ctx.moveTo( this.boardStartX, 
				this.boardStartY + i * this.boardCellSize );
			this.ctx.lineTo( this.boardStartX + this.colCount * this.boardCellSize, 
				this.boardStartY + i * this.boardCellSize );
		}

		for ( var i = 0; i < this.colCount + 1; i++ ) {
			this.ctx.moveTo( this.boardStartX + i * this.boardCellSize, 
				this.boardStartY );
			this.ctx.lineTo( this.boardStartX + i * this.boardCellSize, 
				this.boardStartY + this.rowCount * this.boardCellSize );
		}
		this.ctx.stroke();
	};
	
	this.drawInfo = function() {
		this.ctx.font = "20px Arial";
		this.ctx.fillText("Available blocks:",10,25);
	};
	
	
	this.drawGame = function() {
		// Draw current game situation
		// TODO just some content now
		
		this.drawBoardElement( 'fire', 0, 0 );
		this.drawBoardElement( 'air', 2, 3 );
		this.drawBoardElement( 'water', 4, 5);
		this.drawBoardElement( 'earth', 7, 7);
			
	}
	
	this.drawElement = function( element, x, y) {
		switch ( element ) {
		case 'fire':
			this.ctx.fillStyle = "#FF0000";
			break;
		case 'air':
			this.ctx.fillStyle = "#00FFFF";
			break;
		case 'water':
			this.ctx.fillStyle = "#0000FF";
			break;
		case 'earth':
			this.ctx.fillStyle = "#A52A2A";
			break;
		default:
			break;
		}
		this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
	}
	
	this.drawBoardElement = function( element, x, y) {
		this.drawElement(  element, 
			this.boardStartX + x * this.boardCellSize + 1,
			this.boardStartY + y * this.boardCellSize + 1);
	}
	
}
