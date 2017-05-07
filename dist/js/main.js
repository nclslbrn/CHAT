$(document).ready(function(e) {


  $.getJSON('json/nt_quotes.json', function(nt_quotes) {


    $.each(nt_quotes, function(i, item) {

      var delay = item.length * 800;
      setTimeout(function() {

        $('<p>' + item + '</p>').appendTo("#auto-scroll").hide().slideDown();

      }, delay);

    });

  });

});
