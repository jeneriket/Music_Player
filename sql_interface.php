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
        $result = mysqli_query("SELECT id FROM songs;");
        while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
        {
            $ids[] = $row['id'];
        }

        $newID = generateID();

        //get the position
        $result = mysqli_query("USE Music_Player; SELECT position FROM songs;");
        while($row = mysqli_fetch_array($result, MYSQL_ASSOC))
        {
            $positions[] = $row['id'];
        }
        $position = count($positions);

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