<?php
    if(unlink("/var/www/html/".$_POST['filename']))
    {
        echo "Success!";
    }
?>