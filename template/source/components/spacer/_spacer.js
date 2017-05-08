(function () {
  var spacer = {
    init: function () {
      this.catchDOM();
      if(isElement(this.$el)){
        this.eachElement()
      }
    },
    catchDOM: function () {
      this.$el = $('.js-parallax')
    },
    eachElement: function () {
      this.$el.each(this.generateParallax.bind(this))
    },
    generateParallax: function (index, element) {
      var _this = $(element);
      _this.jarallax({});
    }
  };

  function isElement(item) {
    return item.length > 0
  }


  spacer.init();
})();