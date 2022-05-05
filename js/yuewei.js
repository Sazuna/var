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
const MAXCLICKS = 6;
const distBetweenClicks = 15;
var coords = new Array(MAXCLICKS);

for (var i = 0; i < coords.length; i++) {
  coords[i] = new Array(2);
}

///////////////
// Functions //
///////////////

// Checks if an existing point is clicked. If not, adds a new point
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

// If an existing point is clicked, change its coords following the mouse
function movePoint(e)
{
	if (dragging >= 0 && dragging <= countClicks)
	{
		coords[dragging][0] = getX(e);
		coords[dragging][1] = getY(e);
		redraw();
	}
}

// When the mouse is released after a drag
function releasePoint(e)
{
	dragging = -1;
}

// Draws the 十
function drawPoints()
{
	ctx.fillStyle = '#00f';
	for (i = countClicks - 1; i >= 0 || i == 3; i--)
	{
		ctx.beginPath();
		ctx.fillStyle = '#00f';
		ctx.strokeStyle = '#000';
		var x = coords[i][0];
		var y = coords[i][1];
		ctx.moveTo(x-distBetweenClicks, y);
		ctx.lineTo(x + distBetweenClicks, y);
		ctx.moveTo(x, y-distBetweenClicks);
		ctx.lineTo(x, y+distBetweenClicks);
		ctx.stroke();
		ctx.closePath();
	}
}

function drawYueWei()
{
	var xP;
	var yP;
	var xA = coords[0][0];
	var yA = coords[0][1];
	var xB = coords[2][0];
	var yB = coords[2][1];
	var xC = coords[1][0];
	var yC = coords[1][1];
	var xD = coords[3][0];
	var yD = coords[3][1];

	// Make points' position exchangeable horizontally
	if (xB > xD)
	{
		xx = xD;
		xD = xB
		xB = xx;
		yy = yD
		yD = yB;
		yB = yy;
	}
	if (xA > xC)
	{
		xx = xA;
		xA = xC;
		xC= xx;
		yy = yA;
		yA = yC;
		yC = yy;
	}

	// Prevent divisions per 0
	if (xA == xB)
	{
		xA ++;
	}
	if (xC == xD)
	{
		xC++;
	}
	// 公式
	//(yP - yA) / (yB - yA) = (xP - xA) / (xB - xA);
	//(yP - yC) / (yD - yC) = (xP - xC) / (xD - xC);
	// y = ax+b
	l1a = (yB - yA) / (xB - xA);
	l1b = yA - l1a * xA; // yA = xA * l1a + l1b;
	l2a = (yD - yC) / (xD - xC);
	l2b = yC - l2a * xC; // yC = xC * l2a + l2b;
	// l1a * xP + l1b = l2a * xP + l2b; //
	// l1a * xP - l2a * xP = l2b - l1b;
	// xP (l1a-l2a) = l2b - l1b;
	xP = (l2b - l1b) / (l1a - l2a);
	yP = l1a * xP + l1b;
	
	// draw the line from P (Perspective point) to Object (player)
	ctx.fillStyle = '#f00';
	ctx.beginPath();
	for (i = countClicks - 1 ; i >= 4; i--)
	{
		var xO = coords[i][0];
		var yO = coords[i][1];
		a = (yP - yO) / (xP - xO);
		b = -a * xP + yP;
		if (a <= 1 && a >= -1)
		{
			for (x = 0; x < yueweiCanvas.width; x++)
			{
				y = a * x + b;
				ctx.moveTo(x, y);
				ctx.fillRect(x, y, 1, 1);
			}
		}
		else
		{
			for (y = 0; y < yueweiCanvas.height; y++)
			{
				x = (y - b) / a;
				ctx.moveTo(x, y);
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
	ctx.fill();
	ctx.closePath();
}

// Draw the four lines (two for the football field, two for the players')
function drawLines()
{
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#000';
	if (countClicks >= 2)
	{
		ctx.beginPath();
		ctx.moveTo(coords[0][0], coords[0][1]);
		ctx.lineTo(coords[1][0], coords[1][1]);
		ctx.stroke();
	}
	if (countClicks >= 4)
	{
		ctx.beginPath();
		ctx.moveTo(coords[2][0], coords[2][1]);
		ctx.lineTo(coords[3][0], coords[3][1]);
		ctx.stroke();
	}
}

// Returns the point that is the closest to the click.
// If none is close enough, returns -1.
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

// Clears every lines or points on the canvas
function clear()
{
	ctx.clearRect(0, 0, yueweiCanvas.width, yueweiCanvas.height);
}

// Draws lines, points and 越位 lines
function redraw()
{
	clear();
	// If hide 隐藏 box is not checked
	if (!document.getElementById('hide').checked)
	{
		drawPoints();
		drawLines();
	}
	// If there are more than 4 points, draw 越位 lines
	if (countClicks >= 5)
	{
		drawYueWei();
	}
}

function getX(e)
{
	return e.offsetX; // layerX;
}

function getY(e)
{
	return e.offsetY; // layerY;
}
