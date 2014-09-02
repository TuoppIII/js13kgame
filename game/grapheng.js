
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
	
	this.addingElement = false;
	this.lastLoc = { x:0, y:0 };
	this.orientation = 0;
	this.flipped = false;
	
	this.activeBlocks = [];
	
	this.timerOn = false;
	this.intervalId;
	//for points calculation purposes
	this.millisLeft;

	// Initialization function
	this.init = function() {
		this.c.addEventListener( "click", this.doMouseClick.bind( this ) );
		this.c.addEventListener( "mousemove", this.doMouseMove.bind( this ) );
		window.addEventListener( "keydown", this.doKeyDown.bind( this ), false );

		var seconds_left = this.rowCount * this.colCount;
		document.getElementById("countdown").innerHTML = parseInt(seconds_left / 60) + "m, " + parseInt(seconds_left % 60) + "s";  ;
	};
	
	// Draws current state of the game
	this.draw = function() {
		// clear everything first
		this.ctx.beginPath();
		this.ctx.clearRect( 0,0, this.c.width, this.c.height );

		this.boardBlockX = 10;
		this.boardBlockY = 80;
		
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
			for ( var column in this.board.activeBoard[row] ) {
				//console.log( "board cell: " + row + "," + column + "," + this.board.activeBoard[row][column] );
				this.drawBoardElement( this.board.activeBoard[row][column], row, column );
			}
		}
	}

	this.setElementFill = function ( element ) {
		switch ( element ) {
			// Color codes from: http://www.rapidtables.com/web/color/RGB_Color.htm
			// TODO Colors / images from ElementModel
			case 'bfire':
			case 'fire':
				this.ctx.fillStyle = "#FF4500";
				break;
			case 'bair':
			case 'air':
				this.ctx.fillStyle = "#00FFFF";
				break;
			case 'bwater':
			case 'water':
				this.ctx.fillStyle = "#0000FF";
				break;
			case 'bearth':
			case 'earth':
				this.ctx.fillStyle = "#37E21D";
				break;
			case 'disabled':
				this.ctx.fillStyle = "#A0A0A0";
				break;
			case 'optional':
				this.ctx.fillStyle = "#ebebeb";
				break;
			case 'blank':
				this.ctx.fillStyle = "#FFE5CC";
				break;
			default:
				this.ctx.fillStyle = "#A0A0A0";
				break;
		}
	}
	
	this.drawElement = function( element, x, y) {
		this.setElementFill( element );
		this.ctx.fillRect( x, y, this.boardBlockSize, this.boardBlockSize);
	}
	
	this.drawBoardElement = function( element, x, y) {
		this.drawElement(  element, 
			this.boardStartX + x * this.boardCellSize + 1,
			this.boardStartY + y * this.boardCellSize + 1);
	}
	
	this.drawBlocks = function( ) {
		this.activeBlocks = []; // reset bounding boxes for available blocks
		
		// Draw available block based on board
		for ( var element in this.board.blocks ) {
			this.setElementFill( element );
			for ( var block in this.board.blocks[element] ) {
				// console.log("block: " + element + " " + block + " " + this.board.blocks[element][block]);
				var amount = this.board.blocks[element][block];
				if ( amount == 0 ) {
					// Don't draw empty blocks
					continue;
				}
				// Show amount and save "bounding box" for later use
				this.ctx.fillText( "x " + amount, this.boardBlockX + this.boardBlockSize * 5, this.boardBlockY + this.boardBlockSize );
				this.activeBlocks.push( { 
					x1: this.boardBlockX, y1: this.boardBlockY, 
					x2: this.boardBlockX + this.boardBlockSize * 4, 
					y2: this.boardBlockY + this.boardBlockSize * 2, 
					blocktype: block, blockelement: element }  ); 
				// Draw the block
				switch ( block ) {
					case 's':
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY,
							this.boardBlockSize * 2, this.boardBlockSize );
						this.ctx.fillRect( this.boardBlockX + this.boardBlockSize, 
							this.boardBlockY + this.boardBlockSize,
							this.boardBlockSize * 2, this.boardBlockSize );
						break;
					case 'sq':
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY, 
							this.boardBlockSize * 2, this.boardBlockSize * 2);
						break;
					case 'l':
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY, 
							this.boardBlockSize * 3, this.boardBlockSize);
						this.ctx.fillRect( this.boardBlockX, 
							this.boardBlockY + this.boardBlockSize, 
							this.boardBlockSize, this.boardBlockSize );
						break;
					case 't':
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY,
							this.boardBlockSize * 3, this.boardBlockSize );
						this.ctx.fillRect( this.boardBlockX + this.boardBlockSize, 
							this.boardBlockY + this.boardBlockSize,
							this.boardBlockSize, this.boardBlockSize );						
						break;
					case 'i':
						this.ctx.fillRect( this.boardBlockX, this.boardBlockY,
							this.boardBlockSize * 4, this.boardBlockSize );
						break;						
					default:
						break;
				}
				this.boardBlockY += this.boardBlockSize * 3;
			}
		}
	}

	this.drawBlockShape = function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
		this.drawBoardElement( this.addingElement.element, x1, y1 );
		this.drawBoardElement( this.addingElement.element, x2, y2 );
		this.drawBoardElement( this.addingElement.element, x3, y3 );
		this.drawBoardElement( this.addingElement.element, x4, y4 );

	}
	
	this.drawBlockOnBoard = function( x, y ) {
		switch ( this.addingElement.type ) {
			case 's':
				if ( this.orientation == 0 || this.orientation == 2 ) {
					x = x > this.colCount - 3 ? this.colCount - 3 : x;
					y = y > this.rowCount - 2 ? this.rowCount - 2 : y;
					this.drawBlockShape( x, y, x + 1, y, x + 1, y + 1, x + 2, y + 1 );
				} else {
					x = x > this.colCount - 2 ? this.colCount - 2 : x;
					y = y > this.rowCount - 3 ? this.rowCount - 3 : y;
					this.drawBlockShape( x + 1, y, x, y + 1, x + 1, y + 1, x, y + 2 );
				}
				// TODO Flip, or use left-over orientations?
				break;
			case 'sq':
				x = x > this.colCount - 2 ? this.colCount - 2 : x;
				y = y > this.rowCount - 2 ? this.rowCount - 2 : y;
				this.drawBlockShape( x, y, x + 1, y, x, y + 1, x + 1, y + 1 );
				break;
			case 'l':
				if ( !this.flipped ) {
					if ( this.orientation == 0 || this.orientation == 2 ) {
						x = x > this.colCount - 3 ? this.colCount - 3 : x;
						y = y > this.rowCount - 2 ? this.rowCount - 2 : y;
						if ( this.orientation == 0 ) {
							this.drawBlockShape( x, y, x + 1, y, x + 2, y, x, y + 1 );
						} else {
							this.drawBlockShape( x, y + 1, x + 1, y + 1, x + 2, y + 1, x + 2, y );
						}
					} else {
						x = x > this.colCount - 2 ? this.colCount - 2 : x;
						y = y > this.rowCount - 3 ? this.rowCount - 3 : y;
						if ( this.orientation == 1 ) {
							this.drawBlockShape( x, y, x + 1, y, x + 1, y + 1, x + 1, y + 2 );
						} else {
							this.drawBlockShape( x, y, x, y + 1, x, y + 2, x + 1, y + 2 );
						}
					}
				} else {
					if ( this.orientation == 0 || this.orientation == 2 ) {
						x = x > this.colCount - 3 ? this.colCount - 3 : x;
						y = y > this.rowCount - 2 ? this.rowCount - 2 : y;
						if ( this.orientation == 0 ) {
							this.drawBlockShape( x, y, x, y + 1, x + 1, y + 1, x + 2, y + 1 );
						} else {
							this.drawBlockShape( x, y, x + 1, y, x + 2, y, x + 2, y + 1 );
						}
					} else {
						x = x > this.colCount - 2 ? this.colCount - 2 : x;
						y = y > this.rowCount - 3 ? this.rowCount - 3 : y;
						if ( this.orientation == 1 ) {
							this.drawBlockShape( x, y + 2, x + 1, y, x + 1, y + 1, x + 1, y + 2 );
						} else {
							this.drawBlockShape( x, y, x + 1, y, x, y + 1, x, y + 2 );
						}
					}					
				}
				break;
			case 't':
				if ( this.orientation == 0 || this.orientation == 2 ) {
					x = x > this.colCount - 3 ? this.colCount - 3 : x;
					y = y > this.rowCount - 2 ? this.rowCount - 2 : y;
					if ( this.orientation == 0 ) {
						this.drawBlockShape( x, y, x + 1, y, x + 2, y, x + 1, y + 1 );
					} else {
						this.drawBlockShape( x, y + 1, x + 1, y + 1, x + 2, y + 1, x + 1, y );
					}
				} else {
					x = x > this.colCount - 2 ? this.colCount - 2 : x;
					y = y > this.rowCount - 3 ? this.rowCount - 3 : y;
					if ( this.orientation == 1 ) {
						this.drawBlockShape( x + 1, y, x + 1, y + 1, x + 1, y + 2, x, y + 1 );
					} else {
						this.drawBlockShape( x, y, x, y + 1, x, y + 2, x + 1, y + 1 );
					}
				}
				break;
			case 'i':
				if ( this.orientation == 0 || this.orientation == 2 ) {
					x = x > this.colCount - 4 ? this.colCount - 4 : x;
					y = y > this.rowCount - 1 ? this.rowCount - 1 : y;
					this.drawBlockShape( x, y, x + 1, y, x + 2, y, x + 3, y );
				} else {
					x = x > this.colCount - 1 ? this.colCount - 1 : x;
					y = y > this.rowCount - 4 ? this.rowCount - 4 : y;
					this.drawBlockShape( x, y, x , y + 1, x, y + 2, x, y + 3 );
				}
				break;						
			default:
				break;
		}
		this.activeBlockX = x;
		this.activeBlockY = y;
	}

	this.insideBoard = function( x, y ) {
		return ( x >= this.boardStartX && x <= this.boardStartX + this.colCount * this.boardCellSize 
			&& y >= this.boardStartY && y <= this.boardStartY + this.rowCount * this.boardCellSize );
	}
	
	this.boardLoc = function ( locx, locy ) {
		return { x: Math.floor( ( locx - this.boardStartX) / this.boardCellSize ), 
				y: Math.floor( ( locy - this.boardStartY) / this.boardCellSize )};
	}

	this.doMouseClick = function( event ) {
		// TODO route event forward based on where it had happened
		var bbox = this.c.getBoundingClientRect();
		var loc = { x: Math.floor( event.clientX - bbox.left * (this.c.width  / bbox.width) ),
				y: Math.floor( event.clientY - bbox.top  * (this.c.height / bbox.height) )
			}; 
		console.log( "event on coords: " + loc.x + "," + loc.y );
		
		if ( this.insideBoard( loc.x, loc.y ) ) 
		{
			// Forward clicks to board to board controller
			var boardLoc = this.boardLoc( loc.x, loc.y );
			//console.log("event on The Board, coords: " + boardLoc.x + "," + boardLoc.y + "," + this.addingElement);
			
			if ( this.addingElement ) {
				// Draw element to board controller
				if ( this.controller.addBlock( this.addingElement.element, this.addingElement.type, this.activeBlockX, this.activeBlockY, this.orientation, this.flipped ) ) // TODO Orientation
				{
					this.boardState = false;
					this.addingElement = false;
					this.draw();
					if(this.controller.checkSuccess()){
						clearInterval(this.intervalId);
						this.calculatePoints();
						document.getElementById("success").innerHTML = "Success!!";
					}
				}
			}
			
		} else {
			// Check if block was selected
			for ( var i in this.activeBlocks ) {
				console.log( this.activeBlocks[i].x1, this.activeBlocks[i].y1, this.activeBlocks[i].x2, this.activeBlocks[i].y2 );
				if ( loc.x > this.activeBlocks[i].x1 && loc.x < this.activeBlocks[i].x2 &&
					loc.y > this.activeBlocks[i].y1 && loc.y < this.activeBlocks[i].y2 ) {					
					console.log( "Selected block " + this.activeBlocks[i].blockelement + " " + this.activeBlocks[i].blocktype );
					this.addingElement = { element: this.activeBlocks[i].blockelement, type: this.activeBlocks[i].blocktype };
					this.orientation = 0;
					this.flipped = false;
					if(!this.timerRunning()){
						this.runTimer();
					}
					break;
				}
			}
		}
	}
	
	this.draftBlock = function( x, y ) {
		if ( this.boardState ) {
			this.ctx.putImageData( this.boardState, this.boardStartX, this.boardStartY );
		}
		// Save current board so that we can draw over it
		this.boardState = this.ctx.getImageData( this.boardStartX, this.boardStartY, 
			this.colCount * this.boardCellSize, this.rowCount * this.boardCellSize 
			);
		
		// Draw block baesed on type and element
		this.drawBlockOnBoard( x, y );
		
	}
	
	this.doMouseMove = function( event ) {
		var bbox = this.c.getBoundingClientRect();
		var loc = { x: Math.floor( event.clientX - bbox.left * (this.c.width  / bbox.width) ),
				y: Math.floor( event.clientY - bbox.top  * (this.c.height / bbox.height) )
			}; 
		if ( this.insideBoard( loc.x, loc.y ) && this.addingElement ) 
		{
			var boardLoc = this.boardLoc( loc.x, loc.y );
			if ( boardLoc.x != this.lastLoc.x || boardLoc.y != this.lastLoc.y ) {
				//console.log("Movement on The Board, coords: " + boardLoc.x + "," + boardLoc.y 
				//	+ "/" + this.lastLoc.x + "," + this.lastLoc.y );
				
				this.draftBlock( boardLoc.x, boardLoc.y );
				
				// Save current location
				this.lastLoc = boardLoc;
			}
		}
	}
		
	this.doKeyDown = function( event ) {
		console.log( "key event: " + event.keyCode );
		// TODO route to controller to handle block orientation
		if ( event.keyCode == 65 ) {
			this.orientation++;
		} else if ( event.keyCode == 68 ) {
			this.orientation--;
		} else if ( event.keyCode == 83 ) {
			this.flipped = !this.flipped;
		}
		this.orientation = this.orientation < 0 ? this.orientation += 4 : this.orientation;
		this.orientation = this.orientation >= 4 ? this.orientation -= 4 : this.orientation;
		console.log( this.orientation, this.flipped );
		this.draftBlock( this.lastLoc.x, this.lastLoc.y );
	}

	this.timerRunning = function( ) {
		return this.timerOn;
	}
	
	this.runTimer = function( ) {
		//Calculate the available time
		//+1 because otherwise timer would jump 2s on first interval
		var availableTime = (this.rowCount * this.colCount + 1) * 1000;
		// set the date we're counting down to
		var targetDate = Date.now() + availableTime;
		// variables for time units
		var minutes, seconds;
		// get tag element
		var countdown = document.getElementById("countdown");
		this.timerOn = true;
		this.intervalId = setInterval(function () {
				var currentDate = Date.now();
				graph.millisLeft = targetDate - currentDate
				var secondsLeft = graph.millisLeft / 1000;

				minutes = parseInt(secondsLeft / 60);
				seconds = parseInt(secondsLeft % 60);

				// format countdown string + set tag value
				countdown.innerHTML = minutes + "m, " + seconds + "s";  
		}, 1000);
	}

	this.calculatePoints = function( ) {
		var multiplier = 1 + (this.board.pointsMultiplier/100);

		var points = document.getElementById("points");
		console.log("multiplier: "+multiplier+" millisLeft: "+this.millisLeft)
		points.innerHTML = "You got " + parseInt((this.millisLeft / 10) * multiplier) + " points!"
	}
}
