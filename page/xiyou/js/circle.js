/**
 * Created by cdj-pci on 2018/7/14.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
	initDialog();
	//富文本编辑器简单模式初始化
	var editor;
	KindEditor.ready(function (K) {
		editor = K.create('textarea[name="content"]', {
			resizeType: 0,
			filterMode: false, //true时过滤HTML代码，false时允许输入任何代码。
			allowPreviewEmoticons: false,
			allowImageUpload: true,
			cssData: 'body{font-family: 微软雅黑;font-size: 14px;padding:30px;}',
			afterFocus: function () { //获得焦点 删除默认文字信息
				if (editor.html() == '<span style="color:#9B9B9B;">写回答……</span>') {
					editor.html('');
				}
			},
			afterBlur: function (e) {
				this.sync();
				// console.log(editor.html());
				if (editor.html() == '<br/>' || editor.html() == '') {
					editor.html('<span style="color:#9B9B9B;">写回答……</span>');
				}
			}, //失去焦点，同步信息数据
			items: [
				'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons'
			]
		});
	});
	getParam();
	getCircleDetail();
	getnewposts();
})


var openDialog = function () {
	$("#fwbDialog").dialog('open');
}


var initDialog = function () {
	$("#fwbDialog").dialog({
		title: "编辑话题内容",
		modal: false,
		"z-index": 2,
		autoOpen: false,
		width: 800,
		height: 500,
		open: function () {},
		close: function () {

		},
		buttons: {
			"保存": function () {
				createTopic();
			},
			"关闭": function () {
				$(this).dialog("close");
			}
		}


	})
}

var id;
var getCircleDetail = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/forum/detail?id=" + id,
		success: function (msg) {
			$("#cirleName").text(msg.title)
			$("#cirleIntroduction").text(msg.abstract || "")
			$("#headimg").css("background-image", "url('" + msg.icon + "')")
			$.each(msg.tags, function (i, n) {
				$("#tag").append("<div>{0}</div>".format(n))
			})

		}
	});
}

var getnewposts = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/forum/newposts?pageNo=0&pageSize=10000&forumId=" + id,
		success: function (msg) {
			$.each(msg.posts, function (i, n) {
				var posts = $("#toplist table");
				posts.append("<tr><td onclick='navgetto({4})'>{0}</td><td>{1}</td><td>{2}回复</td><td>{3}</td></tr>".format(n.title, n.author, n.replyCount,
					n.createTime,n.id))
			})
		}
	});
}

var gethotposts = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/forum/hotposts?pageNo=0&pageSize=10000&forumId=" + id,
		success: function (msg) {
			$.each(msg.posts, function (i, n) {
				var posts = $("#toplist table");
				posts.append("<tr><td>{0}</td><td>{1}</td><td>{2}回复</td><td>{3}</td></tr>".format(n.title, n.author, n.replyCount,
					n.createTime))

			})
		}
	});
}

var navgetto = function(topid){
	location.href = './topic.html?id='+topid+"&circleId="+id
}



var createTopic = function () {
	var title = $("#topicTitle").val();
	var content = $("textarea[name='content']").val();
	$.ajax({
		type: "POST",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		url: baseUrl + "/xyq/post/create",
		data:{
			forumId:id,
			title:title,
			content:content
		},
		success: function (msg) {
			var e = $("#information span p").eq(0);
			showType(0,e);
			$("#fwbDialog").dialog('close');
		}
	});
}

var showType = function (type, event) {
	$("#toplist table tbody").empty();
	$("#information span p").removeClass("active");
	$(event).addClass("active");
	switch (type) {
		case 0:
			getnewposts();
			break;
		case 1:
			gethotposts();
			break;
		default:
			break;
	}
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
