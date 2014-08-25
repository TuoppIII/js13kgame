
// All drawing stuff goes to this file. 
// It uses somekind of model where it gets its information for drawing current game situation

function GraphEngine( canvas, boardModel, boardController ) {
	// Drawing canvas and context
	this.c = canvas;
	this.ctx = canvas.getContext("2d");
	
	// Settings for game board - perhaps from board model?
	this.board = boardModel;
	this.controller = boardController;
	this.rowCount = boardModel.size.y;
	this.colCount = boardModel.size.x;
	
	// Offsets for different game parts
	this.boardStartX = 200;
	this.boardStartY = 50;
	this.boardBlockX = 10;
	this.boardBlockY = 80;	
	
	// defaults for block and cell sizes
	this.boardBlockSize = 16;
	this.boardCellSize = 18;

	// Initialization function
	this.init = function() {
		this.c.addEventListener("click", this.doMouseClick.bind( this ) ); // TODO Route to controller?
	
	};
	
	// Draws current state of the game
	this.draw = function() {
		// clear everything first
		this.ctx.beginPath();
		this.ctx.clearRect( 0,0, this.c.width, this.c.height );
		
		// draw different parts
		this.drawInfo();
		this.drawBoard();
		
		this.drawBlocks();
		
		this.drawGame();
	};
	

	this.drawBoard = function() {
		this.ctx.strokeStyle = "#909090"; 
		for ( var i = 0; i < (this.rowCount + 1); i++ ) {
			this.ctx.moveTo( this.boardStartX, 
				this.boardStartY + i * this.boardCellSize );
			this.ctx.lineTo( this.boardStartX + this.colCount * this.boardCellSize, 
				this.boardStartY + i * this.boardCellSize );
		}

		for ( var i = 0; i < (this.colCount + 1); i++ ) {
			this.ctx.moveTo( this.boardStartX + i * this.boardCellSize, 
				this.boardStartY );
			this.ctx.lineTo( this.boardStartX + i * this.boardCellSize, 
				this.boardStartY + this.rowCount * this.boardCellSize );
		}
		this.ctx.stroke();
	}
	
	this.drawInfo = function() {
		this.ctx.font = "20px Arial";

		this.ctx.fillText("Available blocks:", 10, 65);	// Does NOT work in Konqueror - valid HTML5 though
		this.ctx.strokeText( this.board.name, this.boardStartX, this.boardStartY - 10 ); 	// Does NOT work in Konqueror - valid HTML5 though
	}
	
	
	this.drawGame = function() {
		// Draw current game situation
		
		for( var row in this.board.activeBoard ) {
			//console.log( "row: " + row );
			for ( var column in this.board.activeBoard[row] ) {
				console.log( "board cell: " + row + "," + column + "," + this.board.activeBoard[row][column] );
				this.drawBoardElement( this.board.activeBoard[row][column], row, column );
			}
		}
	}
	
	this.drawElement = function( element, x, y) {
		switch ( element ) {
		// Color codes from: http://www.rapidtables.com/web/color/RGB_Color.htm
		// TODO Colors / images from ElementModel
		case 'fire':
			this.ctx.fillStyle = "#FF4500";
			this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
			break;
		case 'air':
			this.ctx.fillStyle = "#00FFFF";
			this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
			break;
		case 'water':
			this.ctx.fillStyle = "#0000FF";
			this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
			break;
		case 'earth':
			this.ctx.fillStyle = "#A52A2A";
			this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
			break;
		default:
			this.ctx.fillStyle = "#A0A0A0";
			this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
			break;
		}
	}
	
	this.drawBoardElement = function( element, x, y) {
		this.drawElement(  element, 
			this.boardStartX + x * this.boardCellSize + 1,
			this.boardStartY + y * this.boardCellSize + 1);
	}
	
	this.drawBlocks = function( ) {
		// Draw available block based on board
		for ( var element in this.board.blocks ) {
			for ( var block in this.board.blocks[element] ) {
				console.log("block: " + element + " " + block + " " +
					this.board.blocks[element][block]);
				switch ( block ) {
					case 'sq':
						this.ctx.fillStyle = "#A52A2A";
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY, 
							this.boardBlockSize * 2, this.boardBlockSize * 2);
						this.boardBlockY += 50;
						break;
					case 'l':
						this.ctx.fillStyle = "#A52A2A";
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY, 
							this.boardBlockSize, this.boardBlockSize * 3);
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY, 
							this.boardBlockSize * 2, this.boardBlockSize );
						this.boardBlockY += 75;
						break;
					default:
						break;
				}
			}
		}
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
			// Forward clicks to board to board controller
			var boardLoc = { x: Math.floor( ( loc.x - this.boardStartX) / this.boardCellSize ), 
				y: Math.floor( ( loc.y - this.boardStartY) / this.boardCellSize )};
			console.log("event on The Board, coords: " + boardLoc.x + "," + boardLoc.y );
			//this.drawBoardElement( 'fire', boardLoc.x, boardLoc.y );
			this.controller.addElement( 'fire', boardLoc.x, boardLoc.y);
			this.drawGame();
		}
	}
	
}
