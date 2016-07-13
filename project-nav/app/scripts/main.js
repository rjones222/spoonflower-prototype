// Navigation
$(document).ready(function() {
    $("#navToggle a").click(function(e){
        e.preventDefault();

        $(".h_bar > nav").slideToggle("medium");
        $("#logo").toggleClass("is-collapsed is-expanded");
    });

    $(window).resize(function() {
        if($( window ).width() >= "600") {
            $(".h_bar > nav").css("display", "block");

            if($(".h_bar-container").attr('class') == "is-expanded") {
                $(".h_bar-container").toggleClass("is-collapsed is-expanded");
            }
          $(".h_bar > nav > ul > li > a").siblings().removeAttr("style")
        }
        else {
            $(".h_bar > nav").css("display", "none");
        }
    });

    $(".h_bar > nav > ul > li > a").click(function(e) {
        if($( window ).width() <= "600") {
            if($(this).siblings().size() > 0 ) {
                $(this).siblings().slideToggle("fast")
				$(this).children(".toggle").html($(this).children(".toggle").html() == 'close' ? 'expand' : 'close');
            }
        }
    });
});
