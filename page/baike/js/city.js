/**
 * Created by cdj-pci on 2018/8/10.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function() {
	initview();
	initClick();
	getshopping();
	gettraveling();
	getcate();
	getyzzx();

})



function initview() {
	$("#link3").text(localStorage.city);
	$("#cityChName").text(localStorage.city);
	$("#cityName").text(localStorage.cityname);
	$(".confinement-title").text(localStorage.city + "月子中心")
	getstate();
}




var initClick = function() {
	$("#link2").on('click', function() {
		location.href = './state.html'
	})

	$("#link1").on('click', function() {
		location.href = './baike.html'
	})
}


var getshopping = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/shopping?cityname={0}&offset=0&limit=100'.format(localStorage.city),
		success: function(msg) {
			$.each(msg.items, function(i, n) {
				if (i < 2) {
					var ele = $("#model-1").html();
					$("#shopping").append(ele.format(n.name, n.imageUrl, n.abstract, n.id, 'shopping'))
				}
			})
		}
	});
}

var getcate = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/cate?cityname={0}&offset=0&limit=100'.format(localStorage.city),
		success: function(msg) {
			$.each(msg.items, function(i, n) {
				if (i < 2) {
					var ele = $("#model-1").html();
					$("#food").append(ele.format(n.name, n.imageUrl, n.abstract, n.id, 'cate'))
				}
			})
		}
	});
}

var gettraveling = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/traveling?cityname={0}&offset=0&limit=100'.format(localStorage.city),
		success: function(msg) {
			$.each(msg.items, function(i, n) {
				if (i < 2) {
					var ele = $("#model-1").html();
					$("#attractions").append(ele.format(n.name, n.imageUrl, n.abstract, n.id, 'traveling'))
				}
			})
		}
	});
}


var getstate = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + '/bk/city/state?cityname=' + localStorage.city,
		success: function(msg) {
			$("#link2").text(msg.name);
			localStorage.stateid = msg.id;
			localStorage.statename = msg.name;
		}
	});
}



var getyzzx = function() {
	$.ajax({
		type: "GET",
		url: baseUrl + "/bk/city/yzzx?cityname=" + localStorage.city + "&offset=0&limit=10",
		success: function(msg) {
			$.each(msg.items, function(i, n) {
				var ele = $("#model-2").html();
				$("#confinement-items").append(ele.format(n.imageUrl, n.name))
			})

		}
	});
}

var getDetail = function(id, type) {
	localStorage.businessType = type;
	localStorage.businessId = id;
	location.href = "./businesscircle.html"
}

var lookallbusiness = function(type) {
	localStorage.businesslistType = type;
	location.href = "./businesslist.html"
}

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
}
