
<?php
  // for debuging
 error_reporting(0);

  function theconsole($data) {
    if(is_array($data) || is_object($data))
    {
      echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    } else {
      echo("<script>console.log('PHP: ".$data."');</script>");
    }
  }

  $bn1 = $_POST['bn1'];
  $bn2 = $_POST['bn2'];
  $bn3 = $_POST['bn3'];
  $rn1 = $_POST['rn1'];
  $rn2 = $_POST['rn2'];
  $rn3 = $_POST['rn3'];
  $kn1 = $_POST['kn1'];
  $kn2 = $_POST['kn2'];
  $fd = $_POST['fromDate'];
  $ft = $_POST['fromTime'];
  $td = $_POST['toDate'];
  $tt = $_POST['toTime'];
  $from = $fd.' '.$ft;
  $to = $td.' '.$tt;
  $bedfull = $_POST['bedfull'];
  $bedemp = $_POST['bedemp'];
  $curopen = $_POST['curopen'];
  $curclose = $_POST['curclose'];
  $qVResult= array();
  $qEResult= array();
  function do_compare($item1, $item2) {
     $ts1 = strtotime($item1['startTime']);
     $ts2 = strtotime($item2['startTime']);
     return $ts1 - $ts2;
   }

  // $link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
  $link = mysqli_connect("nefertari.iems.northwestern.edu", "root", "123456", "kinectdata");

  // $link = mysqli_connect("127.0.0.1", "root", "", "project");

  if (mysqli_connect_error()){
    //die('Could not connect: ' . mysql_error());
    theconsole("Could not connect to Database");
  }


  $query = "SELECT buildingId,roomId,kinectId,startTime, endTime, fileName FROM webtest2
  WHERE (buildingId = '$bn1' OR buildingId = '$bn2' OR buildingId = '$bn3')
  AND (roomId ='$rn1' OR roomId = '$rn2' OR roomId = '$rn3')
  AND (kinectId = '$kn1' OR kinectId = '$kn2')
  AND startTime >= '$from'
  AND endTime <=  '$to'
  AND (bedStatus = '$bedfull' OR bedStatus = '$bedemp')
  AND (curtainStatus = '$curopen' OR curtainStatus = '$curclose')
  AND endTime != '0000-00-00 00:00:00'";
  // $query = "SELECT buildingId,roomId,kinectId,startTime, endTime, fileName FROM webtest2
  // WHERE buildingId = '2'
  // AND roomId ='1'
  // AND kinectId = '1'
  // AND startTime >= '2010-05-01'
  // AND endTime <=  '2017-05-01'
  // AND endTime != '0000-00-00 00:00:00'";
  if($result=mysqli_query($link,$query)){
      while($row = mysqli_fetch_array($result)){
        // print_r($row);
        array_push($qVResult,$row);
      }
       usort($qVResult, 'do_compare');
  }else{
    echo "query not working";
  }


  $query2 = "SELECT buildingId,roomId,kinectId,startTime, endTime, event FROM webtest2_event
  WHERE buildingId = '$bn'
  AND roomId ='$rn'
  AND kinectId = '$kn'
  AND startTime >= '$from'
  AND endTime <=  '$to'
  AND endTime != '0000-00-00 00:00:00'";
  if($result=mysqli_query($link,$query2)){
      while($row = mysqli_fetch_array($result)){
        // print_r($row);
        array_push($qEResult,$row);
      }
       usort($qEResult, 'do_compare');
  }else{
    echo "query not working";
  }


// print_r($qEResult);
  // print_r($qVResult[0]);
  // theconsole($qVResult);
  // theconsole($to);


?>
