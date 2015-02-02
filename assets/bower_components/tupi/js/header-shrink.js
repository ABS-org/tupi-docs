/*jshint undef:false */
var headerShrink = function(headerName, className, changeOn) {

   var docElem = document.documentElement,
       header = document.querySelector( headerName ),
       didScroll = false,
       changeHeaderOn = changeOn;

   function init() {
       window.addEventListener( 'scroll', function( event ) {
           if( !didScroll ) {
               didScroll = true;
               setTimeout( scrollPage, 250 );
           }
       }, false );
   }

   function scrollPage() {
       var sy = scrollY();
       if ( sy >= changeHeaderOn ) {
           classie.add( header, className);
       }
       else {
           classie.remove( header, className);
       }
       didScroll = false;
   }

   function scrollY() {
       return window.pageYOffset || docElem.scrollTop;
   }

   init();

};
