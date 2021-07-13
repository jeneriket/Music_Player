<?php
//php file to interact with sql database based on post parameters  
$servername = "localhost";
$username = "jeneriket";
$password = "bigjumbo999";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

switch($_POST['operation'])
{
    case 'upload' :
        $sql = "CREATE DATABASE myDB";
        break;
}
$conn->query($sql);
$conn->close();

?>