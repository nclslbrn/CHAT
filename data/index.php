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

$authors_def = array();
$authors_def['0'] = 'Nicolas Tesla';
$authors_def['1'] = 'Alan Turing';

if( !empty( $_GET['chat']) ) {

  $op = $_GET['chat'];
  switch( $op ) {

    case 'start':
      $themes = get_themes( $quotes );
      $themes_count = count( $themes );
      $random_theme = $themes[ rand( 0, $themes_count ) ];
      $chat_text = get_chat_text( $random_theme, $quotes, $authors_def );
      echo json_encode( $chat_text );
      break;

    case 'continu':
      //do something
      break;

    default:
      header('Location: http://memories.artemg.com/');
  }
} else {
  header('Location: http://memories.artemg.com/');
}

?>
