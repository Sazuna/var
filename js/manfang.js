var video2=document.getElementById("resultat");
var slider=document.getElementById("speedcontrol");
function manfang()
{
	video2.playbackRate=slider.value;
}

document.getElementById("snap").addEventListener("click",function()
{
	context.drawImage(video2, 0, 0, 1024, 800);
	video2.pause();
	document.getElementById("manfang").style = "display:none";
	document.getElementById("yuewei").style = "display:block";
});