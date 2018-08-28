var baseUrl = "http://47.98.119.215:80/web/api/v1/";
var id;
$(function () {
	getmyactivecounts();
	getreplies();

})

var getmyactivecounts = function () {
	var ss = $("#2").html();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/latestreplyforums",
		success: function (msg) {
			$.each(msg, function (i, n) {
				$("#quanziview").append(ss.format(n.forumIcon, n.forumId))
			})
		}
	});
}


var showCircle = function (id) {
	location.href = "./circle.html?id=" + id
}

var getreplies = function () {
	var data = $("#1").html();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/replies?postId=100001&pageNo=0&pageSize=10",
		success: function (msg) {
			console.log(msg)
			$.each(msg.replies,function(i,n){
				var ss = '';
				$.each(n.subReplies,function(j,s){
					ss+="<p>回复{0}:{1}</p>".format(s.userName,s.content)
				})
				$("#pinglun-items").append(data.format(n.icon,n.userName,1,n.content,ss,n.createTime))
			})
		}
	});


}

var getParam = function () {
	try {
		var url = window.location.href;
		var result = url.split("?")[1];
		var keyValue = result.split("&");
		var obj = {};
		for (var i = 0; i < keyValue.length; i++) {
			var item = keyValue[i].split("=");
			obj[item[0]] = item[1];
		}
		id = obj.id;
		return obj;
	} catch (e) {
		console.warn("There has no param value!");
	}
};


String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function (m, i) {
		return args[i];
	});
}
