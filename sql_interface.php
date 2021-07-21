<?php
    //note 
    function AddSongToPlaylist($filename, $playlistName, $songID = -1)
    {
        $servername = "localhost";
        $username = "jeneriket";
        $password = "bigjumbo999";
        
        $conn = new mysqli($servername, $username, $password, 'Music_Player');

        $ids = [];
        //$positions = [];
        
        if ($conn->connect_error) {
            echo "<script type='text/javascript'> alert('Connection failed: " . $conn->connect_error."');</script>";
            return;
        }

        //get the id
        $result = $conn->query("SELECT id FROM songs;");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            array_push($ids, $row[0]);
        }

        if($songID == -1)
            $songID = GenerateID($ids);

        $sql = "INSERT INTO songs (id, song_name) 
            VALUES ($songID, '$filename');";
        
        $conn->query($sql);


        //add to default playlist
        $defaultPlaylistPositions = [];
        $result = $conn->query("SELECT position FROM $playlistName");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            array_push($defaultPlaylistPositions, $row[0]);
        }

        $defaultPlaylistPosition = count($defaultPlaylistPositions);
        $sql = "INSERT INTO $playlistName (song_id, position)
        VALUES($songID, $defaultPlaylistPosition);";
        $conn->query($sql);

        //close mysql connection
        $conn->close();

    }

    

    function GenerateID(&$ids)
    {
        $ID = rand();
        while(in_array($ID, $ids))
        {
            $ID = rand();
        }

        return $ID;
    }
    
    //get the amount of songs in playlist 0_playlist
    class PlaylistSong {
        public $id;
        public $posititon;
        public $filename;
    }

    class PlaylistData {
        public $id;
        public $name;
        public $posititon;
    }
?>