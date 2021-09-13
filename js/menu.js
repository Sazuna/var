document.getElementById("m1").addEventListener("click", function() {
	document.getElementById("paishipin").style = "display:block";
	document.getElementById("manfang").style = "display:none";
	document.getElementById("yuewei").style = "display:none";
});

document.getElementById("m2").addEventListener("click", function() {
	document.getElementById("paishipin").style = "display:none";
	document.getElementById("manfang").style = "display:block";
	document.getElementById("yuewei").style = "display:none";
});

document.getElementById("m3").addEventListener("click", function() {
	document.getElementById("paishipin").style = "display:none";
	document.getElementById("manfang").style = "display:none";
	document.getElementById("yuewei").style = "display:block";
});