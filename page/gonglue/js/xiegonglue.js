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
    var bannernum=0;//banner数量
    var iebanben=-1;
    var DEFAULT_VERSION = 8.0;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion;
    if(isIE){
        safariVersion =  ua.match(/msie ([\d.]+)/)[1];
    }
    if(safariVersion <= DEFAULT_VERSION ){
        // alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请更换或升级浏览器访问！')
    }else {

    }

    iebanben = IEVersion();
    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7) {
                return 7;
            } else if(fIEVersion == 8) {
                return 8;
            } else if(fIEVersion == 9) {
                return 9;
            } else if(fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if(isEdge) {
            return 'edge';//edge
        } else if(isIE11) {
            return 11; //IE11
        }else{
            return -1;//不是ie浏览器
        }
    }

    //富文本编辑器简单模式初始化
    var editor;
    KindEditor.ready(function(K) {
        editor = K.create('textarea[name="content"]', {
            id : 'mul_input',
            resizeType : 0,
            filterMode: true,//true时过滤HTML代码，false时允许输入任何代码。
            allowPreviewEmoticons : false,
            allowImageUpload: true, //上传图片框本地上传的功能，false为隐藏，默认为true
            allowImageRemote : true, //上传图片框网络图片的功能，false为隐藏，默认为true
            allowFileManager : true,//允许上传文件和图片
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
    });

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category, evnet]);
        } catch (e) {
            console.log(e);
        }
    }

})();
