<?php
    include 'sql_interface.php';

    $servername = "localhost";
    $username = "jeneriket";
    $password = "bigjumbo999";

    $conn = new mysqli($servername, $username, $password, 'Music_Player');

    $playlistSongs = [];
    //TODO: Change to be dynamic
    $playlist = "0_playlist";

    $result = $conn->query("SELECT song_id, position FROM 0_playlist;");
    while ($row = $result->fetch_array(MYSQLI_NUM))
    {
        $song = new PlaylistSong();
        $song->id = $row[0];
        $song->position = $row[1];
        array_push($playlistSongs, $song);
    }

    //get song filenames from song table
    $result = $conn->query("SELECT id, song_name FROM songs;");
    while($row = $result->fetch_array(MYSQLI_NUM))
    {
        foreach($playlistSongs as $playlistSong)
        {
            if($row[0] == $playlistSong->id)
            {
                $playlistSong->filename = $row[1];
            }
        }
    }

    $sortedPlaylistSongs = [];
    $listLength = count($playlistSongs);
    for($i = 0; $i < $listLength; $i++)
    {
        foreach($playlistSongs as $playlistSong)
        {
            if($playlistSong->position == $i)
            {
                array_push($sortedPlaylistSongs, $playlistSong);
                continue;
            }
        }
    }

    foreach($sortedPlaylistSongs as $song)
    {
        
        echo "var data_".$song->id." = {id: ".$song->id.", name: '".$song->filename."'};
        this_.music_data.push(data_".$song->id.");";
    }

    $conn->close();
?>