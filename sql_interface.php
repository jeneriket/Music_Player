<?php
    $ids = [];

    function uploadSong($filename)
    {
        $conn = connectToServer();
        if(!$conn)
            return;

            
        //get the id
        $result = mysqli_query("USE Music_Player;
        SELECT id FROM songs;");
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

        $sql = "USE Music_Player; INSERT INTO songs ($newID, $filename, $position);";
        
        interfaceDatabase($sql, $conn);

    }

    function interfaceDatabase($sqlString, &$conn)
    {
        $conn->query($sqlString);
        $conn->close();
    }

    function connectToServer()
    {
        
        $servername = "localhost";
        $username = "jeneriket";
        $password = "bigjumbo999";
        
        $conn = new mysqli($servername, $username, $password);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            return false;
        }

        return $conn;
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