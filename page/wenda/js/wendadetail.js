$(function () {
    if ($("#reply-num").html() == 0){
        hideAnswerList();
        showNoAnswer();
    }else {
        showAnswerList();
        hideNoAnswer();
    }
    
    function hideAnswerList() {
        $(".content-reply-num").css("display", "none");
        $(".content-list").css("display", "none");
    }

    function showNoAnswer() {
        $(".content-no-answer").css("display", "block");
    }

    function showAnswerList() {
        $(".content-reply-num").css("display", "block");
        $(".content-list").css("display", "block");
    }

    function hideNoAnswer() {
        $(".content-no-answer").css("display", "none");
    }
    // 滚动监听
    var valTop = $(".content-question-detail").offset().top;
    $(window).scroll(function(){
        var winPos = $(window).scrollTop();
        if (winPos >= valTop){
            var width = $(window).width();
            var left = width * 0.01;
            $(".content-question-detail").css("width",width);
            $(".content-question-detail").css("position","fixed");
            $(".content-question-detail").css("top","-222px");
            $(".content-question-detail").css("left","0");
            $(".content-question-detail").css("background","#FBFBFB");
            $(".content-question-bottom").css("margin-left","75px");
            $(".top-title").css("display","block");
            $(".content-question-concern").css("margin-left","60px");
            $(".content-question-answer").css("margin-left","20px");

        }else {
            $(".content-question-detail").css("width","1200px");
            $(".content-question-detail").css("position","static");
            $(".content-question-bottom").css("margin-left","0");
            $(".content-question-bottom").css("background","rgba(241,241,241,0.3)");
            $(".top-title").css("display","none");
            $(".content-question-concern").css("margin-left","365px");
            $(".content-question-answer").css("margin-left","110px");
        }

    });

    // 切换关注问题
    $("#concern").click(function () {
        if ($("#concern").hasClass("active")){
            $("#concern img").attr("src","img/guanzhuwenti.png");
            $("#concern").removeClass("active");
        }else {
            $("#concern img").attr("src","img/yiguanzhu.png");
            $("#concern").addClass("active");
        }
    });

    // 回答问题
    $(".writte").click(function () {
        $(".content-write").css("display","block");
        hideNoAnswer();
    });

    // 取消回答
    $("#cancel").click(function () {
        $(".content-write").css("display","none");
        showNoAnswer();
    });

    // 收藏
    $(".content-answer-collect").click(function () {
        if ($(this).hasClass("active")){
            $(this).find("img").attr("src","img/uncollection.png");
            $(this).removeClass("active");
        }else {
            $(this).find("img").attr("src","img/collection.png");
            $(this).addClass("active");
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
})