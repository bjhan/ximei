/**
 * Created by cdj-pci on 2018/7/14.
 */

$(function () {
    initDialog();
    var ue = UE.getEditor('container',{
        toolbars: [
            [
                'undo', //撤销
                'redo', //重做
                'bold', //加粗
                'indent', //首行缩进
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                'subscript', //下标
                'fontborder', //字符边框
                'superscript', //上标
                'formatmatch', //格式刷
                'pasteplain', //纯文本粘贴模式
                'selectall', //全选
                'preview', //预览
                'time', //时间
                'date', //日期
                'fontfamily', //字体
                'fontsize', //字号
                'paragraph', //段落格式
                'simpleupload', //单图上传
                'insertimage', //多图上传
                'emotion', //表情
                'spechars', //特殊字符
                'insertvideo', //视频
                'justifyleft', //居左对齐
                'justifyright', //居右对齐
                'justifycenter', //居中对齐
                'justifyjustify', //两端对齐
                'forecolor', //字体颜色
                'backcolor', //背景色
                'rowspacingtop', //段前距
                'rowspacingbottom', //段后距
                'pagebreak', //分页
                'attachment', //附件
                'background', //背景
                'scrawl', //涂鸦
                'music'//音乐

            ]
        ]
    });
})






var openDialog =function () {
    $("#fwbDialog").dialog('open');
}


var initDialog = function () {
    $("#fwbDialog").dialog({
        title: "编辑话题内容",
        modal: false,
        "z-index":2,
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