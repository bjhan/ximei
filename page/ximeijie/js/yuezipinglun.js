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

    $(".addImg").click(function (e) {
        clickImg(this)
    });
    $(".upload_input").change(function (e) {
        change(this);
        $(".piccont").append(' <div class="article">'+
            '<div class="item">'+
            '<img class="addImg" src="img/addImg.png" />'+
            '<input name="url" type="file" class="upload_input" />'+
            '<div class="preBlock">'+
            '<img class="preview" id="preview" alt="" name="pic" width="190" height="190" />'+
            '</div>'+
            '<img class="delete" src="img/delete.png" />'+
            '</div>'+
            '</div>');
        addpicfun();
    });
    $(".delete").click(function (e) {
        deleteImg(this);
    });

    function addpicfun() {
        $(".addImg").click(function (e) {
            clickImg(this)
        });
        $(".upload_input").change(function (e) {
            change(this);
            $(".piccont").append(' <div class="article">'+
                '<div class="item">'+
                '<img class="addImg" src="img/addImg.png" />'+
                '<input name="url" type="file" class="upload_input" />'+
                '<div class="preBlock">'+
                '<img class="preview" id="preview" alt="" name="pic" width="190" height="190" />'+
                '</div>'+
                '<img class="delete" src="img/delete.png" />'+
                '</div>'+
                '</div>');
        });
        $(".delete").click(function (e) {
            deleteImg(this);
        });
    }
    //点击
    var clickImg = function(obj){
        $(obj).parent().find('.upload_input').click();
    }
    //删除
    var deleteImg = function(obj){
        $(obj).parent().find('input').val('');
        $(obj).parent().find('img.preview').attr("src","");
        //IE9以下
        $(obj).parent().find('img.preview').css("filter","");
        $(obj).hide();
        $(obj).parent().find('.addImg').show();
        $(obj).parent().parent().remove();
    }
    //选择图片
    function change(file) {
        //预览
        var pic = $(file).parent().find(".preview");
        //添加按钮
        var addImg = $(file).parent().find(".addImg");
        //删除按钮
        var deleteImg = $(file).parent().find(".delete");

        var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();

        // gif在IE浏览器暂时无法显示
        if(ext!='png'&&ext!='jpg'&&ext!='jpeg'){
            if (ext != '') {
                alert("图片的格式必须为png或者jpg或者jpeg格式！");
            }
            return;
        }
        //判断IE版本
        var isIE = navigator.userAgent.match(/MSIE/)!= null,
            isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;
        isIE10 = navigator.userAgent.match(/MSIE 10.0/)!= null;
        if(isIE && !isIE10) {
            file.select();
            var reallocalpath = document.selection.createRange().text;
            // IE6浏览器设置img的src为本地路径可以直接显示图片
            if (isIE6) {
                pic.attr("src",reallocalpath);
            }else{
                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                pic.css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")");
                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                pic.attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
            }
            addImg.hide();
            deleteImg.show();
        }else {
            html5Reader(file,pic,addImg,deleteImg);
        }
    }
    //H5渲染
    function html5Reader(file,pic,addImg,deleteImg){
        var file = file.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            pic.attr("src",this.result);
        }
        addImg.hide();
        deleteImg.show();
    }


    $("#shoucang").hover(function(){
        $("#shoucang").css("background-color","#A978D6");
    },function(){
        $("#shoucang").css("background-color","#ffffff");
    });
    $("#lianxifangshi").hover(function(){
        $("#lianxifangshi").css("background-color","#A978D6");
    },function(){
        $("#lianxifangshi").css("background-color","#ffffff");
    });
    $("#pinglunzhongxin").hover(function(){
        $("#pinglunzhongxin").css("background-color","#A978D6");
    },function(){
        $("#pinglunzhongxin").css("background-color","#ffffff");
    });

    $("#lianxifangshi").click(function () {
        $(".lianxifangshicont").show();
    });
    $("#pinglunzhongxin").click(function () {
        $(".pinglunzhongxincont").show();
    });
    dianjihanshu();
    function dianjihanshu() {
        $(".wozhidaole").click(function (e) {
            $("#lianxi").hide();
            e.stopPropagation();
            e.preventDefault();
        });
        $(".guanbilianxi").click(function (e) {
            $("#lianxi").hide();
            e.stopPropagation();
            e.preventDefault();
        });
        $(".tijiaopinglunzhongxin").click(function (e) {
            $(".pinglunzhongxincont").hide();
            e.stopPropagation();
            e.preventDefault();
        });
        $(".guanbilianxi2").click(function (e) {
            $(".pinglunzhongxincont").hide();
            e.stopPropagation();
            e.preventDefault();
        });
    }
    // $("#container").PageSwitch({
    //     direction:'horizontal',
    //     easing:'ease-in',
    //     duration:1000,
    //     autoPlay:true,
    //     loop:'false'
    // });
    mapfun();
    function mapfun() {
        // 百度地图API功能
        var map = new BMap.Map("xiangqingmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(36.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别

        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    jiazaixianshi();
    function jiazaixianshi() {
        var id=getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/yzzx/detail?id='+id,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#titlename").html(data.name);
                $("#dadename").html(data.name);
                $(".pinglunzhongxinmingcheng").html(data.name);
                $("#yignwenming").html(data.engName);
                $(".xiangqingmapaddr").html(data.address);
                $(".taocanyonghushuliang").html(data.replyCount);

                initswiper(data.images);
                for(var j=0;j<(data.replies.items).length;j++){
                    tianjiapinglun(data.replies.items[j],j+1);
                }
                var shangmianxing='';
                for(var i=1;i<=5;i++){
                    if(i<=data.star){
                        shangmianxing = shangmianxing+'<div class="zixing"></div>';
                    }else {
                        shangmianxing = shangmianxing+'<div class="anxing"></div>';
                    }
                }
                $("#shangmianxing").append(shangmianxing);
                $("#pinglunshu").html(data.replyCount);
                $("#weixinnum").html(data.wechat);
                $("#dianhuanum").html(data.phone);
                $("#qqnum").html(data.qq);

                var taocan;
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function tianjiapinglun(data,i) {//添加评论
        var str='<div class="taocanpingluncont">'
            +'<div class="taocanyonghutouxiag">'
            +'<div class="taocanyonghutouxiagpic" style="background-image: url('+data.userIcon+');"></div>'
            +'</div>'
            +'<div class="taocanyonghupinglunneitong">'
            +'<div class="taocanyonghumingchengcont">'
            +'<span class="taocanyonghumingzi">'+data.userName+'</span>&nbsp;&nbsp;&nbsp;'
    +'<span class="taocanyonghujibie">LV'+data.userLevel+'</span>'
            +'<div class="taocanyonghulouceng">'+i+'F</div>'
        +'</div>'
        +'<div class="taocanyonghupinglunneirong">'+data.content+'</div>'
        +'<div class="taocanpinglunshijian">'+data.createTime+'</div>'
        +'<div class="huifuanniu">回复</div>'
            +'</div>'
            +'<div class="clear"></div>'
            +'</div>';
        $("#pinglunkongbai").before(str);
    }
    function taocantianjia(data) {//套餐添加
        var tao='<div class="taocanbao">'
            +'<div class="taocanjuticont">'
            +'<div class="taocannum">'+data.serviceName+'</div>'
            +'<div class="taocanmingchegn">'+data.spService+'</div>'
            +'<div class="taocanxingxingcont">'
            +'<div class="zixing"></div>'
            +'<div class="zixing"></div>'
            +'<div class="anxing"></div>'
            +'<div class="anxing"></div>'
            +'<div class="anxing"></div>'
            +'</div>'
            +'<div class="taocanjiage">￥'+data.discount+'</div>'
            +'<div class="taocanchakanxiangqing">查看详情</div>'
            +'</div>'
            +'</div>';
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
    dianjixingping();
    function dianjixingping() {
        $(".pinglunzhongxinxingxing2").click(function () {
            var index = $(".pinglunzhongxinxing div").index(this);
            index = index+1;
            var xing='';
            for(var i=1;i<=5;i++){
                if(i<=index){
                    xing = xing +'<div class="pinglunzhongxinxingxing1"></div>';
                }else {
                    xing = xing +'<div class="pinglunzhongxinxingxing2"></div>';
                }
            }
            $(".pinglunzhongxinxing").empty();
            $(".pinglunzhongxinxing").append(xing);
            dianjixingping();
        });
        $(".pinglunzhongxinxingxing1").click(function () {
            var index = $(".pinglunzhongxinxing div").index(this);
            index = index+1;
            var xing='';
            for(var i=1;i<=5;i++){
                if(i<=index){
                    xing = xing +'<div class="pinglunzhongxinxingxing1"></div>';
                }else {
                    xing = xing +'<div class="pinglunzhongxinxingxing2"></div>';
                }
            }
            $(".pinglunzhongxinxing").empty();
            $(".pinglunzhongxinxing").append(xing);
            dianjixingping();
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
