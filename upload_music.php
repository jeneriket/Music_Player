<?php

include 'sql_interface.php';

//TODO: Prevent special characters from being uploaded
$target_dir = "uploads/";
$target_filename = basename($_FILES["musicFile"]["name"]);

$target_file = $target_dir.$target_filename;

$uploadOK = 1;
$fileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
if(isset($_POST['submit'])){
    
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
            //echo "<script type='text/javascript'> alert('The file ".htmlspecialchars(basename($_FILES["musicFile"]["name"]))." has been uploaded.');</script>";

            UploadSong($target_filename);
            //generate song id
            //get all id values
            
            //get list position
        } else {
            echo "<script type='text/javascript'> alert('Sorry, there was an error uploading your file.');</script>";
        }
    }
}

//echo "<script type='text/javascript'>location.replace('http://18.189.30.30');</script>"
?>