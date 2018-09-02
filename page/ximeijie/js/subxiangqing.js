$(function () {


    $('.range-slider').jRange({

        from: 2000,

        to: 800000,

        step: 1,

        scale: [2000, 800000],

        format: '%s',

        width: 120,

        showLabels: true,

        isRange: true

    });

    $(".postioncontchoose").click(function () {
        if ($(this).next().css('display') === "none") {
            document.getElementById("citycont").style.display = "block";
        } else {
            document.getElementById("citycont").style.display = "none";
        }
    });
    $("#chengshiquxiao").click(function () {
        if($("#citycont").find('input:checkbox:checked').length === 0){
            $("#chengshiduoshao").html('不限');

        }
        if ($(this).next().css('display') === "none") {
            document.getElementById("citycont").style.display = "block";
        } else {
            document.getElementById("citycont").style.display = "none";
        }
    });
    $(".housecontchoose").click(function () {
        if ($(this).next().css('display') === "none") {
            document.getElementById("housecont").style.display = "block";
        } else {
            document.getElementById("housecont").style.display = "none";
        }
    });
    $("#jiudianquxiao").click(function () {
        if($("#housecont").find('input:checkbox:checked').length === 0){
            $("#housecontchooseduoshao").html('不限');

        }
        if ($(this).next().css('display') === "none") {
            document.getElementById("housecont").style.display = "block";
        } else {
            document.getElementById("housecont").style.display = "none";
        }
    });
    $(".sheshicontchoose").click(function () {
        if ($(this).next().css('display') === "none") {
            document.getElementById("sheshicont").style.display = "block";
        } else {
            document.getElementById("sheshicont").style.display = "none";
        }
    });
    $("#sheshiquxiao").click(function () {
        if($("#sheshicont").find('input:checkbox:checked').length === 0){
            $("#sheshicontduoshao").html('不限');

        }
        if ($(this).next().css('display') === "none") {
            document.getElementById("sheshicont").style.display = "block";
        } else {
            document.getElementById("sheshicont").style.display = "none";
        }
    });
    $(".servicecontchoose").click(function () {
        if ($(this).next().css('display') === "none") {
            document.getElementById("servercont").style.display = "block";
        } else {
            document.getElementById("servercont").style.display = "none";
        }
    });
    $("#fuwuquxiao").click(function () {
        if($("#servercont").find('input:checkbox:checked').length === 0){
            $("#servercontduoshao").html('不限');

        }
        if ($(this).next().css('display') === "none") {
            document.getElementById("servercont").style.display = "block";
        } else {
            document.getElementById("servercont").style.display = "none";
        }
    });


    $(".surebtn").click(function () {//点击确定查询
        var price = $(".range-slider").val();
        price = price.replace(',','-');
        var chengshi='';
        if($("#citycont").find('input:checkbox:checked').length === 0){
            $("#chengshiduoshao").html('不限');
        }else {
            $("#citycont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                chengshi = chengshi+$(this).val()+',';
                $("#chengshiduoshao").html('已选'+$("#citycont").find('input:checkbox:checked').length+'项');
            });
        }

        chengshi = chengshi.substring(0,chengshi.length-1);
        $("#citycont").hide();
        var fangzi=''
        if($("#housecont").find('input:checkbox:checked').length === 0){
            $("#housecontchooseduoshao").html('不限');
        }else{
            $("#housecont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                fangzi = fangzi+$(this).val()+',';
                $("#housecontchooseduoshao").html('已选'+$("#housecont").find('input:checkbox:checked').length+'项');
            });
        }
        fangzi = fangzi.substring(0,fangzi.length-1);
        $("#housecont").hide();


        var zhusu='';
        if($("#sheshicont").find('input:checkbox:checked').length === 0){
            $("#sheshicontduoshao").html('不限');
        }else{
            $("#sheshicont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                zhusu = zhusu+$(this).val()+',';
                $("#sheshicontduoshao").html('已选'+$("#sheshicont").find('input:checkbox:checked').length+'项');
            });
        }
        zhusu = zhusu.substring(0,zhusu.length-1);
        $("#sheshicont").hide();


        var fuwu='';
        if($("#servercont").find('input:checkbox:checked').length === 0){
            $("#servercontduoshao").html('不限');
        }else{
            $("#servercont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                fuwu = fuwu+$(this).val()+',';
                $("#servercontduoshao").html('已选'+$("#servercont").find('input:checkbox:checked').length+'项');
            });
        }
        fuwu = fuwu.substring(0,zhusu.length-1);
        $("#servercont").hide();
        chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,0);
    });
    $(".surebtn2").click(function () {//点击确定查询
        var price = $(".range-slider").val();
        price = price.replace(',','-');
        var chengshi='';
        if($("#citycont").find('input:checkbox:checked').length === 0){
            $("#chengshiduoshao").html('不限');
        }else {
            $("#citycont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                chengshi = chengshi+$(this).val()+',';
                $("#chengshiduoshao").html('已选'+$("#citycont").find('input:checkbox:checked').length+'项');
            });
        }

        chengshi = chengshi.substring(0,chengshi.length-1);
        $("#citycont").hide();
        var fangzi=''
        if($("#housecont").find('input:checkbox:checked').length === 0){
            $("#housecontchooseduoshao").html('不限');
        }else{
            $("#housecont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                fangzi = fangzi+$(this).val()+',';
                $("#housecontchooseduoshao").html('已选'+$("#housecont").find('input:checkbox:checked').length+'项');
            });
        }
        fangzi = fangzi.substring(0,fangzi.length-1);
        $("#housecont").hide();


        var zhusu='';
        if($("#sheshicont").find('input:checkbox:checked').length === 0){
            $("#sheshicontduoshao").html('不限');
        }else{
            $("#sheshicont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                zhusu = zhusu+$(this).val()+',';
                $("#sheshicontduoshao").html('已选'+$("#sheshicont").find('input:checkbox:checked').length+'项');
            });
        }
        zhusu = zhusu.substring(0,zhusu.length-1);
        $("#sheshicont").hide();


        var fuwu='';
        if($("#servercont").find('input:checkbox:checked').length === 0){
            $("#servercontduoshao").html('不限');
        }else{
            $("#servercont").find('input:checkbox:checked').each(function (i) {//把所有被选中的复选框的值存入数组
                fuwu = fuwu+$(this).val()+',';
                $("#servercontduoshao").html('已选'+$("#servercont").find('input:checkbox:checked').length+'项');
            });
        }
        fuwu = fuwu.substring(0,fuwu.length-1);
        $("#servercont").hide();
        chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,0);

    });
    function chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,num) {
        console.log(CFG.interfaceurl + '/xmj/YZZX/query?price='+price+'&location='+chengshi+'&type='+fangzi+'&facility='+zhusu+'&service='+fuwu+'&sortBy=price&pageNo='+num+'&pageSize=10&order=desc');
        $.ajax({
            url: CFG.interfaceurl + '/xmj/YZZX/query?price='+price+'&location='+chengshi+'&type='+fangzi+'&facility='+zhusu+'&service='+fuwu+'&sortBy=price&pageNo='+num+'&pageSize=10&order=desc',
            type: "get",
            timeout: 5000,
            success: function (data) {
                console.log(data);
                $("#pagenumtotal").html(data.totalCount);
                for (var i = 0; i < (data.items).length; i++) {
                    $("#xianshiqu").find('.msgdetailm').remove();
                    addyuezi(data.items[i]);
                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }
    chaxunquanbu();
    function chaxunquanbu() {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/yzzx/all/list?pageNo=0&pageSize=10',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#pagenumtotal").html(data.totalCount);
                for (var i = 0; i < (data.items).length; i++) {

                    addyuezi(data.items[i]);

                }
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function addyuezi(data) {
        var xingxing = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= data.star) {
                xingxing = xingxing + '<div class="zixing"></div>'
            } else {
                xingxing = xingxing + '<div class="anxing"></div>'
            }
        }
        var str = '<div class="msgdetailm" id="' + data.id + '">'
            + '<div class="msgdetailpic" style="background-image: url(' + data.imageUrl + ');"></div>'
            + '<div class="msgdetailmtitlecont">'
            + '<div class="msgdetailmtitle"><span>' + data.name + '</span><div class="meishoucang"></div> </div>'
            + '<div class="msgdetailmtitle3"><div class="weizhiicon"></div><span class="zuobiao">' + data.address + '</span></div>'
            + '<div class="msgdetailmtitle4">套餐最低价格：' + data.minPrice + '</div>'
            + '<div class="msgdetailmtitle5">' + xingxing
            + '</div>'
            + '</div>'
            + '</div>';
        $("#yuezikongbai").before(str);
    }

});