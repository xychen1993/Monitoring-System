<?php

// $link = mysqli_connect($_SERVER["SERVER_ADDR"], "root", "123456", "kinectdata");
$link = mysqli_connect("nefertari.iems.northwestern.edu", "root", "123456", "kinectdata");

if (mysqli_connect_error()){
    $response = false;
}

$data = file_get_contents("php://input");

$objData = json_decode($data);
$email = $objData->username;
$password = $objData->password;
$type = $objData->userType;
$query1 = "select * from users where email='$email' and password='$password' and userType = '$type';";
$response = true;
if($result = mysqli_query($link, $query1)) {
    $rowCount = mysqli_num_rows($result);
    if($rowCount > 0) {
    while($row = mysqli_fetch_array($result)){
        $exist = true;
        }
    }
    else {
        $exist = false;
    }
}
$query2 = "select * from users where email='$email' and password='$password' and userType = '$type' and status = 'accepted';";

if($result = mysqli_query($link, $query2)) {
    $rowCount = mysqli_num_rows($result);
    if($rowCount > 0) {
    while($row = mysqli_fetch_array($result)){
        $status = true;
        }
    }
    else {
        $status = false;
    }
}
echo json_encode(array('exist'=>$exist, 'stats'=>$status));

?>

