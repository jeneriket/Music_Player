<?php
include 'sql_interface.php';

$name = $_POST['name'];
$servername = "localhost";
$username = "jeneriket";
$password = "bigjumbo999";

$conn = new mysqli($servername, $username, $password, 'Music_Player');

//get list of ids from the playlist_list
$ids = [];
$result = $conn->query("SELECT id FROM playlist_list;");
while ($row = $result->fetch_array(MYSQLI_NUM))
{
    array_push($ids, $row[0]);
}

//generate random id
$id = GenerateID($ids);

//create table
$sql = "CREATE TABLE ".$id."_playlist (song_id INT, position INT);";
$conn->query($sql);

//get playlist position
$defaultPlaylistPositions = [];
$result = $conn->query("SELECT position FROM playlist_list");
while ($row = $result->fetch_array(MYSQLI_NUM))
{
    array_push($defaultPlaylistPositions, $row[0]);
}

$defaultPlaylistPosition = count($defaultPlaylistPositions);

//add table entry to playlist_list
$sql = "INSERT INTO playlist_list (id, playlist_name, position) 
    VALUES ($id, '$name', $defaultPlaylistPosition);";
$conn->query($sql);

$conn->close();

echo "Created $name";
?>