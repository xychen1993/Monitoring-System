// Initialize collapse button
// $(".button-collapse").sideNav();
$('.button-collapse').sideNav({
  menuWidth: 240, // Default is 240
});



// sideNav title number
// $('input[name=bn]').click(function() {
//   $('#building').html("Building: #" + $('input[name=bn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
// });
//
// $('input[name=rn]').click(function() {
//   $('#room').html("Room: #" + $('input[name=rn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
// });
//
// $('input[name=kn]').click(function() {
//   // alert("test");
//   // console.log($('#kinect').html());
//   $('#kinect').html("Kinect: #" + $('input[name=kn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
// });



// date picker
$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    format: 'yyyy-mm-dd'
  });


// timepicker
$('.timePicker').trigger('autoresize');



// qVResult
console.log(qVResult);
var $search = $("#search");
var $form = $("#myForm");

$(".videoList").empty();
if (qVResult.length) {
    for(i=0; i < qVResult.length ;i++){
      var newname = nameconvert(qVResult[i].fileName);
      newname += ".mp4";
      $(".videoList").append("<li><a name='" + qVResult[i].fileName + "' href='#" + qVResult[i].fileName + "' data-toggle='tooltip' title='Building: " + qVResult[i].buildingId + " Room:" + qVResult[i].roomId + " Kinect:" + qVResult[i].kinectId +" start time:" + qVResult[i].startTime + " end time:" + qVResult[i].endTime + "'>" + qVResult[i].fileName + "</a></li>");
      $(".videoFrame").append("<video width='50%' height='50%' data-toggle='tooltip' title='Name: " + qVResult[i].fileName + ", Building: " + qVResult[i].buildingId + ", Room: " + qVResult[i].roomId + ", Kinect: " + qVResult[i].kinectId + ", Start Time: " + qVResult[i].startTime + ", End Time: " + qVResult[i].endTime + "' autoplay controls poster='' id='" + qVResult[i].fileName + "'><source src=./Video/" + newname + " type='video/mp4; id='" + qVResult[i].fileName + "source'></video>");
      var playerList = document.getElementById("videoListId");
      var links = playerList.getElementsByTagName('a');
      for (var i=0; i<links.length; i++) {
          links[i].onclick = handler;
      }
    }
  } else {
      $(".videoList").append("<li>There are no videos available for this time</li>");
  }
// $('[data-toggle="tooltip"]').tooltip();

var $videoLink = $("#videoListId li a");
var $videoTitle = $(".video-title");
var $videoListTitle = $(".timeframe-title");

$videoLink.click(function() {
  $videoTitle.text($(this).text());
});

function handler(e) {
  document.getElementById(this.getAttribute("name")).play();
}


// qEResult
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
var eventType = [];
var myDic = [];
for(var i=0 ; i<qEResult.length; i++){
  var tmp = qEResult[i].event;
  if(!myDic[tmp]){
    var tmpAr =[];
    tmpAr.push(qEResult[i]);
    myDic[tmp] = tmpAr;
  }else{
    myDic[tmp].push(qEResult[i]);
  }
}

// console.log(myDic);
for(var i in myDic){

  var collapseBody = '';
  for(var j=0 ; j<myDic[i].length; j++){
      collapseBody = collapseBody +"<p>" + myDic[i][j].startTime +" - "+ myDic[i][j].endTime +"</p>" ;
  }

  console.log(collapseBody);
  $("#eventCollapse").append(
    "<li>"+
      '<div class="collapsible-header">' + i + '</div>'+
      '<div class="collapsible-body"> '+ collapseBody +'</div>' +
    "</li>"
);
}

function numofvideos(num){
  console.log('enter');
  var playerList = document.getElementById("videoListId");
  var links = playerList.getElementsByTagName('a');
  $(".videoFrame").empty();
  for(var i = 0; i < links.length; i ++){
    var newname = nameconvert(qVResult[i].fileName);
    newname += ".mp4";
    $(".videoFrame").append("<video width='"+ 100 / num +"%' height='"+ 100 / num +"%' data-toggle='tooltip' title='Name: " + qVResult[i].fileName + ", Building: " + qVResult[i].buildingId + ", Room: " + qVResult[i].roomId + ", Kinect: " + qVResult[i].kinectId + ", Start Time: " + qVResult[i].startTime + ", End Time: " + qVResult[i].endTime + "' autoplay controls poster='' id='" + qVResult[i].fileName + "'><source src=./Video/" + newname + " type='video/mp4; codecs=avc1.4D401E,mp4a.40.2' id='" + qVResult[i].fileName + "source'><object width='50%' height='50%' type='application/x-shockwave-flash' data='http://releases.flowplayer.org/swf/flowplayer-3.2.16.swf'><param name='movie' value='http://releases.flowplayer.org/swf/flowplayer-3.2.16.swf'><param name='allowfullscreen' value='true'><param name='flashvars' value='config={'clip': {'url': 'http://alphahinex.github.io/archives/html5-video/mov-h264_main_30-aac_lc.mp4', 'autoPlay': false, 'autoBuffering': true}}'></object></video>");
  }
}

$("#lives").empty();
var curUrl = window.location.pathname;
console.log(curUrl);
$("#lives").append("<video id='live0' width='100%' height='100%' autoplay></video>");
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && curUrl == '/live_stream.php') {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      var live = document.getElementById('live0');
      live.src = window.URL.createObjectURL(stream);
      live.play();       
    }); 
}

function numoflives(num){
  console.log('enter numoflives');
  $("#lives").empty();
  for (var i = 0; i < num; i++) {
    $("#lives").append("<video id='live"+ i +"' width='" + 100 / num+"%' height='100%' autoplay></video>");
  }
  
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && curUrl == '/live_stream.php') {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      var lives = [];
      for (var i = 0; i < num; i++) {
        var live_num = 'live'+i;
        lives[i] = document.getElementById(live_num);
      }
      for (var i = 0; i < num; i++) {
        lives[i].src = window.URL.createObjectURL(stream);
        lives[i].play();
      }
       
    }); 
}

}

// var curUrl = window.location.pathname;
// console.log(curUrl);
// if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && curUrl == '/live_stream.php') {
//   for (var i = 0; i < 3;i++) {
//     var live_num = 'live'+i
//     console.log(live_num)
//     var live = document.getElementById(live_num);
//       navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//           live.src = window.URL.createObjectURL(stream);
//           live.play();
//       });
//   }
// }




transferred = [];
var time = 0;
// $('.videoFrame').scroll(function() {
//     var $videoframe = $(this);
//     if($videoframe.scrollTop() > time * 0.0001 * $videoframe.height()){
//       $videoframe.find('video').each(function(n){
//           var $this = $(this);
//           if ($this.position().top + $this.height() > 0 && $this.position().top < $videoframe.height()){
//             if(transferred.length > 8) transferred = [];
//             for(var i = 0 ; i < transferred.length; i ++){
//               if(transferred[i] == $this.context.id) return ;
//             }
//             transferred.push($this.context.id);
//             // console.log(nameconvert($this.context.id));
//             $('.videoList').append("<a class='converter' href='converter.php?id=" + $this.context.id + "'>test</a>");
//             $.ajax({ url: "converter.php?id=" + $this.context.id});
//             // console.log($this.context.id);
//             // console.log(transferred.length);
//             $(".videoFrame").empty();
//             if (qVResult.length) {
//                 for(i=0; i < qVResult.length ;i++){
//                   var newname = nameconvert(qVResult[i].fileName);
//                   newname += ".mp4";
//
//                   $(".videoFrame").append("<video width='50%' height='50%' autoplay controls poster='' id='" + qVResult[i].fileName + "'><source src=./temp_video/" + newname + " type='video/mp4; id='" + qVResult[i].fileName + "source'></video>");
//                   var playerList = document.getElementById("videoListId");
//                   var links = playerList.getElementsByTagName('a');
//                   for (var i=0; i<links.length; i++) {
//                       links[i].onclick = handler;
//                   }
//                 }
//               } else {
//                   $(".videoList").append("<li>There are no videos available for this time</li>");
//               }
//           }
//       });
//       time ++;
//     }
// });

function nameconvert(name){
  return name.replace(/.mp4/, "");

}
