<!DOCTYPE html>
<html>
  <?php
    $proj_id = $_GET['id'];
    $str = file_get_contents('http://code.sparkzz.net/res/data.json');
  
    $json = json_decode($str, true); // decode the JSON into an associative array
    
    if (isset($json[$proj_id])) {
      $project = $json[$proj_id];
    
      $api = $project['api'];
      $desc = $project['description'];
      $downloads = $project['downloads'];
      $icon = '../img/'.$proj_id.'-small.png';
      $license = $project['license'];
      $logo = '../img/'.$proj_id.'.png';
      $source = $project['source'];
      $title = $project['human_name'];
      $vers = $project['version'];
    } else {
      $desc = "Project could not be found!";
      $title = "Invalid Project";
    }
  ?>
  
  <head>
    <title><?php echo $title; ?> | Brendon Butler</title>
    <link rel='stylesheet' type='text/css' href='http://sparkzz.net/styles/normalize.css' />
    <link rel='stylesheet' type='text/css' href='styles/project.css' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
  </head>
  <body>
    <header>
      <div id='heading'>
        <?php
          if (isset($project)) echo '<img class=\'icon\' src='.$icon.' alt=$title; logo>';
        ?>
        <h1><?php echo $title; ?></h1>
      </div>
      <hr>
      <nav>
        <ul>
          <li><a href='http://www.sparkzz.net/'>Home</a></li>
          <li><a href='http://code.sparkzz.net/'>Projects</a></li>
        </ul>
      </nav>
    </header>
    <?php
    if (isset($project)) {
        echo '<section id=\'navigate\'>';
        echo '<h2 style=\'margin: 0; width: 0; height: 0; visibility: hidden;\'>Navigate</h2>';
        echo '<ul>';
        echo '<li><a href=/download.php?id='.$proj_id.' target="_blank">Download</a></li>';
        echo '<li><a href='.$source.'>Source</a></li>';
        echo '</ul>';
        echo '</section>';
    } ?>
    <section id='project-info'>
      <article id='description'>
        <p><?php echo $desc; ?></p>
      </article>
      <?php
      if (isset($project)) {
        echo '<aside id=\'project-data\'>';
        echo '<ul>';
        if ($downloads != 1 && isset($downloads)) echo '<li>'.$downloads.' Downloads</li>';
        else echo '<li>'.$downloads.' Download</li>';
        if (isset($license)) echo '<li><a href=\''.$license['link'].'\'>'.$license['name'].'</a></li>';
        if (isset($vers)) echo '<li>Version '.$vers.'</li>';
        echo '</ul></aside>';
      } ?>
    </section>
    <?php
    if (isset($project)) {
        echo '<section id=\'gallery\'>';
        echo '<!-- GALLERY -->';
        echo '</section>';
    } ?>
    <?php
    if (isset($project)) {
        echo '<section id=\'developers\'>';
        echo '<!-- DEVELOPERS -->';
        echo '</section>';
    } ?>
  </body>
</html>