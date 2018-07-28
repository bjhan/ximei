$(function(){


    $('.range-slider').jRange({

        from: 2000,

        to: 800000,

        step: 1,

        scale: [2000,800000],

        format: '%s',

        width: 120,

        showLabels: true,

        isRange : true

    });

    $(".postioncontchoose").click(function(){
        if($(this).next().css('display')==="none"){
            document.getElementById("citycont").style.display="block";
        }else {
            document.getElementById("citycont").style.display="none";
        }
    });
    $(".housecontchoose").click(function(){
        if($(this).next().css('display')==="none"){
            document.getElementById("housecont").style.display="block";
        }else {
            document.getElementById("housecont").style.display="none";
        }
    });
    $(".sheshicontchoose").click(function(){
        if($(this).next().css('display')==="none"){
            document.getElementById("sheshicont").style.display="block";
        }else {
            document.getElementById("sheshicont").style.display="none";
        }
    });
    $(".servicecontchoose").click(function(){
        if($(this).next().css('display')==="none"){
            document.getElementById("servercont").style.display="block";
        }else {
            document.getElementById("servercont").style.display="none";
        }
    });

});