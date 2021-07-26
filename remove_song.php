<?php
    $servername = "localhost";
    $username = "jeneriket";
    $password = "bigjumbo999";

    $conn = new mysqli($servername, $username, $password, 'Music_Player');

    $song_id = $_POST['song_id'];
    $playlist_id = $_POST['playlist_id'];

    $sql = "DELETE FROM $playlist_id 
        WHERE song_id = $song_id;";

    echo $sql;

    $conn->query($sql);

    //close mysql connection
    $conn->close();

?>