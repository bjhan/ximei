/**
 * Created by cdj-pci on 2018/7/14.
 */

$(function () {
    initDialog();
    //富文本编辑器简单模式初始化
    var editor;
    KindEditor.ready(function (K) {
        editor = K.create('textarea[name="content"]', {
            resizeType: 0,
            filterMode: false,//true时过滤HTML代码，false时允许输入任何代码。
            allowPreviewEmoticons: false,
            allowImageUpload: false,
            cssData: 'body{font-family: 微软雅黑;font-size: 14px;padding:30px;}',
            afterFocus: function () {//获得焦点 删除默认文字信息
                if (editor.html() == '<span style="color:#9B9B9B;">写回答……</span>') {
                    editor.html('');
                }
            },
            afterBlur: function (e) {
                this.sync();
                // console.log(editor.html());
                if (editor.html() == '<br/>' || editor.html() == '') {
                    editor.html('<span style="color:#9B9B9B;">写回答……</span>');
                }
            },//失去焦点，同步信息数据
            items: [
                'bold', 'italic', 'insertunorderedlist', 'image', 'media', 'link', 'emoticons']
        });
    });
})


var openDialog = function () {
    $("#fwbDialog").dialog('open');
}


var initDialog = function () {
    $("#fwbDialog").dialog({
        title: "编辑话题内容",
        modal: false,
        "z-index": 2,
        autoOpen: false,
        width: 800,
        height: 500,
        open: function () {
            detailtable.fnDraw();
        },
        close: function () {

        },
        buttons: {
            "关闭": function () {
                $(this).dialog("close");
            }
        }


    })
}