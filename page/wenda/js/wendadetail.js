$(function () {

    // havaAnswer();

    // 判断本问题是否是本人所提 加关注 添加修改


    // 判断回答中是否有本人回答

    // 判断是否有问答
    // function havaAnswer() {
    //     if ($("#reply-num").html() == 0){
    //         hideAnswerList();
    //         showNoAnswer();
    //     }else {
    //         showAnswerList();
    //         hideNoAnswer();
    //     }
    // }
    var id = getQueryString("id");
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    questionDetail(id);
    answerDetail(id);
    // 问题详情
    function questionDetail(id) {
        $.ajax({
            type: "get",
            url: CFG.interfaceurl + "/wd/question/Detail?id=" + id,
            dateType: "json",
            success: function (data) {
                if (data != null && data != undefined) {
                    $(".content-question-title").html(data.title);
                    $(".content-question-content").html(data.content);
                    $(".top-title").html(data.title);
                    $(".content-info-img img").attr("src", data.usericon);
                    $(".content-info-name").html(data.username);
                    $(".content-info-level").html("Lv " + data.userlevel);
                    $(".content-info-data").html(data.createTime);
                    if (data.isMyQuestion != true){
                        $("#change-question").addClass("hidden");
                    }
                }
            },
            error: function () {
                return;
            },
            async: true
        });
    }

    isconcern();

    // 回答详情
    function answerDetail(id) {
        $.ajax({
            type: "get",
            url: CFG.interfaceurl + "/wd/answer/list?questionId=" + id + "&offset=0&limit=10000",
            dateType: "json",
            success: function (data) {
                if (data != null && data != undefined) {
                    if (data.totalCount > 0){
                        hideNoAnswer();
                        $("#reply-num").html(data.totalCount);
                        showAnswerList(data.items);
                    }else {
                        hideAnswerList();
                        $(".content-list").empty();
                        showNoAnswer();
                    }
                }
                // $('#mul_input1').html($(".content-question-content").html());
            },
            error: function () {
                return;
            },
            async: false
        });
    }

    // 隐藏回答
    function hideAnswerList() {
        $(".content-reply-num").css("display", "none");
        $(".content-list").css("display", "none");
    }

    // 显示没有回答
    function showNoAnswer() {
        $(".content-no-answer").css("display", "block");
    }

    // 显示回答
    function showAnswerList(data) {
        $(".content-reply-num").css("display", "block");
        $(".content-list").css("display", "block");
        $(".content-list").empty();

        for (var i=0; i<data.length; i++){
            var outerOne = $('<div class="content-answer content-answer-one"></div>');
            var outer = $('<div class="content-answer"></div>');
            var inner = '<!--回答的头部信息-->'+
                '<div class="content-answer-top">'+
                '<div class="content-answer-img"><img src="'+ data[i].usericon +'" width="26px"></div>'+
                '<div class="content-answer-name">'+ data[i].username +'</div>'+
                '<div class="content-answer-level">Lv '+ data[i].userlevel +'</div>'+
                '<div class="content-answer-praise pointer" answerid="'+ data[i].id +'" prisestate="0">'+
                '<div class="content-praise-img"><img src="img/zan.png"></div>'+
                '<div class="content-praise-num">'+ data[i].prisecount +'</div>'+
                '</div>'+
                '</div>'+
                '<div class="content-answer-hr"></div>'+
                '<!--回答内容-->'+
                '<div class="content-answer-text">'+ data[i].content +
                '</div>'+
                '<!--回答相关信息-->'+
                '<div class="content-answer-bottom">'+
                '<div class="content-answer-collect pointer '+ (data[i].isCollect ? "active" : "") +'" answerid="'+ data[i].id +'">'+
                '<div class="content-collect-img"><img src="'+ (data[i].isCollect ? "img/collection.png" : "img/uncollection.png") +'"></div>'+
                '<div class="content-collect-text">收藏</div>'+
                '</div>'+
                '<div class="content-answer-share"><span>'+ data[i].sharecount +'</span> 分享</div>'+
                '<div class="content-change pointer '+ (data[i].isMyAnswer ? "" : "hidden") +'" id="change-answer">' +
                '<div class="content-change-text">修改</div>' +
                '<div class="content-change-img"><img src="img/xiugai.png"></div>' +
                '</div>'+
                '<div class="content-answer-time">发布于'+ data[i].createTime +'</div>'+
                '</div>';
            if (i == 0){
                outerOne.append(inner);
                $(".content-list").append(outerOne);
            }else {
                outer.append(inner);
                $(".content-list").append(outer);
            }
        }
    }

    // 隐藏没有回答
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

    // 判断问题是否关注
    function isconcern(){
        $.ajax({
            type: "get",
            url: CFG.interfaceurl + "/wd/question/isconcern?questionId=" + id,
            dateType: "json",
            success: function (data) {
                if (data.code == "success" && data.isConcern == true) {
                    $("#concern img").attr("src","img/yiguanzhu.png");
                    $("#concern").addClass("active");
                }else{
                    $("#concern img").attr("src","img/guanzhuwenti.png");
                    $("#concern").removeClass("active");
                }
            },
            error: function () {
                return;
            },
            async: false
        });
    }

    // 切换关注问题
    $("#concern").click(function () {
        if ($("#concern").hasClass("active")){
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/question/concern/cancel?id=" + id,
                dateType: "json",
                success: function (data) {
                    if (data.code == "success") {
                        $("#concern img").attr("src","img/guanzhuwenti.png");
                        $("#concern").removeClass("active");
                    }
                },
                error: function () {
                    return;
                },
                async: false
            });
        }else {
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/question/concern?id=" + id,
                dateType: "json",
                success: function (data) {
                    if (data.code == "success") {
                        $("#concern img").attr("src","img/yiguanzhu.png");
                        $("#concern").addClass("active");
                    }
                },
                error: function () {
                    return;
                },
                async: false
            });
        }
    });

    // 回答问题
    $("body").on('click', '.writte',function(){
        $(".content-write").css("display","block");
        $(".content-write").attr("state","0");
        hideNoAnswer();
        editor.html('<span style="color: #9B9B9B;">写回答……</span>');
    });

    // 修改回答
    $("body").on('click', '#change-answer',function(){
        $(".content-write").css("display","block");
        $(".content-write").attr("state","1");
        hideNoAnswer();
        var text = $(this).parent().prev().html();
        editor.html(text);
    });

    // 取消回答
    $("#cancel").click(function () {
        $(".content-write").css("display","none");
    });

    // 收藏
    $("body").on('click', '.content-answer-collect',function(){
        if ($(this).hasClass("active")){
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/answer/collect/cancel",
                dateType: "json",
                data: {
                    id:$(this).attr("answerid")
                },
                success: function (data) {
                    if (data.code == "success") {
                    }
                },
                error: function () {
                    return;
                },
                async: true
            });
            $(this).find("img").attr("src","img/uncollection.png");
            $(this).removeClass("active");
        }else {
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/answer/collect",
                dateType: "json",
                data: {
                    id:$(this).attr("answerid")
                },
                success: function (data) {
                    if (data.code == "success") {
                    }
                },
                error: function () {
                    return;
                },
                async: true
            });
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
                // if(editor.html() == '<span style="color:#9B9B9B;">写回答……</span>'){
                //     editor.html('');
                // }
            },
            afterBlur: function(e){
                this.sync();
                // if(editor.html() == '<br/>' || editor.html() == ''){
                //     editor.html('<span style="color:#9B9B9B;">写回答……</span>');
                // }
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
                // if(editor1.html() == '<span style="color:#9B9B9B;">写回答……</span>'){
                //     editor1.html('');
                // }
            },
            afterBlur: function(e){
                this.sync();
                // if(editor1.html() == '<br/>' || editor1.html() == ''){
                //     editor1.html('<span style="color:#9B9B9B;">写回答……</span>');
                // }
            },//失去焦点，同步信息数据
            items : [
                'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons']
        });
        // editor.sync();editor1.sync();
    });

    // 修改提问
    $("#change-question").click(function () {
        var left = $(".content").offset().left;
        $(".content-question-inner").css("display", "block");
        $(".content-question-inner").css("left", left);
        $(".content-question-outer").css("display", "block");
        $(".question-title").focus();
        $(".question-title").val($(".content-question-title").html());
        editor1.html($(".content-question-content").html());
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

        $.ajax({
            type: "post",
            url: CFG.interfaceurl + "/wd/question/update",
            dateType: "json",
            data: {
                id:id,
                title: $(".question-title").val(),
                content: $('#mul_input1').val()
            },
            success: function (data) {
                if (data.code == "success") {
                    questionDetail(id);
                    $(".content-question-cancel").click();
                }
            },
            error: function () {
                return;
            },
            async: true
        });
    });


    // 提交回答
    $("body").on('click', '.content-write-submit',function(){
        var text = '<span style="color: #9B9B9B;">写回答……</span>';
        var words = $('#mul_input').val().replace(/<[^>]+>/g,"");
        if (words.length < 10 || $('#mul_input').val() == text){
            Toast("回答不得少于10个字！",1000);
            return;
        }

        var content = $('#mul_input').val();

        if ($(".content-write").attr('state') == 0){
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/answer/create",
                dateType: "json",
                data: {
                    questionId:id,
                    content: content
                },
                success: function (data) {
                    if (data.code == "success") {
                        var outer = $('<div class="content-answer"></div>');
                        var inner = '<!--回答的头部信息-->'+
                            '<div class="content-answer-top">'+
                            '<div class="content-answer-img"><img src="" width="26px"></div>'+
                            '<div class="content-answer-name"></div>'+
                            '<div class="content-answer-level">Lv </div>'+
                            '<div class="content-answer-praise pointer" answerid="'+ data.id +'" prisestate="0">'+
                            '<div class="content-praise-img"><img src="img/zan.png"></div>'+
                            '<div class="content-praise-num">0</div>'+
                            '</div>'+
                            '</div>'+
                            '<div class="content-answer-hr"></div>'+
                            '<!--回答内容-->'+
                            '<div class="content-answer-text">'+ content +
                            '</div>'+
                            '<!--回答相关信息-->'+
                            '<div class="content-answer-bottom">'+
                            '<div class="content-answer-collect pointer" answerid="'+ data.id +'">'+
                            '<div class="content-collect-img"><img src="img/meishoucang.png"></div>'+
                            '<div class="content-collect-text">收藏</div>'+
                            '</div>'+
                            '<div class="content-answer-share"><span>0</span> 分享</div>'+
                            '<div class="content-change pointer" id="change-answer">' +
                            '<div class="content-change-text">修改</div>' +
                            '<div class="content-change-img"><img src="img/xiugai.png"></div>' +
                            '</div>'+
                            '<div class="content-answer-time">发布于</div>'+
                            '</div>';
                        outer.append(inner);
                        $(".content-answer-one").before(outer);
                        Toast("回答成功，积分+10！",1000);
                        $("#cancel").click();
                    }else {
                        Toast(data.message, 1000);
                    }
                },
                error: function () {
                    return;
                },
                async: true
            });
        }else{
            // 修改回答
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/answer/create",
                dateType: "json",
                data: {
                    questionId:id,
                    content: content
                },
                success: function (data) {
                    if (data.code == "success") {
                        Toast("修改成功！",1000);
                        $("#cancel").click();
                    }else {
                        Toast(data.message, 1000);
                    }
                },
                error: function () {
                    return;
                },
                async: true
            });
        }
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
        var num = $(this).children(".content-praise-num").text();
        var state = $(this).attr("prisestate");
        if (state == 0){
            $.ajax({
                type: "post",
                url: CFG.interfaceurl + "/wd/answer/prise",
                dateType: "json",
                data: {
                    id:$(this).attr("answerid")
                },
                success: function (data) {
                    if (data.code == "success") {
                        answerDetail(id);
                    }
                },
                error: function () {
                    return;
                },
                async: true
            });
            $(this).children(".content-praise-num").text(parseInt(num)+1);
            $(this).attr("prisestate","1");
        }else if (state == 1){
            Toast("一天只能点赞一次话题回答！",1000);
            return;
        }

    });

})