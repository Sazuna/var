var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video:{facingMode:"environment"},audio:false},gotStream,noStream);

var yuewei = document.getElementById("yuewei");

//RECORD VARS
var media_rec="";
var stream_cvs ='cvb';
var chunks = [];
var is_rec=false;
var rec = document.getElementById("rec");

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
	
	document.getElementById("rec").addEventListener("click", function(){
		if (!is_rec)
		{
			media_rec.start();
			console.log(media_rec.state);
			console.log("demarage enregistrement");
			document.getElementById('rec').style.color = "red";
		}
		else{
			media_rec.stop();
			console.log(media_rec.state);
			document.getElementById('rec').style.color = "black";
			
			document.getElementById("paishipin").style.display="none";
			document.getElementById("manfang").style.display="block";
			
		}
		
		is_rec=!is_rec;
		
	});
}

function noStream(error)
{
	alert(error);
}