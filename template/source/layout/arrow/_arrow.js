(function () {
  var arrow = {
    init: function () {
      this.catchDOM();
      if (this.isElement()) {
        this.bindEvents();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-arrow')
    },
    isElement: function () {
      return this.$el.length > 0
    },
    bindEvents: function () {
      this.$el.on('click', this.scrollToTop.bind(this));
      $(window).scroll(this.onScroll.bind(this))
    },
    scrollToTop: function (event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1500);
    },
    onScroll: function () {
      if ($(window).scrollTop() > ($(document).height() / 2)) {
        this.$el.addClass('-visible');
      } else {
        this.$el.removeClass('-visible');
      }
    }
  };

  arrow.init();
})();