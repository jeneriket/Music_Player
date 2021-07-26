<?php

include 'sql_interface.php';
if(isset($_POST['submit'])){
    
    //TODO: Prevent special characters from being uploaded
    $target_dir = "uploads/";
    $target_filename = basename($_FILES["musicFile"]["name"]);
    $target_filename = preg_replace("/[^a-z0-9\_\-\.]/i", '', $target_filename);

    $target_file = $target_dir.$target_filename;

    $uploadOK = 1;
    $fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    //check if file already exitsts
    //TODO: Add asking if you want to add duplicate file name
    if(file_exists($target_file))
    {
        echo "<script type='text/javascript'> alert('Sorry, the file already exists');</script>";
        $uploadOK = 0;
    }

    error_log($target_file);
    
    if($uploadOK == 0)
    {
        echo "<script type='text/javascript'> alert('Sorry, your file was not uploaded');</script>";
    } else {
        if(move_uploaded_file($_FILES["musicFile"]["tmp_name"], $target_file))
        {
            echo "<script type='text/javascript'> alert('The file ".htmlspecialchars(basename($_FILES["musicFile"]["name"]))." has been uploaded.');</script>";

            AddSongToPlaylist($target_filename, "0_playlist");
            //generate song id
            //get all id values
            
            //get list position
        } else {
            echo "<script type='text/javascript'> alert('Sorry, there was an error uploading your file.');</script>";
        }
    }
}
else
{
    echo $_FILES["musicFile"]["error"];
}
echo var_dump($_FILES);

//echo "<script type='text/javascript'>location.replace('index.html');</script>"
?>