/**
 * Created by Administrator on 2018-07-10.
 */
(function () {
    var DOC = document;
    var Base = BASE;
    var Touch = Base.cfg.isTouch;
    var $$ = Base.getEle;
    var $D = Base.disEle,
        $G = Base.getUrl;
    $CREATESTYLE = Base.createStyle,
        $ADPALLSTYLE = Base.adpAllStyle;
    $text = Base.txtEle;
    $STOPPROPAGATION = Base.stopPropagation;
    $rmvEle = Base.rmvEle;
    var body = DOC.body;
    $(".shagnchuantouxiang").click(function (e) {
        clickImg(this)
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
            $(".touxiang").attr("src",result.url);
            if(tupiandizhijihe == ''){
                tupiandizhijihe = tupiandizhijihe + result.url;
            }else {
                tupiandizhijihe = tupiandizhijihe + '@' + result.url;

            }
        }).catch(function (err) {
        });
    });

    //点击
    var clickImg = function (obj) {
        $(obj).parent().find('.upload_input').click();
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
        };
        addImg.hide();
        deleteImg.show();
    }

    $("#xinxi").click(function () {
        $(this).addClass("activityguan");
        $("#touxiang").removeClass("activityguan");
        $("#chongzhi").removeClass("activityguan");

        $("#jibenxinxi").show();
        $("#genghuantouxiang").hide();
        $("#genggaimima").hide();
    });
    $("#touxiang").click(function () {
        $(this).addClass("activityguan");
        $("#xinxi").removeClass("activityguan");
        $("#chongzhi").removeClass("activityguan");

        $("#genghuantouxiang").show();
        $("#jibenxinxi").hide();
        $("#genggaimima").hide();
    });
    $("#chongzhi").click(function () {
        $(this).addClass("activityguan");
        $("#xinxi").removeClass("activityguan");
        $("#touxiang").removeClass("activityguan");

        $("#genggaimima").show();
        $("#jibenxinxi").hide();
        $("#genghuantouxiang").hide();
    });

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category , evnet]);
        } catch (e) {
            console.log(e);
        }
    }

})();