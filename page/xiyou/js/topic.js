var baseUrl = "http://47.98.119.215:80/web/api/v1/";
var id;
var circleId;
$(function () {
	getParam();
	getmyactivecounts();
	getreplies();
	getTopicDetail();
	initDialog();
    getCircleDetail();

})



var clickReply = function (id) {
	$("#replyid").val(id);
	$("#reply-view").dialog('open');
}

var getTopicDetail = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/post/detail?id={0}".format(id),
		success: function (msg) {
			console.log(msg);
			$("#headName").text(msg.author);
			$("#topictime").text(msg.createTime.substr(0, 10))
			$("#priaseCount").text(msg.priaseCount);
			$("#description").html(msg.content)

		}
	});
}


var getCircleDetail = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/xyq/forum/detail?id=" + circleId,
        success: function (msg) {
        	console.log(msg);
        	$("#myhead").attr("src",msg.icon);
            $("#userName").text(msg.title);
            $("#userRange").text('55成员');
           /* $("#cirleName").text(msg.title)
            $("#cirleIntroduction").text(msg.abstract || "")
            $("#headimg").css("background-image", "url('" + msg.icon + "')")
            $.each(msg.tags, function (i, n) {
                $("#tag").append("<div>{0}</div>".format(n))
            })*/
        }
    });
}

var initDialog = function () {
	$("#reply-view").dialog({
		title: "回复评论",
		modal: false,
		autoOpen: false,
		width: 400,
		height: 320,
		open: function () {},
		close: function () {},
		buttons: {
			"确定": function () {
				creatReply();
			},
			"关闭": function () {
				$(this).dialog("close");
			}
		}


	})
}


var creatReply = function () {
	var id = $("#replyid").val();
	var content = $("#replyreplyCount").val();
	$.ajax({
		type: "POST",
		url: baseUrl + "/xyq/subreply",
		data: {
			replyId: id,
			content: content
		},
		success: function (msg) {
			$("#pinglun-items").empty();
			getreplies();
		}
	});





}

var createsubreply = function () {
	var title = $("#replyinput").val();
	$.ajax({
		type: "POST",
		url: baseUrl + "/xyq/reply",
		data: {
			postId: id,
			content: title
		},
		success: function (msg) {
			$("#pinglun-items").empty();
			getreplies();
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

var getreplies = function () {
	var data = $("#1").html();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/replies?postId={0}&pageNo=0&pageSize=10".format(id),
		success: function (msg) {
			console.log(msg);
			$.each(msg.replies, function (i, n) {
				var ss = '';
				$.each(n.subReplies, function (j, s) {
					ss += "<p>回复{0}:{1}</p>".format(s.userName, s.content)
				})
				$("#pinglun-items").append(data.format(n.icon, n.userName, n.level, n.content, ss, n.createTime, n.id))
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
        circleId=obj.circleId;
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
