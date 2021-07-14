<?php
    $ids = [];

    function uploadSong($filename)
    {
        $servername = "localhost";
        $username = "jeneriket";
        $password = "bigjumbo999";
        
        $conn = new mysqli($servername, $username, $password, 'Music_Player');

        $ids = [];
        $positions = [];
        
        if ($conn->connect_error) {
            echo "<script type='text/javascript'> alert('Connection failed: " . $conn->connect_error."');</script>";
            return;
        }

        //get the id
        $result = $conn->query("SELECT id, position FROM songs;");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            array_push($ids, $row[0]);
            array_push($positions, $row[1]);
        }

        $newID = generateID();
        $position = count($positions);

        $sql = "INSERT INTO songs (id, song_name, position) 
            VALUES ($newID, '$filename', $position);";
        
        $conn->query($sql);


        //add to default playlist
        $defaultPlaylistPositions = [];
        $result = $conn->query("SELECT position FROM 0_playlist");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            array_push($defaultPlaylistPositions, $row[0]);
        }

        $defaultPlaylistPosition = count($defaultPlaylistPositions);
        $sql = "INSERT INTO 0_playlist (song_id, position)
        VALUES($newID, $defaultPlaylistPosition);";
        $conn->query($sql);

        //close mysql connection
        $conn->close();

    }

    

    function generateID()
    {
        $ID = rand();
        while(in_array($ID, $ids))
        {
            $ID = rand();
        }

        return $ID;
    }
?>