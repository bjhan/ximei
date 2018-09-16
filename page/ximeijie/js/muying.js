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
    var bannernum = 0;//banner数量
    var iebanben = -1;
    var DEFAULT_VERSION = 8.0;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var safariVersion;
    var jiazaiyeshu=0;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    jiazaixianshi('分类1',0,10);
    function jiazaixianshi(fenlei,pagenum,pagesize) {
        var id = getUrlParam('id');
        if(pagenum == 0){
            jiazaiyeshu = 0;
            $(".shangpincont .shangpindetailcont").remove();
        }
        $.ajax({
            url: CFG.interfaceurl + '/xmj/myyp/all/list?type='+fenlei+'&pageNo='+pagenum+'&pageSize='+pagesize,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#titlename").html(data.name);
                $("#dadename").html(data.name);
                $(".pinglunzhongxinmingcheng").html(data.name);
                $("#yignwenming").html(data.engName);
                $(".xiangqingmapaddr").html(data.address);
                $(".taocanyonghushuliang").html(data.replyCount);

                initswiper(data.banners);
                for (var j = 0; j < (data.items).length; j++) {
                    tianjiashangpin(data.items[j], j + 1);
                }
                dianji();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    fenleixuanze();
    function fenleixuanze() {
        $(".fenlei").click(function () {
            $(".fenlei").css("color","#9B9B9B");
            $(".fenlei").css("background-color","#ffffff");
            $(".fenlei2").css("color","#9B9B9B");
            $(".fenlei2").css("background-color","#ffffff");
            $(".fenlei3").css("color","#9B9B9B");
            $(".fenlei3").css("background-color","#ffffff");
            $(this).css("background-color","#A978D6");
            $(this).css("color","#ffffff");
            $(this).attr("dianji",1);
            $(".fenlei3").attr("dianji",0);
            $(".fenlei2").attr("dianji",0);
            jiazaixianshi('分类1',0,10);
            $(".shangpincont .shangpindetailcont").remove();
        });
        $(".fenlei2").click(function () {
            $(".fenlei").css("color","#9B9B9B");
            $(".fenlei").css("background-color","#ffffff");
            $(".fenlei2").css("color","#9B9B9B");
            $(".fenlei2").css("background-color","#ffffff");
            $(".fenlei3").css("color","#9B9B9B");
            $(".fenlei3").css("background-color","#ffffff");
            $(this).css("background-color","#A978D6");
            $(this).css("color","#ffffff");
            $(this).attr("dianji",1);
            $(".fenlei").attr("dianji",0);
            $(".fenlei3").attr("dianji",0);
            jiazaixianshi('分类2',0,10);
            $(".shangpincont .shangpindetailcont").remove();
        });
        $(".fenlei3").click(function () {
            $(".fenlei").css("color","#9B9B9B");
            $(".fenlei").css("background-color","#ffffff");
            $(".fenlei2").css("color","#9B9B9B");
            $(".fenlei2").css("background-color","#ffffff");
            $(".fenlei3").css("color","#9B9B9B");
            $(".fenlei3").css("background-color","#ffffff");
            $(this).css("background-color","#A978D6");
            $(this).css("color","#ffffff");
            $(this).attr("dianji",1);
            $(".fenlei").attr("dianji",0);
            $(".fenlei2").attr("dianji",0);
            jiazaixianshi('分类3',0,10);
            $(".shangpincont .shangpindetailcont").remove();
        });

        $(".bibu").click(function () {
            var dianji1 = $(".fenlei").attr("dianji");
            var dianji2 = $(".fenlei2").attr("dianji");
            var dianji3 = $(".fenlei3").attr("dianji");
            if(dianji1 === '1'){
                jiazaixianshi('分类1',(++jiazaiyeshu)*10,10);
            }
            if(dianji2 === '1'){
                jiazaixianshi('分类2',(++jiazaiyeshu)*10,10);
            }
            if(dianji3 === '1'){
                jiazaixianshi('分类3',(++jiazaiyeshu)*10,10);
            }
        });
    }
    function dianji() {
        $(".shangpindetailcont").click(function () {
            window.open($(this).attr("turnurl"));

        });
    }
    function tianjiashangpin(data) {
        var str = ' <div class="shangpindetailcont" turnurl="' + data.buyLink + '">'
            + '<img src="' + data.imageUrl + '" class="shangpindetailcontpic">'
            + '<div class="shaopname">' + data.name + '</div>'
            + '<div class="shaopprice">￥' + data.price + '</div>'
            + '</div>';
        $(".bibu").before(str);
    }


    function initswiper(bannerarry) {//首页滑动
        bannernum = bannerarry.length;
        for (var i = 0; i < bannerarry.length; i++) {
            $("#sectionss").append("<div class=\"section\" sectionid=\"section" + bannerarry[i].id + "\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bannerarry[i].imageUrl + "',sizingMethod='scale');background-image:url(" + bannerarry[i].imageUrl + ");background-repeat: no-repeat;background-size: 100% 100%;\"></div>")
        }
        bannerdiaozhuan();
        $("#container").PageSwitch({
            direction: 'horizontal',
            easing: 'ease-in',
            duration: 1000,
            autoPlay: true,
            loop: 'false'
        });
    }

    function bannerdiaozhuan() {
        $(".section").click(function () {
            // window.open($(this).attr("turnurl"));
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
