<?php

$password = 'NULL';
$link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
if (mysqli_connect_error()){
    $response = false;
}

$data = file_get_contents("php://input");

$objData = json_decode($data);
$email = $objData->username;
$query = "select password from users where email='$email';";
$response = true;
if($result = mysqli_query($link, $query)) {
    $rowCount = mysqli_num_rows($result);
    if($rowCount > 0) {
    while($row = mysqli_fetch_array($result)){
	$exist = true;
        $password = $row['password'];
        }
/*
    $to      = $email;
    $subject = 'Finding Your Password';
    $message = 'Dear User'."\r\n".'Your password is: '$password''."\r\n" .'Your can Login in with this password.';
    $headers = 'From: chenhuizhou2016@northwestern.edu' . "\r\n" .
    'Reply-To: chenhuizhou2016@northwestern.edu' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
*/
    }
    else {
        $exist = false;
    }
}

echo json_encode(array('exist'=>$exist, 'password'=>$password));

?>

