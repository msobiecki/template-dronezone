/*
 * Banner version v.1.0 (Fullsceen)
 *
 * Components
 * html: _banner.pug
 * css: _banner.sass
 *
 * Init a fullscreen banner
 * @class .js-banner
 *
 * Possible modification
 * # Create a slick-carousel
 * @class .js-banner.-banner-slick
 * # If Fixed header (modification into .header e.g. [.header.-header-fixed] also [.header.-header-landingPage])
 * @class
 *
 * @author: https://github.com/SaliMike
 */

(function () {
  var banner = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        if (isSlickInited(this.$el)) {
          this.generateSlick();
        }
        this.bindEvents();
        this.setHeight();
        this.toggleHide();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-banner');
      this.$slider = this.$el.find('.banner__slider');
      this.$item = this.$el.find('.banner__item');
      this.$image = this.$el.find('.banner__image');
      this.$toggler = this.$el.find('.banner__toggler');
      this.$content = this.$el.find('.banner__content');

      this.$header = $('.js-header');
      this.$headerBox = this.$header.find('.header__box');
    },
    bindEvents: function () {
      $(window).resize(this.setHeight.bind(this));
      this.$toggler.on('click', this.toggleScroll.bind(this));
    },
    generateSlick: function () {
      this.$slider.slick({
        slide: '.banner__item',
        infinite: true,
        dots: true,
        appendDots: '.banner__dots',
        customPaging: function (slider, i) {
          return '<div class="banner__dot"></div>';
        },
        arrows: true,
        appendArrows: '.banner__arrows',
        prevArrow: '<div class="banner__arrow -prev"><i class="material-icons">chevron_left</i></div>',
        nextArrow: '<div class="banner__arrow -next"><i class="material-icons">chevron_right</i></div>',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 3000
      });
      this.$item = this.$el.find('.banner__item');
      this.$image = this.$el.find('.banner__image');
      this.onInit();
      this.onChangeSlide();
    },
    setHeight: function () {
      var fullscreenBreaker = elementHeight(this.$content) + elementHeight(this.$headerBox) + 200;
      if (fullscreenBreaker > windowHeight()) {
        this.$el.css('height', fullscreenBreaker);
        this.$slider.css('height', fullscreenBreaker);
        this.$item.css('height', fullscreenBreaker);
        this.$image.css('height', fullscreenBreaker);
      } else {
        if ($('.header.-header-landingPage.-header-fixed').length > 0) {
          this.$el.css('height', windowHeight());
          this.$slider.css('height', windowHeight());
          this.$item.css('height', windowHeight());
          this.$image.css('height', windowHeight());
        } else {
          this.$el.css('height', windowHeight() - elementHeight(this.$header));
          this.$slider.css('height', windowHeight() - elementHeight(this.$header));
          this.$item.css('height', windowHeight() - elementHeight(this.$header));
          this.$image.css('height', windowHeight() - elementHeight(this.$header));
        }
      }
    },


    onInit: function () {
      this.$slider.find('.slick-current .banner__content').addClass('-banner-content-show animated fadeIn');
    },
    onChangeSlide: function () {
      this.$slider.on('afterChange', function (event) {
        var _this = $(event.target).find('.slick-current .banner__content');
        $(event.target).find('.banner__content').not(_this).removeClass('-banner-content-show animated fadeIn');
        _this.addClass('-banner-content-show animated fadeIn');
      });
    },

    toggleHide: function () {
      this.$item.each(function () {
        if ($(this).attr('href')) {
          $(this).find('.banner__toggler').css('display', 'none')
        } else {
          $(this).find('.banner__toggler i').addClass('animated infinite pulse');
        }
      })
    },
    toggleScroll: function (event) {
      event.preventDefault();
      var target = $(event.currentTarget).data('href');
      var height = this.checkHeader();
      $('html, body').animate({
        scrollTop: ($(target).offset().top - height)
      }, 1500);
    },
    checkHeader: function () {
      if (this.$header.length > 0) {
        if (this.$header.hasClass('-header-fixed')) {
          return this.$headerBox.height();
        } else {
          return 0
        }
      }
      else {
        return 0
      }
    }
  };

  function isElement(item) {
    return item.length > 0
  }

  function windowHeight() {
    return $(window).height();
  }

  function elementHeight(item) {
    return $(item).height();
  }

  function isSlickInited(item) {
    return item.hasClass('-banner-slick')
  }

  banner.init();
})();