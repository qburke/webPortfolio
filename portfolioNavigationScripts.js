$("document").ready(function() {
	$(".icon").hover(
	function(){ $(this).css("opacity", "1");},
	function(){ $(this).css("opacity", "0.6");}
	);
	$("#aboutMePicture").hover(
	function(){ $(this).css("opacity", "1");},
	function(){ $(this).css("opacity", "0.6");}
	);
});

function iconSelected(icon_id){
	var selectedIcon = document.getElementById(icon_id);
	var previousSelected = document.getElementsByClassName("selectedIcon")[0];
	var selIndex = icon_id.charAt(icon_id.length-1);
	var prevIndex = previousSelected.id.charAt(previousSelected.id.length-1);
	
	var iconsURLRef = ["code", "writing", "skiing", "camera"];
	
	// remove class from previous selected icon and attribute old class
	previousSelected.className = ("icon");
	$(previousSelected).css("opacity", "0.6");
	previousSelected.onclick = function(){
		iconSelected(this.id);
	};
	$(previousSelected).css("background-image", "url(res/" + iconsURLRef[prevIndex-1] + "IconWHT.png)");
	
	// remove "icon" class and attribute new class with regular opacity
	selectedIcon.className = ("selectedIcon");
	$(selectedIcon).css("background-image", "url(res/" + iconsURLRef[selIndex-1] + "IconPNK.png)");
	
	$(".icon").hover(
	function(){ $(this).css("opacity", "1");},
	function(){ $(this).css("opacity", "0.6");}
	);
	$(".selectedIcon").hover(
	function(){ $(this).css("opacity", "1");},
	function(){ $(this).css("opacity", "1");}
	);
	
	// fade out old content divs
	$(".descBox_icon" + prevIndex).fadeTo(400, "0");
	$(".descBox_icon" + prevIndex).css("display", "none");
	$("#aboutMeDescBox").fadeTo(400, "0");
	$("#aboutMeDescBox").css("display", "none");
	$(".articleBox").fadeTo(400, "0");
	$(".articleBox").css("display", "none");
	
	// fade in new content divs
	$(".descBox_icon" + selIndex).fadeTo(400, "1");
	$(".descBox_icon" + selIndex).css("display", "inline-block");
}

function aboutMe(){
	for(i = 1; i < 5; i++){
		$(".descBox_icon" + i).fadeTo(400, "0");
		$(".descBox_icon" + i).css("display", "none");
	}
	$("#aboutMeDescBox").fadeTo(400, "1");
	$("#aboutMeDescBox").css("display", "inline-block");
}

function textArticle(icon_id, article_id){
	var index = icon_id.charAt(icon_id.length-1);
	$(".descBox_icon" + index).fadeTo(400, "0");
	$(".descBox_icon" + index).css("display", "none");
	var article = document.getElementById(article_id);
	$(article).fadeTo(400, "1");
	$(article).css("display", "inline-block");
}