<?php

$musicFiles = scandir("/var/www/html/uploads");
echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    //make the div for each playlist button
    echo "<div id='".strval($value)."_div'>".$value."<br><audio controls><source src='/uploads/".strval($value)."'></audio>
        <button onclick='confirmDelete(\"".strval($value)."\");'>
            Delete?
        </button>
    </div>";
}
echo "</div>";
?>