<?php
/**
 * Usefull function uses to make the tchat
 */
function get_themes( $quotes ) {

  $themes = array();

  foreach ($quotes as $author => $quote_by_an_author ) {

    foreach ( $quote_by_an_author as $quote ) {

      if( !in_array( $quote['theme'], $themes) ) {

        array_push($themes, $quote['theme']);

      }
    }
  }
  return $themes;
}

function get_chat_text( $random_theme, $quotes, $authors_def ) {

  $chat_text = array();


  foreach ($quotes as $author => $quote_by_an_author ) {

    foreach ( $quote_by_an_author as $quote ) {

      if( $quote['theme'] == $random_theme ) {

        $author_name = ucwords( str_replace('-', ' ', $author ));
        $comment = array( 'author' => $author_name, 'text' => $quote['text'] );
        array_push($chat_text, $comment);

      }
    }
  }
  shuffle( $chat_text );
  return $chat_text;
}


?>
