<?php
/*
Part of the CHAT Project (https://CHAT.artemg.com/)
Copyright (c) 2017 Nicolas Lebrun - OSI/MIT license (https://CHAT.artemg.com/LICENSE).
*/
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

function get_chat_text( $random_theme, $quotes ) {

  $chat_text = array();
  $temp_text = array();
  $n_quotes = 0;

  foreach ($quotes as $author => $quote_by_an_author ) {

    foreach ( $quote_by_an_author as $quote ) {

      if( $quote['theme'] == $random_theme ) {

        $author_name = ucwords( str_replace('-', ' ', $author ));
        $comment = array( 'author' => $author_name, 'text' => $quote['text'] );

        if( $n_quotes == 0 || $chat_text[$n_quotes - 1]['author'] !== $author_name ) {

          array_push( $chat_text, $comment );
          $n_quotes++;

        } elseif ($chat_text[0]['author'] !== $author_name ) {

          $n_quotes = array_unshift( $chat_text, $comment );

        } else {

          array_push($temp_text, $comment);

        }
      }
    }
  }
  shuffle_assoc( $chat_text );
  shuffle_assoc( $temp_text );

  $chat_text = array_merge( $chat_text, $temp_text );
  shuffle_assoc( $chat_text );

  return $chat_text;
}

function shuffle_assoc($array) {

  $keys = array_keys($array);

  shuffle($keys);

  foreach($keys as $key) {
      $new[$key] = $array[$key];
  }

  $array = $new;

  return true;
}


?>
