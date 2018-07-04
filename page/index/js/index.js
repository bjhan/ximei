/**
 * Created by Administrator on 2018-07-04.
 */
(function () {
    initswiper();
    getBanners();

    function getBanners() {
        // $.ajax({
        //     url: CFG.interfaceurl+'/homepage/banners',
        //     type: "get",
        //     timeout: 5000,
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     error: function (data) {
        //         //alert("请求错误");
        //         console.log(data);
        //     }
        // });
        var bannermsg = [
            {
                "id": 100001,
                "imageUrl": "http://www.xxxx.com/banner1.jpg"
            },
            {
                "id": 100002,
                "imageUrl": "http://www.xxxx.com/banner2.jpg"
            }
        ]
    }

    function initswiper() {//首页滑动
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
                galleryThumbs.slideTo((swiper1.activeIndex - 1) % 4, 400, false);//切换到第一个slide，速度为1秒
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
