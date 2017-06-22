/*
Part of the CHAT Project (https://CHAT.artemg.com/)
Copyright (c) 2017 Nicolas Lebrun - OSI/MIT license (https://CHAT.artemg.com/LICENSE).
*/
var current_theme = '';
var quotes_count = 0;
var lines_count = 0;
var themes_already_used = [];

function add_line_number(quote_id) {

  var height = $(quote_id).height();
  //var line_height = $(quote_id + ' .quote').css('line_height'); // doesn't work
  var line_height = 32; // )-: HARDCODE = SHAME (this &@!‰#¥Ô removes resonsive rule with line-height property)
  var lines = Math.round( height / line_height );

  for( var i = lines_count + 1 ; i <= lines + lines_count; i++){

  	$(quote_id + ' .line_count').append(i + "<br />");

  }
  lines_count = lines_count + lines;
}

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
  quotes_count++;
  var quote_id = 'quote_' + quotes_count;
  var date = new Date();
  var hours = (("" + date.getHours()).length < 2 ? "0": "") + date.getHours();
  var minutes = (("" + date.getMinutes()).length < 2 ? "0": "") + date.getMinutes();
  var seconds = (("" + date.getSeconds()).length < 2 ? "0": "") + date.getSeconds();
  var footer = '<br /><date class=\''+ current_theme + '\'>[' + hours + ':' + minutes + ':' + seconds + ']</date><author>'+ author +'</author>';
  var content = '<tr id=\'' + quote_id + '\'><td class=\'line_count\'></td><td class=\'quote ' + text_size + '\'>' + item + footer + '<br /><br /></td></tr>';

  $(content).appendTo("#quote_table tbody").hide().fadeIn();
  add_line_number('#' + quote_id );
}

function chat_reader( quotes, n ) {

  $("#timer-bar svg").animate({"stroke-dashoffset": "204.24"}, 0 );

  if( quotes[n]['text'] != null ){

    var ms_per_character = 100;
    var length = quotes[n]['text'].length;
    var delay = length * ms_per_character;

    var total_quotes = (quotes.length - 1);
    add_quote( n, quotes[n]['text'], length, quotes[n]['author'] );

  }

  $("#quotes-count").html("<span class=\"index\">" + (n + 1) + "</span>/<span class=\"total\">" + (total_quotes + 1) ) + "</span>";

  $("#timer-bar svg").animate({"stroke-dashoffset": "0"}, delay );

  if( n < total_quotes ) {

    setTimeout(function(){

      n++;
      chat_reader( quotes, n);

    }, delay);

  } else {
    setTimeout(function(){

      current_theme = '';
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

    $('#timer-bar #current-theme').removeClass('glitched');

    var n = 0;

    themes_already_used = quotes.themes;
    current_theme = themes_already_used[themes_already_used.length - 1];
    var html_theme = '<div class=\'theme\'>' + current_theme + '</div>';
    $('#timer-bar #current-theme').html( html_theme + html_theme + html_theme);
    $('#timer-bar #current-theme').addClass('glitched');
    $('body').removeClass();
    $('body').addClass( current_theme );
    chat_reader( quotes.texts, n, themes_already_used );

  });

}

$( document ).ready( function() {

  query( themes_already_used );

});
