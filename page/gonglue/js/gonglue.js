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
    var pagenumquanju=0;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }
    if (safariVersion <= DEFAULT_VERSION) {
        // alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！')
    } else {

    }

    iebanben = IEVersion();
    getBanners();//banner

    function getBanners() {
        // jQuery.support.cors = true;
        $.ajax({
            url: CFG.interfaceurl + '/gl/banners' + '?fresh=' + Math.random(),
            type: "get",
            timeout: 5000,
            success: function (data) {
                if (data.length > 0) {
                    initswiper(data);
                }
            },
            error: function (a, b, c) {
            }
        });
    }

    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1;//不是ie浏览器
        }
    }
    $(".xiegonglue").click(function () {
        var pathname = window.location.href;
        var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);
        window.location.href = path+'xiegonglue.html'
    });
    function initswiper(bannerarry) {//首页滑动
        bannernum = bannerarry.length;
        for (var i = 0; i < bannerarry.length; i++) {
            $("#sections").append("<div class=\"section\" id=\"section" + bannerarry[i].id + "\" style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + bannerarry[i].imageUrl + "',sizingMethod='scale');background-image:url(" + bannerarry[i].imageUrl + ");background-repeat: no-repeat;background-size: 100% 100%;\"></div>")
        }

        $("#container").PageSwitch({
            direction: 'horizontal',
            easing: 'ease-in',
            duration: 1000,
            autoPlay: true,
            loop: 'false'
        });
    }

    getremenbiaoqian();
    function getremenbiaoqian() {
        $.ajax({
            url: CFG.interfaceurl + '/gl/hot/lables',
            type: "get",
            timeout: 5000,
            success: function (data) {
                if (data.length > 0) {
                    $(".newpolicy").empty();
                    for (var i = 0; i < data.length; i++) {
                        addbiaoqian(data[i]);
                    }
                }
            },
            error: function (a, b, c) {
                alert(c);
                console.log(data);
            }
        });
    }

    function addbiaoqian(arrytemp) {
        var str = '<div class="biaoqian" tempid="' + arrytemp.id + '">' + arrytemp.label + '</div>';
        $(".newpolicy").append(str);
    }

    huoqugonglueliebiao(pagenumquanju, 10);
    function huoqugonglueliebiao(offset,limit) {//获取攻略列表
        console.log(CFG.interfaceurl + '/gl/list?offset=' + offset + '&limit=' + limit);
        $.ajax({
            url: CFG.interfaceurl + '/gl/list?offset=' + offset + '&limit=' + limit,
            type: "get",
            timeout: 5000,
            success: function (data) {
                console.log(data);
                if (data.items.length > 0) {
                    $(".mostcontright").children().filter(".hotcompositioncont").remove();
                    for (var i = 0; i < data.items.length; i++) {
                        addgonglueliebiao(data.items[i]);
                    }
                }
            },
            error: function (a, b, c) {
                alert(c);
                console.log(data);
            }
        });
    }

    function dianjihanshu() {
        $(".hotcompositioncont").unbind().click(function () {
            var pathname = window.location.href;
            var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);
            var tempid = $(this).attr("tempid");
            window.location.href = path+'gongluexiangqing.html?id='+tempid;
        });
    }
    $("#tianjiaxian").unbind().click(function () {
        pagenumquanju++;
        huoqugonglueliebiao(pagenumquanju,10);
    });
    function addgonglueliebiao(temp) {
        var str = ' <div class="hotcompositioncont" tempid="'+temp.id+'">'
            + '<img class="hotpic" src="'+temp.imageUrl+'">'
            + '<div class="hotdesccont">'
            + '<div class="hotcompositionconttitle">'+temp.title+'</div>'
            + '<div class="hotcompositioncontzhegnwen">'+temp.content+'</div>'
            + '<div class="hotusermessage">'
            + '<div class="hotuserheadicon">'
            + '<div class="hotuserheadiconimg" style="background-image: url('+temp.userIcon+');"></div>'
            + '</div>'
            + '<div class="hotusername">'+temp.userName+'</div>'
            + '<div class="hotuserhearticon">'
            + '<div class="hotuserhearticonimg2"></div>'
            + '</div>'
            + '<div class="hotuserheartnum">'+temp.replyCount+'</div>'
            + '<div class="hotusermsgicon">'
            + '<div class="hotusermsgiconimg3"></div>'
            + '</div>'
            + '<div class="hotusertalknum">'+temp.viewCount+'</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        $("#tianjiaxian").before(str);
        dianjihanshu();
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
