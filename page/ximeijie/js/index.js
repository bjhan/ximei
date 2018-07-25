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
        $("#clock1").drawClock(
            {
                shijiancha:3
                // hCol: 'xxx',// 时针颜色
                // mCol: 'xxx', // 时针颜色
                // sCol: 'xxx', // 时针颜色
                // isNumCol: 'xxx', // 数字所在的点颜色
                // noNumCol: 'xxx', // 非数字所在的点颜色
                // dCol: 'xxx', // 中心圈颜色
            }
        );
        $("#clock2").drawClock(
            {
                shijiancha:0
                // hCol: 'xxx',// 时针颜色
                // mCol: 'xxx', // 时针颜色
                // sCol: 'xxx', // 时针颜色
                // isNumCol: 'xxx', // 数字所在的点颜色
                // noNumCol: 'xxx', // 非数字所在的点颜色
                // dCol: 'xxx', // 中心圈颜色
            }
        );
    }
    iebanben = IEVersion();
    getBanners();//banner
    // currentthing();//新鲜事
    // getvideothing();//热点视频
    clickevent();
    function clickevent() {


        $(".firstvideo").on("click",function () {
            if(iebanben<9 && iebanben!== -1){
                $(this).find('.bigvideo').find("#vivi").show();
                $(this).find('.bigvideo').find("video").hide();
                $(this).find('.bigvideo').find("img").hide();
                document.embeds('vivi').play();
                document.embeds('vivi').hidden="false";
            }else {
                $(this).find('.bigvideo').find("#vivi").hide();
                $(this).find('.bigvideo').find("video").show();
                $(this).find('.bigvideo').find("img").hide();
                $(this).find('.bigvideo').find("video").get(0).play();
            }
            // $(this).find('.bigvideo').find('audio').get(0).controls=true;
            // $(this).find('.bigvideo').find('audio').get(0).play();
            $(this).find('.bigvideo').find('.mengceng').hide();
            $(this).find('.bigvideo').find('.videodesc').hide();
            $(this).find('.bigvideo').find('.playbtn').hide();
            // document.getElementById("vivi").play();
        });
    }
    function getBanners() {
        // jQuery.support.cors = true;
        $.ajax({
            url: CFG.interfaceurl+'/homepage/banners'+'?fresh=' + Math.random(),
            type: "get",
            timeout: 5000,
            success: function (data) {
                if(data.length>0){
                    // initswiper(data);

                    $("#container").PageSwitch({
                        direction:'horizontal',
                        easing:'ease-in',
                        duration:1000,
                        autoPlay:true,
                        loop:'false'
                    });
                }
            },
            error: function (a,b,c) {
                alert(c);
                console.log(data);
            }
        });
    }
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
    function currentthing() {//获取新鲜事
        $.ajax({
            url: CFG.interfaceurl+'/homepage/activities',
            type: "get",
            timeout: 5000,
            success: function (data) {
                addcurrentthing(data);
            },
            error: function (data) {
                //alert("请求错误");
                console.log(data);
            }
        });
    }
    function getvideothing() {//添加热点视频
        $.ajax({
            url: CFG.interfaceurl+'/homepage/videos',
            type: "get",
            timeout: 5000,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                //alert("请求错误");
                console.log(data);
            }
        });
    }
    function addcurrentthing(currentarry) {//添加新鲜事
        for(var i=0;i<currentarry.length;i++){
            $(".currentmsgcont").prepend('<div class="currentmsg" id="'+currentarry[i].id+'" userId="'+currentarry[i].userId+'" postId="'+currentarry[i].postId+'" activeType="'+currentarry[i].activeType+'">'+
            '<div class="currenttype">新鲜事</div>'+
                '<div class="currentwriter"><span class="currentusercolor">'+currentarry[i].username+'</span>发表文章</div>'+
                '<div class="currenttitle">'+currentarry[i].postTitle+'</div>'+
                '</div>');
        }
    }
    function initswiper(bannerarry) {//首页滑动
        bannernum = bannerarry.length;
        for(var i=0;i<bannerarry.length;i++){
            $("#gallery-top").append('<div class="swiper-slide" id="'+bannerarry[i].id+'" style="background-image:url('+bannerarry[i].imageUrl+')"></div>');
            $("#gallery-thumbs").append('<div class="swiper-slide" id="'+bannerarry[i].id+'" style="background-image:url('+bannerarry[i].imageUrl+')"></div>');
        }
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            speed: 100,
            slideToClickedSlide: true,
            onInit: function (swiper1) {
                swiper1.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
            },
            onSlideChangeEnd: function (swiper1) {
                galleryTop.slideTo(swiper1.activeIndex + 1, 0, false);
            },
            onSlideChangeStart: function (swiper1) {

            }
        });
        var galleryTop = new Swiper('.gallery-top', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            paginationClickable: true,
            speed: 400,
            loop: true,
            observer: true,
            observeParents: true,
            autoplayDisableOnInteraction: false,
            autoplay: 8000,
            spaceBetween: 10,
            onInit: function (swiper1) {
                swiper1.stopAutoplay();
                swiper1.startAutoplay();
            },
            onSlideChangeEnd: function (swiper1) {
            },
            onSlideChangeStart: function (swiper1) {
                galleryThumbs.slideTo((swiper1.activeIndex - 1) % (bannernum), 400, false);//切换到第一个slide，速度为1秒
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
