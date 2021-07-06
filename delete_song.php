<?php
    echo "<script>alert('".$_POST['filename']."')</script>";
    unlink($_POST['filename']);
?>