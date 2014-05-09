/* main.js */

// shrinkHeader call
headerShrink('.header-shrink', 'header-shrink-active' );

// smoothScroll call
smoothScroll.init({
  speed: 999,
  easing: 'easeInOutCubic',
  offset: 0,
  updateURL: true,
  callbackBefore: function ( toggle, anchor ) {},
  callbackAfter: function ( toggle, anchor ) {}
});

// pageOverlay call
(function() {
  var pageWrap = document.getElementById( 'pagewrap' ),
    pages = [].slice.call( pageWrap.querySelectorAll( 'div.container' ) ),
    currentPage = 0,
    triggerLoading = [].slice.call( pageWrap.querySelectorAll( 'a.pageload-link' ) ),
    loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 400, easingIn : mina.easeinout } );

  function init() {
    triggerLoading.forEach( function( trigger ) {
      trigger.addEventListener( 'click', function( ev ) {
        ev.preventDefault();
        loader.show();
        // after some time hide loader
        setTimeout( function() {
          loader.hide();

          classie.removeClass( pages[ currentPage ], 'show' );
          // update..
          currentPage = currentPage ? 0 : 1;
          classie.addClass( pages[ currentPage ], 'show' );

        }, 840 );
      } );
    } );
  }
  init();
})();
