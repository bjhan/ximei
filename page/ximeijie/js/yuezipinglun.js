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

    $("#container").PageSwitch({
        direction:'horizontal',
        easing:'ease-in',
        duration:1000,
        autoPlay:true,
        loop:'false'
    });
    mapfun();
    function mapfun() {
        // 百度地图API功能
        var map = new BMap.Map("xiangqingmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(36.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别

        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
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
