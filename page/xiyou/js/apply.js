var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
	$("#applyShowBtn").bind('click', function () {
		$("#introduce").hide(100);
		$("#apply").show(100);
	})

	$("#dialog").dialog({
		autoOpen: false,
		buttons: {
			Cancel: function () {
				$("#dialog").dialog("close");
			}
		}
	})


	$("#dialog2").dialog({
		autoOpen: false,
		buttons: {
			Cancel: function () {
				$("#dialog2").dialog("close");
			}
		}
	})
})


var submit = function () {
	var obj = checkparmet();
	if (obj) {
		$.ajax({
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			url: baseUrl + "/xyq/forum/request",
			data: obj,
			success: function (msg) {
				location.href = "./circle.html?id=" + msg.id
			},
			error: function (data) {

			}
		});
	}


}


var getUserInfo = function () {
	$.ajax({
		type: "GET",
		url: baseUrl + "/common/userInfo",
		success: function (msg) {
			console.log(msg);
		}
	});

}


var checkparmet = function () {
	var circleName = $("#circleName").val();
	var circleintroduce = $("#circleintroduce").val();
	var tags = [];
	$.each($(".tag"), function (i, n) {
		var value = $(n).val();
		if (value) {
			tags.push(value);
		}

	})

	if (!$("#checkSumber").is(':checked')) {
		$("#dialog2").dialog("open");
		return null;
	}

	if (!(circleName && circleintroduce)) {
		$("#dialog").dialog('open');
		return null;
	}
	var obj = {};
	obj.name = circleName;
	obj.abstrat = circleintroduce;
	obj.tags = tags.join(",");
	return obj;
}
