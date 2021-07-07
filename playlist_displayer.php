<?php

//todo: delete and add to sql database
$ids = [];

function GenerateID()
{
    $ID = rand();
    while(in_array($ID, $ids))
    {
        $ID = rand();
    }

    return $ID;
}



$musicFiles = scandir("/var/www/html/uploads");
//echo "<div name='playlist' key='playlist'>";
foreach($musicFiles as $value)
{
    if($value == "." || $value == "..")
        continue;

    $id = GenerateID();
    //make the div for each playlist button
    /*echo "<div id='".$id."_div'>".$value."<br>
        <audio id='".$id."_audio'><source src='/uploads/".strval($value)."'></audio>
        <button onclick=\"$('#".$id."_audio').trigger('play');\" id='".$id."_play'>Play</play>
        <button onclick='confirmDelete(\"".strval($value)."\", ".$id.");'>
            Delete?
        </button>
    </div>";*/
    echo "var data_".$id." = {id: ".$id.", name: '".$value."'};
    music_data.push(data_".$id.");";
}
//echo "</div>";
?>