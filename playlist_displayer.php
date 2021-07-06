<?php

$musicFiles = scandir("/var/www/html/uploads");
echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo $value."<div id='".strval($value)."_div'><br><audio controls><source src='/uploads/".strval($value)."'></audio>
        <button onclick='confirmDelete(\"".strval($value)."\");'>
            Delete?
        </button>
    </div>";
    /*
    \"$.ajax({
        url: 'delete_song.php', 
        success: function(data) { 
            alert('Deleted.');
        }
    })\">Delete?</button><br></div>";*/

}
echo "</div>";
?>