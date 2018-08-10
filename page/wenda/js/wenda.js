$(function () {
    showHotQuestion();

    // 行数限制插件
    clamp();
    function clamp() {
        var titles = document.getElementsByClassName("p-title");
        var answers = document.getElementsByClassName("p-answer");
        for (var i = 0; i < titles.length; i++){
            $clamp(titles[i], {clamp: 3});
            $clamp(answers[i], {clamp: 3});
        }
    }

    // 滚动监听
    var valTop = $(".content-top").offset().top;
    $(window).scroll(function(){
        var winPos = $(window).scrollTop();
        if (winPos >= valTop){
            var width = $(window).width()+1;
            var left = $(".content-column").offset().left;
            if (left == 0){
                left = $(".content-question-search").offset().left;
            }
            $(".to-top").css("width",width);
            $(".to-top").css("position","fixed");
            $(".to-top").css("top","0");
            $(".to-top").css("left","0");
            $(".to-top").css("margin-top","0");
            $(".to-top").css("background","#FBFBFB");
            $(".content-top-top").css("margin-left",left);
            $(".content-top-bottom").css("margin-left",left);
            $(".content").css("margin-top","283px");

        }else {
            $(".to-top").css("width","1200px");
            $(".to-top").css("position","static");
            $(".to-top").css("top","0");
            $(".to-top").css("left","0");
            $(".to-top").css("margin-top","66");
            $(".to-top").css("background","rgba(241,241,241,0.3)");
            $(".content-top-top").css("margin-left","68px");
            $(".content-top-bottom").css("margin-left","68px");
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
                this.sync();
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
        // 切换样式
        var id = this.id;
        $(".content-column-title").css("background", "");
        $(".content-column-title a").css("color", "#000");
        $(this).css("background", "#A978D6");
        $("#" + id + " a").css("color", "#fff");

        // 切换内容
        var num = $(this).attr("num");
        // 热门问题
        if (num == 0){
            showHotQuestion();
            clamp();
        }else if (num == 1){
        // 最新问题
            showNewQuestion();
            clamp();
        }else if (num == 2){
        // 我的提问
            showMyQuestion();
            clamp();
        }else if (num == 3){
        // 我的回答
            showMyAnswer();
            clamp();
        }

    });

    // 展示热门问题或最新问题
    function showQuestionKuai() {
        var outerone = $('<div class="content-hot content-hot-first"></div>');
        var outer = $('<div class="content-hot"></div>');
        var inner = '<!--题目-->'+
            '<div class="content-hot-title pointer"><a href="wendadetail.html?id=1">'+
            '<p class="p-title pointer">'+
            'adsfafasdf asdf dsa fsdf sdar热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题'+
            '热门问题热门问题热门问题热门问aaa题热门问题热门问题热门问题热门问题热门问题热门问题热门g 问题热门问题热门问题热门问题热门问题热门问题热门问题热门问题'+
            '</p></a>'+
            '</div>'+
            '<!--用户信息-->'+
            '<div class="content-hot-info pointer">'+
            '<div class="content-hot-img"><img src="img/img_1.png"></div>'+
            '<div class="content-hot-username">Mary McCormick</div>'+
            '<div class="content-hot-level">Lv1</div>'+
            '</div>'+
            '<!--回答-->'+
            '<div class="content-hot-answer pointer"><a href="wendadetail.html?id=1">'+
            '<p class="p-answer pointer">'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，这里是回答，'+
            '</p></a>'+
            '<!--点赞-->'+
            '<div class="content-hot-praise pointer">'+
            '<div class="content-hot-praiseimg"><img src="img/zan.png"></div>'+
            '<div class="content-hot-praisenum">356</div>'+
            '</div>'+
            '<div class="content-hot-about">'+
            '<!--回复-->'+
            '<div class="content-hot-replyimg"><img src="img/reply.png"></div>'+
            '<div class="content-hot-reply">共<span>xxxx</span>条回复</div>'+
            '<!--收藏-->'+
            '<div class="pointer collect" style="float: left;">'+
            '<div class="content-hot-collectionimg"><img src="img/uncollection.png"></div>'+
            '<div class="content-hot-collection">收藏</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        var more = '<div class="content-bottom-more pointer">查看更多</div>';
        outerone.append(inner);
        outer.append(inner);
        outer.append(more);
        $("#content-list").append(outerone);
        $("#content-list").append(outer);
    }

    // 展示我的提问或我的回答
    function showQuestionTiao() {
        var outerone = $('<div class="content-search-list content-search-listfirst"></div>');
        var outer = $('<div class="content-search-list"></div>');
        var inner = '<div>'+
            '<div class="content-list-point"></div>'+
            '<div class="content-list-title"><a href="wendadetail.html?id=1">'+
            '<p class="p-title pointer">'+
            '这里是热门问题的问题，这里是人们问题的问题？这里是热门问题的问题，这里是人们问题的问题？'+
            '这里是热门问题的问题，这里是人们问题的问题？这里是热门问题的问题，这里是人们问题的问题？'+
            '</p></a>'+
            '</div>'+
            '</div>'+
            '<div class="content-list-bottom">'+
            '<div class="content-list-focus"><span class="content-list-focusnum">15</span>个关注</div>'+
            '<div class="content-list-answer"><span class="content-list-answernum">13</span>个回答</div>'+
            '<div class="content-list-time">2018-06-05</div>'+
            '</div>';
        outerone.append(inner);
        outer.append(inner);
        $("#content-list").append(outerone);
        $("#content-list").append(outer);
    }

    // 热门问题
    function showHotQuestion() {
        $("#content-list").empty();
        showQuestionKuai();
    }

    // 最新问题
    function showNewQuestion() {
        $("#content-list").empty();
        showQuestionKuai();
    }

    // 我的提问
    function showMyQuestion() {
        $("#content-list").empty();
        if (false){
            var content = '<div class="div-no-question">还没有提问，<span class="askquestions pointer">提问</span>第一个问题吧！</div>';
            $("#content-list").append(content);
        }else {
            showQuestionTiao();
        }
    }

    // 我的回答
    function showMyAnswer() {
        $("#content-list").empty();
        if (true){
            var content = '<div class="div-no-question">还没有回答，看看<span class="to-hot-question pointer">为你推荐的问题</span></div>';
            $("#content-list").append(content);
        }else {
            showQuestionTiao();
        }
    }

    // 点击推荐问题
    $("body").on('click', '.to-hot-question',function(){
        $(".content-column-title[num$='0']") .click();
    });

    // 点击提问
    $("body").on('click', '.askquestions',function(){
        var left = $(".content-column").offset().left;
        $(".content-question-inner").css("display", "block");
        $(".content-question-inner").css("left", left);
        $(".content-question-outer").css("display", "block");
        $(".content-question-title").focus();
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

    // 点赞
    $("body").on('click', '.content-hot-praise',function(){
        $(this).children(".content-hot-praisenum").text(357);
    });

    // 提交提问
    $(".content-question-submit").click(function () {
        // 问题题目
        if ($(".content-question-title").val().length < 5){
            Toast("请添加问题标题！",1000);
            return;
        }
        // 问题描述
        var text = '<span style="color: #9B9B9B;">写回答……</span>';
        var words = $('#mul_input').val().replace(/<[^>]+>/g,"");
        if (words.length < 5 || $('#mul_input').val() == text){
            Toast("请添加问题描述！",1000);
            return;
        }
        $(location).attr('href', 'wendadetail.html?id=1');

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

})