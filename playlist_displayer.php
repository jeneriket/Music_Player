<?php

$musicFiles = scandir("http://18.189.30.30/uploads");

echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    echo nl2br($value."<br><audio controls><source src='http://18.189.30.30/uploads/".strval($value)."'></audio><br>");

}
echo "</div>";
?>