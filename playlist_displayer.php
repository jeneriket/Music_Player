<?php

$musicFiles = scandir("/var/www/html/uploads");

echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo nl2br($value."<br><audio controls><source src='/var/www/html/uploads/".strval($value)."'></audio><br>");

}
echo "</div>";
?>