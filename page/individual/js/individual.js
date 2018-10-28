$(function() {
	initClick();
	$("#myhome").show()
	
	

})


var initClick = function() {
	$(".circle-menu-item").on('click', function() {
		var id = $(this).attr("data-id");
		var par = $(this).parent()[0]
		$(par).find(".circleActive").removeClass("circleActive");
		$(this).addClass("circleActive")
		$(".circle-content>div").hide();
		$("#" + id).show()
	})

	$(".shouchang-menu-item").on('click', function() {
		var id = $(this).attr("data-id");
		var par = $(this).parent()[0]
		$(par).find(".circleActive").removeClass("circleActive");
		$(this).addClass("circleActive")
		$(".shouchang-content>div").hide();
		$("#" + id).show()
	})

	$("#menutable td").on('click', function() {
		var par = $(this).parent()[0];
		$(par).find(".active").removeClass("active");
		$(this).addClass("active");
	})

	$(".wenda-content-head-item").on('click', function() {
		$(".wenda-active").removeClass("wenda-active");
		$(this).addClass("wenda-active");
	})
}


var show = function(id) {
	$(".content>div").hide();
	if (id.startsWith('myhome')) {
		$("#myhome").show();
		$(".myhome-right-item").hide();
		$("#right-" + id.split("-")[1]).show();
	} else {
		$("#" + id).show();
	}

}



 String.prototype.startsWith=function(str){  
 if(str==null||str==""||this.length==0||str.length>this.length)  
 return false;  
 if(this.substr(0,str.length)==str)  
 	return true;  
 else  
 	return false;  
 return true;  
 } 