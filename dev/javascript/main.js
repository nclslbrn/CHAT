/**
 * Put quote into the DOM
 */

function add_quote(i, item, length, user) {

  var text_size = '';

  if( length < 100 ) {

    text_size = 'large';

  }
  if( length < 200 && length > 100 ) {

    text_size = 'regular';

  }
  if( length > 200 ) {

    text_size = 'small';

  }

  var footer = '<footer>'+ user +' - il y a quelques instants</footer>';

  $('<blockquote id=\'quote-'+ i +'\' class=\''+ text_size +'\'>' + item + footer + '</blockquote>').appendTo("#auto-scroll").hide().slideDown();

}



/**
 * Wait function
 */

(function($) {

  $.wait = function(duration, completeCallback, target) {
    $target = $(target || '<queue />');
    return $target.delay( duration ).queue( function( next ) {
      completeCallback.call( $target ); next();
    });
  }

  $.fn.wait = function( duration, completeCallback ) {
    return $.wait.call(this, duration, completeCallback, this);
  };

})(jQuery);

/**
 * Read json data
 */

$.getJSON( "json/nt_quotes.json", function( nt_quotes ) {

  var user = 'Nicolas Tesla';

  $.each( nt_quotes, function(i, item) {

    var length = item.length;
    var delay = length * 800;

    $.wait(delay, function() {

      add_quote(i, item, length, user );

    });

  });

});
