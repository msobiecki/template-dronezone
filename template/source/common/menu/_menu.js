/* TODO
 WYKRYCIE KIEDY PC KIEDY MOBILE na podstawie AGENTA
 [PC] Hover na glownym elemencie rozwija liste
 [MOBILE] KLIK na plusa rozwija liste

 TOGGLER
 Na klika rozwija glowna liste
 I zwija tez

 */
(function () {
  var menu = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        this.bindEvents();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-menu');
      this.$item = this.$el.find('.menu__item');
      this.$dropdown = this.$el.find('.menu__dropdown');
    },
    bindEvents: function () {
      this.$item.on('mouseover', this.openMenu.bind(this));
      this.$item.on('mouseleave', this.closeMenu.bind(this));

      this.$dropdown.on('click', this.toggleMenu.bind(this));
    },
    openMenu: function (e) {
      var _this = $(e.currentTarget);
      if (!isMobile()) {
        this.$item.not(_this).removeClass('-nav-active');
        _this.addClass('-nav-active -nav-mouse');


        this.checkOffsetSubmenu(_this);
      }
    },
    checkOffsetSubmenu: function (item) {
      var submenu = item.find('.menu__submenu');
      if(submenu.length > 0){
        var leftOffset = submenu.offset().left;
        var rightOffset = $(window).width() - (leftOffset + submenu.outerWidth())
        if (rightOffset < 0){
          item.addClass('-nav-right-align')
        }
      }
    },
    closeMenu: function (e) {
      var _this = $(e.currentTarget);
      if (!isMobile()) {
        if (_this.hasClass('-nav-active')) {
          _this.removeClass('-nav-mouse');
          if (_this.find('.menu__submenu').length > 0) {
            setTimeout(function () {
              if (!_this.hasClass('-nav-mouse')) {
                _this.removeClass('-nav-active')
              }
            }, 3000)
          } else {
            if (!_this.hasClass('-nav-mouse')) {
              _this.removeClass('-nav-active')
            }
          }
        }
      }
    },
    toggleMenu: function (e) {
      var _this = $(e.currentTarget).closest('.menu__item');
      if (isMobile()) {
        if (_this.hasClass('-nav-active')) {
          if (_this.find('.menu__submenu').length > 0) {
            _this.removeClass('-nav-active')
          } else {
            if (!_this.hasClass('-nav-mouse')) {
              _this.removeClass('-nav-active')
            }
          }
        } else {
          this.$item.not(_this).removeClass('-nav-active');
          _this.addClass('-nav-active')
        }
      }
    }
  };

  function isElement(item) {
    return item.length > 0
  }

  function isMobile() {
    return $(window).width() <= 1024
  }

  menu.init();
})();