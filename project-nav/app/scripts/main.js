// Navigation
var SpoonflowerNavigation = {

  init: function() {
    SpoonflowerNavigation.navToggle();
    SpoonflowerNavigation.mobileSubnavToggle();
    // may need for desktop but causes nav to disappear when scrolled in mobile
    // Navigation.windowResize();
    SpoonflowerNavigation.loggedIn();
    SpoonflowerNavigation.showDefinition();
  },

  navToggle: function() {
    $('#navToggle button').click(function(e){
      e.preventDefault();
      $('.h_bar > nav').slideToggle('medium');
      $('#hBar').toggleClass('is-collapsed is-expanded');
      $('#navToggle i').toggleClass('icon_close icon_menu');
      if($('#hBar').hasClass('is-expanded')) {
        Navigation.collapseAllSubnavs();
      }
    });
  },

  mobileSubnavToggle: function() {
    $('.btn-mobile_nav').click(function() {
      var $this = $(this);
      if($this.hasClass('is-expanded')) {
        SpoonflowerNavigation.collapseChildSubnavs($this);
        SpoonflowerNavigation.collapseMenu($this);
      }
      $this.toggleClass('is-expanded');
			// $(this).next().slideToggle('medium');
      $this.next().toggleClass('menu-visible');
      $this.find('i:first-child').toggleClass('icon_chevron_down icon_chevron_up');
    });
  },

  windowResize: function() {
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

  // collapse menu
  collapseMenu: function(toggleButton) {
    console.log('in collapseMenu');
    var $li = toggleButton.parent();
    this.removeClass('is-expanded');
    $li.find('ul').removeClass('menu-visible');
  },

  // collapse all the subnavs
  collapseAllSubnavs: function() {
    $('.btn-mobile_nav').removeClass('is-expanded');
    $('.btn-mobile_nav button i').attr('class', 'icon icon_chevron_down');
    $('ul').removeClass('menu-visible');
  },

  // collapse child subnavs
  collapseChildSubnavs: function(button) {
    var $buttonParent = button.parent();
    // var $buttons = $(parentButton).find('.btn-mobile_nav'),
    //     $lists = $(parentButton).find('.menu-visible');
    $buttonParent.find('.btn-mobile_nav').removeClass('is-expanded');
    $buttonParent.find('button i').attr('class', 'icon icon_chevron_down');
    $buttonParent.find('ul').removeClass('menu-visible');
  },

  // toggles topmost header nav icon visibility, changes login button text
  loggedIn: function() {
    $('.btn-login').click(function(e){
      e.preventDefault();
      $('#hBar').toggleClass('is-loggedin');
      $('.btn-login').toggleText('Login', 'Logout');
    });
  },

  // displays dropdown with details on what we do?
  showDefinition: function() {
    $('.spoonflower_definition dt').click(function(e){
      $(this).find('i:first-child').toggleClass('icon_chevron_down icon_chevron_up');
      $('.spoonflower_definition dd').slideToggle('medium').toggleClass('display_none');
    })
  }

};

SpoonflowerNavigation.init();

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

var SpoonflowerSearch = {

  init: function() {
    SpoonflowerSearch.triggerSelect();
  },

  triggerSelect: function() {
    $('.btn-select').on('click', function() {
      console.log('in triggerSelect');
      $('.search_select').trigger('click');
    });
  }

};

SpoonflowerSearch.init();

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
