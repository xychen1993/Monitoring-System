<html>
<body>

<?php 
if(isSet($_GET['id'])){
  $videoName = $_GET['id'];
  echo $videoName;
}

//$str = file_get_contents("/var/www/html/web2016/owen_test/php/test_data.json");
//$json = json_decode($str, true);
echo $_File_;
$dir = "/var/www/html/web2017/project/temp_video";
if( !file_exists($dir)) {
  echo "in";
  $oldmask = umask(0);  // helpful when used in linux server  
  $res = mkdir($dir, 0744);
  echo $res;
}
else {
  $files = glob($dir."/*"); // get all file names
  $sum = 0;
  foreach($files as $file){ // iterate files
    if(is_file($file)) {
      $sum++;
    }
  }
  foreach($files as $file){
    if ($sum >= 8) {
      if(is_file($file)){
        unlink($file); // delete file
      }
    }
  }
}

$ffmpeg = "/usr/bin/ffmpeg";
$videoFile = "/hospital/HospitalData/Falls1/2016-12-15/".$videoName;
$newvideoName = substr($videoName, 0, -4);
$newvideoFile = $dir."/".$newvideoName.".mp4";
$cmd = "$ffmpeg -i $videoFile $newvideoFile";
shell_exec($cmd);
//echo("<script>console.log('".shell_exec($cmd)."');</script>");
echo "Load video successfully!";
?>


</body>
</html>
