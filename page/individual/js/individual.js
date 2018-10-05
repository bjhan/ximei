$(function() {
	initClick();

})


var initClick = function() {
	$(".circle-menu-item").on('click', function() {
		var id = $(this).attr("data-id");
		var par = $(this).parent()[0]
		$(par).find(".circleActive").removeClass("circleActive");
		$(this).addClass("circleActive")
		$(".circle-content div").hide();
		$("#" + id).show()
	})
}
