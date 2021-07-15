<?php

include 'sql_interface.php';

if(unlink("/var/www/html/uploads/".$_POST['filename']))
{
    //remove from sql database
    $servername = "localhost";
    $username = "jeneriket";
    $password = "bigjumbo999";

    $id = $_POST['id'];
    
    $conn = new mysqli($servername, $username, $password, 'Music_Player');
    if ($conn->connect_error) {
        echo "<script type='text/javascript'> alert('Connection failed: " . $conn->connect_error."');</script>";
        return;
    }

    //delete the listing with the same id from the song database
    $sql = "DELETE FROM songs WHERE id=$id;";
    $conn->query($sql);

    //get every playlist id as a list
    $playlistIDS = [];
    $result = $conn->query("SELECT id FROM playlist_list;");
    while ($row = $result->fetch_array(MYSQLI_NUM))
    {
        array_push($playlistIDS, $row[0]);
    }

    //go through every playlist 
    foreach($playlistIDS as $playlistID)
    {
        //get the data from each song into an array
        $songs = [];
        $playlistName = $playlistID."_playlist";
        $result = $conn->query("SELECT song_id, position FROM $playlistName;");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            $song = new PlaylistSong();
            $song->id = $row[0];
            $song->position = $row[1];
            array_push($songs, new PlaylistSong());
        }

        //get the position of each song with a matching id
        $removePositions = [];
        for($i = 0; $i < count($songs); $i++)
        {
            if($songs[i]->id == $id)
            {
                array_push($removePositions, $songs[i]);
            }
        }

        //remove each song with a matching id
        foreach($removePositions as $removePosition)
        {
            array_splice($songs, $removePosition, 1);
        }

        //delete the table, re-add it with new data, using the array keys as positions
        $sql = "DELETE FROM $playlistName;";
        $conn->query($sql);

        for($i = 0; $i < count($songs); $i++)
        {
            $songID = $songs[$i]->id;
            $sql = "INSERT INTO $playlistName (song_id, position)
                VALUES($songID, $i);";
            $conn->query($sql);
        }

    }

    $conn->close();
    echo "Deleted '".$_POST['filename']."'";
}
?>