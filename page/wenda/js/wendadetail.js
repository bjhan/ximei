$(function () {
    havaAnswer();

    // 判断本问题是否是本人所提 加关注 添加修改

    // 判断回答中是否有本人回答

    // 判断是否有问答
    function havaAnswer() {
        if ($("#reply-num").html() == 0){
            hideAnswerList();
            showNoAnswer();
        }else {
            showAnswerList();
            hideNoAnswer();
        }
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
        // $(".content-list").empty();
        var outerOne = $('<div class="content-answer content-answer-one"></div>');
        var outer = $('<div class="content-answer"></div>');
        var inner = '<!--回答的头部信息-->'+
            '<div class="content-answer-top">'+
            '<div class="content-answer-img"><img src="img/img_1.png"></div>'+
            '<div class="content-answer-name">Mary McCormick</div>'+
            '<div class="content-answer-level">Lv1</div>'+
            '<div class="content-answer-praise pointer">'+
            '<div class="content-praise-img"><img src="img/zan.png"></div>'+
            '<div class="content-praise-num">356</div>'+
            '</div>'+
            '</div>'+
            '<div class="content-answer-hr"></div>'+
            '<!--回答内容-->'+
            '<div class="content-answer-text">'+
            '这里是回复So strongly and metaphysically did I conceive of my situation then, '+
            'that while earnestly watching his motions, I seemed distinctly to perceive that my own individuality was now merged in a joint stock company of two;'+
            'that my free will had received a mortal wound; and that another mistake or misfortune might plunge innocent me into unmerited disaster and death.'+
            'Therefore, I saw that here was a sort of interregnum in Providence; for its even-handed equity never could have so gross an injustice. ' +
            'And yet still further pondering—while I jerked him now and then from between the whale and ship, which would threaten to jam him—still further pondering'+
            '</div>'+
            '<!--回答相关信息-->'+
            '<div class="content-answer-bottom">'+
            '<div class="content-answer-collect pointer">'+
            '<div class="content-collect-img"><img src="img/meishoucang.png"></div>'+
            '<div class="content-collect-text">收藏</div>'+
            '</div>'+
            '<div class="content-answer-share"><span>125</span>分享</div>'+
            '<div class="content-answer-time">发布于2018-06-05  12:30</div>'+
            '</div>';
        outerOne.append(inner);
        outer.append(inner);
        // $(".content-list").append(outerOne);
        // $(".content-list").append(outer);
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
            var left = $(".content").offset().left;
            $(".content-question-detail").css("width",width);
            $(".content-question-detail").css("position","fixed");
            $(".content-question-detail").css("top","-222px");
            $(".content-question-detail").css("left","0");
            $(".content-question-detail").css("background","#FBFBFB");
            $(".top-title").css("margin-left",left);
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
    $("body").on('click', '.writte',function(){
        $(".content-write").css("display","block");
        hideNoAnswer();
    });

    // 修改问题
    $("body").on('click', '#change-answer',function(){
        $(".content-write").css("display","block");
        hideNoAnswer();
    });

    // 取消回答
    $("#cancel").click(function () {
        $(".content-write").css("display","none");
        havaAnswer();
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
    var editor,editor1;
    KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
            id : 'mul_input',
            resizeType : 0,
            filterMode: true,//true时过滤HTML代码，false时允许输入任何代码。
            allowPreviewEmoticons : false,
            allowImageUpload : false,
            cssData: 'body{font-family: 微软雅黑;font-size: 14px;padding:30px;}',
            afterFocus : function(){//获得焦点 删除默认文字信息
                if(editor.html() == '<span style="color:#9B9B9B;">写回答……</span>'){
                    editor.html('');
                }
            },
            afterBlur: function(e){
                this.sync();
                if(editor.html() == '<br/>' || editor.html() == ''){
                    editor.html('<span style="color:#9B9B9B;">写回答……</span>');
                }
            },//失去焦点，同步信息数据
            items : [
                'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons']
        });
        editor1 = K.create('textarea[name="content1"]', {
            id : 'mul_input1',
            resizeType : 0,
            filterMode: false,//true时过滤HTML代码，false时允许输入任何代码。
            allowPreviewEmoticons : false,
            allowImageUpload : false,
            cssData: 'body{font-family: 微软雅黑;font-size: 14px;padding:30px;}',
            afterFocus : function(){//获得焦点 删除默认文字信息
                if(editor1.html() == '<span style="color:#9B9B9B;">写回答……</span>'){
                    editor1.html('');
                }
            },
            afterBlur: function(e){
                this.sync();
                if(editor1.html() == '<br/>' || editor1.html() == ''){
                    editor1.html('<span style="color:#9B9B9B;">写回答……</span>');
                }
            },//失去焦点，同步信息数据
            items : [
                'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons']
        });
    });

    // 修改提问
    $("#change-question").click(function () {
        var left = $(".content").offset().left;
        $(".content-question-inner").css("display", "block");
        $(".content-question-inner").css("left", left);
        $(".content-question-outer").css("display", "block");
        $(".question-title").focus();
    });

    // 取消提问
    $(".content-question-cancel").click(function () {
        $(".content-question-inner").css("display", "none");
        $(".content-question-outer").css("display", "none");
    });

    // 提交提问
    $("body").on('click', '.content-question-submit',function(){
        // 问题题目
        if ($(".question-title").val().length < 5){
            Toast("请添加问题标题！",1000);
            return;
        }
        // 问题描述
        var text = '<span style="color: #9B9B9B;">写回答……</span>';
        var words = $('#mul_input1').val().replace(/<[^>]+>/g,"");
        if (words.length < 5 || $('#mul_input1').val() == text){
            Toast("请添加问题描述！",1000);
            return;
        }
    });

    // 提交回答
    $("body").on('click', '.content-write-submit',function(){
        var text = '<span style="color: #9B9B9B;">写回答……</span>';
        var words = $('#mul_input').val().replace(/<[^>]+>/g,"");
        if (words.length < 10 || $('#mul_input').val() == text){
            Toast("回答不得少于10个字！",1000);
            return;
        }else {
            Toast("回答成功，积分+10！",1000);
        }

        var answer = '<div class="content-answer content-answer-one">'+
            '<!--回答的头部信息-->'+
            '<div class="content-answer-top">'+
            '<div class="content-answer-img"><img src="img/img_1.png"></div>'+
            '<div class="content-answer-name">Mary McCormick</div>'+
            '<div class="content-answer-level">Lv1</div>'+
            '<div class="content-answer-praise pointer">'+
            '<div class="content-praise-img"><img src="img/zan.png"></div>'+
            '<div class="content-praise-num">356</div>'+
            '</div>'+
            '</div>'+
            '<div class="content-answer-hr"></div>'+
            '<!--回答内容-->'+
            '<div class="content-answer-text">'+
            $('#mul_input').val()+
            '</div>'+
            '<!--回答相关信息-->'+
            '<div class="content-answer-bottom">'+
            '<div class="content-answer-collect pointer">'+
            '<div class="content-collect-img"><img src="img/meishoucang.png"></div>'+
            '<div class="content-collect-text">收藏</div>'+
            '</div>'+
            '<div class="content-answer-share"><span>125</span>分享</div>'+
            '<div class="content-answer-time">发布于2018-06-05  12:30</div>'+
            '</div>'+
            '</div>';
        $(".content-list").prepend(answer);
        $(".content-reply-num span").text(3);
        $("#cancel").click();
    });

    //自定义弹框
    function Toast(msg,duration){
        duration=isNaN(duration)?3000:duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText="width: 30%;min-width: 150px;opacity: 0.5;height: 100px;color: rgb(255, 255, 255);line-height: 100px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 35%;z-index: 999999;background: rgb(0, 0, 0);font-size: 18px;";
        document.body.appendChild(m);
        setTimeout(function() {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function() { document.body.removeChild(m) }, d * 1000);
        }, duration);
    }

    // 点赞
    $("body").on('click', '.content-answer-praise',function(){
        // 数字+1 刷新页面
        $(this).children(".content-praise-num").text(357);
    });

})