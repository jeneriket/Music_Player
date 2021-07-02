<?php

$musicFiles = scandir("/var/www/html/uploads");

echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo nl2br($value."<br><audio controls><source src='/uploads/".strval($value)."'></audio><button onclick='alert(\"".$value."\");'>Delete?</button><br>");

}
echo "</div>";
?>