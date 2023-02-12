<!DOCTYPE html>
<html>
  <?php
    $str = file_get_contents('http://code.sparkzz.net/res/data.json');
  
    $json = json_decode($str, true); // decode the JSON into an associative array
  ?>
  <head>
    <title>Code | Brendon Butler</title>
    
    <link rel='stylesheet' type='text/css' href='http://sparkzz.net/styles/normalize.css'>
    <link rel='stylesheet' type='text/css' href='styles/code.css'>
    
    <meta name='keywords' content='Brendon, Butler, Developer, Programmer'>
    <meta name='description' content="Brendon Butler's projects">
    <meta name='subject' content='Projects'>
    <meta name='copyright' content='Brendon Butler'>
    <meta name='language' content='EN'>
    <meta name='robots' content='index, follow'>
    <meta name='revised' content='Wednesday, February 22nd, 2017, 6:52 pm'>
    <meta name='author' content='Brendon Butler, contact@sparkzz.net'>
    <meta name='reply-to' content='contact@sparkzz.net'>
    <meta name='owner' content='Brendon Butler'>
    <meta name='url' content='http://code.sparkzz.net/'>
    <meta name='pagename' content='Brendon Butler'>
    <meta name='HandheldFriendly' content='True'>
    <meta name='MobileOptimized' content='425'>
    <meta name="apple-mobile-web-app-title" content="Brendon Butler"> <!-- New in iOS6 -->
    <meta name='apple-mobile-web-app-capable' content='yes'>
    <meta name='apple-touch-fullscreen' content='yes'>
    <meta name='apple-mobile-web-app-status-bar-style' content='black'>
    <meta name='format-detection' content='telephone=no'>
    <meta name='application-name' content='Brendon Butler' />
    <meta name='msapplication-TileColor' content='#339966' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    
    <script type='application/ld+json'>{"@content":"http://schema.org/","@type":"ItemList","itemListElement":["ModestAPI","Visionless"],"itemListOrder":"http://schema.org/ItemListOrderAscending","numberOfItems":2,"name":"Brendon Butler's Projects","image":"http://code.sparkzz.net/img/modestapi.png"}</script>
  </head>
  <body>
    <header>
      <h1>Projects</h1>
      <hr>
      <ul>
        <li><a href='http://www.sparkzz.net/'>Home</a></li>
        <li><a href='http://www.github.com/BrendonButler'>Sources</a></li>
      </ul>
    </header>
    <?php
      foreach ($json as $project => $proj_data) {
          echo '<section class=\'project\'>';
          echo '<div class=\'img-left\'>';
          echo '<a href=\''.$project.'/\'><img src=\'../img/'.$project.'-small.png\' alt=\''.$proj_data['human_name'].' logo\'></a>';
          echo '</div>';
          echo '<div class=\'desc\'>';
          echo '<h2><a href=\''.$project.'/\'>'.$proj_data['human_name'].'</a></h2>';
          
          $desc = explode(".", $proj_data['description']);
          
          echo '<p>'.$desc[0].'.</p>';
          echo '</div>';
          echo '</section>';
      }
    ?>
  </body>
</html>