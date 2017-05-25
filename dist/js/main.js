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
  var footer = '<footer>' + author +' - ' + hours + ':' + minutes + ':' + seconds + '</footer>';

  $('<blockquote id=\'quote--' + i + '\' class=\'' + text_size + '\'>' + item + footer + '</blockquote>').appendTo("#auto-scroll").hide().slideDown();
}

function chat_reader( quotes, n ) {

  if( quotes[n]['text'] != null ){

    var length = quotes[n]['text'].length;
    var total_quotes = (quotes.length - 1);
    add_quote(n, quotes[n]['text'], length, quotes[n]['author'] );

  }


  $("#quotes-count").html(n + "/" + total_quotes )

  if( n < total_quotes ) {

    setTimeout(function(){

      n++;
      chat_reader( quotes, n );

    }, 100 * length);

  } else {
    setTimeout(function(){

      init();

    }, 100 * length);

  }
}

function load_quotes(callback) {

  $('#loader').addClass('active');

  $.ajax({
    url: 'data/index.php',
    type: "GET",
    data: 'chat=start',
    dataType: "json",
    success: callback,
    complete: function(quotes, status) {

      $('#loader').removeClass('active');

    }
  });

}

function init() {
  load_quotes(function(quotes){
    var n = 0;
    chat_reader(quotes, n);
  });
}

$( document ).ready( function() {

  init();

});
