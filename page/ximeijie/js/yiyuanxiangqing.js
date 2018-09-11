$(function () {


    $('.range-slider').jRange({

        from: 0,

        to: 800000,

        step: 1,

        scale: [0, 800000],

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
    function shangxiayefun(total) {
        $(".lastpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num>1){
                chaxun(num-2);
            }

        });
        $(".nestpagebtn").click(function () {
            var num = $(".numchoose").find("div").html();
            if(num<total){
                chaxun(num);
            }

        });
    }
    function zhengchangnum(num) {
        var pagestr =' <div class="numchooseno">'
            +'<div class="numchoosenum">'+num+'</div>'
            +'</div>';
        return pagestr;
    }
    function zhengchangnum2(num) {
        var pagestr =' <div class="numchooseno numchoose">'
            +'<div class="numchoosenum">'+num+'</div>'
            +'</div>';
        return pagestr;
    }
    function fenye(nowNum,total,pagesize) {
        nowNum =parseInt(nowNum);
        total=Math.ceil(total/pagesize);
        $("#fenyecont").empty();
        if(total<pagesize){
            pagesize=total;
        }
        for(var i=0;i<pagesize;i++){
            if(nowNum === i){
                $("#fenyecont").append(zhengchangnum2(i+1));
            }else {
                $("#fenyecont").append(zhengchangnum(i+1));
            }
        }
        $(".numchooseno").click(function () {
            var num = $(this).find("div").html();
            chaxun(num-1);
        })
    }

    function chaxun(pagenum) {
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

        ///分页查询
        var zonghepaixu = $("#zonghepaixu").attr("dianji");
        var pingfensort = $("#pingfensort").attr("dianji");
        if(zonghepaixu == '1'){
            chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,pagenum);
        }
        if(pingfensort == '1'){
            chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,pagenum,1,0);
        }

    }
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
        chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,0);

    });

    function chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,num,sort,sortBy) {
        var desc='';

        var dianji2 = $("#pingfensort").attr("dianji");//医生
        var dianji1 = $("#zonghepaixu").attr("dianji");//医院

        if(dianji1 == '1'){
            $.ajax({
                url: CFG.interfaceurl + '/xmj/YY/query?price='+price+'&location='+chengshi+'&type='+fangzi+'&facility='+zhusu+'&service='+fuwu+'&pageNo='+num+'&pageSize=12',
                type: "get",
                timeout: 5000,
                success: function (data) {
                    $("#xianshiqu .msgdetailm").remove();
                    $("#pagenumtotal").html(data.totalCount);
                    shangxiayefun(data.totalCount);
                    if (data.totalCount >= 4) {
                        $("#fenye1").show();
                        $("#fenye2").show();
                        $("#fenye3").show();
                        $("#fenye4").show();
                    } else {
                        for (var j = 0; j < data.totalCount; j++) {
                            $("#fenye" + (j + 1)).show();
                        }
                    }
                    fenye(num,data.totalCount,5);
                    $("#xianshiqu").find('.msgdetailm').remove();
                    if((data.items).length>0){
                        $(".youneirong").hide();
                        $(".nestpagecont").show();
                        for (var i = 0; i < (data.items).length; i++) {
                            addyuezi(data.items[i]);
                        }
                        tiaozhuanxiangqing();
                    }else {
                        $(".youneirong").show();
                        $(".nestpagecont").hide();
                    }

                },
                error: function (data) {
                    //alert("请求错误");
                }
            });
        }
        if(dianji2 == '1'){
            $.ajax({
                url: CFG.interfaceurl + '/xmj/YS/query?price='+price+'&location='+chengshi+'&type='+fangzi+'&facility='+zhusu+'&service='+fuwu+'&pageNo='+num+'&pageSize=12',
                type: "get",
                timeout: 5000,
                success: function (data) {
                    console.log(data);
                    $("#xianshiqu .msgdetailm").remove();
                    $("#pagenumtotal").html(data.totalCount);
                    shangxiayefun(data.totalCount);
                    if (data.totalCount >= 4) {
                        $("#fenye1").show();
                        $("#fenye2").show();
                        $("#fenye3").show();
                        $("#fenye4").show();
                    } else {
                        for (var j = 0; j < data.totalCount; j++) {
                            $("#fenye" + (j + 1)).show();
                        }
                    }
                    fenye(num,data.totalCount,5);
                    $("#xianshiqu").find('.msgdetailm').remove();
                    if((data.items).length>0){
                        $(".youneirong").hide();
                        $(".nestpagecont").show();
                        for (var i = 0; i < (data.items).length; i++) {
                            addyuezi2(data.items[i]);
                        }
                        tiaozhuanxiangqing();
                    }else {
                        $(".youneirong").show();
                        $(".nestpagecont").hide();
                    }

                },
                error: function (data) {
                    //alert("请求错误");
                }
            });
        }

    }
    $(".zonghepaixu").click(function () {
        $("#zonghepaixu").css("color","#A978D6");
        $("#zonghepaixu").attr("dianji",1);
        $("#pingfensort").attr("dianji",0);
        $("#zonghepaixu").css("color","#9B9B9B");
        $("#pingfensort").css("color","#9B9B9B");
        $(this).css("color","#A978D6");
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
        var fangzi='';
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
        chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,0);
    });
    $("#pingfensort").click(function () {
        var sort = $(this).attr("sort");
        $("#zonghepaixu").attr("dianji",0);
        $("#pingfensort").attr("dianji",1);
        $("#zonghepaixu").css("color","#9B9B9B");
        $("#pingfensort").css("color","#9B9B9B");
        $(this).css("color","#A978D6");
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
        var fangzi='';
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

        var fuwu = '';
            $(this).attr("sort",0);
            chaxuntiaojian(price,chengshi,fangzi,zhusu,fuwu,0,0,0);

    });

    chaxunquanbu(0);
    function chaxunquanbu(pagenum) {
        $.ajax({
            url: CFG.interfaceurl + '/xmj/yy/all/list?pageNo='+pagenum+'&pageSize=12',
            type: "get",
            timeout: 5000,
            success: function (data) {
                $("#xianshiqu .msgdetailm").remove();
                $("#pagenumtotal").html(data.totalCount);
                shangxiayefun(data.totalCount);
                if (data.totalCount >= 4) {
                    $("#fenye1").show();
                    $("#fenye2").show();
                    $("#fenye3").show();
                    $("#fenye4").show();
                } else {
                    for (var j = 0; j < data.totalCount; j++) {
                        $("#fenye" + (j + 1)).show();
                    }
                }
                fenye(pagenum,data.totalCount,5);
                for (var i = 0; i < (data.items).length; i++) {
                    addyuezi(data.items[i]);
                }
                tiaozhuanxiangqing();
            },
            error: function (data) {
                //alert("请求错误");
            }
        });
    }

    function tiaozhuanxiangqing() {
        // $(".msgdetailm").click(function () {
        //     var pathname = window.location.href;
        //     var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
        //     window.open(path+'yuezipinglun.html?id='+$(this).attr("detailid"));
        // });
        $(".yishengtiaozhuan").click(function () {
            var pathname = window.location.href;
            var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);
            window.location.href = path+'yishengpinglun.html?id='+$(this).attr("detailid");
            // window.open(path+'yishengpinglun.html?id='+$(this).attr("detailid"));
        });
        $(".yiyuantiaozhuan").click(function () {
            var pathname = window.location.href;
            var path = pathname.substr(0, pathname.lastIndexOf('/') + 1);;
            window.location.href = path+'yiyuanpinglun.html?id='+$(this).attr("detailid");
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
        var str = '<div class="msgdetailm yiyuantiaozhuan" detailid="' + data.id + '">'
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
    function addyuezi2(data) {
        var xingxing = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= data.star) {
                xingxing = xingxing + '<div class="zixing"></div>'
            } else {
                xingxing = xingxing + '<div class="anxing"></div>'
            }
        }
        var str = '<div class="msgdetailm yishengtiaozhuan" detailid="' + data.id + '">'
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