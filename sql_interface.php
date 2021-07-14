<?php
    $ids = [];

    function uploadSong($filename)
    {
        $servername = "localhost";
        $username = "jeneriket";
        $password = "bigjumbo999";
        
        $conn = new mysqli($servername, $username, $password, 'Music_Player');
        
        if ($conn->connect_error) {
            echo "<script type='text/javascript'> alert('Connection failed: " . $conn->connect_error."');</script>";
            return;
        }

        //get the id
        $result = $conn->query("SELECT id FROM songs;");
        while ($row = $result->fetch_array(MYSQLI_NUM))
        {
            echo "dfs";
            array_push($ids, $row['id']);
        }
        echo $ids[1];

        $newID = generateID();

        //get the position
        $result = $conn->query("SELECT position FROM songs;");
        $positions = $result->fetch_array(MYSQLI_NUM);
        $position = count($positions);
        echo $position;

        $sql = "INSERT INTO songs (id, song_name, position) 
            VALUES ($newID, '$filename', $position);";
        
        $conn->query($sql);
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