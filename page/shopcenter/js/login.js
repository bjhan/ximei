/**
 * Created by Administrator on 2018-07-19.
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
    var bannernum = 0;//banner数量
    var iebanben = -1;
    var DEFAULT_VERSION = 8.0;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie") > -1;
    var safariVersion;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }
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
            console.log(tupiandizhijihe);
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
    $(".addImg").click(function (e) {
        clickImg(this)
    });
    $(".upload_input").change(function (e) {
        change(this);
        $(".piccont").append(' <div class="article" id="tianjia">' +
            '<div class="item">' +
            '<img class="addImg" src="img/shizi.png" />' +
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
        $("#tianjia").show();
    });

    function addpicfun() {
        $(".addImg").click(function (e) {
            clickImg(this)
        });
        $(".upload_input").change(function (e) {
            change(this);

            $(".piccont").append(' <div class="article">' +
                '<div class="item">' +
                '<img class="addImg" src="img/shizi.png" />' +
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
            $(".item").show();
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

    $(".firstvideo").on("click", function () {
    });
    $.idcode.setCode();
    $("#findpowBtn").click(function (){
        var IsBy = $.idcode.validateCode();
        alert(IsBy);
        console.log(IsBy);
    });

    $("#loginbtn").click(function () {
        var account,password;
        account = $("#dengluhao").val();
        password = $("#denglumima").val();
        if(account === ''){
            $("#dengluhaokuang").addClass("alertkuang");
            $("#denglutishi").html("请输入手机号/邮箱地址/昵称");
        }else if(password === ''){
            $("#denglumimakuang").addClass("alertkuang");
            $("#denglutishi").html("您输入的帐号或密码有误");
        }else {
            submitlogo(account,password);
        }

    });
    function submitlogo(account,password) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: CFG.interfaceurl + "/sjzx/login",
            data: {
                account: account,
                password: password
            },
            success: function (msg) {
                console.log(msg);
                if(msg.code){
                    $("#denglumimakuang").addClass("alertkuang");
                    $("#denglutishi").html("您输入的帐号或密码有误");
                }
            },
            error: function (data) {
            }
        });
    }
    $(".mashanggetpow").unbind().click(function () {
        $(".logincont").hide();
        $(".registercont").show();
    });

    $("#identcode").blur(function () {
        if($("#identcode").val().length === 11){
            $("#codeyanzhegnma").addClass("getcodebtnchoose");
            $(".getcodebtn").addClass("getcodebtnchoose");
        }
    });
    $("#identcode").focus(function () {
        if($("#identcode").val().length === 11){
            $("#codeyanzhegnma").addClass("getcodebtnchoose");
            $(".getcodebtn").addClass("getcodebtnchoose");
        }
    });
    $("#codeyanzhegnma").click(function () {
        if($(this).hasClass("getcodebtnchoose")){
            var phone = $("#identcode").val();
            if(phone === ''){
                $("#regesteralert").html("请输入有效手机号");
            }else {
                submitzhuce1(phone);
            }
        }

    });
    function submitzhuce1(phoneNo) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: CFG.interfaceurl + "/sjzx/vercode",
            data: {
                phoneNo: phoneNo
            },
            success: function (msg) {
                console.log(msg);
                if(msg.code){
                    $("#denglumimakuang").addClass("alertkuang");
                    $("#denglutishi").html("您输入的帐号或密码有误");
                }
            },
            error: function (data) {
            }
        });
    }
})();
