(function () {
  var header = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        this.checkHeader();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-header');
      this.$wrapper = this.$el.find('.header__content');
      this.$content = this.$el.find('.header__box');
    },
    checkHeader: function () {
      if (this.$el.hasClass('-header-fixed')) {
        if (this.$el.hasClass('-header-landingPage')) {
          this.setLandingPage();
        }
        else {
          this.setFixedMenu();
        }
      }
    },
    setFixedMenu: function () {
      this.$el.css('min-height', this.$content.height());
      this.$wrapper.css('min-height', this.$content.height());
    },
    setLandingPage: function () {
      this.$el.css('min-height', 0);
      this.$wrapper.css('min-height', 0);
      this.setStateHeaderBackground();
    },
    setStateHeaderBackground: function () {
      $(window).scroll(this.setHeaderBackground.bind(this))
    },
    setHeaderBackground: function () {
      if ($(window).scrollTop() > this.$content.height()) {
        if (!this.$el.hasClass('-header-landingPage-background')) {
          this.$el.addClass('-header-landingPage-background')
        }
      } else {
        if (this.$el.hasClass('-header-landingPage-background')) {
          this.$el.removeClass('-header-landingPage-background')
        }
      }
    }
  };

  function isElement(item) {
    return item.length > 0
  }

  header.init();
})();