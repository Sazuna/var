// Page components
yueweiCanvas = document.getElementById("yueweiCanvas");
var ctx = yueweiCanvas.getContext('2d');
const rect = canvas.getBoundingClientRect()
  
// Listeners
yueweiCanvas.addEventListener('mousedown', clickPoint, false);
yueweiCanvas.addEventListener('mousemove', movePoint, false);
yueweiCanvas.addEventListener('mouseup', releasePoint, false);

// Variables
var countClicks = 0;
var dragging = -1;
const MAXCLICKS = 5;
const distBetweenClicks = 15;
var coords = new Array(MAXCLICKS);
for (var i = 0; i < coords.length; i++) {
  coords[i] = new Array(2);
}

// Functions
function clickPoint(e)
{
	x = getX(e);
	y = getY(e);
	dragging = nearExisting(x, y);
	if (dragging < 0)
	{
		coords[countClicks] = [x,y];
		if (countClicks < MAXCLICKS)
		{
			countClicks ++;
			redraw();
		}
	}
}

function movePoint(e)
{
	if (dragging >= 0 && dragging <= countClicks)
	{
		coords[dragging][0] = getX(e);
		coords[dragging][1] = getY(e);
		redraw();
	}
}

function releasePoint(e)
{
	dragging = -1;
}

function drawPoints()
{
	ctx.fillStyle = '#00f';
	for (i = 0; i < countClicks; i++)
	{
		ctx.beginPath();
		ctx.arc(coords[i][0], coords[i][1], distBetweenClicks, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function drawArea()
{
	ctx.fillStyle = '#f00';
	ctx.beginPath();
	ctx.moveTo(coords[0][0], coords[0][1]);
	for (i = 0; i < countClicks && i < 4; i++)
	{
			ctx.lineTo(coords[i][0],coords[i][1]);
	}
	ctx.closePath();
	ctx.fill();
	ctx.draw;
}

function drawLines()
{
	ctx.lineWidth = 2;
	ctx.fillStyle = '#00f';
	if (countClicks >= 2)
	{
		ctx.beginPath();
		ctx.moveTo(coords[0][0], coords[0][1]);
		ctx.lineTo(coords[1][0], coords[1][1]);
		ctx.stroke();
		ctx.draw;
	}
	if (countClicks >= 4)
	{
		ctx.beginPath();
		ctx.moveTo(coords[2][0], coords[2][1]);
		ctx.lineTo(coords[3][0], coords[3][1]);
		ctx.stroke();
		ctx.draw;
	}
	if (countClicks == 5)
	{
		// Calculate the perspective point to make the outside line
		// Perspective point has Px and Py as coordinates
		var Px = 0; 
		var Py = 0;
		ctx.beginPath();
		ctx.moveTo(coords[4][0], coords[4][1]);
	}
}

function nearExisting(x, y)
{
	for (i = 0; i < countClicks; i++)
	{
		x2 = coords[i][0];
		y2 = coords[i][1];
		dist = (x - x2) * (x - x2) + (y - y2) * (y - y2);
		if (dist < distBetweenClicks*distBetweenClicks)
		{
			return i;
		}
	}
	return -1;
}

function clear()
{
	ctx.clearRect(0, 0, yueweiCanvas.width, yueweiCanvas.height);
}

function redraw()
{
	clear();
	//drawArea();
	drawPoints();
	drawLines();
}

function getX(e)
{
	return e.offsetX; // layerX;
}

function getY(e)
{
	return e.offsetY; // layerY;
}