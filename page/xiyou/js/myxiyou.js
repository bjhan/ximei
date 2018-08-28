/**
 * Created by cdj-pci on 2018/7/7.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
	getjoinedforums()
	getmyposts();
	getmyreplyposts();

})



var getjoinedforums = function () {
	var ht = $("#1").html();
	$("#quanziview").empty();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/joinedforums?pageNo=0&pageSize=3000",
		success: function (msg) {
			$.each(msg.forums, function (i, n) {
				$("#quanziview").append(ht.format(n.icon, n.title, n.members, n.id))
			})
		}
	});

}

var getmyforums = function () {
	var ht = $("#1").html();
	$("#quanziview").empty();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/myforums?pageNo=0&pageSize=3000",
		success: function (msg) {
			console.log(msg)
			$.each(msg.forums, function (i, n) {
				$("#quanziview").append(ht.format(n.icon, n.title, n.members, n.id))
			})
		}
	});
}


var getmyposts = function () {
	var ht =
		'<tr><td  class="isClick" onclick=\"javascript:location.href=\'./topic.html?id={4}\'\">{0}</td><td>{1}回复</td><td>{2}</td><td class="isClick"  onclick=\"javascript:location.href=\'./circle.html?id={5}\'\">{3}</td></tr>'
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/myposts?pageNo=0&pageSize=3000",
		success: function (msg) {
			var ele = $("#mytopiclist table tbody");
			ele.empty();
			$.each(msg.posts, function (i, n) {
				ele.append(ht.format(n.title, n.replyCount, n.createTime, n.forumname, n.id, n.forumId))
			})
		}
	});
}

var getmyreplyposts = function () {
	var ht =
		'<tr><td  class="isClick"  onclick=\"javascript:location.href=\'./topic.html?id={4}\'\">{0}</td><td>{1}回复</td><td>{2}</td><td  class="isClick" onclick=\"javascript:location.href=\'./circle.html?id={5}\'\">{3}</td></tr>'
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/myreplyposts?pageNo=0&pageSize=3000",
		success: function (msg) {
			var ele = $("#mycallbacktopiclist table tbody");
			ele.empty();
			$.each(msg.posts, function (i, n) {
				ele.append(ht.format(n.title, n.replyCount, n.createTime, n.forumname, n.id, n.forumId))
			})
		}
	});
}

var navgetto = function (id) {
	location.href = "./circle.html?id=" + id
}


var showType = function (type, event) {
	$(".active").removeClass("active");
	$(event).addClass("active");
	switch (type) {
		case 0:
			getjoinedforums();
			break;
		case 1:
			getmyforums();
			break;
		default:
			break;
	}
}
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function (m, i) {
		return args[i];
	});
}
