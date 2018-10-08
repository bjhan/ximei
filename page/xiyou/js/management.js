/**
 * Created by cdj-pci on 2018/9/16.
 */
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function() {
	getCyList();
})

var getCyList = function() {
	var ss   = $("#1").html();
	$.ajax({
		type: "GET",
		url: baseUrl + "/xyq/forum/member/list?forumId="+localStorage.circleId,
		success: function(msg) {
			console.log(msg);
			$("#adminview").append(ss.format(msg.admin.userIcon,msg.admin.id,'','',msg.admin.userName))
			
			$.each(msg.members,function(i,n){
				$("#membersview").append(ss.format(n.userIcon,n.id,'R','K',n.userName))
			})
			
		}
	});
}


String.prototype.format = function () {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function (m, i) {
		return args[i];
	});
}
