/**
 * Created by Administrator on 2018-07-10.
 */
(function () {
    var DOC = document;
    var body = DOC.body;

    //定义百度统计按钮点击次数的函数
    function Baidu(category, evnet) {
        !evnet && (evnet = '点击');
        try {
            _hmt.push(['_trackEvent', category , evnet]);
        } catch (e) {
            console.log(e);
        }
    }

})();