(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~js/admin"],{

/***/ "./node_modules/admin-lte/build/js/AdminLTE.js":
/*!*****************************************************!*\
  !*** ./node_modules/admin-lte/build/js/AdminLTE.js ***!
  \*****************************************************/
/*! exports provided: ControlSidebar, Layout, PushMenu, Treeview, DirectChat, TodoList, CardWidget, CardRefresh, Dropdown, Toasts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ControlSidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ControlSidebar */ "./node_modules/admin-lte/build/js/ControlSidebar.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlSidebar", function() { return _ControlSidebar__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layout */ "./node_modules/admin-lte/build/js/Layout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _Layout__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _PushMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PushMenu */ "./node_modules/admin-lte/build/js/PushMenu.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushMenu", function() { return _PushMenu__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _Treeview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Treeview */ "./node_modules/admin-lte/build/js/Treeview.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Treeview", function() { return _Treeview__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _DirectChat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DirectChat */ "./node_modules/admin-lte/build/js/DirectChat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectChat", function() { return _DirectChat__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TodoList */ "./node_modules/admin-lte/build/js/TodoList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TodoList", function() { return _TodoList__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _CardWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CardWidget */ "./node_modules/admin-lte/build/js/CardWidget.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardWidget", function() { return _CardWidget__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _CardRefresh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CardRefresh */ "./node_modules/admin-lte/build/js/CardRefresh.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardRefresh", function() { return _CardRefresh__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Dropdown */ "./node_modules/admin-lte/build/js/Dropdown.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dropdown", function() { return _Dropdown__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _Toasts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Toasts */ "./node_modules/admin-lte/build/js/Toasts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Toasts", function() { return _Toasts__WEBPACK_IMPORTED_MODULE_9__["default"]; });















/***/ }),

/***/ "./node_modules/admin-lte/build/js/CardRefresh.js":
/*!********************************************************!*\
  !*** ./node_modules/admin-lte/build/js/CardRefresh.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE CardRefresh.js
 * License MIT
 * --------------------------------------------
 */

const CardRefresh = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'CardRefresh'
  const DATA_KEY           = 'lte.cardrefresh'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    LOADED: `loaded${EVENT_KEY}`,
    OVERLAY_ADDED: `overlay.added${EVENT_KEY}`,
    OVERLAY_REMOVED: `overlay.removed${EVENT_KEY}`,
  }

  const ClassName = {
    CARD: 'card',
  }

  const Selector = {
    CARD: `.${ClassName.CARD}`,
    DATA_REFRESH: '[data-card-widget="card-refresh"]',
  }

  const Default = {
    source: '',
    sourceSelector: '',
    params: {},
    trigger: Selector.DATA_REFRESH,
    content: '.card-body',
    loadInContent: true,
    loadOnInit: true,
    responseType: '',
    overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
    onLoadStart: function () {
    },
    onLoadDone: function (response) {
      return response;
    }
  }

  class CardRefresh {
    constructor(element, settings) {
      this._element  = element
      this._parent = element.parents(Selector.CARD).first()
      this._settings = $.extend({}, Default, settings)
      this._overlay = $(this._settings.overlayTemplate)

      if (element.hasClass(ClassName.CARD)) {
        this._parent = element
      }

      if (this._settings.source === '') {
        throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
      }
    }

    load() {
      this._addOverlay()
      this._settings.onLoadStart.call($(this))

      $.get(this._settings.source, this._settings.params, function (response) {
        if (this._settings.loadInContent) {
          if (this._settings.sourceSelector != '') {
            response = $(response).find(this._settings.sourceSelector).html()
          }

          this._parent.find(this._settings.content).html(response)
        }

        this._settings.onLoadDone.call($(this), response)
        this._removeOverlay();
      }.bind(this), this._settings.responseType !== '' && this._settings.responseType)

      const loadedEvent = $.Event(Event.LOADED)
      $(this._element).trigger(loadedEvent)
    }

    _addOverlay() {
      this._parent.append(this._overlay)

      const overlayAddedEvent = $.Event(Event.OVERLAY_ADDED)
      $(this._element).trigger(overlayAddedEvent)
    };

    _removeOverlay() {
      this._parent.find(this._overlay).remove()

      const overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED)
      $(this._element).trigger(overlayRemovedEvent)
    };


    // Private

    _init(card) {
      $(this).find(this._settings.trigger).on('click', () => {
        this.load()
      })

      if (this._settings.loadOnInit) {
        this.load()
      }
    }

    // Static

    static _jQueryInterface(config) {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new CardRefresh($(this), _options)
        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)
      }

      if (typeof config === 'string' && config.match(/load/)) {
        data[config]()
      } else {
        data._init($(this))
      }
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_REFRESH, function (event) {
    if (event) {
      event.preventDefault()
    }

    CardRefresh._jQueryInterface.call($(this), 'load')
  })

  $(document).ready(function () {
    $(Selector.DATA_REFRESH).each(function() {
      CardRefresh._jQueryInterface.call($(this))
    })
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = CardRefresh._jQueryInterface
  $.fn[NAME].Constructor = CardRefresh
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return CardRefresh._jQueryInterface
  }

  return CardRefresh
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (CardRefresh);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/CardWidget.js":
/*!*******************************************************!*\
  !*** ./node_modules/admin-lte/build/js/CardWidget.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE CardWidget.js
 * License MIT
 * --------------------------------------------
 */

const CardWidget = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'CardWidget'
  const DATA_KEY           = 'lte.cardwidget'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    EXPANDED: `expanded${EVENT_KEY}`,
    COLLAPSED: `collapsed${EVENT_KEY}`,
    MAXIMIZED: `maximized${EVENT_KEY}`,
    MINIMIZED: `minimized${EVENT_KEY}`,
    REMOVED: `removed${EVENT_KEY}`
  }

  const ClassName = {
    CARD: 'card',
    COLLAPSED: 'collapsed-card',
    COLLAPSING: 'collapsing-card',
    EXPANDING: 'expanding-card',
    WAS_COLLAPSED: 'was-collapsed',
    MAXIMIZED: 'maximized-card',
  }

  const Selector = {
    DATA_REMOVE: '[data-card-widget="remove"]',
    DATA_COLLAPSE: '[data-card-widget="collapse"]',
    DATA_MAXIMIZE: '[data-card-widget="maximize"]',
    CARD: `.${ClassName.CARD}`,
    CARD_HEADER: '.card-header',
    CARD_BODY: '.card-body',
    CARD_FOOTER: '.card-footer',
    COLLAPSED: `.${ClassName.COLLAPSED}`,
  }

  const Default = {
    animationSpeed: 'normal',
    collapseTrigger: Selector.DATA_COLLAPSE,
    removeTrigger: Selector.DATA_REMOVE,
    maximizeTrigger: Selector.DATA_MAXIMIZE,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    maximizeIcon: 'fa-expand',
    minimizeIcon: 'fa-compress',
  }

  class CardWidget {
    constructor(element, settings) {
      this._element  = element
      this._parent = element.parents(Selector.CARD).first()

      if (element.hasClass(ClassName.CARD)) {
        this._parent = element
      }

      this._settings = $.extend({}, Default, settings)
    }

    collapse() {
      this._parent.addClass(ClassName.COLLAPSING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)
        .slideUp(this._settings.animationSpeed, () => {
          this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING)
        })

      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon)
        .addClass(this._settings.expandIcon)
        .removeClass(this._settings.collapseIcon)

      const collapsed = $.Event(Event.COLLAPSED)

      this._element.trigger(collapsed, this._parent)
    }

    expand() {
      this._parent.addClass(ClassName.EXPANDING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)
        .slideDown(this._settings.animationSpeed, () => {
          this._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING)
        })

      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon)
        .addClass(this._settings.collapseIcon)
        .removeClass(this._settings.expandIcon)

      const expanded = $.Event(Event.EXPANDED)

      this._element.trigger(expanded, this._parent)
    }

    remove() {
      this._parent.slideUp()

      const removed = $.Event(Event.REMOVED)

      this._element.trigger(removed, this._parent)
    }

    toggle() {
      if (this._parent.hasClass(ClassName.COLLAPSED)) {
        this.expand()
        return
      }

      this.collapse()
    }
    
    maximize() {
      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon)
        .addClass(this._settings.minimizeIcon)
        .removeClass(this._settings.maximizeIcon)
      this._parent.css({
        'height': this._parent.height(),
        'width': this._parent.width(),
        'transition': 'all .15s'
      }).delay(150).queue(function(){
        $(this).addClass(ClassName.MAXIMIZED)
        $('html').addClass(ClassName.MAXIMIZED)
        if ($(this).hasClass(ClassName.COLLAPSED)) {
          $(this).addClass(ClassName.WAS_COLLAPSED)
        }
        $(this).dequeue()
      })

      const maximized = $.Event(Event.MAXIMIZED)

      this._element.trigger(maximized, this._parent)
    }

    minimize() {
      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon)
        .addClass(this._settings.maximizeIcon)
        .removeClass(this._settings.minimizeIcon)
      this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' +
        'width:' + this._parent[0].style.width + ' !important; transition: all .15s;'
      ).delay(10).queue(function(){
        $(this).removeClass(ClassName.MAXIMIZED)
        $('html').removeClass(ClassName.MAXIMIZED)
        $(this).css({
          'height': 'inherit',
          'width': 'inherit'
        })
        if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
          $(this).removeClass(ClassName.WAS_COLLAPSED)
        }
        $(this).dequeue()
      })

      const MINIMIZED = $.Event(Event.MINIMIZED)

      this._element.trigger(MINIMIZED, this._parent)
    }

    toggleMaximize() {
      if (this._parent.hasClass(ClassName.MAXIMIZED)) {
        this.minimize()
        return
      }

      this.maximize()
    }

    // Private

    _init(card) {
      this._parent = card

      $(this).find(this._settings.collapseTrigger).click(() => {
        this.toggle()
      })

      $(this).find(this._settings.maximizeTrigger).click(() => {
        this.toggleMaximize()
      })

      $(this).find(this._settings.removeTrigger).click(() => {
        this.remove()
      })
    }

    // Static

    static _jQueryInterface(config) {
      let data = $(this).data(DATA_KEY)
      const _options = $.extend({}, Default, $(this).data())

      if (!data) {
        data = new CardWidget($(this), _options)
        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)
      }

      if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
        data[config]()
      } else if (typeof config === 'object') {
        data._init($(this))
      }
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault()
    }

    CardWidget._jQueryInterface.call($(this), 'toggle')
  })

  $(document).on('click', Selector.DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault()
    }

    CardWidget._jQueryInterface.call($(this), 'remove')
  })

  $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
    if (event) {
      event.preventDefault()
    }

    CardWidget._jQueryInterface.call($(this), 'toggleMaximize')
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = CardWidget._jQueryInterface
  $.fn[NAME].Constructor = CardWidget
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return CardWidget._jQueryInterface
  }

  return CardWidget
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (CardWidget);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/ControlSidebar.js":
/*!***********************************************************!*\
  !*** ./node_modules/admin-lte/build/js/ControlSidebar.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

const ControlSidebar = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'ControlSidebar'
  const DATA_KEY           = 'lte.controlsidebar'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DATA_API_KEY       = '.data-api'

  const Event = {
    COLLAPSED: `collapsed${EVENT_KEY}`,
    EXPANDED: `expanded${EVENT_KEY}`,
  }

  const Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
    DATA_TOGGLE: '[data-widget="control-sidebar"]',
    CONTENT: '.content-wrapper',
    HEADER: '.main-header',
    FOOTER: '.main-footer',
  }

  const ClassName = {
    CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',
    LAYOUT_FIXED: 'layout-fixed',
    NAVBAR_FIXED: 'layout-navbar-fixed',
    NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',
    NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',
    NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',
    NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',
    FOOTER_FIXED: 'layout-footer-fixed',
    FOOTER_SM_FIXED: 'layout-sm-footer-fixed',
    FOOTER_MD_FIXED: 'layout-md-footer-fixed',
    FOOTER_LG_FIXED: 'layout-lg-footer-fixed',
    FOOTER_XL_FIXED: 'layout-xl-footer-fixed',
  }

  const Default = {
    controlsidebarSlide: true,
    scrollbarTheme : 'os-theme-light',
    scrollbarAutoHide: 'l',
  }

  /**
   * Class Definition
   * ====================================================
   */

  class ControlSidebar {
    constructor(element, config) {
      this._element = element
      this._config  = config

      this._init()
    }

    // Public

    collapse() {
      // Show the control sidebar
      if (this._config.controlsidebarSlide) {
        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){
          $(Selector.CONTROL_SIDEBAR).hide()
          $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
          $(this).dequeue()
        })
      } else {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN)
      }

      const collapsedEvent = $.Event(Event.COLLAPSED)
      $(this._element).trigger(collapsedEvent)
    }

    show() {
      // Collapse the control sidebar
      if (this._config.controlsidebarSlide) {
        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
        $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function(){
          $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){
            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)
            $(this).dequeue()
          })
          $(this).dequeue()
        })
      } else {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN)
      }

      const expandedEvent = $.Event(Event.EXPANDED)
      $(this._element).trigger(expandedEvent)
    }

    toggle() {
      const shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body')
        .hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)
      if (shouldClose) {
        // Close the control sidebar
        this.collapse()
      } else {
        // Open the control sidebar
        this.show()
      }
    }

    // Private

    _init() {
      this._fixHeight()
      this._fixScrollHeight()

      $(window).resize(() => {
        this._fixHeight()
        this._fixScrollHeight()
      })

      $(window).scroll(() => {
        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {
            this._fixScrollHeight()
        }
      })
    }

    _fixScrollHeight() {
      const heights = {
        scroll: $(document).height(),
        window: $(window).height(),
        header: $(Selector.HEADER).outerHeight(),
        footer: $(Selector.FOOTER).outerHeight(),
      }
      const positions = {
        bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),
        top: $(window).scrollTop(),
      }

      let navbarFixed = false;
      let footerFixed = false;

      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
        if (
          $('body').hasClass(ClassName.NAVBAR_FIXED)
          || $('body').hasClass(ClassName.NAVBAR_SM_FIXED)
          || $('body').hasClass(ClassName.NAVBAR_MD_FIXED)
          || $('body').hasClass(ClassName.NAVBAR_LG_FIXED)
          || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)
        ) {
          if ($(Selector.HEADER).css("position") === "fixed") {
            navbarFixed = true;
          }
        }
        if (
          $('body').hasClass(ClassName.FOOTER_FIXED)
          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)
          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)
          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)
          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)
        ) {
          if ($(Selector.FOOTER).css("position") === "fixed") {
            footerFixed = true;
          }
        }

        if (positions.top === 0 && positions.bottom === 0) {
          $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
          $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
          $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer))
        } else if (positions.bottom <= heights.footer) {
          if (footerFixed === false) {  
            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom))
          } else {
            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
          }
        } else if (positions.top <= heights.header) {
          if (navbarFixed === false) {
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top))
          } else {
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
          }
        } else {
          if (navbarFixed === false) {
            $(Selector.CONTROL_SIDEBAR).css('top', 0);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window)
          } else {
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
          }
        }
      }
    }

    _fixHeight() {
      const heights = {
        window: $(window).height(),
        header: $(Selector.HEADER).outerHeight(),
        footer: $(Selector.FOOTER).outerHeight(),
      }

      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
        let sidebarHeight = heights.window - heights.header;

        if (
          $('body').hasClass(ClassName.FOOTER_FIXED)
          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)
          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)
          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)
          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)
        ) {
          if ($(Selector.FOOTER).css("position") === "fixed") {
            sidebarHeight = heights.window - heights.header - heights.footer;
          }
        }

        $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight)
        
        if (typeof $.fn.overlayScrollbars !== 'undefined') {
          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({
            className       : this._config.scrollbarTheme,
            sizeAutoCapable : true,
            scrollbars : {
              autoHide: this._config.scrollbarAutoHide, 
              clickScrolling : true
            }
          })
        }
      }
    }


    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new ControlSidebar(this, _options)
          $(this).data(DATA_KEY, data)
        }

        if (data[operation] === 'undefined') {
          throw new Error(`${operation} is not a function`)
        }

        data[operation]()
      })
    }
  }

  /**
   *
   * Data Api implementation
   * ====================================================
   */
  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault()

    ControlSidebar._jQueryInterface.call($(this), 'toggle')
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ControlSidebar._jQueryInterface
  $.fn[NAME].Constructor = ControlSidebar
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return ControlSidebar._jQueryInterface
  }

  return ControlSidebar
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (ControlSidebar);
  


/***/ }),

/***/ "./node_modules/admin-lte/build/js/DirectChat.js":
/*!*******************************************************!*\
  !*** ./node_modules/admin-lte/build/js/DirectChat.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE DirectChat.js
 * License MIT
 * --------------------------------------------
 */

const DirectChat = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'DirectChat'
  const DATA_KEY           = 'lte.directchat'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]
  const DATA_API_KEY       = '.data-api'

  const Event = {
    TOGGLED: `toggled{EVENT_KEY}`
  }

  const Selector = {
    DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
    DIRECT_CHAT: '.direct-chat'
  };

  const ClassName = {
    DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
  };

  /**
   * Class Definition
   * ====================================================
   */

  class DirectChat {
    constructor(element, config) {
      this._element = element
    }

    toggle() {
      $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);

      const toggledEvent = $.Event(Event.TOGGLED)
      $(this._element).trigger(toggledEvent)
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data      = $(this).data(DATA_KEY)

        if (!data) {
          data = new DirectChat($(this))
          $(this).data(DATA_KEY, data)
        }

        data[config]()
      })
    }
  }

  /**
   *
   * Data Api implementation
   * ====================================================
   */

  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    if (event) event.preventDefault();
    DirectChat._jQueryInterface.call($(this), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = DirectChat._jQueryInterface
  $.fn[NAME].Constructor = DirectChat
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return DirectChat._jQueryInterface
  }

  return DirectChat
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (DirectChat);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/Dropdown.js":
/*!*****************************************************!*\
  !*** ./node_modules/admin-lte/build/js/Dropdown.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE Dropdown.js
 * License MIT
 * --------------------------------------------
 */

const Dropdown = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Dropdown'
  const DATA_KEY           = 'lte.dropdown'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Selector = {
    NAVBAR: '.navbar',
    DROPDOWN_MENU: '.dropdown-menu',
    DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',
    DROPDOWN_TOGGLE: '[data-toggle="dropdown"]',
  }

  const ClassName = {
    DROPDOWN_HOVER: 'dropdown-hover',
    DROPDOWN_RIGHT: 'dropdown-menu-right'
  }

  const Default = {
  }


  /**
   * Class Definition
   * ====================================================
   */

  class Dropdown {
    constructor(element, config) {
      this._config  = config
      this._element = element
    }

    // Public

    toggleSubmenu() {
      this._element.siblings().show().toggleClass("show")

      if (! this._element.next().hasClass('show')) {
        this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide()
      }

      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show").hide()
      })
    }

    fixPosition() {
      let elm = $(Selector.DROPDOWN_MENU_ACTIVE)

      if (elm.length !== 0) {
        if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {
          elm.css('left', 'inherit')
          elm.css('right', 0)
        } else {
          elm.css('left', 0)
          elm.css('right', 'inherit')
        }

        let offset = elm.offset()
        let width = elm.width()
        let windowWidth = $(window).width()
        let visiblePart = windowWidth - offset.left

        if (offset.left < 0) {
          elm.css('left', 'inherit')
          elm.css('right', (offset.left - 5))
        } else {
          if (visiblePart < width) {
            elm.css('left', 'inherit')
            elm.css('right', 0)
          }
        }
      }  
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data      = $(this).data(DATA_KEY)
        const _config = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Dropdown($(this), _config)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'toggleSubmenu' || config == 'fixPosition') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function(event) {
    event.preventDefault()
    event.stopPropagation()

    Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')
  });

  $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function(event) {
    event.preventDefault()

    setTimeout(function() {
      Dropdown._jQueryInterface.call($(this), 'fixPosition')
    }, 1)
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Dropdown._jQueryInterface
  $.fn[NAME].Constructor = Dropdown
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Dropdown._jQueryInterface
  }

  return Dropdown
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (Dropdown);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/Layout.js":
/*!***************************************************!*\
  !*** ./node_modules/admin-lte/build/js/Layout.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

const Layout = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Layout'
  const DATA_KEY           = 'lte.layout'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    SIDEBAR: 'sidebar'
  }

  const Selector = {
    HEADER         : '.main-header',
    MAIN_SIDEBAR   : '.main-sidebar',
    SIDEBAR        : '.main-sidebar .sidebar',
    CONTENT        : '.content-wrapper',
    BRAND          : '.brand-link',
    CONTENT_HEADER : '.content-header',
    WRAPPER        : '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
    CONTROL_SIDEBAR_BTN: '[data-widget="control-sidebar"]',
    LAYOUT_FIXED   : '.layout-fixed',
    FOOTER         : '.main-footer',
    PUSHMENU_BTN   : '[data-widget="pushmenu"]',
    LOGIN_BOX      : '.login-box',
    REGISTER_BOX   : '.register-box'
  }

  const ClassName = {
    HOLD           : 'hold-transition',
    SIDEBAR        : 'main-sidebar',
    CONTENT_FIXED  : 'content-fixed',
    SIDEBAR_FOCUSED: 'sidebar-focused',
    LAYOUT_FIXED   : 'layout-fixed',
    NAVBAR_FIXED   : 'layout-navbar-fixed',
    FOOTER_FIXED   : 'layout-footer-fixed',
    LOGIN_PAGE     : 'login-page',
    REGISTER_PAGE  : 'register-page',
    CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
  }

  const Default = {
    scrollbarTheme : 'os-theme-light',
    scrollbarAutoHide: 'l',
    panelAutoHeight: true,
    loginRegisterAutoHeight: true,
  }

  /**
   * Class Definition
   * ====================================================
   */

  class Layout {
    constructor(element, config) {
      this._config  = config
      this._element = element

      this._init()
    }

    // Public

    fixLayoutHeight(extra = null) {
      let control_sidebar = 0

      if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {
        control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height()
      }

      const heights = {
        window: $(window).height(),
        header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
        footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
        sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
        control_sidebar: control_sidebar,
      }

      const max = this._max(heights)
      let offset = this._config.panelAutoHeight

      if (offset === true) {
        offset = 0;
      }

      if (offset !== false) {
        if (max == heights.control_sidebar) {
          $(Selector.CONTENT).css('min-height', (max + offset))
        } else if (max == heights.window) {
          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)
        } else {
          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header)
        }
        if (this._isFooterFixed()) {
          $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);
        }
      }

      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
        if (offset !== false) {
          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)
        }

        if (typeof $.fn.overlayScrollbars !== 'undefined') {
          $(Selector.SIDEBAR).overlayScrollbars({
            className       : this._config.scrollbarTheme,
            sizeAutoCapable : true,
            scrollbars : {
              autoHide: this._config.scrollbarAutoHide, 
              clickScrolling : true
            }
          })
        }
      }
    }

    fixLoginRegisterHeight() {
      if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
        $('body, html').css('height', 'auto')
      } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
        let box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height()

        if ($('body').css('min-height') !== box_height) {
          $('body').css('min-height', box_height)
        }
      }
    }

    // Private

    _init() {
      // Activate layout height watcher
      this.fixLayoutHeight()

      if (this._config.loginRegisterAutoHeight === true) {
        this.fixLoginRegisterHeight()
      } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {
        setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
      }

      $(Selector.SIDEBAR)
        .on('collapsed.lte.treeview expanded.lte.treeview', () => {
          this.fixLayoutHeight()
        })

      $(Selector.PUSHMENU_BTN)
        .on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {
          this.fixLayoutHeight()
        })

      $(Selector.CONTROL_SIDEBAR_BTN)
        .on('collapsed.lte.controlsidebar', () => {
          this.fixLayoutHeight()
        })
        .on('expanded.lte.controlsidebar', () => {
          this.fixLayoutHeight('control_sidebar')
        })

      $(window).resize(() => {
        this.fixLayoutHeight()
      })

      setTimeout(() => {
        $('body.hold-transition').removeClass('hold-transition')

      }, 50);
    }

    _max(numbers) {
      // Calculate the maximum number in a list
      let max = 0

      Object.keys(numbers).forEach((key) => {
        if (numbers[key] > max) {
          max = numbers[key]
        }
      })

      return max
    }

    _isFooterFixed() {
      return $('.main-footer').css('position') === 'fixed';
    }

    // Static

    static _jQueryInterface(config = '') {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Layout($(this), _options)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init' || config === '') {
          data['_init']()
        } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(window).on('load', () => {
    Layout._jQueryInterface.call($('body'))
  })

  $(Selector.SIDEBAR + ' a').on('focusin', () => {
    $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
  })

  $(Selector.SIDEBAR + ' a').on('focusout', () => {
    $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface
  $.fn[NAME].Constructor = Layout
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Layout._jQueryInterface
  }

  return Layout
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (Layout);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/PushMenu.js":
/*!*****************************************************!*\
  !*** ./node_modules/admin-lte/build/js/PushMenu.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

const PushMenu = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'PushMenu'
  const DATA_KEY           = 'lte.pushmenu'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    COLLAPSED: `collapsed${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`
  }

  const Default = {
    autoCollapseSize: 992,
    enableRemember: false,
    noTransitionAfterReload: true
  }

  const Selector = {
    TOGGLE_BUTTON: '[data-widget="pushmenu"]',
    SIDEBAR_MINI: '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY: 'body',
    OVERLAY: '#sidebar-overlay',
    WRAPPER: '.wrapper'
  }

  const ClassName = {
    COLLAPSED: 'sidebar-collapse',
    OPEN: 'sidebar-open',
    CLOSED: 'sidebar-closed'
  }

  /**
   * Class Definition
   * ====================================================
   */

  class PushMenu {
    constructor(element, options) {
      this._element = element
      this._options = $.extend({}, Default, options)

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay()
      }

      this._init()
    }

    // Public

    expand() {
      if (this._options.autoCollapseSize) {
        if ($(window).width() <= this._options.autoCollapseSize) {
          $(Selector.BODY).addClass(ClassName.OPEN)
        }
      }

      $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED)

      if(this._options.enableRemember) {
        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.OPEN)
      }

      const shownEvent = $.Event(Event.SHOWN)
      $(this._element).trigger(shownEvent)
    }

    collapse() {
      if (this._options.autoCollapseSize) {
        if ($(window).width() <= this._options.autoCollapseSize) {
          $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED)
        }
      }

      $(Selector.BODY).addClass(ClassName.COLLAPSED)

      if(this._options.enableRemember) {
        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.COLLAPSED)
      }

      const collapsedEvent = $.Event(Event.COLLAPSED)
      $(this._element).trigger(collapsedEvent)
    }

    toggle() {
      if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
        this.collapse()
      } else {
        this.expand()
      }
    }

    autoCollapse(resize = false) {
      if (this._options.autoCollapseSize) {
        if ($(window).width() <= this._options.autoCollapseSize) {
          if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
            this.collapse()
          }
        } else if (resize == true) {
          if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
            $(Selector.BODY).removeClass(ClassName.OPEN)
          } else if($(Selector.BODY).hasClass(ClassName.CLOSED)) {
            this.expand()
          }
        }
      }
    }

    remember() {
      if(this._options.enableRemember) {
        let toggleState = localStorage.getItem(`remember${EVENT_KEY}`)
        if (toggleState == ClassName.COLLAPSED){
          if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function() {
                $(this).removeClass('hold-transition')
                $(this).dequeue()
              })
          } else {
            $("body").addClass(ClassName.COLLAPSED)
          }
        } else {
          if (this._options.noTransitionAfterReload) {
            $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function() {
              $(this).removeClass('hold-transition')
              $(this).dequeue()
            })
          } else {
            $("body").removeClass(ClassName.COLLAPSED)
          }
        }
      }
    }

    // Private

    _init() {
      this.remember()
      this.autoCollapse()

      $(window).resize(() => {
        this.autoCollapse(true)
      })
    }

    _addOverlay() {
      const overlay = $('<div />', {
        id: 'sidebar-overlay'
      })

      overlay.on('click', () => {
        this.collapse()
      })

      $(Selector.WRAPPER).append(overlay)
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new PushMenu(this, _options)
          $(this).data(DATA_KEY, data)
        }

        if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
          data[operation]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.TOGGLE_BUTTON, (event) => {
    event.preventDefault()

    let button = event.currentTarget

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON)
    }

    PushMenu._jQueryInterface.call($(button), 'toggle')
  })

  $(window).on('load', () => {
    PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON))
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface
  $.fn[NAME].Constructor = PushMenu
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return PushMenu._jQueryInterface
  }

  return PushMenu
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (PushMenu);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/Toasts.js":
/*!***************************************************!*\
  !*** ./node_modules/admin-lte/build/js/Toasts.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE Toasts.js
 * License MIT
 * --------------------------------------------
 */

const Toasts = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Toasts'
  const DATA_KEY           = 'lte.toasts'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    INIT: `init${EVENT_KEY}`,
    CREATED: `created${EVENT_KEY}`,
    REMOVED: `removed${EVENT_KEY}`,
  }

  const Selector = {
    BODY: 'toast-body',
    CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',
    CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',
    CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',
    CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft',
  }

  const ClassName = {
    TOP_RIGHT: 'toasts-top-right',
    TOP_LEFT: 'toasts-top-left',
    BOTTOM_RIGHT: 'toasts-bottom-right',
    BOTTOM_LEFT: 'toasts-bottom-left',
    FADE: 'fade',
  }

  const Position = {
    TOP_RIGHT: 'topRight',
    TOP_LEFT: 'topLeft',
    BOTTOM_RIGHT: 'bottomRight',
    BOTTOM_LEFT: 'bottomLeft',
  }

  const Id = {
    CONTAINER_TOP_RIGHT: 'toastsContainerTopRight',
    CONTAINER_TOP_LEFT: 'toastsContainerTopLeft',
    CONTAINER_BOTTOM_RIGHT: 'toastsContainerBottomRight',
    CONTAINER_BOTTOM_LEFT: 'toastsContainerBottomLeft',
  }

  const Default = {
    position: Position.TOP_RIGHT,
    fixed: true,
    autohide: false,
    autoremove: true,
    delay: 1000,
    fade: true,
    icon: null,
    image: null,
    imageAlt: null,
    imageHeight: '25px',
    title: null,
    subtitle: null,
    close: true,
    body: null,
    class: null,
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Toasts {
    constructor(element, config) {
      this._config  = config

      this._prepareContainer();

      const initEvent = $.Event(Event.INIT)
      $('body').trigger(initEvent)
    }

    // Public

    create() {
      var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>')

      toast.data('autohide', this._config.autohide)
      toast.data('animation', this._config.fade)
      
      if (this._config.class) {
        toast.addClass(this._config.class)
      }

      if (this._config.delay && this._config.delay != 500) {
        toast.data('delay', this._config.delay)
      }

      var toast_header = $('<div class="toast-header">')

      if (this._config.image != null) {
        var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)
        
        if (this._config.imageHeight != null) {
          toast_image.height(this._config.imageHeight).width('auto')
        }

        toast_header.append(toast_image)
      }

      if (this._config.icon != null) {
        toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon))
      }

      if (this._config.title != null) {
        toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title))
      }

      if (this._config.subtitle != null) {
        toast_header.append($('<small />').html(this._config.subtitle))
      }

      if (this._config.close == true) {
        var toast_close = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>')
        
        if (this._config.title == null) {
          toast_close.toggleClass('ml-2 ml-auto')
        }
        
        toast_header.append(toast_close)
      }

      toast.append(toast_header)

      if (this._config.body != null) {
        toast.append($('<div class="toast-body" />').html(this._config.body))
      }

      $(this._getContainerId()).prepend(toast)

      const createdEvent = $.Event(Event.CREATED)
      $('body').trigger(createdEvent)

      toast.toast('show')


      if (this._config.autoremove) {
        toast.on('hidden.bs.toast', function () {
          $(this).delay(200).remove();

          const removedEvent = $.Event(Event.REMOVED)
          $('body').trigger(removedEvent)
        })
      }


    }

    // Static

    _getContainerId() {
      if (this._config.position == Position.TOP_RIGHT) {
        return Selector.CONTAINER_TOP_RIGHT;
      } else if (this._config.position == Position.TOP_LEFT) {
        return Selector.CONTAINER_TOP_LEFT;
      } else if (this._config.position == Position.BOTTOM_RIGHT) {
        return Selector.CONTAINER_BOTTOM_RIGHT;
      } else if (this._config.position == Position.BOTTOM_LEFT) {
        return Selector.CONTAINER_BOTTOM_LEFT;
      }
    }

    _prepareContainer() {
      if ($(this._getContainerId()).length === 0) {
        var container = $('<div />').attr('id', this._getContainerId().replace('#', ''))
        if (this._config.position == Position.TOP_RIGHT) {
          container.addClass(ClassName.TOP_RIGHT)
        } else if (this._config.position == Position.TOP_LEFT) {
          container.addClass(ClassName.TOP_LEFT)
        } else if (this._config.position == Position.BOTTOM_RIGHT) {
          container.addClass(ClassName.BOTTOM_RIGHT)
        } else if (this._config.position == Position.BOTTOM_LEFT) {
          container.addClass(ClassName.BOTTOM_LEFT)
        }

        $('body').append(container)
      }

      if (this._config.fixed) {
        $(this._getContainerId()).addClass('fixed')
      } else {
        $(this._getContainerId()).removeClass('fixed')
      }
    }

    // Static

    static _jQueryInterface(option, config) {
      return this.each(function () {
        const _options = $.extend({}, Default, config)
        var toast = new Toasts($(this), _options)

        if (option === 'create') {
          toast[option]()
        }
      })
    }
  }

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Toasts._jQueryInterface
  $.fn[NAME].Constructor = Toasts
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Toasts._jQueryInterface
  }

  return Toasts
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (Toasts);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/TodoList.js":
/*!*****************************************************!*\
  !*** ./node_modules/admin-lte/build/js/TodoList.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE TodoList.js
 * License MIT
 * --------------------------------------------
 */

const TodoList = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'TodoList'
  const DATA_KEY           = 'lte.todolist'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Selector = {
    DATA_TOGGLE: '[data-widget="todo-list"]'
  }

  const ClassName = {
    TODO_LIST_DONE: 'done'
  }

  const Default = {
    onCheck: function (item) {
      return item;
    },
    onUnCheck: function (item) {
      return item;
    }
  }

  /**
   * Class Definition
   * ====================================================
   */

  class TodoList {
    constructor(element, config) {
      this._config  = config
      this._element = element

      this._init()
    }

    // Public

    toggle(item) {
      item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);
      if (! $(item).prop('checked')) {
        this.unCheck($(item));
        return;
      }

      this.check(item);
    }

    check (item) {
      this._config.onCheck.call(item);
    }

    unCheck (item) {
      this._config.onUnCheck.call(item);
    }

    // Private

    _init() {
      var that = this
      $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE)
      $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', (event) => {
        that.toggle($(event.target))
      })
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new TodoList($(this), _options)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(window).on('load', () => {
    TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE))
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = TodoList._jQueryInterface
  $.fn[NAME].Constructor = TodoList
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return TodoList._jQueryInterface
  }

  return TodoList
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (TodoList);


/***/ }),

/***/ "./node_modules/admin-lte/build/js/Treeview.js":
/*!*****************************************************!*\
  !*** ./node_modules/admin-lte/build/js/Treeview.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

const Treeview = (($) => {
  /**
   * Constants
   * ====================================================
   */

  const NAME               = 'Treeview'
  const DATA_KEY           = 'lte.treeview'
  const EVENT_KEY          = `.${DATA_KEY}`
  const JQUERY_NO_CONFLICT = $.fn[NAME]

  const Event = {
    SELECTED     : `selected${EVENT_KEY}`,
    EXPANDED     : `expanded${EVENT_KEY}`,
    COLLAPSED    : `collapsed${EVENT_KEY}`,
    LOAD_DATA_API: `load${EVENT_KEY}`
  }

  const Selector = {
    LI           : '.nav-item',
    LINK         : '.nav-link',
    TREEVIEW_MENU: '.nav-treeview',
    OPEN         : '.menu-open',
    DATA_WIDGET  : '[data-widget="treeview"]'
  }

  const ClassName = {
    LI               : 'nav-item',
    LINK             : 'nav-link',
    TREEVIEW_MENU    : 'nav-treeview',
    OPEN             : 'menu-open',
    SIDEBAR_COLLAPSED: 'sidebar-collapse'
  }

  const Default = {
    trigger              : `${Selector.DATA_WIDGET} ${Selector.LINK}`,
    animationSpeed       : 300,
    accordion            : true,
    expandSidebar        : false,
    sidebarButtonSelector: '[data-widget="pushmenu"]'
  }

  /**
   * Class Definition
   * ====================================================
   */
  class Treeview {
    constructor(element, config) {
      this._config  = config
      this._element = element
    }

    // Public

    init() {
      this._setupListeners()
    }

    expand(treeviewMenu, parentLi) {
      const expandedEvent = $.Event(Event.EXPANDED)

      if (this._config.accordion) {
        const openMenuLi   = parentLi.siblings(Selector.OPEN).first()
        const openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first()
        this.collapse(openTreeview, openMenuLi)
      }

      treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {
        parentLi.addClass(ClassName.OPEN)
        $(this._element).trigger(expandedEvent)
      })

      if (this._config.expandSidebar) {
        this._expandSidebar()
      }
    }

    collapse(treeviewMenu, parentLi) {
      const collapsedEvent = $.Event(Event.COLLAPSED)

      treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {
        parentLi.removeClass(ClassName.OPEN)
        $(this._element).trigger(collapsedEvent)
        treeviewMenu.find(`${Selector.OPEN} > ${Selector.TREEVIEW_MENU}`).slideUp()
        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN)
      })
    }

    toggle(event) {

      const $relativeTarget = $(event.currentTarget)
      const $parent = $relativeTarget.parent()

      let treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU)

      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {

        if (!$parent.is(Selector.LI)) {
          treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU)
        }

        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
          return
        }
      }
      
      event.preventDefault()

      const parentLi = $relativeTarget.parents(Selector.LI).first()
      const isOpen   = parentLi.hasClass(ClassName.OPEN)

      if (isOpen) {
        this.collapse($(treeviewMenu), parentLi)
      } else {
        this.expand($(treeviewMenu), parentLi)
      }
    }

    // Private

    _setupListeners() {
      $(document).on('click', this._config.trigger, (event) => {
        this.toggle(event)
      })
    }

    _expandSidebar() {
      if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
        $(this._config.sidebarButtonSelector).PushMenu('expand')
      }
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY)
        const _options = $.extend({}, Default, $(this).data())

        if (!data) {
          data = new Treeview($(this), _options)
          $(this).data(DATA_KEY, data)
        }

        if (config === 'init') {
          data[config]()
        }
      })
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, () => {
    $(Selector.DATA_WIDGET).each(function () {
      Treeview._jQueryInterface.call($(this), 'init')
    })
  })

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Treeview._jQueryInterface
  $.fn[NAME].Constructor = Treeview
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Treeview._jQueryInterface
  }

  return Treeview
})(jQuery)

/* harmony default export */ __webpack_exports__["default"] = (Treeview);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtaW4tbHRlL2J1aWxkL2pzL0FkbWluTFRFLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG1pbi1sdGUvYnVpbGQvanMvQ2FyZFJlZnJlc2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbWluLWx0ZS9idWlsZC9qcy9DYXJkV2lkZ2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG1pbi1sdGUvYnVpbGQvanMvQ29udHJvbFNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbWluLWx0ZS9idWlsZC9qcy9EaXJlY3RDaGF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG1pbi1sdGUvYnVpbGQvanMvRHJvcGRvd24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbWluLWx0ZS9idWlsZC9qcy9MYXlvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbWluLWx0ZS9idWlsZC9qcy9QdXNoTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtaW4tbHRlL2J1aWxkL2pzL1RvYXN0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtaW4tbHRlL2J1aWxkL2pzL1RvZG9MaXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG1pbi1sdGUvYnVpbGQvanMvVHJlZXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTZDO0FBQ2hCO0FBQ0k7QUFDQTtBQUNJO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNDO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIsVUFBVTtBQUN2Qzs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVjLDZFQUFjOzs7Ozs7Ozs7Ozs7OztBQ2xTN0I7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFYyx5RUFBVTs7Ozs7Ozs7Ozs7OztBQzNGekI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFYyx1RUFBUTs7Ozs7Ozs7Ozs7OztBQzlJdkI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRWMscUVBQU07Ozs7Ozs7Ozs7Ozs7QUMzUHJCO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDOztBQUVBO0FBQ0EsMkJBQTJCLFVBQVU7QUFDckMsbUJBQW1CLFVBQVU7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDOztBQUVqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3Q0FBd0MsVUFBVTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELFVBQVU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFYyx1RUFBUTs7Ozs7Ozs7Ozs7OztBQ2hPdkI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFNBQVM7QUFDMUM7O0FBRUE7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQix1QkFBdUIsVUFBVTtBQUNqQyx1QkFBdUIsVUFBVTtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzTEFBc0w7O0FBRXRMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0Es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dGVudCI6WyJpbXBvcnQgQ29udHJvbFNpZGViYXIgZnJvbSAnLi9Db250cm9sU2lkZWJhcidcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi9MYXlvdXQnXG5pbXBvcnQgUHVzaE1lbnUgZnJvbSAnLi9QdXNoTWVudSdcbmltcG9ydCBUcmVldmlldyBmcm9tICcuL1RyZWV2aWV3J1xuaW1wb3J0IERpcmVjdENoYXQgZnJvbSAnLi9EaXJlY3RDaGF0J1xuaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vVG9kb0xpc3QnXG5pbXBvcnQgQ2FyZFdpZGdldCBmcm9tICcuL0NhcmRXaWRnZXQnXG5pbXBvcnQgQ2FyZFJlZnJlc2ggZnJvbSAnLi9DYXJkUmVmcmVzaCdcbmltcG9ydCBEcm9wZG93biBmcm9tICcuL0Ryb3Bkb3duJ1xuaW1wb3J0IFRvYXN0cyBmcm9tICcuL1RvYXN0cydcblxuZXhwb3J0IHtcbiAgQ29udHJvbFNpZGViYXIsXG4gIExheW91dCxcbiAgUHVzaE1lbnUsXG4gIFRyZWV2aWV3LFxuICBEaXJlY3RDaGF0LFxuICBUb2RvTGlzdCxcbiAgQ2FyZFdpZGdldCxcbiAgQ2FyZFJlZnJlc2gsXG4gIERyb3Bkb3duLFxuICBUb2FzdHNcbn1cbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFkbWluTFRFIENhcmRSZWZyZXNoLmpzXG4gKiBMaWNlbnNlIE1JVFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBDYXJkUmVmcmVzaCA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ0NhcmRSZWZyZXNoJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnbHRlLmNhcmRyZWZyZXNoJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgTE9BREVEOiBgbG9hZGVkJHtFVkVOVF9LRVl9YCxcbiAgICBPVkVSTEFZX0FEREVEOiBgb3ZlcmxheS5hZGRlZCR7RVZFTlRfS0VZfWAsXG4gICAgT1ZFUkxBWV9SRU1PVkVEOiBgb3ZlcmxheS5yZW1vdmVkJHtFVkVOVF9LRVl9YCxcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBDQVJEOiAnY2FyZCcsXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBDQVJEOiBgLiR7Q2xhc3NOYW1lLkNBUkR9YCxcbiAgICBEQVRBX1JFRlJFU0g6ICdbZGF0YS1jYXJkLXdpZGdldD1cImNhcmQtcmVmcmVzaFwiXScsXG4gIH1cblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIHNvdXJjZTogJycsXG4gICAgc291cmNlU2VsZWN0b3I6ICcnLFxuICAgIHBhcmFtczoge30sXG4gICAgdHJpZ2dlcjogU2VsZWN0b3IuREFUQV9SRUZSRVNILFxuICAgIGNvbnRlbnQ6ICcuY2FyZC1ib2R5JyxcbiAgICBsb2FkSW5Db250ZW50OiB0cnVlLFxuICAgIGxvYWRPbkluaXQ6IHRydWUsXG4gICAgcmVzcG9uc2VUeXBlOiAnJyxcbiAgICBvdmVybGF5VGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPjxpIGNsYXNzPVwiZmFzIGZhLTJ4IGZhLXN5bmMtYWx0IGZhLXNwaW5cIj48L2k+PC9kaXY+JyxcbiAgICBvbkxvYWRTdGFydDogZnVuY3Rpb24gKCkge1xuICAgIH0sXG4gICAgb25Mb2FkRG9uZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgY2xhc3MgQ2FyZFJlZnJlc2gge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX3BhcmVudCA9IGVsZW1lbnQucGFyZW50cyhTZWxlY3Rvci5DQVJEKS5maXJzdCgpXG4gICAgICB0aGlzLl9zZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCBzZXR0aW5ncylcbiAgICAgIHRoaXMuX292ZXJsYXkgPSAkKHRoaXMuX3NldHRpbmdzLm92ZXJsYXlUZW1wbGF0ZSlcblxuICAgICAgaWYgKGVsZW1lbnQuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUkQpKSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IGVsZW1lbnRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNvdXJjZSA9PT0gJycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb3VyY2UgdXJsIHdhcyBub3QgZGVmaW5lZC4gUGxlYXNlIHNwZWNpZnkgYSB1cmwgaW4geW91ciBDYXJkUmVmcmVzaCBzb3VyY2Ugb3B0aW9uLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxvYWQoKSB7XG4gICAgICB0aGlzLl9hZGRPdmVybGF5KClcbiAgICAgIHRoaXMuX3NldHRpbmdzLm9uTG9hZFN0YXJ0LmNhbGwoJCh0aGlzKSlcblxuICAgICAgJC5nZXQodGhpcy5fc2V0dGluZ3Muc291cmNlLCB0aGlzLl9zZXR0aW5ncy5wYXJhbXMsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubG9hZEluQ29udGVudCkge1xuICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zb3VyY2VTZWxlY3RvciAhPSAnJykge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSAkKHJlc3BvbnNlKS5maW5kKHRoaXMuX3NldHRpbmdzLnNvdXJjZVNlbGVjdG9yKS5odG1sKClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9wYXJlbnQuZmluZCh0aGlzLl9zZXR0aW5ncy5jb250ZW50KS5odG1sKHJlc3BvbnNlKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3Mub25Mb2FkRG9uZS5jYWxsKCQodGhpcyksIHJlc3BvbnNlKVxuICAgICAgICB0aGlzLl9yZW1vdmVPdmVybGF5KCk7XG4gICAgICB9LmJpbmQodGhpcyksIHRoaXMuX3NldHRpbmdzLnJlc3BvbnNlVHlwZSAhPT0gJycgJiYgdGhpcy5fc2V0dGluZ3MucmVzcG9uc2VUeXBlKVxuXG4gICAgICBjb25zdCBsb2FkZWRFdmVudCA9ICQuRXZlbnQoRXZlbnQuTE9BREVEKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGxvYWRlZEV2ZW50KVxuICAgIH1cblxuICAgIF9hZGRPdmVybGF5KCkge1xuICAgICAgdGhpcy5fcGFyZW50LmFwcGVuZCh0aGlzLl9vdmVybGF5KVxuXG4gICAgICBjb25zdCBvdmVybGF5QWRkZWRFdmVudCA9ICQuRXZlbnQoRXZlbnQuT1ZFUkxBWV9BRERFRClcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihvdmVybGF5QWRkZWRFdmVudClcbiAgICB9O1xuXG4gICAgX3JlbW92ZU92ZXJsYXkoKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuZmluZCh0aGlzLl9vdmVybGF5KS5yZW1vdmUoKVxuXG4gICAgICBjb25zdCBvdmVybGF5UmVtb3ZlZEV2ZW50ID0gJC5FdmVudChFdmVudC5PVkVSTEFZX1JFTU9WRUQpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIob3ZlcmxheVJlbW92ZWRFdmVudClcbiAgICB9O1xuXG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfaW5pdChjYXJkKSB7XG4gICAgICAkKHRoaXMpLmZpbmQodGhpcy5fc2V0dGluZ3MudHJpZ2dlcikub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWQoKVxuICAgICAgfSlcblxuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxvYWRPbkluaXQpIHtcbiAgICAgICAgdGhpcy5sb2FkKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICBjb25zdCBfb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSlcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgQ2FyZFJlZnJlc2goJCh0aGlzKSwgX29wdGlvbnMpXG4gICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgdHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycgPyBkYXRhOiBjb25maWcpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJyAmJiBjb25maWcubWF0Y2goL2xvYWQvKSkge1xuICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5faW5pdCgkKHRoaXMpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhIEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFNlbGVjdG9yLkRBVEFfUkVGUkVTSCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgQ2FyZFJlZnJlc2guX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICdsb2FkJylcbiAgfSlcblxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJChTZWxlY3Rvci5EQVRBX1JFRlJFU0gpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBDYXJkUmVmcmVzaC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSlcbiAgICB9KVxuICB9KVxuXG4gIC8qKlxuICAgKiBqUXVlcnkgQVBJXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IENhcmRSZWZyZXNoLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENhcmRSZWZyZXNoXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBDYXJkUmVmcmVzaC5falF1ZXJ5SW50ZXJmYWNlXG4gIH1cblxuICByZXR1cm4gQ2FyZFJlZnJlc2hcbn0pKGpRdWVyeSlcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZFJlZnJlc2hcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFkbWluTFRFIENhcmRXaWRnZXQuanNcbiAqIExpY2Vuc2UgTUlUXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IENhcmRXaWRnZXQgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdDYXJkV2lkZ2V0J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnbHRlLmNhcmR3aWRnZXQnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBFWFBBTkRFRDogYGV4cGFuZGVkJHtFVkVOVF9LRVl9YCxcbiAgICBDT0xMQVBTRUQ6IGBjb2xsYXBzZWQke0VWRU5UX0tFWX1gLFxuICAgIE1BWElNSVpFRDogYG1heGltaXplZCR7RVZFTlRfS0VZfWAsXG4gICAgTUlOSU1JWkVEOiBgbWluaW1pemVkJHtFVkVOVF9LRVl9YCxcbiAgICBSRU1PVkVEOiBgcmVtb3ZlZCR7RVZFTlRfS0VZfWBcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBDQVJEOiAnY2FyZCcsXG4gICAgQ09MTEFQU0VEOiAnY29sbGFwc2VkLWNhcmQnLFxuICAgIENPTExBUFNJTkc6ICdjb2xsYXBzaW5nLWNhcmQnLFxuICAgIEVYUEFORElORzogJ2V4cGFuZGluZy1jYXJkJyxcbiAgICBXQVNfQ09MTEFQU0VEOiAnd2FzLWNvbGxhcHNlZCcsXG4gICAgTUFYSU1JWkVEOiAnbWF4aW1pemVkLWNhcmQnLFxuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgREFUQV9SRU1PVkU6ICdbZGF0YS1jYXJkLXdpZGdldD1cInJlbW92ZVwiXScsXG4gICAgREFUQV9DT0xMQVBTRTogJ1tkYXRhLWNhcmQtd2lkZ2V0PVwiY29sbGFwc2VcIl0nLFxuICAgIERBVEFfTUFYSU1JWkU6ICdbZGF0YS1jYXJkLXdpZGdldD1cIm1heGltaXplXCJdJyxcbiAgICBDQVJEOiBgLiR7Q2xhc3NOYW1lLkNBUkR9YCxcbiAgICBDQVJEX0hFQURFUjogJy5jYXJkLWhlYWRlcicsXG4gICAgQ0FSRF9CT0RZOiAnLmNhcmQtYm9keScsXG4gICAgQ0FSRF9GT09URVI6ICcuY2FyZC1mb290ZXInLFxuICAgIENPTExBUFNFRDogYC4ke0NsYXNzTmFtZS5DT0xMQVBTRUR9YCxcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgYW5pbWF0aW9uU3BlZWQ6ICdub3JtYWwnLFxuICAgIGNvbGxhcHNlVHJpZ2dlcjogU2VsZWN0b3IuREFUQV9DT0xMQVBTRSxcbiAgICByZW1vdmVUcmlnZ2VyOiBTZWxlY3Rvci5EQVRBX1JFTU9WRSxcbiAgICBtYXhpbWl6ZVRyaWdnZXI6IFNlbGVjdG9yLkRBVEFfTUFYSU1JWkUsXG4gICAgY29sbGFwc2VJY29uOiAnZmEtbWludXMnLFxuICAgIGV4cGFuZEljb246ICdmYS1wbHVzJyxcbiAgICBtYXhpbWl6ZUljb246ICdmYS1leHBhbmQnLFxuICAgIG1pbmltaXplSWNvbjogJ2ZhLWNvbXByZXNzJyxcbiAgfVxuXG4gIGNsYXNzIENhcmRXaWRnZXQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ICA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX3BhcmVudCA9IGVsZW1lbnQucGFyZW50cyhTZWxlY3Rvci5DQVJEKS5maXJzdCgpXG5cbiAgICAgIGlmIChlbGVtZW50Lmhhc0NsYXNzKENsYXNzTmFtZS5DQVJEKSkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBlbGVtZW50XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldHRpbmdzID0gJC5leHRlbmQoe30sIERlZmF1bHQsIHNldHRpbmdzKVxuICAgIH1cblxuICAgIGNvbGxhcHNlKCkge1xuICAgICAgdGhpcy5fcGFyZW50LmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKS5jaGlsZHJlbihgJHtTZWxlY3Rvci5DQVJEX0JPRFl9LCAke1NlbGVjdG9yLkNBUkRfRk9PVEVSfWApXG4gICAgICAgIC5zbGlkZVVwKHRoaXMuX3NldHRpbmdzLmFuaW1hdGlvblNwZWVkLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50LmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgICB9KVxuXG4gICAgICB0aGlzLl9wYXJlbnQuZmluZCgnPiAnICsgU2VsZWN0b3IuQ0FSRF9IRUFERVIgKyAnICcgKyB0aGlzLl9zZXR0aW5ncy5jb2xsYXBzZVRyaWdnZXIgKyAnIC4nICsgdGhpcy5fc2V0dGluZ3MuY29sbGFwc2VJY29uKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MuZXhwYW5kSWNvbilcbiAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuX3NldHRpbmdzLmNvbGxhcHNlSWNvbilcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gJC5FdmVudChFdmVudC5DT0xMQVBTRUQpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQudHJpZ2dlcihjb2xsYXBzZWQsIHRoaXMuX3BhcmVudClcbiAgICB9XG5cbiAgICBleHBhbmQoKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuYWRkQ2xhc3MoQ2xhc3NOYW1lLkVYUEFORElORykuY2hpbGRyZW4oYCR7U2VsZWN0b3IuQ0FSRF9CT0RZfSwgJHtTZWxlY3Rvci5DQVJEX0ZPT1RFUn1gKVxuICAgICAgICAuc2xpZGVEb3duKHRoaXMuX3NldHRpbmdzLmFuaW1hdGlvblNwZWVkLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50LnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5FWFBBTkRJTkcpXG4gICAgICAgIH0pXG5cbiAgICAgIHRoaXMuX3BhcmVudC5maW5kKCc+ICcgKyBTZWxlY3Rvci5DQVJEX0hFQURFUiArICcgJyArIHRoaXMuX3NldHRpbmdzLmNvbGxhcHNlVHJpZ2dlciArICcgLicgKyB0aGlzLl9zZXR0aW5ncy5leHBhbmRJY29uKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MuY29sbGFwc2VJY29uKVxuICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5fc2V0dGluZ3MuZXhwYW5kSWNvbilcblxuICAgICAgY29uc3QgZXhwYW5kZWQgPSAkLkV2ZW50KEV2ZW50LkVYUEFOREVEKVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnRyaWdnZXIoZXhwYW5kZWQsIHRoaXMuX3BhcmVudClcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuc2xpZGVVcCgpXG5cbiAgICAgIGNvbnN0IHJlbW92ZWQgPSAkLkV2ZW50KEV2ZW50LlJFTU9WRUQpXG5cbiAgICAgIHRoaXMuX2VsZW1lbnQudHJpZ2dlcihyZW1vdmVkLCB0aGlzLl9wYXJlbnQpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKHRoaXMuX3BhcmVudC5oYXNDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKSkge1xuICAgICAgICB0aGlzLmV4cGFuZCgpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbGxhcHNlKClcbiAgICB9XG4gICAgXG4gICAgbWF4aW1pemUoKSB7XG4gICAgICB0aGlzLl9wYXJlbnQuZmluZCh0aGlzLl9zZXR0aW5ncy5tYXhpbWl6ZVRyaWdnZXIgKyAnIC4nICsgdGhpcy5fc2V0dGluZ3MubWF4aW1pemVJY29uKVxuICAgICAgICAuYWRkQ2xhc3ModGhpcy5fc2V0dGluZ3MubWluaW1pemVJY29uKVxuICAgICAgICAucmVtb3ZlQ2xhc3ModGhpcy5fc2V0dGluZ3MubWF4aW1pemVJY29uKVxuICAgICAgdGhpcy5fcGFyZW50LmNzcyh7XG4gICAgICAgICdoZWlnaHQnOiB0aGlzLl9wYXJlbnQuaGVpZ2h0KCksXG4gICAgICAgICd3aWR0aCc6IHRoaXMuX3BhcmVudC53aWR0aCgpLFxuICAgICAgICAndHJhbnNpdGlvbic6ICdhbGwgLjE1cydcbiAgICAgIH0pLmRlbGF5KDE1MCkucXVldWUoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhDbGFzc05hbWUuTUFYSU1JWkVEKVxuICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoQ2xhc3NOYW1lLk1BWElNSVpFRClcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkpIHtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKENsYXNzTmFtZS5XQVNfQ09MTEFQU0VEKVxuICAgICAgICB9XG4gICAgICAgICQodGhpcykuZGVxdWV1ZSgpXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBtYXhpbWl6ZWQgPSAkLkV2ZW50KEV2ZW50Lk1BWElNSVpFRClcblxuICAgICAgdGhpcy5fZWxlbWVudC50cmlnZ2VyKG1heGltaXplZCwgdGhpcy5fcGFyZW50KVxuICAgIH1cblxuICAgIG1pbmltaXplKCkge1xuICAgICAgdGhpcy5fcGFyZW50LmZpbmQodGhpcy5fc2V0dGluZ3MubWF4aW1pemVUcmlnZ2VyICsgJyAuJyArIHRoaXMuX3NldHRpbmdzLm1pbmltaXplSWNvbilcbiAgICAgICAgLmFkZENsYXNzKHRoaXMuX3NldHRpbmdzLm1heGltaXplSWNvbilcbiAgICAgICAgLnJlbW92ZUNsYXNzKHRoaXMuX3NldHRpbmdzLm1pbmltaXplSWNvbilcbiAgICAgIHRoaXMuX3BhcmVudC5jc3MoJ2Nzc1RleHQnLCAnaGVpZ2h0OicgKyB0aGlzLl9wYXJlbnRbMF0uc3R5bGUuaGVpZ2h0ICsgJyAhaW1wb3J0YW50OycgK1xuICAgICAgICAnd2lkdGg6JyArIHRoaXMuX3BhcmVudFswXS5zdHlsZS53aWR0aCArICcgIWltcG9ydGFudDsgdHJhbnNpdGlvbjogYWxsIC4xNXM7J1xuICAgICAgKS5kZWxheSgxMCkucXVldWUoZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuTUFYSU1JWkVEKVxuICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk1BWElNSVpFRClcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICAgICdoZWlnaHQnOiAnaW5oZXJpdCcsXG4gICAgICAgICAgJ3dpZHRoJzogJ2luaGVyaXQnXG4gICAgICAgIH0pXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKENsYXNzTmFtZS5XQVNfQ09MTEFQU0VEKSkge1xuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLldBU19DT0xMQVBTRUQpXG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5kZXF1ZXVlKClcbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IE1JTklNSVpFRCA9ICQuRXZlbnQoRXZlbnQuTUlOSU1JWkVEKVxuXG4gICAgICB0aGlzLl9lbGVtZW50LnRyaWdnZXIoTUlOSU1JWkVELCB0aGlzLl9wYXJlbnQpXG4gICAgfVxuXG4gICAgdG9nZ2xlTWF4aW1pemUoKSB7XG4gICAgICBpZiAodGhpcy5fcGFyZW50Lmhhc0NsYXNzKENsYXNzTmFtZS5NQVhJTUlaRUQpKSB7XG4gICAgICAgIHRoaXMubWluaW1pemUoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5tYXhpbWl6ZSgpXG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX2luaXQoY2FyZCkge1xuICAgICAgdGhpcy5fcGFyZW50ID0gY2FyZFxuXG4gICAgICAkKHRoaXMpLmZpbmQodGhpcy5fc2V0dGluZ3MuY29sbGFwc2VUcmlnZ2VyKS5jbGljaygoKSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlKClcbiAgICAgIH0pXG5cbiAgICAgICQodGhpcykuZmluZCh0aGlzLl9zZXR0aW5ncy5tYXhpbWl6ZVRyaWdnZXIpLmNsaWNrKCgpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGVNYXhpbWl6ZSgpXG4gICAgICB9KVxuXG4gICAgICAkKHRoaXMpLmZpbmQodGhpcy5fc2V0dGluZ3MucmVtb3ZlVHJpZ2dlcikuY2xpY2soKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9vcHRpb25zID0gJC5leHRlbmQoe30sIERlZmF1bHQsICQodGhpcykuZGF0YSgpKVxuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBDYXJkV2lkZ2V0KCQodGhpcyksIF9vcHRpb25zKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnID8gZGF0YTogY29uZmlnKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycgJiYgY29uZmlnLm1hdGNoKC9jb2xsYXBzZXxleHBhbmR8cmVtb3ZlfHRvZ2dsZXxtYXhpbWl6ZXxtaW5pbWl6ZXx0b2dnbGVNYXhpbWl6ZS8pKSB7XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRhdGEuX2luaXQoJCh0aGlzKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUElcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBTZWxlY3Rvci5EQVRBX0NPTExBUFNFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBDYXJkV2lkZ2V0Ll9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAndG9nZ2xlJylcbiAgfSlcblxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBTZWxlY3Rvci5EQVRBX1JFTU9WRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgQ2FyZFdpZGdldC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSwgJ3JlbW92ZScpXG4gIH0pXG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgU2VsZWN0b3IuREFUQV9NQVhJTUlaRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgQ2FyZFdpZGdldC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSwgJ3RvZ2dsZU1heGltaXplJylcbiAgfSlcblxuICAvKipcbiAgICogalF1ZXJ5IEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBDYXJkV2lkZ2V0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENhcmRXaWRnZXRcbiAgJC5mbltOQU1FXS5ub0NvbmZsaWN0ICA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIENhcmRXaWRnZXQuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIENhcmRXaWRnZXRcbn0pKGpRdWVyeSlcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZFdpZGdldFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWRtaW5MVEUgQ29udHJvbFNpZGViYXIuanNcbiAqIExpY2Vuc2UgTUlUXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IENvbnRyb2xTaWRlYmFyID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgPSAnQ29udHJvbFNpZGViYXInXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdsdGUuY29udHJvbHNpZGViYXInXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cbiAgY29uc3QgREFUQV9BUElfS0VZICAgICAgID0gJy5kYXRhLWFwaSdcblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBDT0xMQVBTRUQ6IGBjb2xsYXBzZWQke0VWRU5UX0tFWX1gLFxuICAgIEVYUEFOREVEOiBgZXhwYW5kZWQke0VWRU5UX0tFWX1gLFxuICB9XG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgQ09OVFJPTF9TSURFQkFSOiAnLmNvbnRyb2wtc2lkZWJhcicsXG4gICAgQ09OVFJPTF9TSURFQkFSX0NPTlRFTlQ6ICcuY29udHJvbC1zaWRlYmFyLWNvbnRlbnQnLFxuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtd2lkZ2V0PVwiY29udHJvbC1zaWRlYmFyXCJdJyxcbiAgICBDT05URU5UOiAnLmNvbnRlbnQtd3JhcHBlcicsXG4gICAgSEVBREVSOiAnLm1haW4taGVhZGVyJyxcbiAgICBGT09URVI6ICcubWFpbi1mb290ZXInLFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIENPTlRST0xfU0lERUJBUl9BTklNQVRFOiAnY29udHJvbC1zaWRlYmFyLWFuaW1hdGUnLFxuICAgIENPTlRST0xfU0lERUJBUl9PUEVOOiAnY29udHJvbC1zaWRlYmFyLW9wZW4nLFxuICAgIENPTlRST0xfU0lERUJBUl9TTElERTogJ2NvbnRyb2wtc2lkZWJhci1zbGlkZS1vcGVuJyxcbiAgICBMQVlPVVRfRklYRUQ6ICdsYXlvdXQtZml4ZWQnLFxuICAgIE5BVkJBUl9GSVhFRDogJ2xheW91dC1uYXZiYXItZml4ZWQnLFxuICAgIE5BVkJBUl9TTV9GSVhFRDogJ2xheW91dC1zbS1uYXZiYXItZml4ZWQnLFxuICAgIE5BVkJBUl9NRF9GSVhFRDogJ2xheW91dC1tZC1uYXZiYXItZml4ZWQnLFxuICAgIE5BVkJBUl9MR19GSVhFRDogJ2xheW91dC1sZy1uYXZiYXItZml4ZWQnLFxuICAgIE5BVkJBUl9YTF9GSVhFRDogJ2xheW91dC14bC1uYXZiYXItZml4ZWQnLFxuICAgIEZPT1RFUl9GSVhFRDogJ2xheW91dC1mb290ZXItZml4ZWQnLFxuICAgIEZPT1RFUl9TTV9GSVhFRDogJ2xheW91dC1zbS1mb290ZXItZml4ZWQnLFxuICAgIEZPT1RFUl9NRF9GSVhFRDogJ2xheW91dC1tZC1mb290ZXItZml4ZWQnLFxuICAgIEZPT1RFUl9MR19GSVhFRDogJ2xheW91dC1sZy1mb290ZXItZml4ZWQnLFxuICAgIEZPT1RFUl9YTF9GSVhFRDogJ2xheW91dC14bC1mb290ZXItZml4ZWQnLFxuICB9XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBjb250cm9sc2lkZWJhclNsaWRlOiB0cnVlLFxuICAgIHNjcm9sbGJhclRoZW1lIDogJ29zLXRoZW1lLWxpZ2h0JyxcbiAgICBzY3JvbGxiYXJBdXRvSGlkZTogJ2wnLFxuICB9XG5cbiAgLyoqXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBjbGFzcyBDb250cm9sU2lkZWJhciB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICAgICAgdGhpcy5fY29uZmlnICA9IGNvbmZpZ1xuXG4gICAgICB0aGlzLl9pbml0KClcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIGNvbGxhcHNlKCkge1xuICAgICAgLy8gU2hvdyB0aGUgY29udHJvbCBzaWRlYmFyXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmNvbnRyb2xzaWRlYmFyU2xpZGUpIHtcbiAgICAgICAgJCgnaHRtbCcpLmFkZENsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfQU5JTUFURSlcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfU0xJREUpLmRlbGF5KDMwMCkucXVldWUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUikuaGlkZSgpXG4gICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfQU5JTUFURSlcbiAgICAgICAgICAkKHRoaXMpLmRlcXVldWUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfT1BFTilcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29sbGFwc2VkRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkNPTExBUFNFRClcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihjb2xsYXBzZWRFdmVudClcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgLy8gQ29sbGFwc2UgdGhlIGNvbnRyb2wgc2lkZWJhclxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5jb250cm9sc2lkZWJhclNsaWRlKSB7XG4gICAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09OVFJPTF9TSURFQkFSX0FOSU1BVEUpXG4gICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5zaG93KCkuZGVsYXkoMTApLnF1ZXVlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfU0xJREUpLmRlbGF5KDMwMCkucXVldWUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09OVFJPTF9TSURFQkFSX0FOSU1BVEUpXG4gICAgICAgICAgICAkKHRoaXMpLmRlcXVldWUoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgJCh0aGlzKS5kZXF1ZXVlKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09OVFJPTF9TSURFQkFSX09QRU4pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4cGFuZGVkRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkVYUEFOREVEKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGV4cGFuZGVkRXZlbnQpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgY29uc3Qgc2hvdWxkQ2xvc2UgPSAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNPTlRST0xfU0lERUJBUl9PUEVOKSB8fCAkKCdib2R5JylcbiAgICAgICAgLmhhc0NsYXNzKENsYXNzTmFtZS5DT05UUk9MX1NJREVCQVJfU0xJREUpXG4gICAgICBpZiAoc2hvdWxkQ2xvc2UpIHtcbiAgICAgICAgLy8gQ2xvc2UgdGhlIGNvbnRyb2wgc2lkZWJhclxuICAgICAgICB0aGlzLmNvbGxhcHNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE9wZW4gdGhlIGNvbnRyb2wgc2lkZWJhclxuICAgICAgICB0aGlzLnNob3coKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9pbml0KCkge1xuICAgICAgdGhpcy5fZml4SGVpZ2h0KClcbiAgICAgIHRoaXMuX2ZpeFNjcm9sbEhlaWdodCgpXG5cbiAgICAgICQod2luZG93KS5yZXNpemUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9maXhIZWlnaHQoKVxuICAgICAgICB0aGlzLl9maXhTY3JvbGxIZWlnaHQoKVxuICAgICAgfSlcblxuICAgICAgJCh3aW5kb3cpLnNjcm9sbCgoKSA9PiB7XG4gICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNPTlRST0xfU0lERUJBUl9PUEVOKSB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNPTlRST0xfU0lERUJBUl9TTElERSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpeFNjcm9sbEhlaWdodCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX2ZpeFNjcm9sbEhlaWdodCgpIHtcbiAgICAgIGNvbnN0IGhlaWdodHMgPSB7XG4gICAgICAgIHNjcm9sbDogJChkb2N1bWVudCkuaGVpZ2h0KCksXG4gICAgICAgIHdpbmRvdzogJCh3aW5kb3cpLmhlaWdodCgpLFxuICAgICAgICBoZWFkZXI6ICQoU2VsZWN0b3IuSEVBREVSKS5vdXRlckhlaWdodCgpLFxuICAgICAgICBmb290ZXI6ICQoU2VsZWN0b3IuRk9PVEVSKS5vdXRlckhlaWdodCgpLFxuICAgICAgfVxuICAgICAgY29uc3QgcG9zaXRpb25zID0ge1xuICAgICAgICBib3R0b206IE1hdGguYWJzKChoZWlnaHRzLndpbmRvdyArICQod2luZG93KS5zY3JvbGxUb3AoKSkgLSBoZWlnaHRzLnNjcm9sbCksXG4gICAgICAgIHRvcDogJCh3aW5kb3cpLnNjcm9sbFRvcCgpLFxuICAgICAgfVxuXG4gICAgICBsZXQgbmF2YmFyRml4ZWQgPSBmYWxzZTtcbiAgICAgIGxldCBmb290ZXJGaXhlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKENsYXNzTmFtZS5MQVlPVVRfRklYRUQpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLk5BVkJBUl9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLk5BVkJBUl9TTV9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLk5BVkJBUl9NRF9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLk5BVkJBUl9MR19GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLk5BVkJBUl9YTF9GSVhFRClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCQoU2VsZWN0b3IuSEVBREVSKS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICAgICAgICBuYXZiYXJGaXhlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9TTV9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9NRF9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9MR19GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9YTF9GSVhFRClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCQoU2VsZWN0b3IuRk9PVEVSKS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICAgICAgICBmb290ZXJGaXhlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9ucy50b3AgPT09IDAgJiYgcG9zaXRpb25zLmJvdHRvbSA9PT0gMCkge1xuICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5jc3MoJ2JvdHRvbScsIGhlaWdodHMuZm9vdGVyKTtcbiAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUikuY3NzKCd0b3AnLCBoZWlnaHRzLmhlYWRlcik7XG4gICAgICAgICAgJChTZWxlY3Rvci5DT05UUk9MX1NJREVCQVIgKyAnLCAnICsgU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSICsgJyAnICsgU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSX0NPTlRFTlQpLmNzcygnaGVpZ2h0JywgaGVpZ2h0cy53aW5kb3cgLSAoaGVpZ2h0cy5oZWFkZXIgKyBoZWlnaHRzLmZvb3RlcikpXG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25zLmJvdHRvbSA8PSBoZWlnaHRzLmZvb3Rlcikge1xuICAgICAgICAgIGlmIChmb290ZXJGaXhlZCA9PT0gZmFsc2UpIHsgIFxuICAgICAgICAgICAgJChTZWxlY3Rvci5DT05UUk9MX1NJREVCQVIpLmNzcygnYm90dG9tJywgaGVpZ2h0cy5mb290ZXIgLSBwb3NpdGlvbnMuYm90dG9tKTtcbiAgICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSICsgJywgJyArIFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUiArICcgJyArIFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUl9DT05URU5UKS5jc3MoJ2hlaWdodCcsIGhlaWdodHMud2luZG93IC0gKGhlaWdodHMuZm9vdGVyIC0gcG9zaXRpb25zLmJvdHRvbSkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5jc3MoJ2JvdHRvbScsIGhlaWdodHMuZm9vdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25zLnRvcCA8PSBoZWlnaHRzLmhlYWRlcikge1xuICAgICAgICAgIGlmIChuYXZiYXJGaXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5jc3MoJ3RvcCcsIGhlaWdodHMuaGVhZGVyIC0gcG9zaXRpb25zLnRvcCk7XG4gICAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUiArICcsICcgKyBTZWxlY3Rvci5DT05UUk9MX1NJREVCQVIgKyAnICcgKyBTZWxlY3Rvci5DT05UUk9MX1NJREVCQVJfQ09OVEVOVCkuY3NzKCdoZWlnaHQnLCBoZWlnaHRzLndpbmRvdyAtIChoZWlnaHRzLmhlYWRlciAtIHBvc2l0aW9ucy50b3ApKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUikuY3NzKCd0b3AnLCBoZWlnaHRzLmhlYWRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChuYXZiYXJGaXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5jc3MoJ3RvcCcsIDApO1xuICAgICAgICAgICAgJChTZWxlY3Rvci5DT05UUk9MX1NJREVCQVIgKyAnLCAnICsgU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSICsgJyAnICsgU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSX0NPTlRFTlQpLmNzcygnaGVpZ2h0JywgaGVpZ2h0cy53aW5kb3cpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSKS5jc3MoJ3RvcCcsIGhlaWdodHMuaGVhZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZml4SGVpZ2h0KCkge1xuICAgICAgY29uc3QgaGVpZ2h0cyA9IHtcbiAgICAgICAgd2luZG93OiAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgIGhlYWRlcjogJChTZWxlY3Rvci5IRUFERVIpLm91dGVySGVpZ2h0KCksXG4gICAgICAgIGZvb3RlcjogJChTZWxlY3Rvci5GT09URVIpLm91dGVySGVpZ2h0KCksXG4gICAgICB9XG5cbiAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkxBWU9VVF9GSVhFRCkpIHtcbiAgICAgICAgbGV0IHNpZGViYXJIZWlnaHQgPSBoZWlnaHRzLndpbmRvdyAtIGhlaWdodHMuaGVhZGVyO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9TTV9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9NRF9GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9MR19GSVhFRClcbiAgICAgICAgICB8fCAkKCdib2R5JykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZPT1RFUl9YTF9GSVhFRClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCQoU2VsZWN0b3IuRk9PVEVSKS5jc3MoXCJwb3NpdGlvblwiKSA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICAgICAgICBzaWRlYmFySGVpZ2h0ID0gaGVpZ2h0cy53aW5kb3cgLSBoZWlnaHRzLmhlYWRlciAtIGhlaWdodHMuZm9vdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSICsgJyAnICsgU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSX0NPTlRFTlQpLmNzcygnaGVpZ2h0Jywgc2lkZWJhckhlaWdodClcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5vdmVybGF5U2Nyb2xsYmFycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUiArICcgJyArIFNlbGVjdG9yLkNPTlRST0xfU0lERUJBUl9DT05URU5UKS5vdmVybGF5U2Nyb2xsYmFycyh7XG4gICAgICAgICAgICBjbGFzc05hbWUgICAgICAgOiB0aGlzLl9jb25maWcuc2Nyb2xsYmFyVGhlbWUsXG4gICAgICAgICAgICBzaXplQXV0b0NhcGFibGUgOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsYmFycyA6IHtcbiAgICAgICAgICAgICAgYXV0b0hpZGU6IHRoaXMuX2NvbmZpZy5zY3JvbGxiYXJBdXRvSGlkZSwgXG4gICAgICAgICAgICAgIGNsaWNrU2Nyb2xsaW5nIDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2Uob3BlcmF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9vcHRpb25zID0gJC5leHRlbmQoe30sIERlZmF1bHQsICQodGhpcykuZGF0YSgpKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgQ29udHJvbFNpZGViYXIodGhpcywgX29wdGlvbnMpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFbb3BlcmF0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7b3BlcmF0aW9ufSBpcyBub3QgYSBmdW5jdGlvbmApXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW29wZXJhdGlvbl0oKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIENvbnRyb2xTaWRlYmFyLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAndG9nZ2xlJylcbiAgfSlcblxuICAvKipcbiAgICogalF1ZXJ5IEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBDb250cm9sU2lkZWJhci5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBDb250cm9sU2lkZWJhclxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gQ29udHJvbFNpZGViYXIuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIENvbnRyb2xTaWRlYmFyXG59KShqUXVlcnkpXG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xTaWRlYmFyXG4gIFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWRtaW5MVEUgRGlyZWN0Q2hhdC5qc1xuICogTGljZW5zZSBNSVRcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgRGlyZWN0Q2hhdCA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ0RpcmVjdENoYXQnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdsdGUuZGlyZWN0Y2hhdCdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuICBjb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuXG4gIGNvbnN0IEV2ZW50ID0ge1xuICAgIFRPR0dMRUQ6IGB0b2dnbGVke0VWRU5UX0tFWX1gXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBEQVRBX1RPR0dMRTogJ1tkYXRhLXdpZGdldD1cImNoYXQtcGFuZS10b2dnbGVcIl0nLFxuICAgIERJUkVDVF9DSEFUOiAnLmRpcmVjdC1jaGF0J1xuICB9O1xuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBESVJFQ1RfQ0hBVF9PUEVOOiAnZGlyZWN0LWNoYXQtY29udGFjdHMtb3BlbidcbiAgfTtcblxuICAvKipcbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gIGNsYXNzIERpcmVjdENoYXQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnBhcmVudHMoU2VsZWN0b3IuRElSRUNUX0NIQVQpLmZpcnN0KCkudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkRJUkVDVF9DSEFUX09QRU4pO1xuXG4gICAgICBjb25zdCB0b2dnbGVkRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlRPR0dMRUQpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIodG9nZ2xlZEV2ZW50KVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgICAgICA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IERpcmVjdENoYXQoJCh0aGlzKSlcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIERpcmVjdENoYXQuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICd0b2dnbGUnKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIGpRdWVyeSBBUElcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gRGlyZWN0Q2hhdC5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBEaXJlY3RDaGF0XG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICAgIHJldHVybiBEaXJlY3RDaGF0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBEaXJlY3RDaGF0XG59KShqUXVlcnkpXG5cbmV4cG9ydCBkZWZhdWx0IERpcmVjdENoYXRcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFkbWluTFRFIERyb3Bkb3duLmpzXG4gKiBMaWNlbnNlIE1JVFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBEcm9wZG93biA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ0Ryb3Bkb3duJ1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnbHRlLmRyb3Bkb3duJ1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgU2VsZWN0b3IgPSB7XG4gICAgTkFWQkFSOiAnLm5hdmJhcicsXG4gICAgRFJPUERPV05fTUVOVTogJy5kcm9wZG93bi1tZW51JyxcbiAgICBEUk9QRE9XTl9NRU5VX0FDVElWRTogJy5kcm9wZG93bi1tZW51LnNob3cnLFxuICAgIERST1BET1dOX1RPR0dMRTogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBEUk9QRE9XTl9IT1ZFUjogJ2Ryb3Bkb3duLWhvdmVyJyxcbiAgICBEUk9QRE9XTl9SSUdIVDogJ2Ryb3Bkb3duLW1lbnUtcmlnaHQnXG4gIH1cblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICB9XG5cblxuICAvKipcbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gIGNsYXNzIERyb3Bkb3duIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICAgIHRoaXMuX2NvbmZpZyAgPSBjb25maWdcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICB0b2dnbGVTdWJtZW51KCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zaWJsaW5ncygpLnNob3coKS50b2dnbGVDbGFzcyhcInNob3dcIilcblxuICAgICAgaWYgKCEgdGhpcy5fZWxlbWVudC5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudHMoJy5kcm9wZG93bi1tZW51JykuZmlyc3QoKS5maW5kKCcuc2hvdycpLnJlbW92ZUNsYXNzKFwic2hvd1wiKS5oaWRlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnRzKCdsaS5uYXYtaXRlbS5kcm9wZG93bi5zaG93Jykub24oJ2hpZGRlbi5icy5kcm9wZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJCgnLmRyb3Bkb3duLXN1Ym1lbnUgLnNob3cnKS5yZW1vdmVDbGFzcyhcInNob3dcIikuaGlkZSgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZpeFBvc2l0aW9uKCkge1xuICAgICAgbGV0IGVsbSA9ICQoU2VsZWN0b3IuRFJPUERPV05fTUVOVV9BQ1RJVkUpXG5cbiAgICAgIGlmIChlbG0ubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGlmIChlbG0uaGFzQ2xhc3MoQ2xhc3NOYW1lLkRST1BET1dOX1JJR0hUKSkge1xuICAgICAgICAgIGVsbS5jc3MoJ2xlZnQnLCAnaW5oZXJpdCcpXG4gICAgICAgICAgZWxtLmNzcygncmlnaHQnLCAwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsbS5jc3MoJ2xlZnQnLCAwKVxuICAgICAgICAgIGVsbS5jc3MoJ3JpZ2h0JywgJ2luaGVyaXQnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9mZnNldCA9IGVsbS5vZmZzZXQoKVxuICAgICAgICBsZXQgd2lkdGggPSBlbG0ud2lkdGgoKVxuICAgICAgICBsZXQgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICBsZXQgdmlzaWJsZVBhcnQgPSB3aW5kb3dXaWR0aCAtIG9mZnNldC5sZWZ0XG5cbiAgICAgICAgaWYgKG9mZnNldC5sZWZ0IDwgMCkge1xuICAgICAgICAgIGVsbS5jc3MoJ2xlZnQnLCAnaW5oZXJpdCcpXG4gICAgICAgICAgZWxtLmNzcygncmlnaHQnLCAob2Zmc2V0LmxlZnQgLSA1KSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlzaWJsZVBhcnQgPCB3aWR0aCkge1xuICAgICAgICAgICAgZWxtLmNzcygnbGVmdCcsICdpbmhlcml0JylcbiAgICAgICAgICAgIGVsbS5jc3MoJ3JpZ2h0JywgMClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gIFxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgICAgICA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IERyb3Bkb3duKCQodGhpcyksIF9jb25maWcpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ3RvZ2dsZVN1Ym1lbnUnIHx8IGNvbmZpZyA9PSAnZml4UG9zaXRpb24nKSB7XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUElcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkKFNlbGVjdG9yLkRST1BET1dOX01FTlUgKyAnICcgKyBTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAndG9nZ2xlU3VibWVudScpXG4gIH0pO1xuXG4gICQoU2VsZWN0b3IuTkFWQkFSICsgJyAnICsgU2VsZWN0b3IuRFJPUERPV05fVE9HR0xFKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAnZml4UG9zaXRpb24nKVxuICAgIH0sIDEpXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBqUXVlcnkgQVBJXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIERyb3Bkb3duLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBEcm9wZG93blxufSkoalF1ZXJ5KVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wZG93blxuIiwiLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEFkbWluTFRFIExheW91dC5qc1xyXG4gKiBMaWNlbnNlIE1JVFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmNvbnN0IExheW91dCA9ICgoJCkgPT4ge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0YW50c1xyXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgKi9cclxuXHJcbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ0xheW91dCdcclxuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnbHRlLmxheW91dCdcclxuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxyXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cclxuXHJcbiAgY29uc3QgRXZlbnQgPSB7XHJcbiAgICBTSURFQkFSOiAnc2lkZWJhcidcclxuICB9XHJcblxyXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xyXG4gICAgSEVBREVSICAgICAgICAgOiAnLm1haW4taGVhZGVyJyxcclxuICAgIE1BSU5fU0lERUJBUiAgIDogJy5tYWluLXNpZGViYXInLFxyXG4gICAgU0lERUJBUiAgICAgICAgOiAnLm1haW4tc2lkZWJhciAuc2lkZWJhcicsXHJcbiAgICBDT05URU5UICAgICAgICA6ICcuY29udGVudC13cmFwcGVyJyxcclxuICAgIEJSQU5EICAgICAgICAgIDogJy5icmFuZC1saW5rJyxcclxuICAgIENPTlRFTlRfSEVBREVSIDogJy5jb250ZW50LWhlYWRlcicsXHJcbiAgICBXUkFQUEVSICAgICAgICA6ICcud3JhcHBlcicsXHJcbiAgICBDT05UUk9MX1NJREVCQVI6ICcuY29udHJvbC1zaWRlYmFyJyxcclxuICAgIENPTlRST0xfU0lERUJBUl9DT05URU5UOiAnLmNvbnRyb2wtc2lkZWJhci1jb250ZW50JyxcclxuICAgIENPTlRST0xfU0lERUJBUl9CVE46ICdbZGF0YS13aWRnZXQ9XCJjb250cm9sLXNpZGViYXJcIl0nLFxyXG4gICAgTEFZT1VUX0ZJWEVEICAgOiAnLmxheW91dC1maXhlZCcsXHJcbiAgICBGT09URVIgICAgICAgICA6ICcubWFpbi1mb290ZXInLFxyXG4gICAgUFVTSE1FTlVfQlROICAgOiAnW2RhdGEtd2lkZ2V0PVwicHVzaG1lbnVcIl0nLFxyXG4gICAgTE9HSU5fQk9YICAgICAgOiAnLmxvZ2luLWJveCcsXHJcbiAgICBSRUdJU1RFUl9CT1ggICA6ICcucmVnaXN0ZXItYm94J1xyXG4gIH1cclxuXHJcbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xyXG4gICAgSE9MRCAgICAgICAgICAgOiAnaG9sZC10cmFuc2l0aW9uJyxcclxuICAgIFNJREVCQVIgICAgICAgIDogJ21haW4tc2lkZWJhcicsXHJcbiAgICBDT05URU5UX0ZJWEVEICA6ICdjb250ZW50LWZpeGVkJyxcclxuICAgIFNJREVCQVJfRk9DVVNFRDogJ3NpZGViYXItZm9jdXNlZCcsXHJcbiAgICBMQVlPVVRfRklYRUQgICA6ICdsYXlvdXQtZml4ZWQnLFxyXG4gICAgTkFWQkFSX0ZJWEVEICAgOiAnbGF5b3V0LW5hdmJhci1maXhlZCcsXHJcbiAgICBGT09URVJfRklYRUQgICA6ICdsYXlvdXQtZm9vdGVyLWZpeGVkJyxcclxuICAgIExPR0lOX1BBR0UgICAgIDogJ2xvZ2luLXBhZ2UnLFxyXG4gICAgUkVHSVNURVJfUEFHRSAgOiAncmVnaXN0ZXItcGFnZScsXHJcbiAgICBDT05UUk9MX1NJREVCQVJfU0xJREVfT1BFTjogJ2NvbnRyb2wtc2lkZWJhci1zbGlkZS1vcGVuJyxcclxuICAgIENPTlRST0xfU0lERUJBUl9PUEVOOiAnY29udHJvbC1zaWRlYmFyLW9wZW4nLFxyXG4gIH1cclxuXHJcbiAgY29uc3QgRGVmYXVsdCA9IHtcclxuICAgIHNjcm9sbGJhclRoZW1lIDogJ29zLXRoZW1lLWxpZ2h0JyxcclxuICAgIHNjcm9sbGJhckF1dG9IaWRlOiAnbCcsXHJcbiAgICBwYW5lbEF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICBsb2dpblJlZ2lzdGVyQXV0b0hlaWdodDogdHJ1ZSxcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIERlZmluaXRpb25cclxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICovXHJcblxyXG4gIGNsYXNzIExheW91dCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcclxuICAgICAgdGhpcy5fY29uZmlnICA9IGNvbmZpZ1xyXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxyXG5cclxuICAgICAgdGhpcy5faW5pdCgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVibGljXHJcblxyXG4gICAgZml4TGF5b3V0SGVpZ2h0KGV4dHJhID0gbnVsbCkge1xyXG4gICAgICBsZXQgY29udHJvbF9zaWRlYmFyID0gMFxyXG5cclxuICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcyhDbGFzc05hbWUuQ09OVFJPTF9TSURFQkFSX1NMSURFX09QRU4pIHx8ICQoJ2JvZHknKS5oYXNDbGFzcyhDbGFzc05hbWUuQ09OVFJPTF9TSURFQkFSX09QRU4pIHx8IGV4dHJhID09ICdjb250cm9sX3NpZGViYXInKSB7XHJcbiAgICAgICAgY29udHJvbF9zaWRlYmFyID0gJChTZWxlY3Rvci5DT05UUk9MX1NJREVCQVJfQ09OVEVOVCkuaGVpZ2h0KClcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaGVpZ2h0cyA9IHtcclxuICAgICAgICB3aW5kb3c6ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICBoZWFkZXI6ICQoU2VsZWN0b3IuSEVBREVSKS5sZW5ndGggIT09IDAgPyAkKFNlbGVjdG9yLkhFQURFUikub3V0ZXJIZWlnaHQoKSA6IDAsXHJcbiAgICAgICAgZm9vdGVyOiAkKFNlbGVjdG9yLkZPT1RFUikubGVuZ3RoICE9PSAwID8gJChTZWxlY3Rvci5GT09URVIpLm91dGVySGVpZ2h0KCkgOiAwLFxyXG4gICAgICAgIHNpZGViYXI6ICQoU2VsZWN0b3IuU0lERUJBUikubGVuZ3RoICE9PSAwID8gJChTZWxlY3Rvci5TSURFQkFSKS5oZWlnaHQoKSA6IDAsXHJcbiAgICAgICAgY29udHJvbF9zaWRlYmFyOiBjb250cm9sX3NpZGViYXIsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IG1heCA9IHRoaXMuX21heChoZWlnaHRzKVxyXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fY29uZmlnLnBhbmVsQXV0b0hlaWdodFxyXG5cclxuICAgICAgaWYgKG9mZnNldCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG9mZnNldCA9IDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChvZmZzZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKG1heCA9PSBoZWlnaHRzLmNvbnRyb2xfc2lkZWJhcikge1xyXG4gICAgICAgICAgJChTZWxlY3Rvci5DT05URU5UKS5jc3MoJ21pbi1oZWlnaHQnLCAobWF4ICsgb2Zmc2V0KSlcclxuICAgICAgICB9IGVsc2UgaWYgKG1heCA9PSBoZWlnaHRzLndpbmRvdykge1xyXG4gICAgICAgICAgJChTZWxlY3Rvci5DT05URU5UKS5jc3MoJ21pbi1oZWlnaHQnLCAobWF4ICsgb2Zmc2V0KSAtIGhlaWdodHMuaGVhZGVyIC0gaGVpZ2h0cy5mb290ZXIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoU2VsZWN0b3IuQ09OVEVOVCkuY3NzKCdtaW4taGVpZ2h0JywgKG1heCArIG9mZnNldCkgLSBoZWlnaHRzLmhlYWRlcilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzRm9vdGVyRml4ZWQoKSkge1xyXG4gICAgICAgICAgJChTZWxlY3Rvci5DT05URU5UKS5jc3MoJ21pbi1oZWlnaHQnLCBwYXJzZUZsb2F0KCQoU2VsZWN0b3IuQ09OVEVOVCkuY3NzKCdtaW4taGVpZ2h0JykpICsgaGVpZ2h0cy5mb290ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcyhDbGFzc05hbWUuTEFZT1VUX0ZJWEVEKSkge1xyXG4gICAgICAgIGlmIChvZmZzZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAkKFNlbGVjdG9yLkNPTlRFTlQpLmNzcygnbWluLWhlaWdodCcsIChtYXggKyBvZmZzZXQpIC0gaGVpZ2h0cy5oZWFkZXIgLSBoZWlnaHRzLmZvb3RlcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5vdmVybGF5U2Nyb2xsYmFycyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICQoU2VsZWN0b3IuU0lERUJBUikub3ZlcmxheVNjcm9sbGJhcnMoe1xyXG4gICAgICAgICAgICBjbGFzc05hbWUgICAgICAgOiB0aGlzLl9jb25maWcuc2Nyb2xsYmFyVGhlbWUsXHJcbiAgICAgICAgICAgIHNpemVBdXRvQ2FwYWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgIHNjcm9sbGJhcnMgOiB7XHJcbiAgICAgICAgICAgICAgYXV0b0hpZGU6IHRoaXMuX2NvbmZpZy5zY3JvbGxiYXJBdXRvSGlkZSwgXHJcbiAgICAgICAgICAgICAgY2xpY2tTY3JvbGxpbmcgOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZml4TG9naW5SZWdpc3RlckhlaWdodCgpIHtcclxuICAgICAgaWYgKCQoU2VsZWN0b3IuTE9HSU5fQk9YICsgJywgJyArIFNlbGVjdG9yLlJFR0lTVEVSX0JPWCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmNzcygnaGVpZ2h0JywgJ2F1dG8nKVxyXG4gICAgICB9IGVsc2UgaWYgKCQoU2VsZWN0b3IuTE9HSU5fQk9YICsgJywgJyArIFNlbGVjdG9yLlJFR0lTVEVSX0JPWCkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgbGV0IGJveF9oZWlnaHQgPSAkKFNlbGVjdG9yLkxPR0lOX0JPWCArICcsICcgKyBTZWxlY3Rvci5SRUdJU1RFUl9CT1gpLmhlaWdodCgpXHJcblxyXG4gICAgICAgIGlmICgkKCdib2R5JykuY3NzKCdtaW4taGVpZ2h0JykgIT09IGJveF9oZWlnaHQpIHtcclxuICAgICAgICAgICQoJ2JvZHknKS5jc3MoJ21pbi1oZWlnaHQnLCBib3hfaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFByaXZhdGVcclxuXHJcbiAgICBfaW5pdCgpIHtcclxuICAgICAgLy8gQWN0aXZhdGUgbGF5b3V0IGhlaWdodCB3YXRjaGVyXHJcbiAgICAgIHRoaXMuZml4TGF5b3V0SGVpZ2h0KClcclxuXHJcbiAgICAgIGlmICh0aGlzLl9jb25maWcubG9naW5SZWdpc3RlckF1dG9IZWlnaHQgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLmZpeExvZ2luUmVnaXN0ZXJIZWlnaHQoKVxyXG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5pc0ludGVnZXIodGhpcy5fY29uZmlnLmxvZ2luUmVnaXN0ZXJBdXRvSGVpZ2h0KSkge1xyXG4gICAgICAgIHNldEludGVydmFsKHRoaXMuZml4TG9naW5SZWdpc3RlckhlaWdodCwgdGhpcy5fY29uZmlnLmxvZ2luUmVnaXN0ZXJBdXRvSGVpZ2h0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJChTZWxlY3Rvci5TSURFQkFSKVxyXG4gICAgICAgIC5vbignY29sbGFwc2VkLmx0ZS50cmVldmlldyBleHBhbmRlZC5sdGUudHJlZXZpZXcnLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZpeExheW91dEhlaWdodCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICQoU2VsZWN0b3IuUFVTSE1FTlVfQlROKVxyXG4gICAgICAgIC5vbignY29sbGFwc2VkLmx0ZS5wdXNobWVudSBzaG93bi5sdGUucHVzaG1lbnUnLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZpeExheW91dEhlaWdodCgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICQoU2VsZWN0b3IuQ09OVFJPTF9TSURFQkFSX0JUTilcclxuICAgICAgICAub24oJ2NvbGxhcHNlZC5sdGUuY29udHJvbHNpZGViYXInLCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmZpeExheW91dEhlaWdodCgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2V4cGFuZGVkLmx0ZS5jb250cm9sc2lkZWJhcicsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZml4TGF5b3V0SGVpZ2h0KCdjb250cm9sX3NpZGViYXInKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAkKHdpbmRvdykucmVzaXplKCgpID0+IHtcclxuICAgICAgICB0aGlzLmZpeExheW91dEhlaWdodCgpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAkKCdib2R5LmhvbGQtdHJhbnNpdGlvbicpLnJlbW92ZUNsYXNzKCdob2xkLXRyYW5zaXRpb24nKVxyXG5cclxuICAgICAgfSwgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIF9tYXgobnVtYmVycykge1xyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIG1heGltdW0gbnVtYmVyIGluIGEgbGlzdFxyXG4gICAgICBsZXQgbWF4ID0gMFxyXG5cclxuICAgICAgT2JqZWN0LmtleXMobnVtYmVycykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKG51bWJlcnNba2V5XSA+IG1heCkge1xyXG4gICAgICAgICAgbWF4ID0gbnVtYmVyc1trZXldXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgcmV0dXJuIG1heFxyXG4gICAgfVxyXG5cclxuICAgIF9pc0Zvb3RlckZpeGVkKCkge1xyXG4gICAgICByZXR1cm4gJCgnLm1haW4tZm9vdGVyJykuY3NzKCdwb3NpdGlvbicpID09PSAnZml4ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN0YXRpY1xyXG5cclxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZyA9ICcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxyXG4gICAgICAgIGNvbnN0IF9vcHRpb25zID0gJC5leHRlbmQoe30sIERlZmF1bHQsICQodGhpcykuZGF0YSgpKVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgIGRhdGEgPSBuZXcgTGF5b3V0KCQodGhpcyksIF9vcHRpb25zKVxyXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ2luaXQnIHx8IGNvbmZpZyA9PT0gJycpIHtcclxuICAgICAgICAgIGRhdGFbJ19pbml0J10oKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnID09PSAnZml4TGF5b3V0SGVpZ2h0JyB8fCBjb25maWcgPT09ICdmaXhMb2dpblJlZ2lzdGVySGVpZ2h0Jykge1xyXG4gICAgICAgICAgZGF0YVtjb25maWddKClcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEYXRhIEFQSVxyXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgKi9cclxuXHJcbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgTGF5b3V0Ll9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKCdib2R5JykpXHJcbiAgfSlcclxuXHJcbiAgJChTZWxlY3Rvci5TSURFQkFSICsgJyBhJykub24oJ2ZvY3VzaW4nLCAoKSA9PiB7XHJcbiAgICAkKFNlbGVjdG9yLk1BSU5fU0lERUJBUikuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNJREVCQVJfRk9DVVNFRCk7XHJcbiAgfSlcclxuXHJcbiAgJChTZWxlY3Rvci5TSURFQkFSICsgJyBhJykub24oJ2ZvY3Vzb3V0JywgKCkgPT4ge1xyXG4gICAgJChTZWxlY3Rvci5NQUlOX1NJREVCQVIpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSURFQkFSX0ZPQ1VTRUQpO1xyXG4gIH0pXHJcblxyXG4gIC8qKlxyXG4gICAqIGpRdWVyeSBBUElcclxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICovXHJcblxyXG4gICQuZm5bTkFNRV0gPSBMYXlvdXQuX2pRdWVyeUludGVyZmFjZVxyXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBMYXlvdXRcclxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXHJcbiAgICByZXR1cm4gTGF5b3V0Ll9qUXVlcnlJbnRlcmZhY2VcclxuICB9XHJcblxyXG4gIHJldHVybiBMYXlvdXRcclxufSkoalF1ZXJ5KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0XHJcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFkbWluTFRFIFB1c2hNZW51LmpzXG4gKiBMaWNlbnNlIE1JVFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBQdXNoTWVudSA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ1B1c2hNZW51J1xuICBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnbHRlLnB1c2htZW51J1xuICBjb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuICBjb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbiAgY29uc3QgRXZlbnQgPSB7XG4gICAgQ09MTEFQU0VEOiBgY29sbGFwc2VkJHtFVkVOVF9LRVl9YCxcbiAgICBTSE9XTjogYHNob3duJHtFVkVOVF9LRVl9YFxuICB9XG5cbiAgY29uc3QgRGVmYXVsdCA9IHtcbiAgICBhdXRvQ29sbGFwc2VTaXplOiA5OTIsXG4gICAgZW5hYmxlUmVtZW1iZXI6IGZhbHNlLFxuICAgIG5vVHJhbnNpdGlvbkFmdGVyUmVsb2FkOiB0cnVlXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBUT0dHTEVfQlVUVE9OOiAnW2RhdGEtd2lkZ2V0PVwicHVzaG1lbnVcIl0nLFxuICAgIFNJREVCQVJfTUlOSTogJy5zaWRlYmFyLW1pbmknLFxuICAgIFNJREVCQVJfQ09MTEFQU0VEOiAnLnNpZGViYXItY29sbGFwc2UnLFxuICAgIEJPRFk6ICdib2R5JyxcbiAgICBPVkVSTEFZOiAnI3NpZGViYXItb3ZlcmxheScsXG4gICAgV1JBUFBFUjogJy53cmFwcGVyJ1xuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIENPTExBUFNFRDogJ3NpZGViYXItY29sbGFwc2UnLFxuICAgIE9QRU46ICdzaWRlYmFyLW9wZW4nLFxuICAgIENMT1NFRDogJ3NpZGViYXItY2xvc2VkJ1xuICB9XG5cbiAgLyoqXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBjbGFzcyBQdXNoTWVudSB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgICAgIHRoaXMuX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgb3B0aW9ucylcblxuICAgICAgaWYgKCEkKFNlbGVjdG9yLk9WRVJMQVkpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9hZGRPdmVybGF5KClcbiAgICAgIH1cblxuICAgICAgdGhpcy5faW5pdCgpXG4gICAgfVxuXG4gICAgLy8gUHVibGljXG5cbiAgICBleHBhbmQoKSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy5hdXRvQ29sbGFwc2VTaXplKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSB0aGlzLl9vcHRpb25zLmF1dG9Db2xsYXBzZVNpemUpIHtcbiAgICAgICAgICAkKFNlbGVjdG9yLkJPRFkpLmFkZENsYXNzKENsYXNzTmFtZS5PUEVOKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoU2VsZWN0b3IuQk9EWSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNMT1NFRClcblxuICAgICAgaWYodGhpcy5fb3B0aW9ucy5lbmFibGVSZW1lbWJlcikge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgcmVtZW1iZXIke0VWRU5UX0tFWX1gLCBDbGFzc05hbWUuT1BFTilcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2hvd25FdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPV04pXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudClcbiAgICB9XG5cbiAgICBjb2xsYXBzZSgpIHtcbiAgICAgIGlmICh0aGlzLl9vcHRpb25zLmF1dG9Db2xsYXBzZVNpemUpIHtcbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDw9IHRoaXMuX29wdGlvbnMuYXV0b0NvbGxhcHNlU2l6ZSkge1xuICAgICAgICAgICQoU2VsZWN0b3IuQk9EWSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pLmFkZENsYXNzKENsYXNzTmFtZS5DTE9TRUQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJChTZWxlY3Rvci5CT0RZKS5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKVxuXG4gICAgICBpZih0aGlzLl9vcHRpb25zLmVuYWJsZVJlbWVtYmVyKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGByZW1lbWJlciR7RVZFTlRfS0VZfWAsIENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZEV2ZW50ID0gJC5FdmVudChFdmVudC5DT0xMQVBTRUQpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoY29sbGFwc2VkRXZlbnQpXG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgaWYgKCEkKFNlbGVjdG9yLkJPRFkpLmhhc0NsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5leHBhbmQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGF1dG9Db2xsYXBzZShyZXNpemUgPSBmYWxzZSkge1xuICAgICAgaWYgKHRoaXMuX29wdGlvbnMuYXV0b0NvbGxhcHNlU2l6ZSkge1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gdGhpcy5fb3B0aW9ucy5hdXRvQ29sbGFwc2VTaXplKSB7XG4gICAgICAgICAgaWYgKCEkKFNlbGVjdG9yLkJPRFkpLmhhc0NsYXNzKENsYXNzTmFtZS5PUEVOKSkge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlc2l6ZSA9PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKCQoU2VsZWN0b3IuQk9EWSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pKSB7XG4gICAgICAgICAgICAkKFNlbGVjdG9yLkJPRFkpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5PUEVOKVxuICAgICAgICAgIH0gZWxzZSBpZigkKFNlbGVjdG9yLkJPRFkpLmhhc0NsYXNzKENsYXNzTmFtZS5DTE9TRUQpKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtZW1iZXIoKSB7XG4gICAgICBpZih0aGlzLl9vcHRpb25zLmVuYWJsZVJlbWVtYmVyKSB7XG4gICAgICAgIGxldCB0b2dnbGVTdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGByZW1lbWJlciR7RVZFTlRfS0VZfWApXG4gICAgICAgIGlmICh0b2dnbGVTdGF0ZSA9PSBDbGFzc05hbWUuQ09MTEFQU0VEKXtcbiAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5ub1RyYW5zaXRpb25BZnRlclJlbG9hZCkge1xuICAgICAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcygnaG9sZC10cmFuc2l0aW9uJykuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCkuZGVsYXkoNTApLnF1ZXVlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvbGQtdHJhbnNpdGlvbicpXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kZXF1ZXVlKClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubm9UcmFuc2l0aW9uQWZ0ZXJSZWxvYWQpIHtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKCdob2xkLXRyYW5zaXRpb24nKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKS5kZWxheSg1MCkucXVldWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvbGQtdHJhbnNpdGlvbicpXG4gICAgICAgICAgICAgICQodGhpcykuZGVxdWV1ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0VEKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFByaXZhdGVcblxuICAgIF9pbml0KCkge1xuICAgICAgdGhpcy5yZW1lbWJlcigpXG4gICAgICB0aGlzLmF1dG9Db2xsYXBzZSgpXG5cbiAgICAgICQod2luZG93KS5yZXNpemUoKCkgPT4ge1xuICAgICAgICB0aGlzLmF1dG9Db2xsYXBzZSh0cnVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBfYWRkT3ZlcmxheSgpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXkgPSAkKCc8ZGl2IC8+Jywge1xuICAgICAgICBpZDogJ3NpZGViYXItb3ZlcmxheSdcbiAgICAgIH0pXG5cbiAgICAgIG92ZXJsYXkub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNlKClcbiAgICAgIH0pXG5cbiAgICAgICQoU2VsZWN0b3IuV1JBUFBFUikuYXBwZW5kKG92ZXJsYXkpXG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShvcGVyYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgICAgY29uc3QgX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgJCh0aGlzKS5kYXRhKCkpXG5cbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgZGF0YSA9IG5ldyBQdXNoTWVudSh0aGlzLCBfb3B0aW9ucylcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9wZXJhdGlvbiA9PT0gJ3N0cmluZycgJiYgb3BlcmF0aW9uLm1hdGNoKC9jb2xsYXBzZXxleHBhbmR8dG9nZ2xlLykpIHtcbiAgICAgICAgICBkYXRhW29wZXJhdGlvbl0oKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEYXRhIEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFNlbGVjdG9yLlRPR0dMRV9CVVRUT04sIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgIGxldCBidXR0b24gPSBldmVudC5jdXJyZW50VGFyZ2V0XG5cbiAgICBpZiAoJChidXR0b24pLmRhdGEoJ3dpZGdldCcpICE9PSAncHVzaG1lbnUnKSB7XG4gICAgICBidXR0b24gPSAkKGJ1dHRvbikuY2xvc2VzdChTZWxlY3Rvci5UT0dHTEVfQlVUVE9OKVxuICAgIH1cblxuICAgIFB1c2hNZW51Ll9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKGJ1dHRvbiksICd0b2dnbGUnKVxuICB9KVxuXG4gICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICBQdXNoTWVudS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChTZWxlY3Rvci5UT0dHTEVfQlVUVE9OKSlcbiAgfSlcblxuICAvKipcbiAgICogalF1ZXJ5IEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBQdXNoTWVudS5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQdXNoTWVudVxuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gUHVzaE1lbnUuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFB1c2hNZW51XG59KShqUXVlcnkpXG5cbmV4cG9ydCBkZWZhdWx0IFB1c2hNZW51XG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBZG1pbkxURSBUb2FzdHMuanNcbiAqIExpY2Vuc2UgTUlUXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFRvYXN0cyA9ICgoJCkgPT4ge1xuICAvKipcbiAgICogQ29uc3RhbnRzXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgY29uc3QgTkFNRSAgICAgICAgICAgICAgID0gJ1RvYXN0cydcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2x0ZS50b2FzdHMnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBJTklUOiBgaW5pdCR7RVZFTlRfS0VZfWAsXG4gICAgQ1JFQVRFRDogYGNyZWF0ZWQke0VWRU5UX0tFWX1gLFxuICAgIFJFTU9WRUQ6IGByZW1vdmVkJHtFVkVOVF9LRVl9YCxcbiAgfVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIEJPRFk6ICd0b2FzdC1ib2R5JyxcbiAgICBDT05UQUlORVJfVE9QX1JJR0hUOiAnI3RvYXN0c0NvbnRhaW5lclRvcFJpZ2h0JyxcbiAgICBDT05UQUlORVJfVE9QX0xFRlQ6ICcjdG9hc3RzQ29udGFpbmVyVG9wTGVmdCcsXG4gICAgQ09OVEFJTkVSX0JPVFRPTV9SSUdIVDogJyN0b2FzdHNDb250YWluZXJCb3R0b21SaWdodCcsXG4gICAgQ09OVEFJTkVSX0JPVFRPTV9MRUZUOiAnI3RvYXN0c0NvbnRhaW5lckJvdHRvbUxlZnQnLFxuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIFRPUF9SSUdIVDogJ3RvYXN0cy10b3AtcmlnaHQnLFxuICAgIFRPUF9MRUZUOiAndG9hc3RzLXRvcC1sZWZ0JyxcbiAgICBCT1RUT01fUklHSFQ6ICd0b2FzdHMtYm90dG9tLXJpZ2h0JyxcbiAgICBCT1RUT01fTEVGVDogJ3RvYXN0cy1ib3R0b20tbGVmdCcsXG4gICAgRkFERTogJ2ZhZGUnLFxuICB9XG5cbiAgY29uc3QgUG9zaXRpb24gPSB7XG4gICAgVE9QX1JJR0hUOiAndG9wUmlnaHQnLFxuICAgIFRPUF9MRUZUOiAndG9wTGVmdCcsXG4gICAgQk9UVE9NX1JJR0hUOiAnYm90dG9tUmlnaHQnLFxuICAgIEJPVFRPTV9MRUZUOiAnYm90dG9tTGVmdCcsXG4gIH1cblxuICBjb25zdCBJZCA9IHtcbiAgICBDT05UQUlORVJfVE9QX1JJR0hUOiAndG9hc3RzQ29udGFpbmVyVG9wUmlnaHQnLFxuICAgIENPTlRBSU5FUl9UT1BfTEVGVDogJ3RvYXN0c0NvbnRhaW5lclRvcExlZnQnLFxuICAgIENPTlRBSU5FUl9CT1RUT01fUklHSFQ6ICd0b2FzdHNDb250YWluZXJCb3R0b21SaWdodCcsXG4gICAgQ09OVEFJTkVSX0JPVFRPTV9MRUZUOiAndG9hc3RzQ29udGFpbmVyQm90dG9tTGVmdCcsXG4gIH1cblxuICBjb25zdCBEZWZhdWx0ID0ge1xuICAgIHBvc2l0aW9uOiBQb3NpdGlvbi5UT1BfUklHSFQsXG4gICAgZml4ZWQ6IHRydWUsXG4gICAgYXV0b2hpZGU6IGZhbHNlLFxuICAgIGF1dG9yZW1vdmU6IHRydWUsXG4gICAgZGVsYXk6IDEwMDAsXG4gICAgZmFkZTogdHJ1ZSxcbiAgICBpY29uOiBudWxsLFxuICAgIGltYWdlOiBudWxsLFxuICAgIGltYWdlQWx0OiBudWxsLFxuICAgIGltYWdlSGVpZ2h0OiAnMjVweCcsXG4gICAgdGl0bGU6IG51bGwsXG4gICAgc3VidGl0bGU6IG51bGwsXG4gICAgY2xvc2U6IHRydWUsXG4gICAgYm9keTogbnVsbCxcbiAgICBjbGFzczogbnVsbCxcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGFzcyBEZWZpbml0aW9uXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG4gIGNsYXNzIFRvYXN0cyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9jb25maWcgID0gY29uZmlnXG5cbiAgICAgIHRoaXMuX3ByZXBhcmVDb250YWluZXIoKTtcblxuICAgICAgY29uc3QgaW5pdEV2ZW50ID0gJC5FdmVudChFdmVudC5JTklUKVxuICAgICAgJCgnYm9keScpLnRyaWdnZXIoaW5pdEV2ZW50KVxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgY3JlYXRlKCkge1xuICAgICAgdmFyIHRvYXN0ID0gJCgnPGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIvPicpXG5cbiAgICAgIHRvYXN0LmRhdGEoJ2F1dG9oaWRlJywgdGhpcy5fY29uZmlnLmF1dG9oaWRlKVxuICAgICAgdG9hc3QuZGF0YSgnYW5pbWF0aW9uJywgdGhpcy5fY29uZmlnLmZhZGUpXG4gICAgICBcbiAgICAgIGlmICh0aGlzLl9jb25maWcuY2xhc3MpIHtcbiAgICAgICAgdG9hc3QuYWRkQ2xhc3ModGhpcy5fY29uZmlnLmNsYXNzKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmRlbGF5ICYmIHRoaXMuX2NvbmZpZy5kZWxheSAhPSA1MDApIHtcbiAgICAgICAgdG9hc3QuZGF0YSgnZGVsYXknLCB0aGlzLl9jb25maWcuZGVsYXkpXG4gICAgICB9XG5cbiAgICAgIHZhciB0b2FzdF9oZWFkZXIgPSAkKCc8ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+JylcblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5pbWFnZSAhPSBudWxsKSB7XG4gICAgICAgIHZhciB0b2FzdF9pbWFnZSA9ICQoJzxpbWcgLz4nKS5hZGRDbGFzcygncm91bmRlZCBtci0yJykuYXR0cignc3JjJywgdGhpcy5fY29uZmlnLmltYWdlKS5hdHRyKCdhbHQnLCB0aGlzLl9jb25maWcuaW1hZ2VBbHQpXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmltYWdlSGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICB0b2FzdF9pbWFnZS5oZWlnaHQodGhpcy5fY29uZmlnLmltYWdlSGVpZ2h0KS53aWR0aCgnYXV0bycpXG4gICAgICAgIH1cblxuICAgICAgICB0b2FzdF9oZWFkZXIuYXBwZW5kKHRvYXN0X2ltYWdlKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmljb24gIT0gbnVsbCkge1xuICAgICAgICB0b2FzdF9oZWFkZXIuYXBwZW5kKCQoJzxpIC8+JykuYWRkQ2xhc3MoJ21yLTInKS5hZGRDbGFzcyh0aGlzLl9jb25maWcuaWNvbikpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcudGl0bGUgIT0gbnVsbCkge1xuICAgICAgICB0b2FzdF9oZWFkZXIuYXBwZW5kKCQoJzxzdHJvbmcgLz4nKS5hZGRDbGFzcygnbXItYXV0bycpLmh0bWwodGhpcy5fY29uZmlnLnRpdGxlKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zdWJ0aXRsZSAhPSBudWxsKSB7XG4gICAgICAgIHRvYXN0X2hlYWRlci5hcHBlbmQoJCgnPHNtYWxsIC8+JykuaHRtbCh0aGlzLl9jb25maWcuc3VidGl0bGUpKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmNsb3NlID09IHRydWUpIHtcbiAgICAgICAgdmFyIHRvYXN0X2Nsb3NlID0gJCgnPGJ1dHRvbiBkYXRhLWRpc21pc3M9XCJ0b2FzdFwiIC8+JykuYXR0cigndHlwZScsICdidXR0b24nKS5hZGRDbGFzcygnbWwtMiBtYi0xIGNsb3NlJykuYXR0cignYXJpYS1sYWJlbCcsICdDbG9zZScpLmFwcGVuZCgnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj4nKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy50aXRsZSA9PSBudWxsKSB7XG4gICAgICAgICAgdG9hc3RfY2xvc2UudG9nZ2xlQ2xhc3MoJ21sLTIgbWwtYXV0bycpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRvYXN0X2hlYWRlci5hcHBlbmQodG9hc3RfY2xvc2UpXG4gICAgICB9XG5cbiAgICAgIHRvYXN0LmFwcGVuZCh0b2FzdF9oZWFkZXIpXG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuYm9keSAhPSBudWxsKSB7XG4gICAgICAgIHRvYXN0LmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwidG9hc3QtYm9keVwiIC8+JykuaHRtbCh0aGlzLl9jb25maWcuYm9keSkpXG4gICAgICB9XG5cbiAgICAgICQodGhpcy5fZ2V0Q29udGFpbmVySWQoKSkucHJlcGVuZCh0b2FzdClcblxuICAgICAgY29uc3QgY3JlYXRlZEV2ZW50ID0gJC5FdmVudChFdmVudC5DUkVBVEVEKVxuICAgICAgJCgnYm9keScpLnRyaWdnZXIoY3JlYXRlZEV2ZW50KVxuXG4gICAgICB0b2FzdC50b2FzdCgnc2hvdycpXG5cblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5hdXRvcmVtb3ZlKSB7XG4gICAgICAgIHRvYXN0Lm9uKCdoaWRkZW4uYnMudG9hc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5kZWxheSgyMDApLnJlbW92ZSgpO1xuXG4gICAgICAgICAgY29uc3QgcmVtb3ZlZEV2ZW50ID0gJC5FdmVudChFdmVudC5SRU1PVkVEKVxuICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKHJlbW92ZWRFdmVudClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgLy8gU3RhdGljXG5cbiAgICBfZ2V0Q29udGFpbmVySWQoKSB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLnBvc2l0aW9uID09IFBvc2l0aW9uLlRPUF9SSUdIVCkge1xuICAgICAgICByZXR1cm4gU2VsZWN0b3IuQ09OVEFJTkVSX1RPUF9SSUdIVDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlnLnBvc2l0aW9uID09IFBvc2l0aW9uLlRPUF9MRUZUKSB7XG4gICAgICAgIHJldHVybiBTZWxlY3Rvci5DT05UQUlORVJfVE9QX0xFRlQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9PSBQb3NpdGlvbi5CT1RUT01fUklHSFQpIHtcbiAgICAgICAgcmV0dXJuIFNlbGVjdG9yLkNPTlRBSU5FUl9CT1RUT01fUklHSFQ7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9PSBQb3NpdGlvbi5CT1RUT01fTEVGVCkge1xuICAgICAgICByZXR1cm4gU2VsZWN0b3IuQ09OVEFJTkVSX0JPVFRPTV9MRUZUO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9wcmVwYXJlQ29udGFpbmVyKCkge1xuICAgICAgaWYgKCQodGhpcy5fZ2V0Q29udGFpbmVySWQoKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKCc8ZGl2IC8+JykuYXR0cignaWQnLCB0aGlzLl9nZXRDb250YWluZXJJZCgpLnJlcGxhY2UoJyMnLCAnJykpXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcucG9zaXRpb24gPT0gUG9zaXRpb24uVE9QX1JJR0hUKSB7XG4gICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKENsYXNzTmFtZS5UT1BfUklHSFQpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlnLnBvc2l0aW9uID09IFBvc2l0aW9uLlRPUF9MRUZUKSB7XG4gICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKENsYXNzTmFtZS5UT1BfTEVGVClcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jb25maWcucG9zaXRpb24gPT0gUG9zaXRpb24uQk9UVE9NX1JJR0hUKSB7XG4gICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKENsYXNzTmFtZS5CT1RUT01fUklHSFQpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY29uZmlnLnBvc2l0aW9uID09IFBvc2l0aW9uLkJPVFRPTV9MRUZUKSB7XG4gICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKENsYXNzTmFtZS5CT1RUT01fTEVGVClcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29udGFpbmVyKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmZpeGVkKSB7XG4gICAgICAgICQodGhpcy5fZ2V0Q29udGFpbmVySWQoKSkuYWRkQ2xhc3MoJ2ZpeGVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5fZ2V0Q29udGFpbmVySWQoKSkucmVtb3ZlQ2xhc3MoJ2ZpeGVkJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKG9wdGlvbiwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgRGVmYXVsdCwgY29uZmlnKVxuICAgICAgICB2YXIgdG9hc3QgPSBuZXcgVG9hc3RzKCQodGhpcyksIF9vcHRpb25zKVxuXG4gICAgICAgIGlmIChvcHRpb24gPT09ICdjcmVhdGUnKSB7XG4gICAgICAgICAgdG9hc3Rbb3B0aW9uXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGpRdWVyeSBBUElcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkLmZuW05BTUVdID0gVG9hc3RzLl9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRvYXN0c1xuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gVG9hc3RzLl9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUb2FzdHNcbn0pKGpRdWVyeSlcblxuZXhwb3J0IGRlZmF1bHQgVG9hc3RzXG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBZG1pbkxURSBUb2RvTGlzdC5qc1xuICogTGljZW5zZSBNSVRcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgVG9kb0xpc3QgPSAoKCQpID0+IHtcbiAgLyoqXG4gICAqIENvbnN0YW50c1xuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gIGNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdUb2RvTGlzdCdcbiAgY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2x0ZS50b2RvbGlzdCdcbiAgY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbiAgY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuXG4gIGNvbnN0IFNlbGVjdG9yID0ge1xuICAgIERBVEFfVE9HR0xFOiAnW2RhdGEtd2lkZ2V0PVwidG9kby1saXN0XCJdJ1xuICB9XG5cbiAgY29uc3QgQ2xhc3NOYW1lID0ge1xuICAgIFRPRE9fTElTVF9ET05FOiAnZG9uZSdcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgb25DaGVjazogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0sXG4gICAgb25VbkNoZWNrOiBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsYXNzIERlZmluaXRpb25cbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBjbGFzcyBUb2RvTGlzdCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9jb25maWcgID0gY29uZmlnXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuXG4gICAgICB0aGlzLl9pbml0KClcbiAgICB9XG5cbiAgICAvLyBQdWJsaWNcblxuICAgIHRvZ2dsZShpdGVtKSB7XG4gICAgICBpdGVtLnBhcmVudHMoJ2xpJykudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlRPRE9fTElTVF9ET05FKTtcbiAgICAgIGlmICghICQoaXRlbSkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgIHRoaXMudW5DaGVjaygkKGl0ZW0pKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoZWNrKGl0ZW0pO1xuICAgIH1cblxuICAgIGNoZWNrIChpdGVtKSB7XG4gICAgICB0aGlzLl9jb25maWcub25DaGVjay5jYWxsKGl0ZW0pO1xuICAgIH1cblxuICAgIHVuQ2hlY2sgKGl0ZW0pIHtcbiAgICAgIHRoaXMuX2NvbmZpZy5vblVuQ2hlY2suY2FsbChpdGVtKTtcbiAgICB9XG5cbiAgICAvLyBQcml2YXRlXG5cbiAgICBfaW5pdCgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgJChTZWxlY3Rvci5EQVRBX1RPR0dMRSkuZmluZCgnaW5wdXQ6Y2hlY2tib3g6Y2hlY2tlZCcpLnBhcmVudHMoJ2xpJykudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLlRPRE9fTElTVF9ET05FKVxuICAgICAgJChTZWxlY3Rvci5EQVRBX1RPR0dMRSkub24oJ2NoYW5nZScsICdpbnB1dDpjaGVja2JveCcsIChldmVudCkgPT4ge1xuICAgICAgICB0aGF0LnRvZ2dsZSgkKGV2ZW50LnRhcmdldCkpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFN0YXRpY1xuXG4gICAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICAgIGNvbnN0IF9vcHRpb25zID0gJC5leHRlbmQoe30sIERlZmF1bHQsICQodGhpcykuZGF0YSgpKVxuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgIGRhdGEgPSBuZXcgVG9kb0xpc3QoJCh0aGlzKSwgX29wdGlvbnMpXG4gICAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gJ2luaXQnKSB7XG4gICAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGF0YSBBUElcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgVG9kb0xpc3QuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQoU2VsZWN0b3IuREFUQV9UT0dHTEUpKVxuICB9KVxuXG4gIC8qKlxuICAgKiBqUXVlcnkgQVBJXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgJC5mbltOQU1FXSA9IFRvZG9MaXN0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFRvZG9MaXN0XG4gICQuZm5bTkFNRV0ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gICAgcmV0dXJuIFRvZG9MaXN0Ll9qUXVlcnlJbnRlcmZhY2VcbiAgfVxuXG4gIHJldHVybiBUb2RvTGlzdFxufSkoalF1ZXJ5KVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvTGlzdFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWRtaW5MVEUgVHJlZXZpZXcuanNcbiAqIExpY2Vuc2UgTUlUXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFRyZWV2aWV3ID0gKCgkKSA9PiB7XG4gIC8qKlxuICAgKiBDb25zdGFudHNcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgKi9cblxuICBjb25zdCBOQU1FICAgICAgICAgICAgICAgPSAnVHJlZXZpZXcnXG4gIGNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdsdGUudHJlZXZpZXcnXG4gIGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG4gIGNvbnN0IEpRVUVSWV9OT19DT05GTElDVCA9ICQuZm5bTkFNRV1cblxuICBjb25zdCBFdmVudCA9IHtcbiAgICBTRUxFQ1RFRCAgICAgOiBgc2VsZWN0ZWQke0VWRU5UX0tFWX1gLFxuICAgIEVYUEFOREVEICAgICA6IGBleHBhbmRlZCR7RVZFTlRfS0VZfWAsXG4gICAgQ09MTEFQU0VEICAgIDogYGNvbGxhcHNlZCR7RVZFTlRfS0VZfWAsXG4gICAgTE9BRF9EQVRBX0FQSTogYGxvYWQke0VWRU5UX0tFWX1gXG4gIH1cblxuICBjb25zdCBTZWxlY3RvciA9IHtcbiAgICBMSSAgICAgICAgICAgOiAnLm5hdi1pdGVtJyxcbiAgICBMSU5LICAgICAgICAgOiAnLm5hdi1saW5rJyxcbiAgICBUUkVFVklFV19NRU5VOiAnLm5hdi10cmVldmlldycsXG4gICAgT1BFTiAgICAgICAgIDogJy5tZW51LW9wZW4nLFxuICAgIERBVEFfV0lER0VUICA6ICdbZGF0YS13aWRnZXQ9XCJ0cmVldmlld1wiXSdcbiAgfVxuXG4gIGNvbnN0IENsYXNzTmFtZSA9IHtcbiAgICBMSSAgICAgICAgICAgICAgIDogJ25hdi1pdGVtJyxcbiAgICBMSU5LICAgICAgICAgICAgIDogJ25hdi1saW5rJyxcbiAgICBUUkVFVklFV19NRU5VICAgIDogJ25hdi10cmVldmlldycsXG4gICAgT1BFTiAgICAgICAgICAgICA6ICdtZW51LW9wZW4nLFxuICAgIFNJREVCQVJfQ09MTEFQU0VEOiAnc2lkZWJhci1jb2xsYXBzZSdcbiAgfVxuXG4gIGNvbnN0IERlZmF1bHQgPSB7XG4gICAgdHJpZ2dlciAgICAgICAgICAgICAgOiBgJHtTZWxlY3Rvci5EQVRBX1dJREdFVH0gJHtTZWxlY3Rvci5MSU5LfWAsXG4gICAgYW5pbWF0aW9uU3BlZWQgICAgICAgOiAzMDAsXG4gICAgYWNjb3JkaW9uICAgICAgICAgICAgOiB0cnVlLFxuICAgIGV4cGFuZFNpZGViYXIgICAgICAgIDogZmFsc2UsXG4gICAgc2lkZWJhckJ1dHRvblNlbGVjdG9yOiAnW2RhdGEtd2lkZ2V0PVwicHVzaG1lbnVcIl0nXG4gIH1cblxuICAvKipcbiAgICogQ2xhc3MgRGVmaW5pdGlvblxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuICBjbGFzcyBUcmVldmlldyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgICB0aGlzLl9jb25maWcgID0gY29uZmlnXG4gICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cblxuICAgIC8vIFB1YmxpY1xuXG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuX3NldHVwTGlzdGVuZXJzKClcbiAgICB9XG5cbiAgICBleHBhbmQodHJlZXZpZXdNZW51LCBwYXJlbnRMaSkge1xuICAgICAgY29uc3QgZXhwYW5kZWRFdmVudCA9ICQuRXZlbnQoRXZlbnQuRVhQQU5ERUQpXG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcuYWNjb3JkaW9uKSB7XG4gICAgICAgIGNvbnN0IG9wZW5NZW51TGkgICA9IHBhcmVudExpLnNpYmxpbmdzKFNlbGVjdG9yLk9QRU4pLmZpcnN0KClcbiAgICAgICAgY29uc3Qgb3BlblRyZWV2aWV3ID0gb3Blbk1lbnVMaS5maW5kKFNlbGVjdG9yLlRSRUVWSUVXX01FTlUpLmZpcnN0KClcbiAgICAgICAgdGhpcy5jb2xsYXBzZShvcGVuVHJlZXZpZXcsIG9wZW5NZW51TGkpXG4gICAgICB9XG5cbiAgICAgIHRyZWV2aWV3TWVudS5zdG9wKCkuc2xpZGVEb3duKHRoaXMuX2NvbmZpZy5hbmltYXRpb25TcGVlZCwgKCkgPT4ge1xuICAgICAgICBwYXJlbnRMaS5hZGRDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGV4cGFuZGVkRXZlbnQpXG4gICAgICB9KVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmV4cGFuZFNpZGViYXIpIHtcbiAgICAgICAgdGhpcy5fZXhwYW5kU2lkZWJhcigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2UodHJlZXZpZXdNZW51LCBwYXJlbnRMaSkge1xuICAgICAgY29uc3QgY29sbGFwc2VkRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkNPTExBUFNFRClcblxuICAgICAgdHJlZXZpZXdNZW51LnN0b3AoKS5zbGlkZVVwKHRoaXMuX2NvbmZpZy5hbmltYXRpb25TcGVlZCwgKCkgPT4ge1xuICAgICAgICBwYXJlbnRMaS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuT1BFTilcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKGNvbGxhcHNlZEV2ZW50KVxuICAgICAgICB0cmVldmlld01lbnUuZmluZChgJHtTZWxlY3Rvci5PUEVOfSA+ICR7U2VsZWN0b3IuVFJFRVZJRVdfTUVOVX1gKS5zbGlkZVVwKClcbiAgICAgICAgdHJlZXZpZXdNZW51LmZpbmQoU2VsZWN0b3IuT1BFTikucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRvZ2dsZShldmVudCkge1xuXG4gICAgICBjb25zdCAkcmVsYXRpdmVUYXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpXG4gICAgICBjb25zdCAkcGFyZW50ID0gJHJlbGF0aXZlVGFyZ2V0LnBhcmVudCgpXG5cbiAgICAgIGxldCB0cmVldmlld01lbnUgPSAkcGFyZW50LmZpbmQoJz4gJyArIFNlbGVjdG9yLlRSRUVWSUVXX01FTlUpXG5cbiAgICAgIGlmICghdHJlZXZpZXdNZW51LmlzKFNlbGVjdG9yLlRSRUVWSUVXX01FTlUpKSB7XG5cbiAgICAgICAgaWYgKCEkcGFyZW50LmlzKFNlbGVjdG9yLkxJKSkge1xuICAgICAgICAgIHRyZWV2aWV3TWVudSA9ICRwYXJlbnQucGFyZW50KCkuZmluZCgnPiAnICsgU2VsZWN0b3IuVFJFRVZJRVdfTUVOVSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHJlZXZpZXdNZW51LmlzKFNlbGVjdG9yLlRSRUVWSUVXX01FTlUpKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBjb25zdCBwYXJlbnRMaSA9ICRyZWxhdGl2ZVRhcmdldC5wYXJlbnRzKFNlbGVjdG9yLkxJKS5maXJzdCgpXG4gICAgICBjb25zdCBpc09wZW4gICA9IHBhcmVudExpLmhhc0NsYXNzKENsYXNzTmFtZS5PUEVOKVxuXG4gICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UoJCh0cmVldmlld01lbnUpLCBwYXJlbnRMaSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhwYW5kKCQodHJlZXZpZXdNZW51KSwgcGFyZW50TGkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZVxuXG4gICAgX3NldHVwTGlzdGVuZXJzKCkge1xuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5fY29uZmlnLnRyaWdnZXIsIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnRvZ2dsZShldmVudClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgX2V4cGFuZFNpZGViYXIoKSB7XG4gICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKENsYXNzTmFtZS5TSURFQkFSX0NPTExBUFNFRCkpIHtcbiAgICAgICAgJCh0aGlzLl9jb25maWcuc2lkZWJhckJ1dHRvblNlbGVjdG9yKS5QdXNoTWVudSgnZXhwYW5kJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGF0aWNcblxuICAgIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgICBjb25zdCBfb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBEZWZhdWx0LCAkKHRoaXMpLmRhdGEoKSlcblxuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICBkYXRhID0gbmV3IFRyZWV2aWV3KCQodGhpcyksIF9vcHRpb25zKVxuICAgICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcgPT09ICdpbml0Jykge1xuICAgICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERhdGEgQVBJXG4gICAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICovXG5cbiAgJCh3aW5kb3cpLm9uKEV2ZW50LkxPQURfREFUQV9BUEksICgpID0+IHtcbiAgICAkKFNlbGVjdG9yLkRBVEFfV0lER0VUKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIFRyZWV2aWV3Ll9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRoaXMpLCAnaW5pdCcpXG4gICAgfSlcbiAgfSlcblxuICAvKipcbiAgICogalF1ZXJ5IEFQSVxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAqL1xuXG4gICQuZm5bTkFNRV0gPSBUcmVldmlldy5falF1ZXJ5SW50ZXJmYWNlXG4gICQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBUcmVldmlld1xuICAkLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgICByZXR1cm4gVHJlZXZpZXcuX2pRdWVyeUludGVyZmFjZVxuICB9XG5cbiAgcmV0dXJuIFRyZWV2aWV3XG59KShqUXVlcnkpXG5cbmV4cG9ydCBkZWZhdWx0IFRyZWV2aWV3XG4iXSwic291cmNlUm9vdCI6IiJ9