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
                $(".ximeijiemaincont .yuezi").remove();
                for (var i = 0; i < data.length; i++) {
                    addyuezi(data[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    $("#searchbtn").click(function () {
        var value = $(".searchkuang").val();
        if(value.length>0){
            $(".ximeijiecont").hide();
            $(".searchneirong").show();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").show();
            $(".searchwen").css("color","#9B9B9B");
            $(".searchtabyue").css("color","#A978D6");
            chaxunyishengshuzi(value,0);
            chaxunyiyuanshuzi(value,0);
            chaxunyuezishuzi(value,0);
            chaxunyuezi(value,0);
        }else {
            $(".ximeijiecont").show();
            $(".searchneirong").hide();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").hide();
            yuezizhognxin();
            yueshegnzhognxin();
            yiyuanzhognxin();
            muyingzhognxin();
            banzhengzhongxin();
        }
    });
    $(".searchtabyue").click(function () {
        var value = $(".searchkuang").val();
        if(value.length>0){
            $(".ximeijiecont").hide();
            $(".searchneirong").show();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").show();
            $(".searchwen").css("color","#9B9B9B");
            $(this).css("color","#A978D6");
            chaxunyuezi(value,0);
        }else {
            $(".ximeijiecont").show();
            $(".searchneirong").hide();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").hide();
            yuezizhognxin();
            yueshegnzhognxin();
            yiyuanzhognxin();
            muyingzhognxin();
            banzhengzhongxin();
        }
    });
    $(".searchtabyiyuan").click(function () {
        var value = $(".searchkuang").val();
        if(value.length>0){
            $(".ximeijiecont").hide();
            $(".searchneirong2").show();
            $(".searchneirong").hide();
            $(".searchneirong3").hide();
            $(".searchtab").show();
            $(".searchwen").css("color","#9B9B9B");
            $(this).css("color","#A978D6");
            chaxunyiyuan(value,0);
        }else {
            $(".ximeijiecont").show();
            $(".searchneirong").hide();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").hide();
            yuezizhognxin();
            yueshegnzhognxin();
            yiyuanzhognxin();
            muyingzhognxin();
            banzhengzhongxin();
        }
    });
    $(".searchtabyisheng").click(function () {
        var value = $(".searchkuang").val();
        if(value.length>0){
            $(".ximeijiecont").hide();
            $(".searchneirong3").show();
            $(".searchneirong").hide();
            $(".searchneirong1").hide();
            $(".searchtab").show();
            chaxunyisheng(value,0);

            $(".searchwen").css("color","#9B9B9B");
            $(this).css("color","#A978D6");
        }else {
            $(".ximeijiecont").show();
            $(".searchneirong").hide();
            $(".searchneirong2").hide();
            $(".searchneirong3").hide();
            $(".searchtab").hide();
            yuezizhognxin();
            yueshegnzhognxin();
            yiyuanzhognxin();
            muyingzhognxin();
            banzhengzhongxin();
        }
    });
    $("#yueziquanbu").click(function () {
        var pathname = window.location.href;
        var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
        // window.open(path+'subxiangqing.html');
        window.location.href =path+'subxiangqing.html';
    });
    $("#yiyuanquanbu").click(function () {
        var pathname = window.location.href;
        var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
        window.location.href = path+'yiyuanxiangqing.html';
    });
    $("#muyingquanbu").click(function () {
        var pathname = window.location.href;
        var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
        window.location.href = path+'muyingxiangqing.html';
    });
    function chaxunyuezi(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yzzx/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=1000',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".searchneirong .msgdetailm2").remove();
                $("#chaxunyuezishuliang").html(data.totalCount);

                for (var i = 0; i < data.items.length; i++) {
                    addyuezi2(data.items[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function chaxunyuezishuzi(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yzzx/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=10',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#chaxunyuezishuliang").html(data.totalCount);
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function chaxunyiyuanshuzi(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yy/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=10',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#chaxunyiyuanshuliang").html(data.totalCount);
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function chaxunyishengshuzi(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/ys/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=10',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#chaxunyishengshuliang").html(data.totalCount);
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function chaxunyiyuan(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yy/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=1000',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".searchneirong2 .msgdetailm2").remove();
                $("#chaxunyiyuanshuliang").html(data.totalCount);
                for (var i = 0; i < data.items.length; i++) {
                    addyiyuan2(data.items[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function chaxunyisheng(chaxuntiaojian,pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/ys/list?name='+chaxuntiaojian+'&pageNo='+pagenum+'&pageSize=1000',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".searchneirong3 .msgdetailm2").remove();
                $("#chaxunyishengshuliang").html(data.totalCount);
                for (var i = 0; i < data.items.length; i++) {
                    addyiyuan3(data.items[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    $(".chengshimingcheng").click(function () {
        $(".chengshimingcheng").css("color","A978D6");
        yuezichengshichaxun($(this).html());
    });
    function yuezichengshichaxun(chengshi) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/yzzx/list?city='+chengshi+'&pageNo=0&pageSize=4',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".ximeijiemaincont .yuezi").remove();
                for (var i = 0; i < data.items.length; i++) {
                    addyuezi(data.items[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyuezi(data) {
        var str =' <div class="ximeijiedetailcont yuezi" tailid="'+data.id+'" tt="yuezi">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>'
            +'</div>';
        $("#yueziclear").before(str);
    }
    function xingxingfun(num) {
        var xingxing = '';
        for (var i = 1; i <= 5; i++) {
            if (i <=num) {
                xingxing = xingxing + '<div class="zixing"></div>'
            } else {
                xingxing = xingxing + '<div class="anxing"></div>'
            }
        }
        return xingxing;
    }
    function addyuezi2(data) {
        var xing = xingxingfun(data.star);
        var str ='<div class="msgdetailm2 yuezi" tailid="'+data.id+'" tt="yuezi">'
            +'<div class="msgdetailpic" style="background-image: url('+data.imageUrl+');"></div>'
            +'<div class="msgdetailmtitlecont">'
            +'<div class="msgdetailmtitle"><span>'+data.name+'</span><div class="shoucang"></div> </div>'
            +'<div class="msgdetailmtitle2"></div>'
            +'<div class="msgdetailmtitle3"><div class="weizhiicon"></div><span class="zuobiao">'+data.address+'</span></div>'
            +'<div class="msgdetailmtitle4">套餐最低价格：￥'+data.minPrice+'</div>'
            +'<div class="msgdetailmtitle5">'
            +xing
            +'</div>'
            +'</div>'
            +'</div>';
        $(".chazhaokongbai1").before(str);
    }
    function addyiyuan2(data) {
        var xing = xingxingfun(data.star);
        var str ='<div class="msgdetailm2 yiyuan" tailid="'+data.id+'" tt="yiyuan">'
            +'<div class="msgdetailpic" style="background-image: url('+data.imageUrl+');"></div>'
            +'<div class="msgdetailmtitlecont">'
            +'<div class="msgdetailmtitle"><span>'+data.name+'</span><div class="shoucang"></div> </div>'
            +'<div class="msgdetailmtitle2"></div>'
            +'<div class="msgdetailmtitle3"><div class="weizhiicon"></div><span class="zuobiao">'+data.address+'</span></div>'
            +'<div class="msgdetailmtitle4">套餐最低价格：￥'+data.minPrice+'</div>'
            +'<div class="msgdetailmtitle5">'
            +xing
            +'</div>'
            +'</div>'
            +'</div>';
        $(".chazhaokongbai2").before(str);
    }
    function addyiyuan3(data) {
        var xing = xingxingfun(data.star);
        var str ='<div class="msgdetailm2 yisheng" tailid="'+data.id+'" tt="yisheng">'
            +'<div class="msgdetailpic" style="background-image: url('+data.imageUrl+');"></div>'
            +'<div class="msgdetailmtitlecont">'
            +'<div class="msgdetailmtitle"><span>'+data.name+'</span><div class="shoucang"></div> </div>'
            +'<div class="msgdetailmtitle2"></div>'
            +'<div class="msgdetailmtitle3"><div class="weizhiicon"></div><span class="zuobiao">'+data.address+'</span></div>'
            +'<div class="msgdetailmtitle4">套餐最低价格：￥'+data.minPrice+'</div>'
            +'<div class="msgdetailmtitle5">'
            +xing
            +'</div>'
            +'</div>'
            +'</div>';
        $(".chazhaokongbai3").before(str);
    }
    yueshegnzhognxin();
    function yueshegnzhognxin() {//医生
        $.ajax({
            url: CFG.interfaceurl + '/xmj/homepage/ys/defaultlist',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".ximeijiemaincont .yisheng").remove();
                for (var i = 0; i < data.length; i++) {
                    addyisheng(data[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyisheng(data) {
        var str =' <div class="ximeijiedetailcont yisheng" tailid="'+data.id+'" tt="yisheng">'
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
                $(".ximeijiemaincont .yiyuan").remove();
                for (var i = 0; i < data.length; i++) {
                    addyiyiyuan(data[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addyiyiyuan(data) {
        var str =' <div class="ximeijiedetailcont yiyuan" tailid="'+data.id+'" tt="yiyuan">'
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
                $(".ximeijiemaincont .muying").remove();
                for (var i = 0; i < data.length; i++) {
                    addmuying(data[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addmuying(data) {
        var str =' <div class="ximeijiedetailcont muying" tailid="'+data.id+'" tt="muying" tiaourl="'+data.buyLink+'">'
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
                $(".ximeijiemaincont .banzheng").remove();
                for (var i = 0; i < data.length; i++) {
                    addbanzheng(data[i]);
                }
                dianjitiaozhuanhanshu();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addbanzheng(data) {
        var str ='<div class="ximeijiedetailcont banzheng" tailid="'+data.id+'">'
            +'<div class="ximeijiedetailcontpic" style="background-image: url('+data.imageUrl+')"></div>'
            +'<div class="ximeijiedetailcontpicdesc">'+data.name+'</div>';
            +'</div>';
        $("#jigouname").before(str);
    }
    
    function dianjitiaozhuanhanshu() {
        var pathname = window.location.href;
        var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);
        $(".ximeijiedetailcont").click(function () {
            var tt = $(this).attr("tt");
            var tiaoid = $(this).attr("tailid");
            if(tt === 'yisheng'){
                window.location.href = path+'yishengpinglun.html?id='+tiaoid;
            }
            if(tt === 'yiyuan'){
                window.location.href = path+'yiyuanpinglun.html?id='+tiaoid;
            }
            if(tt === 'yuezi'){
                window.location.href = path+'yuezipinglun.html?id='+tiaoid;
            }
            if(tt === 'muying'){
                // window.location.href = path+'yuezipinglun.html?id='+tiaoid;
                window.location.href = path+'muyingxiangqing.html';
            }
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
