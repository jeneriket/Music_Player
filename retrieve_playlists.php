<?php
include 'sql_interface.php';

$servername = "localhost";
$username = "jeneriket";
$password = "bigjumbo999";

$conn = new mysqli($servername, $username, $password, 'Music_Player');

$playlists = [];

$result = $conn->query("SELECT id, playlist_name, position FROM playlist_list;");
while ($row = $result->fetch_array(MYSQLI_NUM))
{
    $playlist = new PlaylistData();
    $playlist->id = $row[0];
    $playlist->name = $row[1];
    $playlist->position = $row[2];
    array_push($playlists, $playlist);
}


$sortedPlaylists = [];
$listLength = count($playlists);
for($i = 0; $i < $listLength; $i++)
{
    foreach($playlists as $playlist)
    {
        if($playlist->position == $i)
        {
            array_push($sortedPlaylists, $playlist);
            continue;
        }
    }
}


foreach($sortedPlaylists as $playlist)
{
    
    echo "var data_".$playlist->id." = {id: ".$playlist->id.", name: '".$playlist->name."', position: $playlist->position};
    reactComp.playlist_data.push(data_".$playlist->id.");";
}

$conn->close();

?>