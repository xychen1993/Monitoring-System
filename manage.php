<?php

$link = mysqli_connect("129.105.36.210", "root", "123456", "kinectdata");
if (mysqli_connect_error()){
    die("Could not connect to Database");
}

$qApply = array();
$query = "SELECT email FROM users WHERE userType = 'user' AND (status = 'pending' OR status = 'declined');";
$result = mysqli_query($link,$query);
$rowCount = mysqli_num_rows($result);
if($rowCount > 0) {
    while($row = mysqli_fetch_array($result)){
        array_push($qApply,$row);
    }
}

echo json_encode($qApply);
//echo json_encode(array('email'=>'lalala', 'password'=>'123'));
?>






 
