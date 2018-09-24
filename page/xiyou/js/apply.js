var baseUrl = "http://47.98.119.215:80/web/api/v1/";
$(function () {
    $("#applyShowBtn").bind('click', function () {
        $("#introduce").hide(100);
        $("#apply").show(100);
    })

    $("#dialog").dialog({
        autoOpen: false,
        buttons: {
            Cancel: function () {
                $("#dialog").dialog("close");
            }
        }
    })


    $("#dialog2").dialog({
        autoOpen: false,
        buttons: {
            Cancel: function () {
                $("#dialog2").dialog("close");
            }
        }
    })

    client =  new OSS.Wrapper({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAIz37oF3Eu7rCn',
        accessKeySecret: 'a0cyHQLrUIZUu4XYp0Az9OcWZlhnxA',
        bucket: 'ximeiimg'
    });

    initUploadClick();
})

var tupiandizhijihe = '';
//用于生成uuid
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
var uuid = "cms" + guid();

var client = null;

var initUploadClick = function () {
    $(".addImg").click(function (e) {
        clickImg(this)
    });

    $(".upload_input").change(function (e) {
        change(this);
    });
    $("#file").change(function () {
        console.log("change");
        client.multipartUpload(uuid, this.files[0]).then(function (result) {
            console.log(result);
            if (tupiandizhijihe == '') {
                tupiandizhijihe = tupiandizhijihe + result.name;
                alert(tupiandizhijihe);
            } else {

                tupiandizhijihe = tupiandizhijihe + '@' + result.name;
                alert(tupiandizhijihe);

            }
        }).catch(function (err) {
            console.log(err);

        });
    });

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

//点击
var clickImg = function (obj) {
    $(obj).parent().find('.upload_input').click();
}


var submit = function () {
    var obj = checkparmet();
    if (obj) {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: baseUrl + "/xyq/forum/request",
            data: obj,
            success: function (msg) {
                location.href = "./circle.html?id=" + msg.id
            },
            error: function (data) {

            }
        });
    }


}


var getUserInfo = function () {
    $.ajax({
        type: "GET",
        url: baseUrl + "/common/userInfo",
        success: function (msg) {
            console.log(msg);
        }
    });

}


var checkparmet = function () {
    var circleName = $("#circleName").val();
    var circleintroduce = $("#circleintroduce").val();
    var tags = [];
    $.each($(".tag"), function (i, n) {
        var value = $(n).val();
        if (value) {
            tags.push(value);
        }

    })

    if (!$("#checkSumber").is(':checked')) {
        $("#dialog2").dialog("open");
        return null;
    }

    if (!(circleName && circleintroduce)) {
        $("#dialog").dialog('open');
        return null;
    }
    var obj = {};
    obj.name = circleName;
    obj.abstrat = circleintroduce;
    obj.tags = tags.join(",");
    return obj;
}
