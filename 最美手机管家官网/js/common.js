$(function(){
    

	 var btn = true;
    $(".nav_but_box").click(function() {
        $(this).parent().toggleClass("phone_nav_one")
        $("body").toggleClass('hided');
        if (btn) {
            $(".phone_nav .nav_but").css("background", "none");
            btn = false;
        } else {
            $(".phone_nav .nav_but").css("background", "#999");
            btn = true;
        }
    }) //手机导航
    $(".nav_main b").click(function() {
        $(this).parent().toggleClass("b_one")
            .siblings().removeClass("b_one");
    }) 


	$(".btn-wx").mouseenter(function(){
		$(this).find(".pic").fadeIn("fast");
	});

    $(".btn-wx").mouseleave(function(){
		$(this).find(".pic").fadeOut("fast");
	});

     $(".btn-top").click(function(){
      $("html, body").animate({
        "scroll-top":0
      },"fast");
    });

     

	var lastRmenuStatus=false;
	$(window).scroll(function(){//bug
		var _top=$(window).scrollTop();
		if(_top>200){
			$(".right_side").data("expanded",true);
		}else{
			$(".right_side").data("expanded",false);
		}
		if($(".right_side").data("expanded")!=lastRmenuStatus){
			lastRmenuStatus=$(".right_side").data("expanded");
			if(lastRmenuStatus){
				$(".right_side .btn-top").slideDown();
			}else{
				$(".right_side .btn-top").slideUp();
			}
		}
	});

     // 返回顶部
	  $(".totop").click(function(){
		      $("html, body").animate({
		        "scroll-top":0
		      },"fast");
		    });



})
