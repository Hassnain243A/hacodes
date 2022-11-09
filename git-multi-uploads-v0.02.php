<?php
$files_length = $_POST['files_length'];
// if some file is available
if($files_length > 0){
    for($i = 0; $i < $files_length; $i++){
        // get file using same key name used during appending
        $file = $_FILES['file'.$i];
        // get file name
        $filename = basename($file['name']);
        // target path
        $targetFilePath = 'uploads/'.$filename;
        // upload file now
        move_uploaded_file($file['tmp_name'], $targetFilePath);
    }
}
?>