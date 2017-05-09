(function () {
  var $el;

  function init() {
    catchDOM();
    if (isElement($el)) {
      generatePopup();
    }
  }

  function catchDOM() {
    $el = $('.js-halfbox-popup')
  }

  function generatePopup() {
    $el.magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    })
  }

  function isElement(item) {
    return item.length > 0
  }
  init();
})();
