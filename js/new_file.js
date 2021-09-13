var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video:true,audio:false},gotStream,noStream);

function gotStream(stream)
{
	video.src=URL.createObjectURL(stream);
	video.onerror = function()
	{
		stream.stop();
	}
	stream.onended = noStream;
	video.onloadedmetadata = function()
	{
		alert("camera opened")
	};
}

function noStream(error)
{
	alert(error);
}

document.getElementById("snap").addEventListener("click",function()
{
	context.drawImage(video, 0, 0, 1024, 800);
});