<?php

//TODO: Prevent special characters from being uploaded

//header('Location: http://localhost:8080/index.html');

    $target_dir = "E:\wamp64\www\uploads\\";
    $target_file = $target_dir.basename($_FILES["musicFile"]["name"]);
    echo "<script type='text/javascript'> alert('".$target_file."');</script>";

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
    
    if($uploadOK == 0)
    {
        echo "<script type='text/javascript'> alert('Sorry, your file was not uploaded');</script>";
    } else {
        if(move_uploaded_file($_FILES["musicFile"]["tmp_name"], $target_file))
        {
            echo "<script type='text/javascript'> alert('The file ".htmlspecialchars(basename($_FILES["musicFile"]["name"]))." has been uploaded.');</script>";
        } else {
            echo "<script type='text/javascript'> alert('Sorry, there was an error uploading your file.');</script>";
        }
    }
}

echo "<script type='text/javascript'>location.replace('http://localhost:8080/index.html');</script>"
//TODO: Change to url
//flush();
//die();
?>