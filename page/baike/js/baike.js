/**
 * Created by cdj-pci on 2018/8/7.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";

$(function() {
	initClick();



})

var initClick = function() {
	$(".headmenu").on('click', function() {
		var id = $(this).attr("data-id");
		var par = $(this).parent()[0]
		$(par).find(".headmenuactive").removeClass("headmenuactive");
		$(this).addClass("headmenuactive")
		$(".headtabcontent div").hide();
		$("#" + id).show()
	})
}

var cityClick = function(city,cityname) {
	if (city) {
		localStorage.city = city;
		localStorage.cityname = cityname;
		location.href='./city.html'
	}else{
		alert('参数异常');
	}
}
