/**
 * Created by cdj-pci on 2018/8/19.
 */


$(function () {
    $("#sections").append("<div class='section' id='section1' style=\"background-image:url('https://ximeiimg.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5/banner/banner3.jpg');background-repeat: no-repeat;background-size: 100% 100%;\"></div>")
    $("#sections").append("<div class='section' id='section2' style=\"background-image:url('https://ximeiimg.oss-cn-beijing.aliyuncs.com/%E9%A6%96%E9%A1%B5/banner/banner3.jpg');background-repeat: no-repeat;background-size: 100% 100%;\"></div>")

    $("#container").PageSwitch({
        direction:'horizontal',
        easing:'ease-in',
        duration:1000,
        autoPlay:true,
        loop:'false'
    });
})