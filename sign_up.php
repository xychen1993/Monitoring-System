<?php

$link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
if (mysqli_connect_error()){
    $response = false;
}


$data = file_get_contents("php://input");

$objData = json_decode($data);
$email = $objData->email;
$password = $objData->password;
$query = "INSERT INTO users (email,password, status, userType) VALUES('$email','$password', 'pending', 'user')";
mysqli_query($link,$query);
$response = true;
echo json_encode(array('response'=>$response));
?>

