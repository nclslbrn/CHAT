<?php
/*
Part of the CHAT Project (https://CHAT.artemg.com/)
Copyright (c) 2017 Nicolas Lebrun - OSI/MIT license (https://CHAT.artemg.com/LICENSE).
*/

include_once('functions.php');
/**
 * Main array fill with files below
 * @param $quotes[author] = [ theme | text ]
 */
$quotes = array();
include_once('_isaac-asimov.php');
include_once('_alain-damasio.php');
include_once('_heraclite-d-ephese.php');
include_once('_michel-foucault.php');
include_once('_ada-lovelace.php');
include_once('_nicolas-tesla.php');
include_once('_aaron-swartz.php');
include_once('_linus-torvalds.php');
include_once('_alan-turing.php');

if( !empty( $_GET['chat']) ) {


  $op = $_GET['chat'];

  switch( $op ) {

    case 'query':
      header('Content-Type: application/json');
      $themes = get_themes( $quotes );

      if( !empty($_GET['themes']) ){

        $used_themes = json_decode($_GET['themes']);
        $used_themes_count = count( $used_themes );
        $themes_count =  count( $themes );

        if( $used_themes_count < $themes_count ) {

          foreach( $used_themes as $used_theme ) {

            if( ($key = array_search( $used_theme, $themes )) !== false) {

              unset($themes[$key]);

            }
          }

        } elseif( $used_themes_count === $themes_count ) {

          $used_themes = array();

        }

        $random_theme = $themes[ array_rand( $themes ) ];
        $used_themes[]= $random_theme;

        $chat_text = get_chat_text( $random_theme, $quotes );
        $chat = array( 'texts' => $chat_text, 'themes' => $used_themes );
        echo json_encode( $chat );

      } else {

        $themes = get_themes( $quotes );
        $themes_count = count( $themes ) - 1;
        $random_theme = $themes[ rand( 1, $themes_count ) ];
        $chat_text = get_chat_text( $random_theme, $quotes );
        $chat = array( 'texts' => $chat_text, 'themes' => array( $random_theme ) );
        echo json_encode( $chat );
      }
      break;

    case 'dev':
      header("Content-Type: text/html");
      $themes = get_themes( $quotes );
      $total_quotes = 0;
      echo '<ul style=\'list-style-type: decimal-leading-zero;\'>';

      foreach( $themes as  $theme) {

        $authors = array();
        $quotes_by_theme = array();

        foreach( $quotes as $author => $quotes_by_an_author  ) {

          foreach ($quotes_by_an_author as $quote) {

            if( $quote['theme'] == $theme) {

              array_push( $authors,  $author);
              array_push( $quotes_by_theme,  $quotes['text']);

            }
          }
        }

        $total_quotes_by_theme = count( $quotes_by_theme );
        $total_quotes = $total_quotes + $total_quotes_by_theme;

        echo '<li>';

        echo $theme.' ('. $total_quotes_by_theme .')';
        echo '<ul>';
        $unique_authors = array_unique( $authors);
        foreach ( $unique_authors as $author ) {
          echo '<li>'. $author .'</li>';
        }
        echo '</ul>';
        echo '</li>';

      }
      echo '</ul>';
      echo 'TOTAL: '. $total_quotes;
      break;

    default:
      header('Location: http://memories.artemg.com/');
  }
} else {
  header('Location: http://memories.artemg.com/');
}

?>
