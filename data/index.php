<?php
//Make this script call by another site
//header('Access-Control-Allow-Origin: *');
//Include function used to store / retrieve / find / use quotes
include_once('functions.php');
/**
 * Main array fill with files below
 * @param $quotes[author] = [ theme | text ]
 */
$quotes = array();
include_once('_nicolas-tesla.php');
include_once('_alan-turing.php');
include_once('_isaac-asimov.php');
include_once('_linus-torvalds.php');
include_once('_alain-damasio.php');

if( !empty( $_GET['chat']) ) {

  $op = $_GET['chat'];
  switch( $op ) {

    case 'start':
      $themes = get_themes( $quotes );
      $themes_count = count( $themes );
      $random_theme = $themes[ rand( 0, $themes_count ) ];
      $chat_text = get_chat_text( $random_theme, $quotes );
      echo json_encode( $chat_text );
      break;

    case 'continu':
      //do something
      break;

    case 'dev-themes':
      $themes = get_themes( $quotes );
      echo '<ul style=\'list-style-type: decimal-leading-zero;\'>';
      foreach( $themes as  $theme) {
        $chat_text = get_chat_text( $theme, $quotes);
        echo '<li>'.$theme.' ('.count($chat_text).')</li>';
      }
      echo '</ul>';
      break;

    default:
      header('Location: http://memories.artemg.com/');
  }
} else {
  header('Location: http://memories.artemg.com/');
}

?>
