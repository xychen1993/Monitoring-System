
<?php
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
  $from = $fd.' '.$ft;
  $to = $td.' '.$tt;
  $qVResult= array();
  $qEResult= array();
  function do_compare($item1, $item2) {
     $ts1 = strtotime($item1['startTime']);
     $ts2 = strtotime($item2['startTime']);
     return $ts1 - $ts2;
   }

  $link = mysqli_connect($_SERVER[SERVER_ADDR], "root", "123456", "kinectdata");
  // $link = mysqli_connect("127.0.0.1", "root", "", "project");

  if (mysqli_connect_error()){
    //die('Could not connect: ' . mysql_error());
    theconsole("Could not connect to Database");
  }


  $query = "SELECT buildingId,roomId,kinectId,startTime, endTime, fileName FROM webtest2
  WHERE buildingId = '$bn'
  AND roomId ='$rn'
  AND kinectId = '$kn'
  AND startTime >= '$from'
  AND endTime <=  '$to'
  AND endTime != '0000-00-00 00:00:00'";
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

// query bed 2017'
/*..............................Bed Status..............................*/
  $fid = $_POST['fid'];
  $fm = $_POST['fm'];
  $cl = $_POST['cl'];
  $nb = $_POST['nb'];
  $ib = $_POST['ib'];
  $qBCleanResult= array();
  $qniBResult= array();
  $qiBResult= array();
  $qsABResult= array();

  $querybedclean = "SELECT frameid,fileName FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND BedClean = '$cl'
  AND notInBed = '$nb'
  AND inBed = '$ib'
  AND standAroundBed = '$sab'
  AND BedClean > 0"; 
  if ($result=mysqli_query($link,$querybedclean)){
    while($row = mysqli_fetch_array($result)){
      array_push($qBCleanResult,$row);
    }
    usort($qBCleanResult, 'do_compare');
  }else{
    echo "query not working";
  }

  $querynib = "SELECT frameid,fileName FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND BedClean = '$cl'
  AND notInBed = '$nb'
  AND inBed = '$ib'
  AND standAroundBed = '$sab'
  AND notInBed > 0"; 
  if ($result=mysqli_query($link,$querynib)){
    while($row = mysqli_fetch_array($result)){
      array_push($qniBResult,$row);
    }
    usort($qniBResult, 'do_compare');
  }else{
    echo "query not working";
  }

  $queryib = "SELECT frameid,fileName FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND BedClean = '$cl'
  AND notInBed = '$nb'
  AND inBed = '$ib'
  AND standAroundBed = '$sab'
  AND inBed > 0"; 
  if ($result=mysqli_query($link,$queryib)){
    while($row = mysqli_fetch_array($result)){
      array_push($qiBResult,$row);
    }
    usort($qiBResult, 'do_compare');
  }else{
    echo "query not working";
  }

  $querysAB = "SELECT frameid,fileName FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND BedClean = '$cl'
  AND notInBed = '$nb'
  AND inBed = '$ib'
  AND standAroundBed = '$sab'
  AND standAroundBed > 0"; 
  if ($result=mysqli_query($link,$querysAB)){
    while($row = mysqli_fetch_array($result)){
      array_push($qsABResult,$row);
    }
    usort($qsABResult, 'do_compare');
  }else{
    echo "query not working";
  }

/*..............................Curtain..Status.................................*/
  $percent = $_POST['percent'];
  $qcpResult= array();

  $querycp = "SELECT frameid,fileName, percent FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND Curtainpercent = '$percent'"; 
  if ($result=mysqli_query($link,$querycp)){
    while($row = mysqli_fetch_array($result)){
      array_push($qcpResult,$row);
    }
    usort($qcpResult, 'do_compare');
  }else{
    echo "query not working";
  }

/*...........................Door..Status..............................*/
/*...For front end, you can judge the bit value of conf1 and conf2, where '1' means open, '0' means close, then show each door status on the webpage...*/
  $d1= $_POST['d1'];
  $d2= $_POST['d2'];
  $conf1= $_POST['conf1'];
  $conf2= $_POST['conf2'];
  $qdsResult= array();

  $queryds = "SELECT frameid,fileName,door1,door2,conf1,conf2 FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND door1 = '$d1'
  AND door2 = '$d2'
  AND conf1 = 'c1'
  And conf2 = 'c2'"; 
  if ($result=mysqli_query($link,$queryds)){
    while($row = mysqli_fetch_array($result)){
      array_push($qdsResult,$row);
    }
    usort($qdsResult, 'do_compare');
  }else{
    echo "query not working";
  }

/*.......................Sofa..Status..........................*/
  $sit = $_POST['sit'];
  $standup = $_POST['standup'];
  $status = $_POST['status'];
  $qsofaResult = array();

  $querysofa = "SELECT frameid,fileName,sit,standup,status FROM bed
  WHERE frameid = '$fid'
  AND fileName = '$fm'
  AND sit = '$sit'
  AND standup = '$standup'
  AND status = 'status'"; 
  if ($result=mysqli_query($link,$querysofa)){
    while($row = mysqli_fetch_array($result)){
      array_push($qsofaResult,$row);
    }
    usort($qsofaResult, 'do_compare');
  }else{
    echo "query not working";
  }








// print_r($qEResult);
  // print_r($qVResult[0]);
  // theconsole($qVResult);
  // theconsole($to);


?>
