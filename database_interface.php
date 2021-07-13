<?php
//php file to interact with sql database based on post parameters

$servername = "localhost";
$username = "jeneriket";
$password = "bigjumbo999";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch($_POST['operation'])
{
    case 'upload' :
        
        break;
}

$conn->close();

?>