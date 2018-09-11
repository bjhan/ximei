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
    var jiazaiyeshu=0;
    if (isIE) {
        safariVersion = ua.match(/msie ([\d.]+)/)[1];
    }

    //获取url中的参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }

    jiazaixianshi(0,10);
    function jiazaixianshi(pagenum,pagesize) {
        var id = getUrlParam('id');
        if(pagenum == 0){
            jiazaiyeshu = 0;
            $(".shangpincont .shangpindetailcont").remove();
        }
        $.ajax({
            url: CFG.interfaceurl + '/xmj/zjbl/all/list?pageNo='+pagenum+'&pageSize='+pagesize,
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#titlename").html(data.name);
                $("#dadename").html(data.name);
                $(".pinglunzhongxinmingcheng").html(data.name);
                $("#yignwenming").html(data.engName);
                $(".xiangqingmapaddr").html(data.address);
                $(".taocanyonghushuliang").html(data.replyCount);

                for (var j = 0; j < (data.items).length; j++) {
                    tianjiashangpin(data.items[j]);
                }
                dianji();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    fenleixuanze();
    function fenleixuanze() {


        $(".bibu").click(function () {

                jiazaixianshi((++jiazaiyeshu)*10,10);

        });
    }
    function dianji() {
        $(".shangpindetailcont").click(function () {
                var pathname = window.location.href;
                var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);
            window.location.href = path+'banzhengxiangqing.html?id='+$(this).attr("detailid");
        });
    }
    function tianjiashangpin(data) {
        var str = ' <div class="shangpindetailcont" detailid="' + data.id + '">'
            + '<img src="' + data.imageUrl + '" class="shangpindetailcontpic">'
            + '<div class="shaopname">' + data.name + '</div>'
            + '</div>';
        $(".bibu").before(str);
    }




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
