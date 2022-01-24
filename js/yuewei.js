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
		/*ctx.arc(coords[i][0], coords[i][1], distBetweenClicks, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();*/
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
	var xE = coords[4][0];
	var yE = coords[4][1];
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
	if (yA == yC)
	{
		yA++;
	}
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
	// console.log ("xP = " + xP + " yP = " + yP + " yP2 = " + (l2a * xP + l2b));
	// draw the line from P to Ball
	l3a = (yP - yE) / (xP - xE);
	l3b = - l3a * xP + yP;
	ctx.fillStyle = '#aaa';
	if (l3a <= 1 && l3a >= -1)
	{
		for (x = 0; x < yueweiCanvas.width; x++)
		{
			y = l3a * x + l3b;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.fillRect(x, y, 1, 1);
			ctx.fill();
			ctx.closePath();
		}
	}
	else
	{
		for (y = 0; y < yueweiCanvas.height; y++)
		{
			x = (y - l3b) / l3a;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.fillRect(x, y, 1, 1);
			ctx.fill();
			ctx.closePath();
		}
	}
	if (countClicks == 6)
	{
		xF = coords[5][0];
		yF = coords[5][1];
		l4a = (yP - yF) / (xP - xF);
		l4b = - l4a * xP + yP;
		ctx.fillStyle = '#333';
		if (l4a <= 1 && l4a >= -1)
		{
			for (x = 0; x < yueweiCanvas.width; x++)
			{
				y = l4a * x + l4b;
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.fillRect(x, y, 1, 1);
				ctx.fill();
				ctx.closePath();
			}
		}
		else
		{
			for (y = 0; y < yueweiCanvas.height; y++)
			{
				x = (y - l4b) / l4a;
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.fillRect(x, y, 1, 1);
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

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
	
	if (!document.getElementById('hide').checked)
	{
		drawPoints();
		drawLines();
	}
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