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
   * Initializes functions below
   */
  init: function() {
    SpoonflowerNavigation.navToggle();
    SpoonflowerNavigation.mobileSubnavToggle();
    // may need for desktop but causes nav to disappear when scrolled in mobile
    // Navigation.windowResize();
    SpoonflowerNavigation.loggedIn();
    SpoonflowerNavigation.showDefinition();
    // tablet and desktop
    if($( window ).width() > '767') {
      SpoonflowerNavigation.desktopSubnav();
      SpoonflowerNavigation.desktopFlyout();
      SpoonflowerNavigation.touchOpenSubnav();
    }
  },
  /**
   * In mobile view this toggles navigation visibility and triggers collapseAllSubnavs()
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
   * Toggles the subnav items in an accordion menu
   */
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

  // windowResize: function() {
  //   $(window).resize(function() {
  //     if($( window ).width() >= '600') {
  //       $('.h_bar > nav').css('display', 'block');
  //       if($('#hBar').hasClass('is-expanded')){
  //         $('.h_bar-container').toggleClass('is-expanded is-collapsed');
  // 				$('#navToggle i').toggleClass('icon_menu icon_close');
  //       }
  //       $('.h_bar > nav > ul > li > a').siblings().removeAttr('style')
  //     }
  //     else {
  //       $('.h_bar > nav').css('display', 'none');
  //     }
  //   });
  // },

  /**
   * collapse menu
   * @param  {jQuery} $toggleButton - the mobile only arrow button in subnav
   */
  collapseMenu: function($toggleButton) {
    // console.log('in collapseMenu');
    var $li = $toggleButton.parent();
    this.removeClass('is-expanded');
    $li.find('ul').removeClass('menu-visible');
  },

  /**
   * collapse all the subnavs
   */
  collapseAllSubnavs: function() {
    // console.log('in collapseAllSubnavs');
    $('.btn-mobile_nav').removeClass('is-expanded');
    $('.btn-mobile_nav button i').attr('class', 'icon icon_chevron_down');
    $('ul').removeClass('menu-visible');
  },

  /**
   * collapse child subnavs
   * @param  {jQuery} $button - the mobile only arrow button in subnav
   */
  collapseChildSubnavs: function($button) {
    var $buttonParent = $button.parent();
    // var $buttons = $(parentButton).find('.btn-mobile_nav'),
    //     $lists = $(parentButton).find('.menu-visible');
    $buttonParent.find('.btn-mobile_nav').removeClass('is-expanded');
    $buttonParent.find('button i').attr('class', 'icon icon_chevron_down');
    $buttonParent.find('ul').removeClass('menu-visible');
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
   * displays dropdown with details on what we do
   */
  showDefinition: function() {
    $('.spoonflower_definition dt').click(function(e){
      $(this).find('i:first-child').toggleClass('icon_chevron_down icon_chevron_up');
      $('.spoonflower_definition dd').slideToggle('medium').toggleClass('display_none');
    })
  },

  /**
   * begin desktop navigation functionality
   * hover top level navigation to show subnav
   */
  desktopSubnav: function() {

    $('.nav-link-primary').mouseover(function(){
      console.log('mouseover .nav-link-primary');
      SpoonflowerNavigation.showSubnav($(this));
    });

    $('.nav-link-primary').mouseout(function(){
      console.log('mouseout .nav-link-primary');
      SpoonflowerNavigation.closeSubnav($(this));
    });

    $('.subnav').mouseover(function() {
      console.log('mouseover .subnav');
      SpoonflowerNavigation.stayOpen($(this));
    });

    $('.subnav').mouseleave(function(){
      console.log('mouseleave .subnav');
      // if in a subnav
      if($('.subnav:hover').length == 0) {
        SpoonflowerNavigation.subnavState = false;
        // console.log('in mouseleave');
        SpoonflowerNavigation.closeAllSubnav();
      }
    });
  },

  /**
   * hover subnav links to show more menus
   */
  desktopFlyout: function() {
    $('.has_subnav a').mouseenter(function(){
      console.log('FLYOUT: mouseenter .has_subnav a');
      SpoonflowerNavigation.flyoutOpen($(this));
    });

    // $('.has_subnav a').mouseout(function(){
    //   console.log('FLYOUT: mouseout .has_subnav a');
    //   SpoonflowerNavigation.flyoutClose($(this));
    // });
    // // remove current and active classes if hovering over items without subnav
    $('.subnav-primary > li:not(.has_subnav)').mouseover(function(){
      console.log('FLYOUT: mouseover .subnav-primary > li:not(.has_subnav)');
      SpoonflowerNavigation.flyoutClose($(this));
    });
  },

  /**
   * handle touch events, create a close button
   */
  touchOpenSubnav: function() {
    $('.nav-link-primary').on('touchstart', function(e){
      console.log('in touchOpenSubnav()');
      e.stopPropagation();
      e.preventDefault();
      SpoonflowerNavigation.subnavState = true;
      var $el = $(this);
      var link = $el.attr('href');
      if($el.hasClass('activateTouchLink')) {
        window.location = link;
      }
      else {
        // $('.nav-link').removeClass('activateTouchLink');
        $el.addClass('activateTouchLink');
      }
      SpoonflowerNavigation.showSubnav($(this));
      // add close button
      var closeButton = '<button class="btn btn-touch_close"><i class="icon icon_close" aria-hidden="true"></i></button>';
      var $menu = $el.parent().children('ul');
      $(closeButton).appendTo($menu);
      // enable close
      SpoonflowerNavigation.touchCloseSubnav();
      // enable flyouts
      SpoonflowerNavigation.touchOpenFlyout();
    });
  },
  /**
   * close the subnav using generated close button
   */
  touchCloseSubnav: function() {
    $('.btn-touch_close').on('touchstart', function(e) {
      console.log('in touchCloseSubnav()');
      e.stopPropagation();
      e.preventDefault();
      var $target = $(this).parent().siblings('.nav-link');
      $target.removeClass('activateTouchLink active');
      SpoonflowerNavigation.subnavState = false;
      $(this).remove();
      SpoonflowerNavigation.closeSubnav($target);
    });
  },
  /**
   * open the flyout menu
   */
  touchOpenFlyout: function() {
    $('.nl-lvl2, .nl-lvl3, .nl-lvl4').on('touchstart', function(e){
      console.log('in touchOpenFlyout()');
      e.stopPropagation();
      e.preventDefault();
      var $el = $(this);
      var link = $el.attr('href');
      if($el.hasClass('activateTouchLink')) {
        window.location = link;
      }
      else {
        $('.nav-link').removeClass('activateTouchLink');
        $el.addClass('activateTouchLink');
      }
      SpoonflowerNavigation.flyoutOpen($(this));
      // add close button
      var closeButton = '<button class="btn btn-touch_close"><i class="icon icon_close" aria-hidden="true"></i></button>';
      var $menu = $el.parent().children('ul');
      $(closeButton).appendTo($menu);
      // enable close
      SpoonflowerNavigation.touchCloseSubnav();
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
    console.log('in showSubnav()', + SpoonflowerNavigation.subnavState);
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
    console.log('in closeSubnav()', + SpoonflowerNavigation.subnavState);
    var getthis = $target.parent().children('ul');
    if(SpoonflowerNavigation.subnavState == false) {
      $(getthis).removeClass('current');
      $('.nav-link').removeClass('activateTouchLink, active');
    }
  },

  /**
   * If mouse leaves .subnav close all subnavs and remove arrow indicators
   */
  closeAllSubnav: function() {
    if(SpoonflowerNavigation.subnavState == false) {
      console.log('in closeAllSubnav()', + SpoonflowerNavigation.subnavState)
      $('.subnav').removeClass('current');
      $('.has_subnav a').removeClass('active');
    }
  },

  /**
   * keep the subnav open if hovered
   * @param  {jQuery} $currentSubnav - the hovered .subnav
   */
  stayOpen: function($currentSubnav) {
    SpoonflowerNavigation.subnavState = true;
    console.log('in stayOpen()', + SpoonflowerNavigation.subnavState);
    $currentSubnav.addClass('current');
  },

  /**
   * open the flyout menus
   * @param  {jQuery} $target - $('.has_subnav a') a link with a subnav
   */
  flyoutOpen: function($target) {
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
    console.log('in flyoutClose()');
    // if(SpoonflowerNavigation.flyoutState == false) {
      $target.parent().find('ul').removeClass('current');
      $target.parent().find('a').removeClass('active');
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
      console.log('in triggerSelect()');
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
