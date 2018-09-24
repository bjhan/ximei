var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
	gettoplevels();
	gettopvotes();
	gettoplikecounts();
	initPageNation();
	getposts();
	getRecommendforum();
	myactivecounts();
	getmyactivecounts();
})

var initPageNation = function () {
	$('#example').bootstrapPaginator({
		currentPage: 1, //当前的请求页面。
		totalPages: 20, //一共多少页。
		size: "normal", //应该是页眉的大小。
		alignment: "right",
		numberOfPages: 5, //一页列出多少数据。
		itemTexts: function (type, page, current) { //如下的代码是将页眉显示的中文显示我们自定义的中文。
			switch (type) {
				case "first":
					return "首页";
				case "prev":
					return "上一页";
				case "next":
					return "下一页";
				case "last":
					return "末页";
				case "page":
					return page;
			}
		}
	});
}


var row =
	' <span class="row-span"><span class="row_id">{0}</span><img src="{1}"><span class="row_name">{2}</span><span class="row_lv">Lv{3}</span></span>'
//巾过榜接口 按经验值
var gettoplevels = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/toplevels",
		success: function (msg) {
			$.each(msg, function (i, n) {
				$("#toplevels").append(row.format(n.id, n.icon, n.username, n.level))
			})
		}
	});
}

//巾过榜接口 按点赞数
var gettoplikecounts = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/toplikecounts",
		success: function (msg) {
			$.each(msg, function (i, n) {
				$("#likecount").append(row.format(n.id, n.icon, n.username, n.likecount))
			})
		}
	});
}


var topvote =
	'<div class="ximei-left-row"> <img class="toupiao-img" src="./img/pgcommunity_icon_Voting%20record.png"/> <p class="toupiao-bt">{0}</p> <p class="toupiao-number">参与人数:{1} {2}</p> </div>'

//热门投票
var gettopvotes = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/topvotes",
		success: function (msg) {
			$.each(msg, function (i, n) {
				$("#rmtpContent").append(topvote.format(n.title, n.ballot, n.createTime.substring(5, 10)))
			})

		}
	});
}


//热门话题
var getposts = function () {
	var ss =
		'<div class="c"> <p class="hottitle"><a href="./topic.html?id={5}">{0}</a></p> <div class="a"> <img class="hotimg" src="{1}" height="405" width="640"/> <div class="b"> <p class="bp">{2}</p> <div class="bf"><p>来自<a href="./circle.html?id={6}">{3}</a>圈子</p>&nbsp;&nbsp;&nbsp; <p>{4}</p></div> </div> </div> <hr/> </div>'
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/posts?pageNo=0&pageSize=30",
		success: function (msg) {
			$.each(msg.posts, function (i, n) {
				id = n.id;
				title = n.title;
				abstract = $.trim(n.abstract);
				createTime = n.createTime.substring(0, 10);
				icon = n.icon;
				forumId = n.forumId;
				forumname = n.forumname;
				$("#arrcontent").append(ss.format(title, icon, abstract, forumname, createTime, id,forumId));
			})
		}
	});
}


var getRecommendforum = function () {
	var ss = $("#1").html();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/recommendforum",
		success: function (msg) {
			$.each(msg.forums, function (i, n) {
				$("#jingcaiview").append(ss.format(n.icon, n.title, n.members, n.id))
			})
		}
	});
}

var myactivecounts = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/myactivecounts",
		success: function (msg) {
			$("#replyCount").text(msg.replyCount);
			$("#postCount").text(msg.postCount);
		}
	});
}


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


var showCreatrApply = function () {
    location.href = "./apply.html"
}



String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function (m, i) {
		return args[i];
	});
}
