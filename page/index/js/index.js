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

    getBanners();//banner
    // currentthing();//新鲜事
    // getvideothing();//热点视频
    // clickevent();
    function clickevent() {
        $(".firstvideo").on("click",function () {
            $(this).find('.bigvideo').find('video').get(0).controls=true;
            $(this).find('.bigvideo').find('video').get(0).play();
            $(this).find('.bigvideo').find('.mengceng').hide();
            $(this).find('.bigvideo').find('.videodesc').hide();
            $(this).find('.bigvideo').find('.playbtn').hide();
        });
    }
    function getBanners() {
        // jQuery.support.cors = true;
        alert(1);
        $.ajax({
            url: CFG.interfaceurl+'/homepage/banners'+'?fresh=' + Math.random(),
            type: "get",
            timeout: 5000,
            success: function (data) {
                alert(data.length);
                if(data.length>0){
                    initswiper(data);
                }
            },
            error: function (a,b,c) {
                alert(c);
                console.log(data);
            }
        });
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
