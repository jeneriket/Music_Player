<?php
include 'sql_interface.php';

AddSongToPlaylist($_POST['filename'], $_POST['playlist'], $_POST['id']);

echo $_POST['filename']." added";
?>