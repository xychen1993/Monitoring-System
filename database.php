
<?php
  error_reporting(0);
  // for debuging
  function theconsole($data) {
    if(is_array($data) || is_object($data))
    {
      echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    } else {
      echo("<script>console.log('PHP: ".$data."');</script>");
    }
  }

  $bn = $_POST['bn'];
  $rn = $_POST['rn'];
  $kn = $_POST['kn'];
  $fd = $_POST['fromDate'];
  $ft = $_POST['fromTime'];
  $td = $_POST['toDate'];
  $tt = $_POST['toTime'];
  theconsole($bn);
  theconsole($rn);
  theconsole($kn);
  theconsole($fd);
  theconsole($ft);
  theconsole($td);
  theconsole($tt);
  $from = $fd.' '.$ft;
  $to = $td.' '.$tt;
  theconsole($from);
  theconsole($to);
  $qVResult= array();
  $qEResult= array();
  function do_compare($item1, $item2) {
     $ts1 = strtotime($item1['startTime']);
     $ts2 = strtotime($item2['startTime']);
     return $ts1 - $ts2;
   }

  $link = mysqli_connect("nefertari.iems.northwestern.edu", "root", "123456", "kinectdata");

  //$link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
  // $link = mysqli_connect("127.0.0.1", "root", "", "project");

  if (mysqli_connect_error()){
    //die('Could not connect: ' . mysql_error());
    theconsole("Could not connect to Database");
  }


  $query = "SELECT * FROM webtest2
  WHERE buildingId = '$bn'
  AND roomId ='$rn'
  AND kinectId = '$kn'
  AND startTime >= '$from'
  AND endTime <=  '$to'
  AND endTime != '0000-00-00 00:00:00'";
  $result=mysqli_query($link,$query);
  theconsole(mysqli_num_rows($result));
  if($result=mysqli_query($link,$query)){
      while($row = mysqli_fetch_array($result)){
        //print_r($row);
        array_push($qVResult,$row);
      }
       usort($qVResult, 'do_compare');
  }else{
    echo "query not working";
  }
  


  // $query2 = "SELECT buildingId,roomId,kinectId,startTime, endTime, event FROM webtest2_event
  // WHERE buildingId = '$bn'
  // AND roomId ='$rn'
  // AND kinectId = '$kn'
  // AND startTime >= '$from'
  // AND endTime <=  '$to'
  // AND endTime != '0000-00-00 00:00:00'";
  // if($result=mysqli_query($link,$query2)){
  //     while($row = mysqli_fetch_array($result)){
  //       // print_r($row);
  //       array_push($qEResult,$row);
  //     }
  //      usort($qEResult, 'do_compare');
  // }else{
  //   echo "query not working";
  // }


// print_r($qEResult);
  // print_r($qVResult[0]);
  // theconsole($qVResult);
  // theconsole($to);


?>
