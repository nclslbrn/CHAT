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

    case 'query':

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
