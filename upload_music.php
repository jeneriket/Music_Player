<?php
//TODO: Prevent special characters from being uploaded
$target_dir = "/var/www/html/uploads/";
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

            //post to database_interface.php
            $fields = array(
                'filename' => $target_filename,
                'operation' => 'upload',
            );
            $postvars = http_build_query($fields);

            $ch = curl_init();
            curl_setopt($ch, "/database_interface.php");
            curl_setopt($ch, CURLOPT_POST, 2);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
            $response = curl_exec($ch);

            curl_close($ch);
            $conn->close();
        } else {
            echo "<script type='text/javascript'> alert('Sorry, there was an error uploading your file.');</script>";
        }
    }
}

//echo "<script type='text/javascript'>location.replace('http://18.189.30.30');</script>"
?>