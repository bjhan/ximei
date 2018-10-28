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
    if(safariVersion <= DEFAULT_VERSION ){
        // alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！')
    }else {

    }

    $(".huifuanniu").click(function () {
        if( $(this).parent().next().css('display')=='none'){
            $(this).parent().next().show();
        }else {
            $(this).parent().next().hide();
        }

    });
    iebanben = IEVersion();


    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11
        }else{
            return -1;//不是ie浏览器
        }
    }
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    getgonglue();
    function getgonglue() {
        var id = getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/gl/detail?id=' + id,
            type: "get",
            timeout: 5000,
            success: function (data) {
                console.log(data);
                $("#container").attr("src",data.imageUrl);
                $(".wenzhangtitle").html(data.title);
                $("#wenzhangtitlewenzi").html(data.userName);
                $(".userLevel").html(data.userLevel);
                $("#viewCount").html(data.viewCount);
                $("#replyCount").html(data.replyCount);
                $("#userIcon").attr("src",data.userIcon);
                $("#neirongqu").html(data.content);
            },
            error: function (a, b, c) {
            }
        });
    }

    jiazaipinglun(0, 5);
    function jiazaipinglun(pagenum, pageSize) {
        var id = getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/gl/reply/list?glid=' + id + '&offset=' + pagenum + '&limit=' + pageSize,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".taocanyonghupingluncont .taocanpingluncont").remove();
                $("#taocanyonghushuliang").html(data.totalCount);
                shangxiayefun(Math.ceil(data.totalCount/pageSize));
                if (data.totalCount >= 4) {
                    $("#fenye1").show();
                    $("#fenye2").show();
                    $("#fenye3").show();
                    $("#fenye4").show();
                } else {
                    for (var j = 0; j < data.totalCount; j++) {
                        $("#fenye" + (j + 1)).show();
                    }
                }
                fenye(pagenum,data.totalCount,pageSize);
                for (var j = 0; j < (data.items).length; j++) {
                    tianjiapinglun(data.items[j], (pageSize*pagenum)+j + 1);
                }
                tianjiauifu();//评论函数
                $(".huifuanniu").click(function () {//回复
                    if ($(this).parent().next().css('display') == 'none') {
                        $(this).parent().next().show();
                    } else {
                        $(this).parent().next().hide();
                    }
                });
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function tianjiapinglun(data, i) {//添加评论
        var str = '<div class="taocanpingluncont">'
            + '<div class="taocanyonghutouxiag">'
            + '<div class="taocanyonghutouxiagpic" style="background-image: url(' + data.userIcon + ');"></div>'
            + '</div>'
            + '<div class="taocanyonghupinglunneitong">'
            + '<div class="taocanyonghumingchengcont">'
            + '<span class="taocanyonghumingzi">' + data.userName + '</span>&nbsp;&nbsp;&nbsp;'
            + '<span class="taocanyonghujibie">LV' + data.userLevel + '</span>'
            + '<div class="taocanyonghulouceng">' + i + 'F</div>'
            + '</div>'
            + '<div class="taocanyonghupinglunneirong">' + data.content + '</div>'
            + '<div class="taocanpinglunshijian"><span>' + data.createTime + '</span><div class="huifuanniu">回复</div></div>'
            + ' <div class="huifupinglunduv">'
            + '<textarea class="huifupinglunkuang"></textarea>'
            + '<div class="fabiaopinglunbtndetail" subid="' + data.id + '">'
            + '<div class="fabiaopinglunbtnwenzidetail">发表评论</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="clear"></div>'
            + '</div>';
        $("#pinglunkongbai").before(str);
    }
    function tianjiauifu() {
        $(".fabiaopinglunbtndetail").click(function () {
            var id= $(this).attr("subid");
            var content = $(this).prev().val();
            submitzi(content,id);
        });

        $(".fabiaopinglunbtn").click(function () {
            var id = getUrlParam('id');
            var content = $("#zibuping").val();
            if(content.length>1){
                submit(content);
            }
        });
    }
    function fenye(nowNum,total,pagesize) {
        nowNum = nowNum/pagesize;
        nowNum =parseInt(nowNum);
        total=Math.ceil(total/pagesize);
        $("#fenye").html(total);
        $("#fenyecont").empty();

        for(var i=0;i<total;i++){
            if(nowNum === i){
                $("#fenyecont").append(zhengchangnum2(i+1));
            }else {
                $("#fenyecont").append(zhengchangnum(i+1));
            }
        }
        $(".numchooseno").click(function () {
            var num = $(this).find("div").html();
            jiazaipinglun((num-1)*5,5);
        })
    }
    function zhengchangnum(num) {
        var pagestr =' <div class="numchooseno">'
            +'<div class="numchoosenum">'+num+'</div>'
            +'</div>';
        return pagestr;
    }
    function zhengchangnum2(num) {
        var pagestr =' <div class="numchooseno numchoose">'
            +'<div class="numchoosenum">'+num+'</div>'
            +'</div>';
        return pagestr;
    }
    function shangxiayefun(total) {
        $(".lastpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num>1){
                jiazaipinglun((num-2)*5,5);
            }

        });
        $(".nestpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num<total){
                jiazaipinglun(num*5,5);
            }

        });
    }
    function submitzi(content,id) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: CFG.interfaceurl + "/gl/reply/create",
            data: {
                replyId: id,
                content: content
            },
            success: function (msg) {
                console.log(msg);
                $(".huifupinglunduv").hide();
                $("#zibuping").val('');
                jiazaipinglun(0, 5);
            },
            error: function (data) {
            }
        });
    }
    function submit(content) {
        var id = getUrlParam('id');
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: CFG.interfaceurl + "/gl/reply/create",
            data: {
                glId: id,
                content: content
            },
            success: function (msg) {
                console.log(msg);
                $(".huifupinglunduv").hide();
                $("#zibuping").val('');
                jiazaipinglun(0, 5);
            },
            error: function (data) {
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
