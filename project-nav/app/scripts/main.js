/**
 *  Navigation
 */

/**
 * Encapsulates Navigation functions
 * @type {Object}
 */
var SpoonflowerNavigation = {

  /**
   * flag for subnav visibility
   * @type {Boolean}
   */
  subnavState: false,

  /**
   * variable to store windowWidth once SpoonflowerNavigation initializes
   */
  windowWidth: 0,

  /**
   * Initializes functions below
   */
  init: function() {
    /**
     * Using window width to determine whether on mobile or not
     * @param  {jQuery} SpoonflowerNavigation.windowWidth - get viewport width
     * @return {Number}        return a number
     */
    SpoonflowerNavigation.windowWidth = $(window).width();
    /**
     * Initial mobile functions
     */
    if(SpoonflowerNavigation.windowWidth < '768') {
      SpoonflowerNavigation.navToggle();
      SpoonflowerNavigation.loggedIn();
    }
    /**
     * shared functions
     */
     SpoonflowerNavigation.showDefinition();
     SpoonflowerNavigation.touchSubnavOpen();
     SpoonflowerNavigation.desktopSubnav();
     SpoonflowerNavigation.desktopFlyout();
     SpoonflowerNavigation.keyboardAccessibility();
  },
  /**
   * In mobile view this toggles navigation visibility and if already visible triggers collapseAllSubnavs()
   */
  navToggle: function() {
    $('#navToggle button').click(function(e){
      e.preventDefault();
      $('.h_bar > nav').slideToggle('medium');
      $('#hBar').toggleClass('is-collapsed is-expanded');
      $('#navToggle i').toggleClass('icon_close icon_menu');
      if($('#hBar').hasClass('is-expanded')) {
        SpoonflowerNavigation.collapseAllSubnavs();
      }
    });
  },

  /**
   * Opens the subnav items in an accordion menu for mobile, or as a megamenu for tablet
   *
   * $this - li.has_subnav
   */
  touchSubnavOpen: function() {
    $('.has_subnav').on('touchstart', function(e) {
      e.stopPropagation();
      // console.log('.has_subnav on touchstart');
      var $this = $(this);
      if($this.hasClass('is-active')) {
        // SpoonflowerNavigation.collapseChildSubnavs($this);
        SpoonflowerNavigation.collapseMenu($this);
      }
      else {
        SpoonflowerNavigation.openMenu($this);
      }
    });
    $('.has_subnav > .nav-link-primary').on('touchstart', function(e){
    // $('.has_subnav > a').on('touchstart', function(e){
      e.stopPropagation();
      e.preventDefault();
      var $el = $(this);
      var link = $el.attr('href');
      // console.log('.nav-link-primary on touchstart');
      if($el.hasClass('activateLink')) {
        window.location = link;
      }
      else {
        $('.nav-link').removeClass('activateLink');
        $el.addClass('activateLink');
        // open the menu item if touched
        var $navlinkParent = $($el).parent();
        // show Subnav on iPad portrait and larger touch screens,
        if(SpoonflowerNavigation.windowWidth > '767') {
          SpoonflowerNavigation.showSubnav($el);
          // enable touchOpenFlyout
          SpoonflowerNavigation.touchOpenFlyout();
          // add close button
          var closeButton = '<button class="btn btn-touch_close"><i class="icon icon_close" aria-hidden="true"></i> Close Menu</button>';
          if($('.btn-touch_close').length == 0) {
            $(closeButton).appendTo($('nav'));
            // enable close
            SpoonflowerNavigation.touchCloseSubnav();
          }
        } else {
          // else open submenu as accordion
          // console.log("opening accordion");
          SpoonflowerNavigation.openMenu($navlinkParent);
        }
      }
    });
    // mobile link behaviors
    if(SpoonflowerNavigation.windowWidth < '768') {
      $('.has_subnav > .nl-lvl2, .has_subnav > .nl-lvl3, .has_subnav > .nl-lvl4').on('touchstart', function(e){
        e.stopPropagation();
        e.preventDefault();
        var $el = $(this);
        var link = $el.attr('href');
        if($el.hasClass('activateLink')) {
          // console.log('touched activated subnav link');
          window.location = link;
        }
        else {
          // console.log('touched subnav link');
          $('.nav-link').removeClass('activateLink');
          $el.addClass('activateLink');
          var $navlinkParent = $($el).parent();
          // open submenu as accordion
          // console.log("opening accordion");
          SpoonflowerNavigation.openMenu($navlinkParent);
        }
      });
    }
    $('.subnav li').not('.has_subnav').on('touchstart', function(e){
      e.stopPropagation();
      // console.log('stopPropagation');
    });
  },

  /**
   * open the subnav menu
   * @param  {jQuery} $li - the subnav <li>
   */
  openMenu: function($li) {
    // close all other open menus
    $li.siblings('.is-active').attr('class', 'has_subnav').find('ul').removeClass('menu-visible');
    // set the class, make menu visible
    // $li.attr('class', 'has_subnav is-active');
    $li.addClass('is-active');
    $li.children('ul').addClass('menu-visible');
    // deactivate active nav-link
    $('.nav-link').removeClass('activateLink');
    // activate nav-link button
    $li.children('.nav-link').addClass('activateLink');
  },

  /**
   * collapse menu
   * @param  {jQuery} $li - the subnav <li>
   */
  collapseMenu: function($li) {
    // console.log('in collapseMenu');
    // reset the class on the target
    $li.removeClass('is-active');
    $li.find('.nav-link').removeClass('activateLink');
    $li.find('ul').removeClass('menu-visible');
  },

  /**
   * collapse all the subnavs
   */
  collapseAllSubnavs: function() {
    // console.log('in collapseAllSubnavs');
    $('.has_subnav').removeClass('is-active');
    $('.nav-link').removeClass('activateLink');
    // $('.btn-mobile_nav button i').attr('class', 'icon icon_chevron_down');
    $('ul').removeClass('menu-visible');
  },

  /**
   * collapse child subnavs
   * @param  {jQuery} $target - the subnav <li>
   */
  collapseChildSubnavs: function($target) {
    var $li = $target;
    $li.attr('class', 'has_subnav');
    $li.find('ul').removeClass('menu-visible');
  },

  /**
   * toggles topmost header nav icon visibility, changes login button text
   */
  loggedIn: function() {
    $('.btn-login').click(function(e){
      e.preventDefault();
      $('#hBar').toggleClass('is-loggedin');
      $('.btn-login').toggleText('Login', 'Logout');
    });
  },

  /**
   * toggles visibility of dropdown with details on what we do
   */
  showDefinition: function(){
    /**
     * the element that triggers the events
     */
    var $definitionToggle = $('.spoonflower_definition span');
    /**
     * toggles down and up icons, toggles visibility of definition
     */
    function showDef() {
      $definitionToggle.find('i:first-child').toggleClass('icon_chevron_down icon_chevron_up');
      $('.spoonflower_definition dd').slideToggle('medium').toggleClass('display_none');
    }

    /**
     * click handler
     */
    $definitionToggle.on('click', function() {
      showDef();
    });

    /**
     * keydown handler
     * 13 = 'enter' or 27 = 'esc'
     */
    $definitionToggle.on('keydown', function(e) {
      if(e.which == 13 || e.which == 27) {
        showDef();
      }
    });

    /**
     * Escape the box if keyboard focused on links - overkill?
     * @param  {jQuery} '.spoonflower_definition .btn-primary:focus' - buttons within Definition block
     */
    $('.spoonflower_definition .btn-primary').on('keydown', function(e) {
      if(e.which == 27) {
        showDef();
      }
    });

  },

  /**
   * kitchen sink accessibility functions
   */
  keyboardAccessibility: function() {

    /**
     * Back to Top
     *
     * Keydown on enter key (13) takes you back to top of page, specifically to 'skip to content' link
     * @param  {jQuery} '.btn-back_to_top' - button before footer after content
     */
    $('.btn-back_to_top').on('keydown', function(e) {
      if(e.which == 13) {
        $('.screen-reader-top').focus();
      }
    });

    /**
     * Use arrow controls to navigate primary nav
     * inspiration: http://simplyaccessible.com/article/arrow-key-navigation/
     */
    $('.nav-link-primary').keydown(function(e){
      // Listen for the up, down, left and right arrow keys, otherwise, end here
      if ([13,37,38,39,40].indexOf(e.which) == -1) {
        return;
      }

      // Store the reference to our top level link
      var $navLink = $(this);
      // ... the previous top level link
      var $prevLink = $navLink.parent('li').prev('.has_subnav').find('.nav-link-primary');
      // ... the next top level link
      var $nextLink = $navLink.parent('li').next('.has_subnav').find('.nav-link-primary');

      switch(e.which) {
        case 13: // enter
          // Make sure to stop event bubbling
          e.preventDefault();
          e.stopPropagation();
          SpoonflowerNavigation.closeSubnav($navLink);
          var link = $navLink.attr('href');
          if($navLink.hasClass('activateLink')) {
            window.location = link;
          }
          else {
            $navLink.addClass('activateLink');
            SpoonflowerNavigation.showSubnav($navLink);
          }
          break;
        case 37: // left arrow
          // Make sure to stop event bubbling
          e.preventDefault();
          e.stopPropagation();
          SpoonflowerNavigation.subnavState = false;
          SpoonflowerNavigation.closeAllSubnav();
          SpoonflowerNavigation.showSubnav($prevLink);
          // This is the first item in the top level mega menu list
          if($navLink.parent('li').prevAll('li').filter(':visible').first().length == 0) {
            // Focus on the last item in the top level
            $navLink.parent('li').nextAll('li').filter(':visible').last().find('a').first().focus();
          } else {
            // Focus on the previous item in the top level
            $navLink.parent('li').prevAll('li').filter(':visible').first().find('a').first().focus();
          }
          break;
        case 38: /// up arrow
          // Find the nested element that acts as the menu
          var $dropdown = $navLink.parent('li').find('.subnav');
          // SpoonflowerNavigation.closeAllSubnav();

          // If there is a UL available, place focus on the first focusable element within
          if($dropdown.length > 0){
            e.preventDefault();
            e.stopPropagation();

            $dropdown.find('.nav-link').filter(':visible').first().focus();
          }

          break;
        case 39: // right arrow
          // Make sure to stop event bubbling
          e.preventDefault();
          e.stopPropagation();
          SpoonflowerNavigation.subnavState = false;
          SpoonflowerNavigation.closeAllSubnav();
          SpoonflowerNavigation.showSubnav($nextLink);

          // This is the last item
          if($navLink.parent('li').nextAll('li').filter(':visible').first().length == 0) {
            // SpoonflowerNavigation.closeAllSubnav();
            // Focus on the first item in the top level
            $navLink.parent('li').prevAll('li').filter(':visible').last().find('a').first().focus();
            // SpoonflowerNavigation.showSubnav(link);
          } else {
            // Focus on the next item in the top level
            $navLink.parent('li').nextAll('li').filter(':visible').first().find('a').first().focus();
          }
          break;
        case 40: // down arrow
          // Find the nested element that acts as the menu
          var $dropdown = $navLink.parent('li').find('.subnav');
          // SpoonflowerNavigation.showSubnav($navLink);

          // If there is a UL available, place focus on the first focusable element within
          if($dropdown.length > 0){
            // Make sure to stop event bubbling
            // e.preventDefault();
            // e.stopPropagation();
            //
            // $dropdown.find('.nav-link').filter(':visible').first().focus();
            // $navLink.addClass('activateLink');
            e.stopPropagation();
            e.preventDefault();
            var $el = $dropdown.find('.nav-link').filter(':visible').first().focus();
            var link = $el.attr('href');
            // console.log('in touchOpenFlyout()');
            if($el.hasClass('activateLink')) {
              window.location = link;
            }
            else {
              $('.nav-link').removeClass('activateLink');
              $el.addClass('activateLink');
              SpoonflowerNavigation.flyoutOpen($el);
              // user able to tab into submenu
            }
          }
          break;
      }
    });

    /**
     * Use arrow controls to navigate subnav menus
     */
    $('.nl-lvl2').keydown(function(e){
      // Listen for the enter, up, down, left and right arrow keys, otherwise, end here
      if ([13,37,38,39,40].indexOf(e.which) == -1) {
        return;
      }

      // Store the reference to our top level link
      var $subnavLink = $(this);
      // ... the previous top level link
      var $prevSnLink = $subnavLink.parent('li').prev('.has_subnav').children('.nav-link');
      // ... the next top level link
      var $nextSnLink = $subnavLink.parent('li').next('.has_subnav').children('.nav-link');

      switch(e.which) {
        // case 13: // enter
        //   // Make sure to stop event bubbling
        //   e.preventDefault();
        //   e.stopPropagation();
        //   var snLink = $subnavLink.attr('href');
        //   if($subnavLink.hasClass('activateLink')) {
        //     window.location = snLink;
        //   }
        //   else {
        //     $subnavLink.addClass('activateLink');
        //     SpoonflowerNavigation.flyoutOpen($subnavLink);
        //   }
        //   break;
        // case 37: // left arrow
        //   // Make sure to stop event bubbling
        //   e.preventDefault();
        //   e.stopPropagation();
        //   SpoonflowerNavigation.closeAllSubnav();
        //   SpoonflowerNavigation.showSubnav($prevLink);
        //   // This is the first item in the top level mega menu list
        //   if($navLink.parent('li').prevAll('li').filter(':visible').first().length == 0) {
        //     // Focus on the last item in the top level
        //     $navLink.parent('li').nextAll('li').filter(':visible').last().find('a').first().focus();
        //   } else {
        //     // Focus on the previous item in the top level
        //     $navLink.parent('li').prevAll('li').filter(':visible').first().find('a').first().focus();
        //   }
        //   break;
      //   case 38: /// up arrow
      //     // Find the nested element that acts as the menu
      //     var $dropdown = $navLink.parent('li').find('.subnav');
      //     // SpoonflowerNavigation.closeAllSubnav();
      //
      //     // If there is a UL available, place focus on the first focusable element within
      //     if($dropdown.length > 0){
      //       e.preventDefault();
      //       e.stopPropagation();
      //
      //       $dropdown.find('.nav-link').filter(':visible').first().focus();
      //     }
      //
      //     break;
      //   case 39: // right arrow
      //     // Make sure to stop event bubbling
      //     e.preventDefault();
      //     e.stopPropagation();
      //     SpoonflowerNavigation.closeAllSubnav();
      //     SpoonflowerNavigation.showSubnav($nextLink);
      //
      //     // This is the last item
      //     if($navLink.parent('li').nextAll('li').filter(':visible').first().length == 0) {
      //       // SpoonflowerNavigation.closeAllSubnav();
      //       // Focus on the first item in the top level
      //       $navLink.parent('li').prevAll('li').filter(':visible').last().find('a').first().focus();
      //       // SpoonflowerNavigation.showSubnav(link);
      //     } else {
      //       // Focus on the next item in the top level
      //       $navLink.parent('li').nextAll('li').filter(':visible').first().find('a').first().focus();
      //     }
      //     break;
        case 40: // down arrow
          e.preventDefault();
          e.stopPropagation();
          var snLink = $subnavLink.attr('href');
          if($subnavLink.hasClass('activateLink')) {
            $subnavLink.on('keydown', function(e) {
              if(e.which == 13) {
                window.location = snLink;
              }
            });
          }
          else {
            $subnavLink.addClass('activateLink');
          }
          // This is the last item
          if($subnavLink.parent('li').nextAll('li').filter(':visible').first().length == 0) {
            // SpoonflowerNavigation.closeAllSubnav();
            // Focus on the first item in the subnav level
            $subnavLink.parent('li').prevAll('li').filter(':visible').last().find('a').first().focus().addClass('activateLink');
            SpoonflowerNavigation.subnavState = false;
            SpoonflowerNavigation.flyoutClose($subnavLink);
            if($nextSnLink.parent().hasClass('has_subnav')) {
              SpoonflowerNavigation.flyoutOpen($nextSnLink);
            }
          } else {
            // Focus on the next item in the subnav level
            $subnavLink.parent('li').nextAll('li').filter(':visible').first().find('a').first().focus().addClass('activateLink');
            SpoonflowerNavigation.subnavState = false;
            SpoonflowerNavigation.flyoutClose($subnavLink);
            if($nextSnLink.parent().hasClass('has_subnav')) {
              SpoonflowerNavigation.flyoutOpen($nextSnLink);
            }
          }
          break;
          // // Find the nested element that acts as the menu
          // var $dropdown = $navLink.parent('li').find('.subnav');
          // // SpoonflowerNavigation.showSubnav($navLink);
          //
          // // If there is a UL available, place focus on the first focusable element within
          // if($dropdown.length > 0){
          //   // Make sure to stop event bubbling
          //   // e.preventDefault();
          //   // e.stopPropagation();
          //   //
          //   // $dropdown.find('.nav-link').filter(':visible').first().focus();
          //   // $navLink.addClass('activateLink');
          //   e.stopPropagation();
          //   e.preventDefault();
          //   var $el = $dropdown.find('.nav-link').filter(':visible').first().focus();
          //   var link = $el.attr('href');
          //   // console.log('in touchOpenFlyout()');
          //   if($el.hasClass('activateLink')) {
          //     window.location = link;
          //   }
          //   else {
          //     $('.nav-link').removeClass('activateLink');
          //     $el.addClass('activateLink');
          //     SpoonflowerNavigation.flyoutOpen($el);
          //     // user able to tab into submenu
          //   }
          // }
          break;
      }
    });

    // $('.subnav').mouseover(function() {
    //   // console.log('mouseover .subnav');
    //   SpoonflowerNavigation.stayOpen($(this));
    // });
    //
    // $('.subnav').mouseleave(function(){
    //   // console.log('mouseleave .subnav');
    //   // if in a subnav
    //   if($('.subnav:hover').length == 0) {
    //     SpoonflowerNavigation.subnavState = false;
    //     // console.log('in mouseleave');
    //     SpoonflowerNavigation.closeAllSubnav();
    //   }
    // });
    //
    // $('nav').mouseleave(function(){
    //   // console.log('mouseleave nav');
    //   SpoonflowerNavigation.subnavState = false;
    //   SpoonflowerNavigation.closeAllSubnav();
    // });

  },

  /**
   * begin desktop navigation functionality
   * hover top level navigation to show subnav
   */
  desktopSubnav: function() {
    // console.log('in desktopSubnav()');
    $('.nav-link-primary').mouseover(function(){
      // console.log('mouseover .nav-link-primary');
      SpoonflowerNavigation.showSubnav($(this));
    });

    $('.nav-link-primary').mouseout(function(){
      // console.log('mouseout .nav-link-primary');
      SpoonflowerNavigation.closeSubnav($(this));
    });

    $('.subnav').mouseover(function() {
      // console.log('mouseover .subnav');
      SpoonflowerNavigation.stayOpen($(this));
    });

    $('.subnav').mouseleave(function(){
      // console.log('mouseleave .subnav');
      // if in a subnav
      if($('.subnav:hover').length == 0) {
        SpoonflowerNavigation.subnavState = false;
        // console.log('in mouseleave');
        SpoonflowerNavigation.closeAllSubnav();
      }
    });

    $('nav').mouseleave(function(){
      // console.log('mouseleave nav');
      SpoonflowerNavigation.subnavState = false;
      SpoonflowerNavigation.closeAllSubnav();
    });
  },

  /**
   * hover subnav links to show more menus
   */
  desktopFlyout: function() {
    // console.log('in desktopFlyout()');
    $('.nl-lvl2, .nl-lvl3, .nl-lvl4').mouseenter(function(){
      // console.log('FLYOUT: mouseenter .has_subnav a');
      SpoonflowerNavigation.flyoutOpen($(this));
    });

    // $('.has_subnav a').mouseout(function(){
    //   // console.log('FLYOUT: mouseout .has_subnav a');
    //   SpoonflowerNavigation.flyoutClose($(this));
    // });
    // // remove current and active classes if hovering over items without subnav
    $('.subnav-primary > li:not(.has_subnav)').mouseover(function(){
      // console.log('FLYOUT: mouseover .subnav-primary > li:not(.has_subnav)');
      SpoonflowerNavigation.flyoutClose($(this));
    });
  },

  // /**
  //  * handle touch events, create a close button
  //  */
  // touchOpenSubnav: function() {
  //   $('.nav-link-primary').on('touchstart', function(e){
  //     // console.log('in touchOpenSubnav()');
  //     e.stopPropagation();
  //     e.preventDefault();
  //     SpoonflowerNavigation.subnavState = true;
  //     var $el = $(this);
  //     var link = $el.attr('href');
  //     if($el.hasClass('activateLink')) {
  //       window.location = link;
  //     }
  //     else {
  //       // $('.nav-link').removeClass('activateLink');
  //       $el.addClass('activateLink');
  //     }
  //     SpoonflowerNavigation.showSubnav($(this));
  //     // add close button
  //     // var closeButton = '<button class="btn btn-touch_close"><i class="icon icon_close" aria-hidden="true"></i></button>';
  //     // var $menu = $el.parent().children('ul');
  //     // $(closeButton).appendTo($menu);
  //     // enable close
  //     SpoonflowerNavigation.touchCloseSubnav();
  //     // enable flyouts
  //     SpoonflowerNavigation.touchOpenFlyout();
  //   });
  // },
  /**
   * close the subnav using generated close button
   */
  touchCloseSubnav: function() {
    $('.btn-touch_close').on('touchstart', function(e) {
      // console.log('in touchCloseSubnav()');
      // e.stopPropagation();
      // e.preventDefault();
      var $target = $(this).parent().siblings('.nav-link');
      $target.removeClass('activateLink active');
      SpoonflowerNavigation.subnavState = false;
      $(this).remove();
      SpoonflowerNavigation.closeAllSubnav();
    });
  },
  /**
   * open the flyout menu if on touch device larger than 767px
   */
  touchOpenFlyout: function() {
    $('.has_subnav > .nl-lvl2, .has_subnav > .nl-lvl3, .has_subnav > .nl-lvl4').on('touchstart', function(e){
      e.stopPropagation();
      e.preventDefault();
      var $el = $(this);
      var link = $el.attr('href');
      // console.log('in touchOpenFlyout()');
      if($el.hasClass('activateLink')) {
        window.location = link;
      }
      else {
        $('.nav-link').removeClass('activateLink');
        $el.addClass('activateLink');
        SpoonflowerNavigation.flyoutOpen($el);
      }
    });
  },

  /**
   * Desktop, Touch and Keyboard flyout behaviors
   */

  /**
   * Desktop, Touch and Keyboard subnav behaviors
   *
   * Show subnav of a primary navigation link (1st level) when mousing over or upon
   * first touch of .nav-link-primary
   * @param  {jQuery} $target - .nav-link-primary
   */
  showSubnav: function($target) {
    SpoonflowerNavigation.subnavState = true;
    // console.log('in showSubnav()', + SpoonflowerNavigation.subnavState);
    var getthis = $target.parent().children('ul');
    $('.subnav').removeClass('current');
    $(getthis).addClass('current');
  },

  /**
   * Close subnav of a primary navigation link (1st level) when mousing over
   * .nav-link-primary or upon first touch of .btn-touch_close
   * @param  {jQuery} $target - .nav-link-primary
   */
  closeSubnav: function($target) {
    // console.log('in closeSubnav()', + SpoonflowerNavigation.subnavState);
    var getthis = $target.parent().children('ul');
    if(SpoonflowerNavigation.subnavState == false) {
      $(getthis).removeClass('current');
      $('.nav-link').removeClass('active activateLink');
    }
  },

  /**
   * If mouse leaves .subnav close all subnavs and remove arrow indicators
   */
  closeAllSubnav: function() {
    if(SpoonflowerNavigation.subnavState == false) {
      // console.log('in closeAllSubnav()', + SpoonflowerNavigation.subnavState)
      $('.subnav').removeClass('current');
      $('.has_subnav a').removeClass('active activateLink');
    }
  },

  /**
   * keep the subnav open if hovered
   * @param  {jQuery} $currentSubnav - the hovered .subnav
   */
  stayOpen: function($currentSubnav) {
    SpoonflowerNavigation.subnavState = true;
    // console.log('in stayOpen()', + SpoonflowerNavigation.subnavState);
    $currentSubnav.addClass('current');
  },

  /**
   * open the flyout menus
   * @param  {jQuery} $target - $('.has_subnav a') a link with a subnav
   */
  flyoutOpen: function($target) {
    // console.log('in flyoutOpen()');
    // SpoonflowerNavigation.flyoutState = true;
    // remove previously set classes
    $target.parent().parent().find('ul').removeClass('current');
    $target.parent().parent().find('a').removeClass('active');
    // set classes
    $target.parent().children('ul').addClass('current');
    $target.parent().children('a').addClass('active');
    // get position and set top position of the menu
    var $position = $target.parent().position();
    $target.parent().children('ul').css('top', -$position.top);
  },
  //
  /**
   * close the flyout menus
   * @param  {[type]} $target [description]
   * @return {[type]}         [description]
   */
  flyoutClose: function($target) {
    // console.log('in flyoutClose()');
    // if(SpoonflowerNavigation.flyoutState == false) {
      $target.parent().find('ul').removeClass('current');
      $target.parent().find('a').removeClass('active activateLink');
      // $('.subnav').removeClass('current');
      // $('.has_subnav a').removeClass('active');
    // }
  },
};

/**
 * Initialize SpoonflowerNavigation
 */
SpoonflowerNavigation.init();

/**
 * Extend jQuery to easily toggle text (from http://stackoverflow.com/a/26183153)
 */
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

/**
 * [SpoonflowerSearch description] not much to see or say here, used to help style
 * the select used in the search mockup.
 * @type {Object}
 */
var SpoonflowerSearch = {

  init: function() {
    SpoonflowerSearch.triggerSelect();
  },

  // This does not work in Firefox, may need to consider using Select2 for cross-browser styling of select element
  triggerSelect: function() {
    $('.btn-select').on('click', function(e) {
      e.preventDefault();
      // console.log('in triggerSelect()');
      $('.search_select').simulate('mousedown'); // http://stackoverflow.com/a/16056763
    });
  }

};

SpoonflowerSearch.init();

/*
 * jquery.simulate - simulate browser mouse and keyboard events
 *
 * Copyright (c) 2009 Eduardo Lundgren (eduardolundgren@gmail.com)
 * and Richard D. Worth (rdworth@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */

;(function($) {

$.fn.extend({
	simulate: function(type, options) {
		return this.each(function() {
			var opt = $.extend({}, $.simulate.defaults, options || {});
			new $.simulate(this, type, opt);
		});
	}
});

$.simulate = function(el, type, options) {
	this.target = el;
	this.options = options;

	if (/^drag$/.test(type)) {
		this[type].apply(this, [this.target, options]);
	} else {
		this.simulateEvent(el, type, options);
	}
};

$.extend($.simulate.prototype, {
	simulateEvent: function(el, type, options) {
		var evt = this.createEvent(type, options);
		this.dispatchEvent(el, type, evt, options);
		return evt;
	},
	createEvent: function(type, options) {
		if (/^mouse(over|out|down|up|move)|(dbl)?click$/.test(type)) {
			return this.mouseEvent(type, options);
		} else if (/^key(up|down|press)$/.test(type)) {
			return this.keyboardEvent(type, options);
		}
	},
	mouseEvent: function(type, options) {
		var evt;
		var e = $.extend({
			bubbles: true, cancelable: (type != "mousemove"), view: window, detail: 0,
			screenX: 0, screenY: 0, clientX: 0, clientY: 0,
			ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
			button: 0, relatedTarget: undefined
		}, options);

		var relatedTarget = $(e.relatedTarget)[0];

		if ($.isFunction(document.createEvent)) {
			evt = document.createEvent("MouseEvents");
			evt.initMouseEvent(type, e.bubbles, e.cancelable, e.view, e.detail,
				e.screenX, e.screenY, e.clientX, e.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				e.button, e.relatedTarget || document.body.parentNode);
		} else if (document.createEventObject) {
			evt = document.createEventObject();
			$.extend(evt, e);
			evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
		}
		return evt;
	},
	keyboardEvent: function(type, options) {
		var evt;

		var e = $.extend({ bubbles: true, cancelable: true, view: window,
			ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
			keyCode: 0, charCode: 0
		}, options);

		if ($.isFunction(document.createEvent)) {
			try {
				evt = document.createEvent("KeyEvents");
				evt.initKeyEvent(type, e.bubbles, e.cancelable, e.view,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					e.keyCode, e.charCode);
			} catch(err) {
				evt = document.createEvent("Events");
				evt.initEvent(type, e.bubbles, e.cancelable);
				$.extend(evt, { view: e.view,
					ctrlKey: e.ctrlKey, altKey: e.altKey, shiftKey: e.shiftKey, metaKey: e.metaKey,
					keyCode: e.keyCode, charCode: e.charCode
				});
			}
		} else if (document.createEventObject) {
			evt = document.createEventObject();
			$.extend(evt, e);
		}
		if (($.browser !== undefined) && ($.browser.msie || $.browser.opera)) {
			evt.keyCode = (e.charCode > 0) ? e.charCode : e.keyCode;
			evt.charCode = undefined;
		}
		return evt;
	},

	dispatchEvent: function(el, type, evt) {
		if (el.dispatchEvent) {
			el.dispatchEvent(evt);
		} else if (el.fireEvent) {
			el.fireEvent('on' + type, evt);
		}
		return evt;
	},

	drag: function(el) {
		var self = this, center = this.findCenter(this.target),
			options = this.options,	x = Math.floor(center.x), y = Math.floor(center.y),
			dx = options.dx || 0, dy = options.dy || 0, target = this.target;
		var coord = { clientX: x, clientY: y };
		this.simulateEvent(target, "mousedown", coord);
		coord = { clientX: x + 1, clientY: y + 1 };
		this.simulateEvent(document, "mousemove", coord);
		coord = { clientX: x + dx, clientY: y + dy };
		this.simulateEvent(document, "mousemove", coord);
		this.simulateEvent(document, "mousemove", coord);
		this.simulateEvent(target, "mouseup", coord);
	},
	findCenter: function(el) {
		var el = $(this.target), o = el.offset();
		return {
			x: o.left + el.outerWidth() / 2,
			y: o.top + el.outerHeight() / 2
		};
	}
});

$.extend($.simulate, {
	defaults: {
		speed: 'sync'
	},
	VK_TAB: 9,
	VK_ENTER: 13,
	VK_ESC: 27,
	VK_PGUP: 33,
	VK_PGDN: 34,
	VK_END: 35,
	VK_HOME: 36,
	VK_LEFT: 37,
	VK_UP: 38,
	VK_RIGHT: 39,
	VK_DOWN: 40
});

})(jQuery);
