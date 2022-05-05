var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var yuewei = document.getElementById("yuewei");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video:{facingMode:"environment"},audio:false},gotStream,noStream);

//RECORD
var media_rec="";
var stream_cvs ='cvb';
var chunks = [];
var is_rec=false;
var rec = document.getElementById("rec");

// TIMER
var initialTime;
var stop;
var isRunning = false;
var timer = document.getElementById("timer");

// Start the chronometer
function initTime()
{
	isRunning = true;
	var date = new Date();
	initialTime = date.getTime();
	countTime();
}

// Continues to count time until the recording stops
function countTime()
{
	if (isRunning)
	{
		var date = new Date();
		var time = date.getTime();
		var hours = 0;
		var min = 0;
		var sec = parseInt((time - initialTime) / 1000);
		min = parseInt(sec / 60);
		hours = parseInt(min / 60);
		sec = sec % 60;
		min = min % 60;
		timer.innerHTML = checkTime(hours) + ":" + checkTime(min) + ":" + checkTime(sec);
		setTimeout(countTime, 100); // Every 100ms, start this function again
	}
}

// For displaying time, we need two-numeral numbers
function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

// When the record is stopped, we need to stop running the chronometer
function stopTime()
{
	isRunning = false;
}

// Camera management
function gotStream(stream)
{
	//video.src=URL.createObjectURL(stream);
	video.srcObject = stream;
	video.onerror = function()
	{
		stream.stop();
	}
	stream.onended = noStream;
	video.onloadedmetadata = function()
	{
		//alert("camera opened");
	};

	media_rec = new MediaRecorder(stream);
	
	 media_rec.onstop = function(e) {
	
	  blob = new Blob(chunks, { 'type' : 'video/webm; codecs=opus' });
	  chunks = [];
	  video_url = window.URL.createObjectURL(blob);
	
	  document.getElementById('resultat').src = video_url;
	
	  console.log("arret de l'enregistrement");
	  }
	
	media_rec.ondataavailable = function(e) {
	 chunks.push(e.data);
	}
	
	// Button REC or STOP is clicked
	document.getElementById("rec").addEventListener("click", function(){
		if (!is_rec) // If not recording yet
		{
			media_rec.start(); // Starts recording camera input
			console.log(media_rec.state);
			document.getElementById('innerRec').innerHTML="STOP"; // Change button's REC into STOP
			initTime(); // Start chronometer
		}
		else{ // If already recording
			media_rec.stop(); // Stops recording camera input
			console.log(media_rec.state);
			document.getElementById('innerRec').innerHTML="REC"; // Change STOP into REC again
			// Automatically lead to 重播步骤
			document.getElementById("paishipin").style.display="none";
			document.getElementById("manfang").style.display="block";
			stopTime(); // Stops counting time
		}
		// Invert "is recording" state
		is_rec=!is_rec;
		
	});
}

function noStream(error)
{
	alert(error);
}