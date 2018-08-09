$(function () {
    // 滚动监听
    var valTop = $(".content-top").offset().top;
    $(window).scroll(function(){
        var winPos = $(window).scrollTop();
        if (winPos >= valTop){
            var width = $(window).width()+1;
            var left = width * 0.01;
            $(".to-top").css("width",width);
            $(".to-top").css("position","fixed");
            $(".to-top").css("top","0");
            $(".to-top").css("left","0");
            $(".to-top").css("margin-top","0");
            $(".to-top").css("background","#FBFBFB");
            // $(".content-top").css("margin-left",left);
            $(".content").css("margin-top","283px");

        }else {
            $(".to-top").css("width","1200px");
            $(".to-top").css("position","static");
            $(".to-top").css("top","0");
            $(".to-top").css("left","0");
            $(".to-top").css("margin-top","66");
            $(".to-top").css("background","rgba(241,241,241,0.3)");
            $(".content-top").css("margin-left","0");
            $(".content").css("margin-top","31px");
        }

    });

    //富文本编辑器简单模式初始化
    var editor;
    KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
            resizeType : 0,
            filterMode: false,//true时过滤HTML代码，false时允许输入任何代码。
            allowPreviewEmoticons : false,
            allowImageUpload : false,
            cssData: 'body{font-family: 微软雅黑;font-size: 14px;padding:30px;}',
            afterFocus : function(){//获得焦点 删除默认文字信息
                if(editor.html() == '<span style="color:#9B9B9B;">写回答……</span>'){
                    editor.html('');
                }
            },
            afterBlur: function(e){
                // console.log(editor.html());
                if(editor.html() == '<br/>' || editor.html() == ''){
                    editor.html('<span style="color:#9B9B9B;">写回答……</span>');
                }
            },//失去焦点，同步信息数据
            items : [
                'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons']
        });
    });

    $("#hot").css("background", "#A978D6");
    $("#hot a").css("color", "#fff");

    // 切换提问栏目
    $(".content-column-title").click(function () {
        var id = this.id;
        $(".content-column-title").css("background", "");
        $(".content-column-title a").css("color", "#000");
        $(this).css("background", "#A978D6");
        $("#" + id + " a").css("color", "#fff");
    });

    // 点击提问
    $(".askquestions").click(function () {
        $(".content-question-inner").css("display", "block");
        $(".content-question-outer").css("display", "block");
    });

    // 取消提问
    $(".content-question-cancel").click(function () {
        $(".content-question-inner").css("display", "none");
        $(".content-question-outer").css("display", "none");
    });

    // 搜索
    $(".content-top-search").click(function () {
        $(".content-question-show").css("display", "none");
        $(".content-question-search").css("display", "block");
    });

    // 收藏
    $(".collect").click(function () {
        if ($(this).hasClass("active")){
            $(this).find("img").attr("src","img/uncollection.png");
            $(this).removeClass("active");
        }else {
            $(this).find("img").attr("src","img/collection.png");
            $(this).addClass("active");
        }
    });
})