/**
 * Created by cdj-pci on 2018/8/19.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function() {
	initClick();
	initview();
	getInfo();

})

function initview() {
	$("#link3").text(localStorage.city);
	$("#link2").text(localStorage.statename);
}

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
var getInfo = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/{0}/detail?id={1}'.format(localStorage.businessType, localStorage.businessId),
		success: function(msg) {
			$("#businesscircleChName").text(msg.name)
			$("#link4").text(msg.name);
			$("#address").text(msg.address);
			$("#bizTime").text(msg.bizTime);
			$("#phoneNo").text(msg.phoneNo);
			$.each(msg.pics, function(i, n) {
				var ele = $("#model-1").html();
				$("#sections").append(ele.format(n.id, n.picUrl))
			})
			initSwitch();
		}
	});
}




var initSwitch = function() {
	$("#container").PageSwitch({
		direction: 'horizontal',
		easing: 'ease-in',
		duration: 1000,
		autoPlay: true,
		loop: 'false'
	});
}

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
}
