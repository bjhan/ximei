/**
 * Created by Administrator on 2018-07-10.
 */
(function () {
    var DOC = document;
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle;
    var $D = Base.disEle,
        $G = Base.getUrl;
    $CREATESTYLE = Base.createStyle,
        $ADPALLSTYLE = Base.adpAllStyle;
    $text = Base.txtEle;
    $STOPPROPAGATION = Base.stopPropagation;
    $rmvEle = Base.rmvEle;
    var body = DOC.body;

    //初始化页面
    function initialize() {
        setTimeout(function() {
            $D(body, 1);
            loadScript('common/css3-mediaqueries.js');
        }, 0);
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

    //适配移动端以及pc端
    // (function () {
    //     // if (Touch) {
    //         styleStr = 'body{position:relative;width:1920px;margin:0auto;background-size:cover;overflow:hidden;}body,html{height:100%;}.headmain{position:fixed;top:0;width:100%;height:116px;background-color:#ffffff;z-index:999;}.headmainicon{position:absolute;top:24px;left:234px;width:190px;height:69px;}.iframecont{position:relative;top:116px;width:100%;height:100%;border:0;}.yingyezhizhao{position:absolute;bottom:70px;width:100%;text-align:center;opacity:0.5;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;font-size:6px;color:#9E9E9E;}.footmain{position:relative;bottom:0;width:100%;height:395px;margin-bottom:100px;margin-top:150px;background-color:black;}.headline{position:absolute;bottom:0;width:100%;height:2px;background-color:#A978D6;}#loginbtn{position:absolute;top:52px;right:260px;width:75px;height:35px;cursor:pointer;}#register{position:absolute;top:52px;right:349px;width:75px;height:35px;cursor:pointer;}#ximeijie{right:482px;}#huodong{right:593px;}#baike{right:678px;}#wenda{right:763px;}#gonglue{right:848px;}#xiyouquan{right:933px;}#shouye{right:1039px;}.mainchoose{position:absolute;width:96px;height:100%;cursor:pointer;color:#808080;}.chooseline{position:absolute;display:none;bottom:0;width:100%;height:6px;background-color:#A978D6;}.maindesc{position:absolute;bottom:36px;font-size:18px;width:100%;text-align:center;}.mainchoose:hover{color:#A978D6;}a{text-decoration:none;color:#9E9E9E;}.foorcont{position:absolute;top:61px;width:100%;height:150px;}.aboutximei{position:absolute;top:0;left:483px;width:108px;height:100%;}.aboutdesc{position:relative;margin-bottom:10px;text-align:center;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;color:#9E9E9E;height:30px;}.aboutdescsmall{position:relative;margin-bottom:7px;text-align:center;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;color:#9E9E9E;height:20px;}.descad{position:absolute;top:0;left:0;width:100%;}.aboutdesc1{font-size:18px;}.aboutdesc2{position:absolute;font-size:14px;}.linefootleft{position:absolute;top:257px;left:0;width:697px;height:1px;background-color:#939393;}.linefootright{position:absolute;top:257px;right:0;width:697px;height:1px;background-color:#939393;}.friendsicon{position:absolute;top:0;left:715px;width:206px;height:100%;}.friends{position:absolute;top:0;left:0;width:100%;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;font-size:18px;color:#9E9E9E;text-align:center;}.parenterpic{position:absolute;top:37px;width:100%;height:84px;}.kefu{position:absolute;top:0;right:424px;width:139px;height:100%;}.weibo{position:absolute;top:0;right:577px;width:139px;height:100%;}.erweima{position:absolute;top:0;left:20px;width:99px;height:99px;background-color:#ffffff;}.erweima>img{position:absolute;top:0;margin-top:5px;margin-left:5px;width:89px;height:89px;}.erweimadesc{position:absolute;top:108px;width:100%;text-align:center;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;color:#9E9E9E;}.friendslinks{position:absolute;top:245px;left:758px;width:560px;height:18px;}.linkfriend{float:left;font-family:'Microsoft YaHei', Helvetica Neue, Helvetica, Arial, sans-serif;font-size:2px;color:#9E9E9E;margin-right:6px;}';
    //         $ADPALLSTYLE(styleStr, 'css', initialize);
    //     // } else {
    //     //     styleStr = '#main {width:720px;}'
    //     //     $CREATESTYLE(styleStr, 'css', initialize);
    //     // }
    // })();
})();