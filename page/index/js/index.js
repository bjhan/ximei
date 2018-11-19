/**
 * Created by Administrator on 2018-07-04.
 */

(function () {

    var nowpageNo = 0;
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
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }
    if (safariVersion <= DEFAULT_VERSION) {
        // alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！')
    } else {
        $("#clock1").drawClock(
            {
                shijiancha: 3
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
                shijiancha: 0
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
    getvideothing();//热点视频

    function clickevent() {


        $(".firstvideo").on("click", function () {
            if (iebanben < 9 && iebanben !== -1) {
                $(this).find('.bigvideo').find("#vivi").show();
                $(this).find('.bigvideo').find("video").hide();
                $(this).find('.bigvideo').find("img").hide();
                document.embeds('vivi').play();
                document.embeds('vivi').hidden = "false";
            } else {
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
        $(".secondvideo").on("click", function () {
            if (iebanben < 9 && iebanben !== -1) {
                $(this).find('.smallvideo').find("embed").show();
                $(this).find('.smallvideo').find("video").hide();
                $(this).find('.smallvideo').find("img").hide();
                var num = $(this).attr('num');
                document.embeds('vivi' + num).play();
                document.embeds('vivi' + num).hidden = "false";
            } else {
                $(this).find('.smallvideo').find("embed").hide();
                $(this).find('.smallvideo').find("video").show();
                $(this).find('.smallvideo').find("img").hide();
                $(this).find('.smallvideo').find("video").get(0).play();
            }
            // $(this).find('.bigvideo').find('audio').get(0).controls=true;
            // $(this).find('.bigvideo').find('audio').get(0).play();
            $(this).find('.smallvideo').find('.mengceng').hide();
            $(this).find('.smallvideo').find('.videodesc').hide();
            $(this).find('.smallvideo').find('.playbtn').hide();
            // document.getElementById("vivi").play();
        });
    }

    function getBanners() {
        // jQuery.support.cors = true;
        $.ajax({
            url: CFG.interfaceurl + '/homepage/banners',
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

    dianjishijian();
    function dianjishijian() {
        $(".currentBtn").click(function () {
            $(".msgcurrentcont").hide();
        });
    }

    currentthing();
    function currentthing() {//获取新鲜事
        $.ajax({
            url: CFG.interfaceurl + '/homepage/activities',
            type: "get",
            timeout: 10000,
            success: function (data) {
                addcurrentthing(data);
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function getvideothing() {//添加热点视频
        $.ajax({
            url: CFG.interfaceurl + '/homepage/videos',
            type: "get",
            timeout: 5000,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (i == 0) {
                        addvideo1(data[i]);
                    } else {
                        addvideo2(data[i], i);
                    }
                    clickevent();
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function addvideo1(jsonvideo) {//添加视频
        var strvideo = ' <div class="firstvideo">'
            + '<div class="bigvideo">'
            + '<video class="videos" controls poster="' + jsonvideo.imageUrl + '" >'
            + '<source src="' + jsonvideo.videoUrl + '" type="video/mp4">'
            + '</video>'
            + '<embed class="videos2" id="vivi" hidden="true" controls="controls" src="' + jsonvideo.videoUrl + '" allowfullscreen="false" flashvars="vcastr_file=1234.flv&LogoText=www.lanrentuku.com&IsAutoPlay=0" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%" loop="false" autostart="false"></embed>'
            + '<img src="' + jsonvideo.imageUrl + '" class="videopic">'
            + '<div class="mengceng"></div>'
            + '<div class="videodesc">' + jsonvideo.tag + '</div>'
            + '<div class="playbtn"></div>'
            + '</div>'
            + '</div>';

        $(".videocontentfloat").append(strvideo);
    }

    function addvideo2(jsonvideo, i) {//添加视频
        var strvideo = ' <div class="secondvideo" num="' + i + '">'
            + '<div class="smallvideo">'
            + '<video class="videos" controls poster="' + jsonvideo.imageUrl + '" >'
            + '<source src="' + jsonvideo.videoUrl + '" type="video/mp4">'
            + '</video>'
            + '<embed class="videos2" id="vivi' + i + '" hidden="true" controls="controls" src="' + jsonvideo.videoUrl + '" allowfullscreen="false" flashvars="vcastr_file=1234.flv&LogoText=www.lanrentuku.com&IsAutoPlay=0" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%" loop="false" autostart="false"></embed>'
            + '<img src="' + jsonvideo.imageUrl + '" class="videopic">'
            + '<div class="mengceng"></div>'
            + '<div class="videodesc">' + jsonvideo.tag + '</div>'
            + '<div class="playbtn"></div>'
            + '</div>'
            + '</div>';

        $(".videocontentfloat").append(strvideo);
    }

    function addcurrentthing(currentarry) {//添加新鲜事
        for (var i = 0; i < currentarry.length; i++) {
            $(".currentmsgcont").prepend('<div class="currentmsg" id="' + currentarry[i].id + '" userId="' + currentarry[i].userId + '" postId="' + currentarry[i].postId + '" activeType="' + currentarry[i].activeType + '">' +
                '<div class="currenttype">新鲜事</div>' +
                '<div class="currentwriter"><span class="currentusercolor">' + currentarry[i].username + '</span>发表文章</div>' +
                '<div class="currenttitle">' + currentarry[i].postTitle + '</div>' +
                '</div>');
        }
    }

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
        $(".pages").width(bannernum*120);
    }

    getzhengcething();
    function getzhengcething() {//添加最新政策
        $.ajax({
            url: CFG.interfaceurl + '/homepage/news',
            type: "get",
            timeout: 5000,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    addzhengce(data[i])
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function addzhengce(data) {//添加政策
        var str = '<div class="newpolicy">'
            + '<div class="moredetailcont">'
            + '<img src="' + data.imageUrl + '" class="moredetailpic">'
            + '</div>'
            + '<div class="moredetaildesc">'
            + '<p class="newproictitle">' + data.title + '</p>'
            + '<p class="newproicde">' + data.content + '</p>'
            + '</div>'
            + '<div class="xiangqingBtn"></div>'
            + '</div>';
        $("#zhengce").append(str);
    }


    tianjiaredianwenzhang(0, 3);
    function tianjiaredianwenzhang(pageNo, pageSize) {//添加热点文章

        $.ajax({
            url: CFG.interfaceurl + '/homepage/posts?pageNo=' + pageNo + '&pageSize=' + pageSize,
            type: "get",
            timeout: 5000,
            success: function (data) {
                nowpageNo = pageNo;
                shangxiayefun(data.totalCount);
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

                $("#redianwenzhangshu").html(Math.ceil(data.totalCount/pageSize));
                fenye(pageNo,data.totalCount,pageSize);
                $("#redianwenzhang .hotcompositioncont").remove();
                for (var i = 0; i < (data.posts).length; i++) {
                    addredianwenzhang(data.posts[i]);
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function shangxiayefun(total) {
        $(".lastpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num>1){
                tianjiaredianwenzhang((num-2)*3, 3);
            }

        });
        $(".nestpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num<total){
                tianjiaredianwenzhang(num*3, 3);
            }

        });
    }
    function fenye(nowNum,total,pagesize) {
        nowNum = nowNum/pagesize;
        nowNum =parseInt(nowNum);
        $("#fenyecont").empty();
        total=Math.ceil(total/pagesize);
        if(total<pagesize){
            pagesize=total;
        }
        for(var i=0;i<total;i++){
            if(nowNum === i){
                $("#fenyecont").append(zhengchangnum2(i+1));
            }else {
                $("#fenyecont").append(zhengchangnum(i+1));
            }
        }
        $(".numchooseno").click(function () {
            var num = $(this).find("div").html();
            tianjiaredianwenzhang((num-1)*3, 3);
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
    function addredianwenzhang(data) {
        var str = '<div class="hotcompositioncont">'
            + '<img class="hotpic" src="' + data.imageUrl + '">'
            + '<div class="hotdesccont">'
            + '<div class="hotcompositionconttitle">' + data.title + '</div>'
            + '<div class="hotcompositioncontzhegnwen">' + data.content + '</div>'
            + '<div class="hotusermessage">'
            + '<div class="hotuserheadicon">'
            + '<div class="hotuserheadiconimg" style="background-image: url(' + data.icon + ')"></div>'
            + '</div>'
            + '<div class="hotusername">' + data.author + '</div>'
            + '<div class="hotuserhearticon">'
            + '<div class="hotuserhearticonimg2"></div>'
            + '</div>'
            + '<div class="hotuserheartnum">' + data.likeNum + '</div>'
            + '<div class="hotusermsgicon">'
            + '<div class="hotuserhearticonimg3"></div>'
            + '</div>'
            + '<div class="hotusertalknum">' + data.commentNum + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';
        $("#redianxian").before(str);
    }

    tianjiachangjianwenti();
    function tianjiachangjianwenti() {//添加常见问题
        $.ajax({
            url: CFG.interfaceurl + '/homepage/questions',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    if (i < 3) {
                        addchangjianwenti(i + 1, data[i]);
                    } else {
                        addchangjianwenti2(i + 1, data[i]);
                    }
                }


            },
            error: function (data) {
                //alert("请求错误");

            }
        });
    }

    function addchangjianwenti(i, data) {
        var str = '<div class="changjianproblemcont">'
            + '<div class="ranknum ranknumbg' + i + '"><div class="ranknum1">' + i + '</div></div>'
            + '<div class="problemdesc">' + data.question + '</div>'
            + '</div>';
        $("#changjianwentixian").before(str);
    }

    function addchangjianwenti2(i, data) {
        var str = '<div class="changjianproblemcont">'
            + '<div class="ranknum"><div class="ranknum2">' + i + '</div></div>'
            + '<div class="problemdesc">' + data.question + '</div>'
            + '</div>';
        $("#changjianwentixian").before(str);
    }

    function tianjiabibeizhishi() {//添加必备知识
        $.ajax({
            url: CFG.interfaceurl + '/homepage/knowledges',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function addbibeishizhi(data) {//必备知识
        var str = ' <div class="mustknowledg">'
            + '<div class="mustpiccont">'
            + '<img src="'+data.imageUrl+'">'
            + '<div class="mustpicconttage"><div>宝宝证件</div></div>'
            + '</div>'
            + '<div class="mustknowledgedesc">去美国生孩子海关入境流程全攻略，赴美生子妈妈必看</div>'
            + '</div>';
    }
    chegnshifengqing();
    function chegnshifengqing() {//添加城市风情
        $.ajax({
            url: CFG.interfaceurl + '/homepage/customs',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    addfengqing(data[i]);
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addfengqing(data) {
        var str ='      <div class="citycont" id="'+data.id+'">'
            +'<img src="'+data.imageUrl+'" class="citypic">'
            +'</div>';
        $("#chegnshifengqingkkongbai").before(str);
    }
    suibiankankan();
    function suibiankankan() {//随便看看
        $.ajax({
            url: CFG.interfaceurl + '/homepage/frees',
            type: "get",
            timeout: 5000,
            success: function (data) {

                for (var i = 0; i < data.length; i++) {
                    if(i==0){
                        addsuibian2(data[i]);
                    }else {
                        addsuibian(data[i]);
                    }
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    function addsuibian2(data) {
        var str ='   <div class="suibianbig" id="'+data.id+'">'
            +'<img src="'+data.imageUrl+'" class="suibiansmallpic">'
            +'</div>';
        $("#suibiankankan").before(str);
    }
    function addsuibian(data) {
        var str ='   <div class="suibiansmall" id="'+data.id+'">'
            +'<img src="'+data.imageUrl+'" class="suibiansmallpic">'
            +'</div>';
        $("#suibiankankan").before(str);
    }
    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category, evnet]);
        } catch (e) {
        }
    }

})();
