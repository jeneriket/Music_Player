<?php

$musicFiles = scandir("E:\wamp64\www\uploads");

echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo nl2br($value."<br><audio controls><source src='http://localhost/uploads/".strval($value)."'></audio><br>");

}
echo "</div>";
?>