/**
 * Created by Administrator on 2018-08-06.
 */
/**
 * Created by Administrator on 2018-08-05.
 */
/**
 * Created by Administrator on 2018-07-04.
 */

(function () {

    var DOC = document;
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle;
    var $ajax = Base.ajax;
    var $D = Base.disEle,
        $G = Base.getUrl;
    $CREATESTYLE = Base.createStyle,
        $ADPALLSTYLE = Base.adpAllStyle;
    $text = Base.txtEle;
    $STOPPROPAGATION = Base.stopPropagation;
    $rmvEle = Base.rmvEle;
    var body = DOC.body;
    var bannernum=0;//banner数量
    var iebanben=-1;
    var DEFAULT_VERSION = 8.0;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion;
    if(isIE){
        safariVersion =  ua.match(/msie ([\d.]+)/)[1];
    }
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    jiazaixianshi();
    function jiazaixianshi() {
        var id = getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/zjbl/detail?id=' + id,
            type: "get",
            timeout: 5000,
            success: function (data) {
                console.log(data);
                $("#titlename").html(data.name);
                $("#dadename").html(data.name);
                $("#yignwenming").html(data.address);
                $("#phone").html(data.phone);
                $("#weixin").html(data.wechat);
                $("#QQ").html(data.qq);
                $(".banzhengfafangcont").html(data.approach);
                $(".taocanyonghushuliang").html(data.replyCount);
                initswiper(data.pics);

            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function initswiper(bannerarry) {//首页滑动
        bannernum = bannerarry.length;
        for (var i = 0; i < bannerarry.length; i++) {
            $("#sectionss").append("<div class=\"section\" id=\"section" + bannerarry[i].id + "\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bannerarry[i].imageUrl + "',sizingMethod='scale');background-image:url(" + bannerarry[i].imageUrl + ");background-repeat: no-repeat;background-size: 100% 100%;\"></div>")
        }

        $("#container").PageSwitch({
            direction: 'horizontal',
            easing: 'ease-in',
            duration: 1000,
            autoPlay: true,
            loop: 'false'
        });
    }

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category, evnet]);
        } catch (e) {
            console.log(e);
        }
    }

})();
