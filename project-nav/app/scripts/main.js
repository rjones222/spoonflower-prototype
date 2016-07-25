// Navigation
var SpoonflowerNavigation = {

  init: function() {
    SpoonflowerNavigation.navToggle();
    SpoonflowerNavigation.mobileSubnavToggle();
    // may need for desktop but causes nav to disappear when scrolled in mobile
    // Navigation.windowResize();
    SpoonflowerNavigation.loggedIn();
    SpoonflowerNavigation.showDefinition();
    // tablet and desktop
    if($( window ).width() > '767') {
      SpoonflowerNavigation.desktopSubnavToggle();
      SpoonflowerNavigation.desktopFlyoutToggle();
    }
  },

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

  // collapse menu
  collapseMenu: function(toggleButton) {
    // console.log('in collapseMenu');
    var $li = toggleButton.parent();
    this.removeClass('is-expanded');
    $li.find('ul').removeClass('menu-visible');
  },

  // collapse all the subnavs
  collapseAllSubnavs: function() {
    // console.log('in collapseAllSubnavs');
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
  },

  // begin desktop navigation functionality
  // hover top level navigation to show subnav
  desktopSubnavToggle: function() {
    var timer;

    $('.nav-link-primary').mouseover(function(){
      clearTimeout(timer);
      var getthis = $(this).parent().children('ul');
      $('.subnav').removeClass('current');
      // $(getthis).stop(true, false, true).fadeIn(300); // leaves behind inline style attr when rapidly mousing over
      $(getthis).addClass('current');
    });

    $('.nav-link-primary').mouseout(function(){
      var getthis = $(this).parent().children('ul');
      timer = setTimeout(function() {
        $(getthis).removeClass('current');
        // $(getthis).stop(true, false, true).fadeOut(300);
      }, 300);
    });

    $('.subnav').mouseover(function() {
        clearTimeout(timer);
        $(this).addClass('current');
    });

    $('.subnav').mouseleave(function(){
      // console.log('in mouseleave');
      timer = setTimeout(function() {
        $('.subnav').removeClass('current');
        $('.has_subnav a').removeClass('active');
      }, 300);
    });
  },
  // hover subnav links to show more menus
  desktopFlyoutToggle: function() {
    var timer;

    $('.has_subnav a').mouseover(function(){
      clearTimeout(timer);
      // remove previously set classes
      $(this).parent().parent().find('ul').removeClass('current');
      $(this).parent().parent().find('a').removeClass('active');
      // set classes
      $(this).parent().children('ul').addClass('current');
      $(this).parent().children('a').addClass('active');
      // get position and set top position of the menu
      var $position = $(this).parent().position();
      $(this).parent().children('ul').css('top', -$position.top);
    });

    $('.has_subnav a').mouseout(function(){
      timer = setTimeout(function() {
        $(this).parent().children('ul').removeClass('current');
        $(this).parent().children('a').removeClass('active');
      }, 300);
    });
    // remove current and active classes if hovering over items without subnav
    $('.subnav-primary > li:not(.has_subnav)').mouseover(function(){
      $('.subnav').removeClass('current');
      $('.has_subnav a').removeClass('active');
    });
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

  // This does not work in Firefox, may need to consider using Select2 for cross-browser styling of select element
  triggerSelect: function() {
    $('.btn-select').on('click', function(e) {
      e.preventDefault();
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
