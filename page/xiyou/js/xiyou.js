var ss = '<div class="c"> <p class="hottitle">来啊，这里是标题这里是标题，来啊，这里是标题这里是标题</p> <div class="a"> <img class="hotimg" src="./img/test.jpg" height="405" width="640"/> <div class="b"> <p class="bp">看到组员@金盆洗手的帖子，特来参加一波。家里还有存货，稍后回到家整理贴上来，换算成人民币计算在内。 时间：2018/5/3—2018/6/2备注：存货只计算花了钱的。亲人赠送、调料油烟酱醋等除...</p> <div class="bf"><p>来自<a>jackwolf</a>圈子</p>&nbsp;&nbsp;&nbsp; <p>2018-06-28</p></div> </div> </div> <hr/> </div>'
var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    $("#arrcontent").append(ss);
    gettoplevels();
    gettopvotes();
    gettoplikecounts();
    initPageNation();
    getposts();

})

var initPageNation = function () {
    $('#example').bootstrapPaginator({
        currentPage: 1,//当前的请求页面。
        totalPages: 20,//一共多少页。
        size: "normal",//应该是页眉的大小。
        alignment: "right",
        numberOfPages: 5,//一页列出多少数据。
        itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
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


//巾过榜接口 按经验值
var gettoplevels = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/xyq/toplevels",
        success: function (msg) {
            console.log(msg);
        }
    });
}

//巾过榜接口 按点赞数
var gettoplikecounts = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/xyq/toplikecounts",
        success: function (msg) {
            console.log(msg);
        }
    });
}


var topvote = '<div class="ximei-left-row"> <img class="toupiao-img" src="./img/pgcommunity_icon_Voting%20record.png"/> <p class="toupiao-bt">{0}</p> <p class="toupiao-number">参与人数:{1} {2}</p> </div>'

//热门投票
var gettopvotes = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/xyq/topvotes",
        success: function (msg) {
            alert(msg);
            $.each(msg, function (i, n) {
                $("#rmtpContent").append(topvote.format(n.title, n.ballot, n.createTime.substring(5, 10)))
            })

        }
    });
}


//热门话题
var getposts = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/xyq/posts?pageNo=0&pageSize=30",
        success: function (msg) {
            console.log(msg);
        }
    });
}


String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
}