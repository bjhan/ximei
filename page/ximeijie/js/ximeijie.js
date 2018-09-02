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
    yuezizhognxin();
    function yuezizhognxin() {//月子
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yzzx/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    addyuezi(data[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function yuezichengshichaxun() {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yzzx/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    addyuezi(data[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyuezi(data) {
        var str =' <div class="ximeijiedetailcont" id="'+data.id+'" tt="yuezi">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>'
            +'</div>';
        $("#yueziclear").before(str);
    }
    yueshegnzhognxin();
    function yueshegnzhognxin() {//医生
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/ys/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    addyisheng(data[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyisheng(data) {
        var str =' <div class="ximeijiedetailcont" id="'+data.id+'" tt="yisheng">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>'
            +'</div>';
        $("#clearyisheng").before(str);
    }
    yiyuanzhognxin();
    function yiyuanzhognxin() {//医院
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yy/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    addyiyiyuan(data[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyiyiyuan(data) {
        var str =' <div class="ximeijiedetailcont" id="'+data.id+'" tt="yisheng">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>'
            +'</div>';
        $("#clearyiyuan").before(str);
    }
    muyingzhognxin();
    function muyingzhognxin() {//母婴
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/myyp/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                    addmuying(data[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addmuying(data) {
        var str =' <div class="ximeijiedetailcont" id="'+data.id+'" tt="muying">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>'
            +'</div>';
        $("#clearmuying").before(str);
    }
    banzhengzhongxin();
    function banzhengzhongxin() {//办证中心
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/zjbl/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    addbanzheng(data[i]);
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addbanzheng(data) {
        var str ='<div class="ximeijiedetailcont" id="'+data.id+'">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>';
            +'</div>';
        $("#jigouname").before(str);
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
