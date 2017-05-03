(function () {
  var loader = {
    init: function () {
      this.cacheDOM();
      if(this.$el.length > 0){
        this.timeout();
      }
    },
    cacheDOM: function () {
      this.$el = $('.js-loader')
    },
    timeout: function () {
      setTimeout(this.setAnimate.bind(this),1000)
    },
    setAnimate: function () {
      this.$el.addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', this.setHide.bind(this));
    },
    setHide: function (event) {
      $(event.target).css('display', 'none').remove();
    }
  };

  loader.init();
})();