var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function() {
	initview();
	getdata();
	initClick();
})
var initClick = function(){
	$("#link2").on('click',function(){
		location.href='./state.html'
	})
	
	$("#link3").on('click',function(){
		location.href='./city.html'
	})
	
	$("#link1").on('click',function(){
		location.href='./baike.html'
	})
}

function initview() {
	$("#link3").text(localStorage.city);
	$("#link2").text(localStorage.statename);
	$(".title").text(localStorage.city+"全部商圈")
}
var getdata = function() {
	var type = localStorage.businesslistType;
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/{1}?cityname={0}&offset=0&limit=100'.format(localStorage.city, type),
		success: function(msg) {
			$.each(msg.items, function(i, n) {
					var ele = $("#model-1").html();
					$("#itemlist").append(ele.format( n.imageUrl, n.name, n.id, type))
			})
		}
	});
}

var getDetail = function(id, type) {
	localStorage.businessType = type;
	localStorage.businessId = id;
	location.href = "./businesscircle.html"
}

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
}