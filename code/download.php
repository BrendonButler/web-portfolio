<?php
    $proj_id = $_GET['id'];
    $str = file_get_contents('res/data.json');
    $json = json_decode($str, true); // decode the JSON into an associative array

    $json[$proj_id]['downloads'] += 1;

    file_put_contents('res/data.json', json_encode($json));

    header('Location: '.$json[$proj_id]['download']);
    exit();
    
    usleep(2500000);
    // echo "<script type='text/javascript'>window.close();</script>";
?>