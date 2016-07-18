// Navigation
var Navigation = {

  init: function() {
    Navigation.navToggle();
    Navigation.viewportResize();
    Navigation.subnavToggle();
    Navigation.loggedIn();
    Navigation.showDefinition();
  },

  navToggle: function() {
    $('#navToggle a').click(function(e){
      e.preventDefault();
      $('.h_bar > nav').slideToggle('medium');
      $('#hBar').toggleClass('is-collapsed is-expanded');
      $('#navToggle i').toggleClass('icon_close icon_menu');
    });
  },

  viewportResize: function() {
    $(window).resize(function() {
      if($( window ).width() >= '600') {
        $('.h_bar > nav').css('display', 'block');
        if($('#hBar').hasClass('is-expanded')){
          $('.h_bar-container').toggleClass('is-expanded is-collapsed');
  				$('#navToggle i').toggleClass('icon_menu icon_close');
        }
        $('.h_bar > nav > ul > li > a').siblings().removeAttr('style')
      }
      else {
        $('.h_bar > nav').css('display', 'none');
      }
    });
  },

  subnavToggle: function() {
    $('.h_bar > nav > ul > li > a').click(function(e) {
      if($( window ).width() <= '600') {
        if($(this).siblings().size() > 0 ) {
          $(this).siblings().slideToggle('fast')
  				$(this).children('.toggle').html($(this).children('.toggle').html() == 'close' ? 'expand' : 'close');
        }
      }
    });
  },

  loggedIn: function() {
    $('.btn-login').click(function(e){
      e.preventDefault();
      $('#hBar').toggleClass('is-loggedin');
      $('.btn-login').toggleText('Login', 'Logout');
    });
  },

  showDefinition: function() {
    $('.spoonflower_definition dt').click(function(e){
      $('.spoonflower_definition dd').slideToggle('medium').toggleClass('display_none');
    })
  }

};

Navigation.init();

// from http://stackoverflow.com/a/26183153
jQuery.fn.extend({
  toggleText: function (a, b){
    var that = this;
      if (that.text() != a && that.text() != b){
        that.text(a);
      }
      else
      if (that.text() == a){
        that.text(b);
      }
      else
      if (that.text() == b){
        that.text(a);
      }
    return this;
  }
});

// Search

// $("#desktop_item_fabric").click(function() {
//   desktop_selected_name('fabric');
//   desktop_selected_form('fabric');
//   document.getElementById('desktop_mag').style.width = '35%';
//   desktop_fixH('desktop_q','desktop_mag');
// });
//
// $("#desktop_item_wallpaper").click(function() {
//   desktop_selected_name('wallpaper');
//   desktop_selected_form('wallpaper');
//   document.getElementById('desktop_mag').style.width = '38%';
//   desktop_fixH('desktop_q','desktop_mag');
// });
//
// $("#desktop_item_gift_wrap").click(function() {
//   desktop_selected_name('gift wrap');
//   desktop_selected_form('gift wrap');
//   document.getElementById('desktop_mag').style.width = '36%';
//   desktop_fixH('desktop_q','desktop_mag');
// });
//
// $("#desktop_item_designers").click(function() {
//   desktop_selected_name('designers');
//   desktop_selected_form('designers');
//   document.getElementById('desktop_mag').style.width = '38%';
//   desktop_fixH('desktop_q','desktop_mag');
// });
//
// $("#desktop_item_collections").click(function() {
//   desktop_selected_name('collections');
//   desktop_selected_form('collections');
//   document.getElementById('desktop_mag').style.width = '40%';
//   desktop_fixH('desktop_q','desktop_mag');
// });
//
//   var search_text = "search fabric"
//   $(function () {
//     $('html').click(function() {
//       $('#desktop_drop_down_action').hide();
//     });
//
//     $('#desktop_drop_action').click(function(event){
//         event.stopPropagation();
//     });
//   });
//
//   function desktop_selected_name(search){
//     document.getElementById('desktop_filter').value = search
//     if (search == "gift wrap") {
//     document.getElementById('desktop_shop').value = "gift_wrap"
//       }
//     else {
//       document.getElementById('desktop_shop').value = search
//     }
//     search_text = "search " + search
//     str = search.toLowerCase().replace(/\b[a-z]/g, function(letter) {
//         return letter.toUpperCase();
//     });
//     $('#desktop_search_selected_name').html(str + ":");
//
//   };
//
//   function desktop_selected_form(search){
//     if (search == "collections") {
//       document.desktop_search_form.action = "/spelunks"
//     }
//     else if (search == "designers") {
//       document.desktop_search_form.action = "/spelunks"
//     }
//     else {
//       document.desktop_search_form.action = "/shop"
//     }
//   };
//
//   function desktop_fixH(one,two) {
//     if (document.getElementById(one)) {
//       var rh=document.getElementById(two).style.width
//       rh = rh.replace('%','');
//       if (rh == 0) {
//         rh=55;
//       }
//       var nh = Math.max(79 - rh);
//       document.getElementById(one).style.width=nh+"%";
//     }
//   }
//
//
//     window.onload = setUp();
//
//     function setUp(){
//         document.getElementById('desktop_mag').style.width = '35%';
//         desktop_selected_name('fabric');
//         desktop_selected_form('fabric');
//       desktop_fixH('desktop_q','desktop_mag');
//     }
//
//
//   $("#desktop_search_carrot").click(function() {
//     var drop = document.getElementById('desktop_drop_down_action');
//     if (drop.style.display != 'block'){
//       drop.style.display = 'block';
//     } else {
//       drop.style.display = 'none';
//     };
//   });
//
//   $("#desktop_go_button").mouseover(function() {
//     this.src = '/assets/buttons/Go_HOVER.png';
//   });
//
//   $("#desktop_go_button").mouseout(function() {
//     this.src = '/assets/buttons/Go_ON.png';
//   });
