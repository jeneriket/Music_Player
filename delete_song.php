<?php
    if(unlink("/var/www/html/uploads/".$_POST['filename']))
    {
        echo "Deleted '".$_POST['filename']."'";
    }
?>