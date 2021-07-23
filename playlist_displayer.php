<?php
    include 'sql_interface.php';
    include 'getid3/getid3.php';

    $servername = "localhost";
    $username = "jeneriket";
    $password = "bigjumbo999";

    $conn = new mysqli($servername, $username, $password, 'Music_Player');

    $playlistSongs = [];
    $playlist = $_GET['playlist'];

    $result = $conn->query("SELECT song_id, position FROM $playlist;");
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

    //initialize get id3
    $getID3 = new getID3;
    //$file = fopen("test.txt", "w");

    function ProcessTag($_tag, $propname, $defaultName)
    {
        $value = $defaultName;

        if(isset($_tag['tags_html']['id3v2'][$propname]))
        {
            $value = $_tag['tags_html']['id3v2'][$propname];
            if(is_array($value))
                $value = implode(', ', $value);
                
            $value = str_replace("'", "\'", $value);
            $value = str_replace('"', '\"', $value);
        }

        return $value;
    }

    foreach($sortedPlaylistSongs as $song)
    {
        //get metadata from files
        $tag = $getID3->analyze("uploads/".$song->filename);
        $name = ProcessTag($tag, 'title', $song->filename);
        $artist = ProcessTag($tag, 'band', "Artist Unknown");
        $album = ProcessTag($tag, 'album', "Album Unknown");
        $year = ProcessTag($tag, 'year', "Year Unknown");

        echo "var data_".$song->id." = {id: $song->id, name: '$song->filename', 
            position: $song->position, title: '$name', artist: '$artist', album: '$album', year: '$year'};
        reactComp.music_data.push(data_".$song->id.");\n";
    }

    //$fclose($file);

    $conn->close();
?>