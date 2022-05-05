var video2=document.getElementById("resultat");
var slider=document.getElementById("speedcontrol");

// Manages video's speed
function manfang()
{
	video2.playbackRate=slider.value;
}

// Snap = 下一步. Captures the image 截图 and puts it into the next page's canvas.
document.getElementById("snap").addEventListener("click",function()
{
	context.drawImage(video2, 0, 0, 1024, 800);
	video2.pause();
	// Automatically changes step （划越位步骤）
	document.getElementById("manfang").style = "display:none";
	document.getElementById("yuewei").style = "display:block";
});