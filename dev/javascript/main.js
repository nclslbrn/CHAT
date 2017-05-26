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

  var date = new Date();
  var hours = (("" + date.getHours()).length < 2 ? "0" : "") + date.getHours();
  var minutes = (("" + date.getMinutes()).length < 2 ? "0" : "") + date.getMinutes();
  var seconds = (("" + date.getSeconds()).length < 2 ? "0" : "") + date.getSeconds();
  var footer = '<footer><author>' + author +'</author> - <time>' + hours + ':' + minutes + ':' + seconds + '</time></footer>';

  $('<blockquote class=\'' + text_size + '\'>' + item + footer + '</blockquote>').appendTo("#auto-scroll").hide().slideDown();
}

/**
 * Add delay between two quotes (depends to length of the first quote)
 */
function chat_reader( quotes, n, themes_already_used ) {

  $("#timer-bar").animate({width: "0"}, 0 );
  if( quotes[n]['text'] != null ){

    var ms_per_character = 100;
    var length = quotes[n]['text'].length;
    var delay = length * ms_per_character;

    var total_quotes = (quotes.length - 1);
    add_quote( n, quotes[n]['text'], length, quotes[n]['author'] );

  }

  $("#quotes-count").html("<span class=\"index\">" + (n + 1) + "</span><span class=\"total\">" + (total_quotes + 1) ) + "</span>";
  $("#timer-bar").animate({width: "100%"}, delay );

  if( n < total_quotes ) {

    setTimeout(function(){

      n++;
      chat_reader( quotes, n );

    }, delay);

  } else {
    setTimeout(function(){

      query();

    }, delay);

  }
}

function load_quotes( callback ) {

  $( '#loader' ).addClass( 'active' );

  if( themes_already_used === undefined ) {

    var data = { chat: 'query' };

    console.log( "themes_already_used not defined" );

  } else {

    var data = {
      chat: 'query',
      themes: JSON.stringify( themes_already_used )
    };

    console.log( themes_already_used);

  }
  $.ajax({
    url: 'data/index.php',
    type: "GET",
    data: data,
    dataType: "json",
    success: callback,
    complete: function( quotes, status ) {

      $( '#loader' ).removeClass( 'active' );

    }
  });

}

function query() {

  load_quotes( function( quotes ){

    var n = 0;

    themes_already_used = quotes.themes;

    chat_reader( quotes.texts, n, themes_already_used );

    return themes_already_used;

  });

}

var themes_already_used = [];

$( document ).ready( function() {

  query( themes_already_used );

});
