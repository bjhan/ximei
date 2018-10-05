/**
 * Created by cdj-pci on 2018/8/19.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function() {
	initview();
	getcity();
	initClick();
})

var initClick = function(){
	$("#link1").on('click',function(){
		location.href='./baike.html'
	})
}

var initview = function() {
	$("#link2").text(localStorage.statename);
	$("#stateChName").text(localStorage.statename);
}

var getcity = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/list?stateid={0}&offset=0&limit=100'.format(localStorage.stateid),
		success: function(msg) {
			$.each(msg.cities,function(i,n){
				var ele = $("#model-1").html();
				$(".city-items").append(ele.format(n.name,n.imageUrl,n.abstract))
			})
		}
	});



}


var navtocity = function(city){
	localStorage.city=city;
	localStorage.cityname="";
	location.href="./city.html"
}


String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
}
