

// All drawing stuff goes to this file. 
// It uses somekind model where it gets its information for drawing current game situation

function GraphEngine( canvas, boardModel ) {
	// Drawing canvas and context
	this.c = canvas;
	this.ctx = canvas.getContext("2d");
	
	// Settings for game board - perhaps from board model?
	this.boardModel = boardModel;
	this.rowCount = boardModel.size.X;
	this.colCount = boardModel.size.Y;
	
	// Offsets for different game parts
	this.boardStartX = 200;
	this.boardStartY = 50;
	
	// defaults for block and cell sizes
	this.boardBlockSize = 16;
	this.boardCellSize = 18;
	
	// Initialization function - why use this?
	this.init = function() {
		
		this.c.addEventListener("click", this.doMouseClick.bind(this) ); // TODO Route to controller?
		
	}

	this.doMouseClick = function( event ) {
		// TODO route event forward based on where it had happened
		var bbox = this.c.getBoundingClientRect();
		var loc = { x: Math.floor( event.clientX - bbox.left * (this.c.width  / bbox.width) ),
				y: Math.floor( event.clientY - bbox.top  * (this.c.height / bbox.height) )
			};
		console.log( "event on coords: " + loc.x + "," + loc.y );
		
		if ( loc.x >= this.boardStartX && loc.x <= this.boardStartX + this.colCount * this.boardCellSize 
			&& loc.y >= this.boardStartY && loc.y <= this.boardStartY + this.rowCount * this.boardCellSize ) 
		{
			var boardLoc = { x: Math.floor( ( loc.x - this.boardStartX) / this.boardCellSize ), 
				y: Math.floor( ( loc.y - this.boardStartY) / this.boardCellSize )};
			console.log("event on The Board, coords: " + boardLoc.x + "," + boardLoc.y );
			this.drawBoardElement( 'fire', boardLoc.x, boardLoc.y );
		}
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
	}
	

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
	}
	
	this.drawInfo = function() {
		this.ctx.font = "20px Arial";
		this.ctx.fillText("Available blocks:",10,50);
		
		this.ctx.strokeText( this.boardModel.name, this.boardStartX, this.boardStartY - 10 );
	}
	
	
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
		// Color codes from: http://www.rapidtables.com/web/color/RGB_Color.htm
		case 'fire':
			this.ctx.fillStyle = "#FF4500";
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
