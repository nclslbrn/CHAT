/**
 * Put quote into the DOM
 */

function add_quote(i, item, length, author) {

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

  var footer = '<footer>'+ author +' - il y a quelques instants</footer>';

  $('<blockquote id=\'quote--'+i+'\' class=\''+text_size+'\'>'+item+footer+'</blockquote>').appendTo("#auto-scroll").hide().slideDown();
}

function chat_reader( quotes ) {

  for( var n in quotes ) {

    var length = quotes[n]['text'].length;

    (function(n){

      setTimeout(function(){
        add_quote(n, quotes[n]['text'], length, quotes[n]['author'] );
      }, 500 * length)

    })(n);
  }
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

$( document ).ready( function() {

  $.ajax({
    url: 'data/index.php',
    type: "GET",
    data: 'chat=start',
    dataType: "json",
    success: function(quotes, status) {

      chat_reader(quotes);
      //console.log(status);
    },
    error: function(quotes, status, error) {
      //console.log(error);
    },
    complete: function(quotes, status) {
      //console.log(status);

    }
  });
});
