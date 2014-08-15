var c = document.getElementById("testCanvas");
var ctx = c.getContext("2d");

function drawLine( x1, y1, x2, y2 ) {
	ctx.moveTo( x1 + c.width / 2, y1 + c.height / 2 );
	ctx.lineTo( x2 + c.width / 2, y2 + c.height / 2 );
	ctx.stroke();
};

//drawLine( 0, 0, 50, 50 );
var radius = 180;
//drawImage();
window.setInterval( function(){ drawImage() }, 5000 );

function drawImage( ) {
	ctx.beginPath();
	ctx.clearRect( 0,0,c.width, c.height );
	var scale = Math.floor( ( Math.random() * 5 ) + 2 );

	for ( var i = 0; i < 2 * Math.PI; i = i + Math.PI / 20 ) {
		drawLine( Math.sin( i ) * radius, Math.cos( i ) * radius, 
			Math.sin( i * scale ) * radius, Math.cos( i * scale ) * radius);
		
	}
}


