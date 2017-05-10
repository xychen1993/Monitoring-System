<?php

$link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
if (mysqli_connect_error()){
    $response = false;
}

$data = file_get_contents("php://input");
$objData = json_decode($data);
$email = $objData->username;
$temp = $objData->temp;

if($temp == "true") {
  $status = 'accepted';
}
else {
  $status = 'declined';
}

$query = "UPDATE users SET status = '$status' where email = '$email';";

mysqli_query($link,$query);

?>
