(function () {
  var abstract = {
    init: function () {
      this.catchDOM();
      if (this.isElement()) {
        this.generateSlick();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-abstract')
    },
    isElement: function () {
      return this.$el.length > 0
    },
    generateSlick: function () {
      this.$el.slick({
        slide: '.abstract__item',
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        adaptiveHeight: false,
        autoplay: true,
        speed: 3000
      })
    }
  };

  abstract.init();
})();