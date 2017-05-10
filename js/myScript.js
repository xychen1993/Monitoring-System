// Initialize collapse button
// $(".button-collapse").sideNav();
$('.button-collapse').sideNav({
  menuWidth: 240, // Default is 240
});



// sideNav title number
$('input[name=bn]').click(function() {
  $('#building').html("Building: #" + $('input[name=bn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
});

$('input[name=rn]').click(function() {
  $('#room').html("Room: #" + $('input[name=rn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
});

$('input[name=kn]').click(function() {
  // alert("test");
  // console.log($('#kinect').html());
  $('#kinect').html("Kinect: #" + $('input[name=kn]:checked').val()+  "<i class='mdi-navigation-arrow-drop-down'></i>")
});



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
    for(i=0 ; i<qVResult.length ;i++){
      //$(".videoList").append("<li><a href=./video/lalala> lalala </a></li>");
      $(".videoList").append("<li><a href='" +'./video/' + qVResult[i].fileName+ "'>" + qVResult[i].fileName+"</a></li>");
      $(".videoFrame").append("<video width='40%' height='40%' controls poster='' id='myVideo'><source src=./video/" + qVResult[i].fileName + " type='video/mp4' id='source'></video>");
      var playerList = document.getElementById("videoListId");
      var links = playerList.getElementsByTagName('a');
      for (var i=0; i<links.length; i++) {
          links[i].onclick = handler;
      }
    }
  } else {
      $(".videoList").append("<li>There are no videos available for this time</li>");
  }

var $videoLink = $("#videoListId li a");
var $videoTitle = $(".video-title");
var $videoListTitle = $(".timeframe-title");

$videoLink.click(function() {
  $videoTitle.text($(this).text());
});

function handler(e) {
  // prevent the full screen play video
  e.preventDefault();
  videoPath = this.getAttribute("href");
  video = document.querySelector("video");
  video.removeAttribute("poster");
  source = document.querySelectorAll("video source");
  source.src = videoPath;
  document.getElementById("source").setAttribute("src",source.src ) ;
  video.load();
  video.play();
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
