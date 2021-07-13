<?php
    $ids = [];

    function uploadSong($filename)
    {
        connectToServer();

        //get the id
        $result = mysql_query("USE Music_Player;
        SELECT id FROM songs;");
        while($row = mysql_fetch_array($result, MYSQL_ASSOC))
        {
            $ids[] = $row['id'];
        }

        $newID = generateID();

        //get the position
        $
        $result = mysql_query("USE Music_Player;
        SELECT position FROM songs;");
        while($row = mysql_fetch_array($result, MYSQL_ASSOC))
        {
            $positions[] = $row['id'];
        }

        $position = count($positions);

        $sql = "USE Music_Player;
        INSERT INTO songs (".$newID.", ".$filename.", ".$position");";
        
        interface($sql);
    }

    function interface($string)
    {
        $conn->query($string);
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
        }
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