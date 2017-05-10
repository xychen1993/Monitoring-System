<!DOCTYPE html>
<html>
  <head>
    <!--Import Google Icon Font-->
     <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <!--Import materialize.css-->
     <link type="text/css" rel="stylesheet" href="materialize/sass/materialize.css"  media="screen,projection"/>
     <!--Let browser know website is optimized for mobile-->
     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
     <!-- for icon -->
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
     <!-- myStyleSheet -->
     <link type="text/css" rel="stylesheet" href="css/myStyleSheet.css"  media="screen,projection"/>
     <link rel="stylesheet" href="css/main.css">
     <!-- dateTime -->
     <!-- <link href = "jqueryUI/jquery-ui.min.css" rel="stylesheet"> -->
     <!-- <link href = "datetime/jquery-ui-timepicker-addon.css" rel="stylesheet"> -->
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>

  </head>

<style>
	#logOut{
	 color: #512da8;
	background: #fff;
	display: inline-block;
	float: right;
	padding-left: 20px;
	padding-right: 20px;
	}

</style>

  <body >
    <?php include 'database.php';?>

    <!-- whole nav bar: top and left -->
    <nav class="deep-purple darken-2">
       <!-- top nav -->
       <a href="#" class="brand-logo .center" id="myLogo"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="-63 313 512 512" style="enable-background:new -63 313 512 512;" xml:space="preserve">
<style type="text/css">
  .st0{fill:#FFFFFF;}
</style>
<g>
  <path class="st0" d="M32.5,729.5C73.6,770.6,130.3,796,193,796c62.7,0,119.5-25.4,160.5-66.5C394.6,688.5,420,631.7,420,569
    s-25.4-119.5-66.5-160.5C312.5,367.4,255.7,342,193,342c-62.7,0-119.4,25.4-160.5,66.5C-8.6,449.5-34,506.3-34,569
    S-8.6,688.5,32.5,729.5 M193,313c141.4,0,256,114.6,256,256c0,141.4-114.6,256-256,256C51.6,825-63,710.4-63,569
    C-63,427.6,51.6,313,193,313z"/>
  <path class="st0" d="M421.6,626.7H137.2v-40.2h291.1C427.2,600.2,425,613.7,421.6,626.7"/>
  <path class="st0" d="M139.6,576.4v-82.2c0-39.9,43.7-39.9,43.7-1.5v42h106.2c-0.2-21.5-0.2-43.3,0.5-43.3h125.2
    c8.8,24.3,13.7,50.5,13.7,77.8c0,2.5,0,4.9-0.1,7.4h-63.1H290H139.6z"/>
  <path class="st0" d="M229.7,526.2c21.3,0,38.7-17.4,38.7-38.7c0-21.5-17.4-38.3-38.7-38.3S191,466.1,191,487.5
    C191,508.8,208.4,526.2,229.7,526.2"/>
  <path class="st0" d="M103.4,470.1L103.4,470.1c11.8,0,21.4,9.6,21.4,21.4v197.2H82V491.6C82,479.8,91.6,470.1,103.4,470.1"/>
</g>
</svg><span>virtual</span>sitter</a>
<a id='logOut' href='index.html'>LOG OUT</a>
<!--        <ul id="nav-mobile" class="right ">
         <li id="iconList"><i class="small material-icons" id="setIcon">settings</i></li>
       </ul> -->
       <!-- left nav -->
        <ul id="slide-out" class="side-nav fixed">
          <!-- return all data -->
          <form method = "post" id="myForm">
            <!-- building -->
            <li class="no-padding">
              <ul>
                <li>
                  <a id="building" class='dropdown-button btn' href='#' data-activates='building-dropdown'>Building<i class="mdi-navigation-arrow-drop-down"></i></a>
                  <div class="collapsible-body">
                    <ul class="subGroup dropdown-content" id='building-dropdown'>
                      <li>
                      <input class="with-gap" name="bn" type="radio" id="test1" value="1"/>
                      <label for="test1">Building #1</label>
                      </li>
                      <li>
                        <input class="with-gap" name="bn" type="radio" id="test2" value="2"/>
                        <label for="test2">Building #2</label>
                      </li>
                      <li>
                        <input class="with-gap" name="bn" type="radio" id="test3"  value="3"/>
                        <label for="test3">Building #3</label>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            <!-- room -->
            <li class="no-padding">
              <ul class="collapsible collapsible-accordion">
                <li>
                  <a id="room" class='dropdown-button btn' href='#' data-activates='room-dropdown'>Room<i class="mdi-navigation-arrow-drop-down"></i></a>
                  <div class="collapsible-body">
                    <ul class="subGroup dropdown-content" id='room-dropdown'>
                      <li>
                      <input class="with-gap" name="rn" type="radio" id="rn1" value="1"/>
                      <label for="rn1">Room #1</label>
                      </li>
                      <li>
                        <input class="with-gap" name="rn" type="radio" id="rn2" value="2"/>
                        <label for="rn2">Room #2</label>
                      </li>
                      <li>
                        <input class="with-gap" name="rn" type="radio" id="rn3"  value="3"/>
                        <label for="rn3">Room #3</label>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>

            <!-- Kinect  -->
            <li class="no-padding">
              <ul class="collapsible collapsible-accordion">
                <li>
                  <a id="kinect" class='dropdown-button btn' href='#' data-activates='kinect-dropdown'>Kinect<i class="mdi-navigation-arrow-drop-down"></i></a>
                  <div class="collapsible-body">
                    <ul class="subGroup dropdown-content" id='kinect-dropdown'>
                      <li>
                      <input class="with-gap" name="kn" type="radio" id="kn1" value="1"/>
                      <label for="kn1">Kinect #1</label>
                      </li>
                      <li>
                        <input class="with-gap" name="kn" type="radio" id="kn2" value="2"/>
                        <label for="kn2">Kinect #2</label>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>


            <!-- time -->
            <li class="no-padding">
              <ul class="collapsible collapsible-accordion">
                <li>
                  <a class="collapsible-header dropdown-button btn" id="time">Time<i class="mdi-navigation-arrow-drop-down"></i></a>
                  <div class="collapsible-body" id="time-body">
                    <ul class="subGroup">
                      <!-- From -->
                      <li>
                        <div class="input-field">
                          <input placeholder="YYYY-MM-DD" name="fromDate" id="fromDate" type="text" class="datepicker">
                          <label for="fromInput">From: </label>
                        </div>
                      </li>

                      <li>
                        <!-- <div class="input-field"> -->
                          <input placeholder="Time" name="fromTime" id="fromTime" type="time" step="1" class="timePicker" style ="width:70%;">
                          <!-- <label for="fromInput">From: </label> -->
                        <!-- </div> -->
                      </li>
                      <!-- To -->
                      <li>
                        <div class="input-field">
                          <input placeholder="YYYY-MM-DD" name="toDate" id="toInput" type="text" class="datepicker">
                          <label for="fromInput">To: </label>
                        </div>
                      </li>

                      <li>
                        <!-- <div class="input-field"> -->
                          <input placeholder="Time" name="toTime" id="toTime" type="time" step="1" class="timePicker" style ="width:70%;">
                          <!-- <label for="fromInput">From: </label> -->
                        <!-- </div> -->
                      </li>

                    </ul>
                  </div>
                </li>
              </ul>
            </li>



            <!-- search -->
            <button class="btn" type="submit" name="mySubmit" id="search">Search
              <i class="material-icons right">send</i>
            </button>
          </form>
        </ul>
        <a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
    </nav>

    <div id = "contentWrapper" ng-controller="appcontrol">
      <div class="container">
        <!-- offset if we use id the offset will not working -->
        <div class="row">
          <!-- <video width="320" height="240" autoplay>
            <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
          </video> -->
          <div class="video-title">No Video Selected</div><div class="timeframe-title"></div>
          <div class="col s12 m8 l8 videoFrame">
            <!-- <video width="40%" height="40%"  controls poster="" id="myVideo1">
              <source src="./video/100_0_2014_11_22_17_30_15.mp4" type="video/mp4" id="source">
            </video><br>
            <label>Test</label> -->
          </div>
          <div class="col s12 m4 l4 videoList" id="videoListId">

          </div>
        </div>
        <div class="row">
          <div class="col s12 m8 l8 eventFrame" style="background-color:transparent">
            <div id="graph" style = "position: relative; height: 100%">
            <div id="chartdiv" style = "position: relative; height: 100%"></div>
          </div>
            <span class="flow-text">s12 m8 l8</span></div>
          <div class="col s12 m4 l4 eventList">
            <ul class="collapsible" data-collapsible="accordion" id="eventCollapse">
             <!-- <li>
               <div class="collapsible-header">First</div>
               <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
             </li>
             <li>
               <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
               <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
             </li> -->
             <!-- <li>
               <div class="collapsible-header">whatshot</div>
               <div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
             </li> -->
            </ul>

          </div>
        </div>
        </div>
      </div>
    </div>


    <!--Import jQuery before materialize.js-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="jqueryUI/jquery-ui.js"></script>
    <!-- dateTime -->
    <!-- <script type="text/javascript" src="datetime/jquery-ui-timepicker-addon.js"></script> -->
    <!-- <script type='text/javascript' src='datetime/jquery-ui-sliderAccess.js'></script> -->
    <!-- materialize -->
    <script type="text/javascript" src="materialize/js/bin/materialize.min.js"></script>
    <script type="text/javascript">var qVResult =<?php echo json_encode($qVResult) ?>;</script>
    <script type="text/javascript">var qEResult =<?php echo json_encode($qEResult) ?>;</script>
    <script type="text/javascript">var startTime =<?php echo json_encode($from) ?>;</script>
    <script type="text/javascript">var endTime =<?php echo json_encode($to) ?>;</script>
    <script src="http://www.amcharts.com/lib/3/amcharts.js"></script>
    <script src="http://www.amcharts.com/lib/3/serial.js"></script>
    <script src="http://www.amcharts.com/lib/3/themes/light.js"></script>
    <script src="js/chart.js"></script>
    <script src="js/myScript.js"></script>



  </body>
</html>
