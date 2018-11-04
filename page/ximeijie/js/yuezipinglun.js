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
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }

    function mapff(didian) {
        var map = null;
        initialize();
        function initialize() {

            var geocoder = new google.maps.Geocoder();

            //地址正向解析
            geocoder.geocode({
//                'address': 'Liberty Island, 10004 New York Harbor'
                'address': didian
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var myOptions = {
                        zoom: 12,
                        center: results[0].geometry.location,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    };

                    map = new google.maps.Map(document.getElementById("xiangqingmap"), myOptions);

                    //定义标示
                    var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: '',
                        draggable: true
                    });
                    marker.setMap(map);
                }
            });
        }
    }
    $(".addImg").click(function (e) {
        clickImg(this)
    });
    $(".upload_input").change(function (e) {
        change(this);
        $(".piccont").append(' <div class="article">' +
            '<div class="item">' +
            '<img class="addImg" src="img/addImg.png" />' +
            '<input name="url" type="file" class="upload_input" />' +
            '<div class="preBlock">' +
            '<img class="preview" id="preview" alt="" name="pic" width="190" height="190" />' +
            '</div>' +
            '<img class="delete" src="img/delete.png" />' +
            '</div>' +
            '</div>');
        addpicfun();
    });
    $(".delete").click(function (e) {
        deleteImg(this);
    });

    var client = new OSS.Wrapper({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIz37oF3Eu7rCn',
        accessKeySecret: 'a0cyHQLrUIZUu4XYp0Az9OcWZlhnxA',
        bucket: 'ximeiimg'
    });
    //获取oss文件列表
    client.list({
        'max-keys': 10
    }).then(function (result) {

    }).catch(function (err) {

    });
    var tupiandizhijihe='';
    //用于生成uuid
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    var uuid = "cms"+guid();
    $("#file").change(function(){
        client.multipartUpload(uuid, this.files[0]).then(function (result) {
            if(tupiandizhijihe == ''){
                tupiandizhijihe = tupiandizhijihe + result.url;
            }else {
                tupiandizhijihe = tupiandizhijihe + '@' + result.url;

            }
        }).catch(function (err) {
        });
    });
    $(".tijiaopinglunzhongxin").click(function () {
        var lenth = $('.pinglunzhongxinxing').children('.pinglunzhongxinxingxing1').length;
        var content = $(".pinglunqu").val();
        var id = getUrlParam('id');
        submit(lenth,content,id,tupiandizhijihe);
        tupiandizhijihe='';
        $(".pinglunqu").val('');
        $(".pinglunzhongxincont").hide();
    });
    function addpicfun() {
        $(".addImg").click(function (e) {
            clickImg(this)
        });
        $(".upload_input").change(function (e) {

            // client.multipartUpload(uuid, this.files[0]).then(function (result) {
            //     console.log(result);
            // }).catch(function (err) {
            //     console.log(err);
            // });


            change(this);
            $(".piccont").append(' <div class="article">' +
                '<div class="item">' +
                '<img class="addImg" src="img/addImg.png" />' +
                '<input name="url" type="file" class="upload_input" />' +
                '<div class="preBlock">' +
                '<img class="preview" id="preview" alt="" name="pic" width="190" height="190" />' +
                '</div>' +
                '<img class="delete" src="img/delete.png" />' +
                '</div>' +
                '</div>');
        });
        $(".delete").click(function (e) {
            deleteImg(this);
        });
    }

    //点击
    var clickImg = function (obj) {
        $(obj).parent().find('.upload_input').click();
    }
    //删除
    var deleteImg = function (obj) {
        $(obj).parent().find('input').val('');
        $(obj).parent().find('img.preview').attr("src", "");
        //IE9以下
        $(obj).parent().find('img.preview').css("filter", "");
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

        var ext = file.value.substring(file.value.lastIndexOf(".") + 1).toLowerCase();

        // gif在IE浏览器暂时无法显示
        if (ext != 'png' && ext != 'jpg' && ext != 'jpeg') {
            if (ext != '') {
                alert("图片的格式必须为png或者jpg或者jpeg格式！");
            }
            return;
        }
        //判断IE版本
        var isIE = navigator.userAgent.match(/MSIE/) != null,
            isIE6 = navigator.userAgent.match(/MSIE 6.0/) != null;
        isIE10 = navigator.userAgent.match(/MSIE 10.0/) != null;
        if (isIE && !isIE10) {
            file.select();
            var reallocalpath = document.selection.createRange().text;
            // IE6浏览器设置img的src为本地路径可以直接显示图片
            if (isIE6) {
                pic.attr("src", reallocalpath);
            } else {
                // 非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现
                pic.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src=\"" + reallocalpath + "\")");
                // 设置img的src为base64编码的透明图片 取消显示浏览器默认图片
                pic.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
            }
            addImg.hide();
            deleteImg.show();
        } else {
            html5Reader(file, pic, addImg, deleteImg);
        }
    }

    //H5渲染
    function html5Reader(file, pic, addImg, deleteImg) {
        var file = file.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            pic.attr("src", this.result);
        }
        addImg.hide();
        deleteImg.show();
    }


    $("#shoucang").hover(function () {
        $("#shoucang").css("background-color", "#A978D6");
    }, function () {
        $("#shoucang").css("background-color", "#ffffff");
    });
    $("#lianxifangshi").hover(function () {
        $("#lianxifangshi").css("background-color", "#A978D6");
    }, function () {
        $("#lianxifangshi").css("background-color", "#ffffff");
    });
    $("#pinglunzhongxin").hover(function () {
        $("#pinglunzhongxin").css("background-color", "#A978D6");
    }, function () {
        $("#pinglunzhongxin").css("background-color", "#ffffff");
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

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    jiazaixianshi();
    function jiazaixianshi() {
        var id = getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/yzzx/detail?id=' + id,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#titlename").html(data.name);
                $("#dadename").html(data.name);
                $(".pinglunzhongxinmingcheng").html(data.name);
                $("#yignwenming").html(data.engName);
                $(".xiangqingmapaddr").html(data.address);
                mapff(data.address);
                $(".taocanyonghushuliang").html(data.replyCount);
                for (var j = 0; j < (data.services).length; j++) {
                    taocantianjia(data.services[j], j + 1);
                }
                initswiper(data.images);
                // for (var j = 0; j < (data.replies.items).length; j++) {
                //     tianjiapinglun(data.replies.items[j], j + 1);
                // }
                var shangmianxing = '';
                for (var i = 1; i <= 5; i++) {
                    if (i <= data.star) {
                        shangmianxing = shangmianxing + '<div class="zixing"></div>';
                    } else {
                        shangmianxing = shangmianxing + '<div class="anxing"></div>';
                    }
                }
                $("#shangmianxing").append(shangmianxing);
                $("#pinglunshu").html(data.replyCount);
                $("#weixinnum").html(data.wechat);
                $("#dianhuanum").html(data.phone);
                $("#qqnum").html(data.qq);
                // $(".huifuanniu").click(function () {//回复
                //     if ($(this).parent().next().css('display') == 'none') {
                //         $(this).parent().next().show();
                //     } else {
                //         $(this).parent().next().hide();
                //     }
                // });
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function tianjiapinglun(data, i) {//添加评论
        console.log(data);
        var pic = '';
        for(var i=0;i<data.imageUrls.length;i++){
            pic= pic +'<img src="'+data.imageUrls[i]+'" class="picchoose">'
        }
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
            // + '<div class="taocanpinglunshijian"><span>' + data.createTime + '</span><div class="huifuanniu">回复</div></div>'
            + '<div class="taocanpinglunshijian"><span>' + data.createTime + '</span></div>'
            + ' <div class="huifupinglunduv">'
            + '<textarea class="huifupinglunkuang"></textarea>'
            + '<div class="fabiaopinglunbtndetail" subid="' + data.id + '">'
            + '<div class="fabiaopinglunbtnwenzidetail">发表评论</div>'
            + '</div>'
            + '</div>'
            + '</div><div class="piccontdetail">'
            +pic
            +'</div><div class="piccontdetailshow">'
            +'<img src="" class="tupianxianshi">'
            +'</div>'
            + '<div class="clear"></div>'
            + '</div>';
        $("#pinglunkongbai").before(str);
        $(".picchoose").unbind().click(function () {
            $(".picchoose").removeClass("picborder");
            $(".tupianxianshi").hide();
            var pic = $(this).attr("src");
            $(this).addClass("picborder");
            $(this).parent().next().children(".tupianxianshi").attr("src",pic);
            $(this).parent().next().children(".tupianxianshi").show();
        });
        $(".tupianxianshi").click(function () {
            $(".picchoose").removeClass("picborder");
            $(".tupianxianshi").hide();
        });
    }



    jiazaipinglun(0, 5);
    function jiazaipinglun(pagenum, pageSize) {
        var id = getUrlParam('id');
        $.ajax({
            url: CFG.interfaceurl + '/yzzx/replies?yzzxid=' + id + '&pageNo=' + pagenum + '&pageSize=' + pageSize,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $(".taocanyonghupingluncont .taocanpingluncont").remove();
                console.log(data.totalCount);
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
                for (var j = 0; j < (data.replies).length; j++) {
                    tianjiapinglun(data.replies[j], (pageSize*pagenum)+j + 1);
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

    // function jiazaitaocan(pagenum, pageSize) {
    //     var id = getUrlParam('id');
    //     $.ajax({
    //         url: CFG.interfaceurl + '/yzzx/replies?yzzxid=' + id + '&pageNo=' + pagenum + '&pageSize=' + pageSize,
    //         type: "get",
    //         timeout: 5000,
    //         success: function (data) {
    //
    //             for (var j = 0; j < (data.services).length; j++) {
    //                 taocantianjia(data.services[j], j + 1);
    //             }
    //
    //         },
    //         error: function (data) {
    //             //alert("请求错误");
    //         }
    //     });
    // }


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


    function taocantianjia(data,num) {//套餐添加
        var tao = '<div class="taocanbao">'
            + '<div class="taocanjuticont">'
            + '<div class="taocannum">套餐'+num+'</div>'
            + '<div class="taocanmingchegn">'+data.serviceName+'</div>'
            + '<div class="taocanxingxingcont">'+data.spService+'</div>'
            + '<div class="taocanjiage" style="color: #4A4A4A;font-weight: bold;">￥'+data.discount+'</div>'
            + '<div class="taocanjiage">￥'+data.fullPrice+'</div>'
            + '<div class="taocanchakanxiangqing">查看详情</div>'
            + '</div>'
            + '</div>';
        $("#taocankongbai").before(tao);
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
            index = index + 1;
            var xing = '';
            for (var i = 1; i <= 5; i++) {
                if (i <= index) {
                    xing = xing + '<div class="pinglunzhongxinxingxing1"></div>';
                } else {
                    xing = xing + '<div class="pinglunzhongxinxingxing2"></div>';
                }
            }
            $(".pinglunzhongxinxing").empty();
            $(".pinglunzhongxinxing").append(xing);
            dianjixingping();
        });
        $(".pinglunzhongxinxingxing1").click(function () {
            var index = $(".pinglunzhongxinxing div").index(this);
            index = index + 1;
            var xing = '';
            for (var i = 1; i <= 5; i++) {
                if (i <= index) {
                    xing = xing + '<div class="pinglunzhongxinxingxing1"></div>';
                } else {
                    xing = xing + '<div class="pinglunzhongxinxingxing2"></div>';
                }
            }
            $(".pinglunzhongxinxing").empty();
            $(".pinglunzhongxinxing").append(xing);
            dianjixingping();
        });
    }

    function tianjiauifu() {
        $(".fabiaopinglunbtndetail").click(function () {
            var id= $(this).attr("subid");
            var content = $(this).prev().val();
            submit(5,content,id,'');
        });

        $(".fabiaopinglunbtn").click(function () {
            var id = getUrlParam('id');
            var content = $("#zibuping").val();
            submit(5,content,id,'');
        });
    }

    function submit(star,content,id,imageUrls) {

        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: CFG.interfaceurl + "/yzzx/reply?yzzxId="+id,
            data: {
                star: star,
                content: content,
                imageUrls: imageUrls
            },
            success: function (msg) {
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
