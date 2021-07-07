<?php
    echo "<script>alert('/var/www/html/".$_POST['filename']."')</script>";
    if(unlink("/var/www/html/".$_POST['filename']))
    {
        echo "/var/www/html/".$_POST['filename'];
    }
?>