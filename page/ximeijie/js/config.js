/**
 * Created by Administrator on 2018-07-04.
 */
var CFG = (function () {
    var pathname = window.location.href;
    var sharePath = pathname.substr(0, pathname.lastIndexOf('/') + 1);
    var cfg = {
        interfaceurl: 'http://47.98.119.215:80/web/api/v1',
        shareImg: sharePath,
        shareSummary: '',
        desc: {

        }

    };
    return cfg;
})();
