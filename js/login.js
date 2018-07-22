/**
 * Created by Administrator on 2018-07-19.
 */
/**
 * Created by Administrator on 2018-07-04.
 */

(function () {

    $(".firstvideo").on("click", function () {
    });
    $.idcode.setCode();
    $("#findpowBtn").click(function (){
        var IsBy = $.idcode.validateCode();
        alert(IsBy);
        console.log(IsBy);
    });
})();
