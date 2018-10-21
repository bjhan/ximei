/**
 * Created by Administrator on 2018-07-10.
 */
(function () {
    var DOC = document;

    var body = DOC.body;

    var pathname = window.location.href;
    var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
    dianjitiaozhuan();
    function dianjitiaozhuan() {
        $("#shouye").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
            $("#iframecont").attr("src","page/index/index.html");
        });
        $("#xiyouquan").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
            $("#iframecont").attr("src","page/xiyou/xiyou.html");
        });
        $("#gonglue").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
        });
        $("#wenda").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
            $("#iframecont").attr("src","page/wenda/wenda.html");
        });
        $("#baike").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
			$("#iframecont").attr("src","page/baike/baike.html");

        });
        $("#ximeijie").click(function () {
            $(".chooseline").hide();
            $(this).find(".chooseline").show();
            $("#iframecont").attr("src","page/ximeijie/ximeijie.html");
        });
    }
    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category , evnet]);
        } catch (e) {
            console.log(e);
        }
    }

})();