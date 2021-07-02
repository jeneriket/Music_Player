<?php

$musicFiles = scandir("/var/www/html/uploads");
echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo nl2br($value."<br><audio controls><source src='/uploads/".strval($value)."'></audio><button onclick='$.ajax({
        url: \'delete_song.php\', 
        success: function(data) { 
            alert(\'Deleted.\');}
        })'>Delete?</button><br>");

}
echo "</div>";
?>