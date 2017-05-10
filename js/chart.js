Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  var hh = this.getHours().toString();
  var minutes = this.getMinutes().toString();
  var ss = this.getSeconds().toString();
  var day = yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0])
  var hms = (hh[1]?hh:"0"+hh[0]) + ':' + (minutes[1]?minutes:"0"+minutes[0]) + ':' + (ss[1]?ss:"0"+ss[0])
  return day + ' ' + hms; // padding
 };

var chart = AmCharts.makeChart("chartdiv", {
   "type": "serial",
   "theme": "light",
   "marginRight": 80,
   "autoMarginOffset": 20,
   "dataDateFormat": "YYYY-MM-DD JJ:NN:SS",
   "valueAxes": [{
       "id": "v1",
       "axisAlpha": 0,
       "position": "left"
   },{
       "id":"v2",
       "axisColor": "#FCD202",
       "axisThickness": 2,
       "gridAlpha": 0,
       "axisAlpha": 1,
       "position": "right"
   },{
       "id":"v3",
       "axisColor": "#FCD202",
       "axisThickness": 2,
       "gridAlpha": 0,
       "axisAlpha": 1,
       "position": "right"
   }],
   "balloon": {
       "borderThickness": 1,
       "shadowAlpha": 0
   },
   "graphs": [{
       "id": "g1",
       "bullet": "round",
       "lineColor": "#FF6600",
       "bulletBorderAlpha": 1,
       "bulletColor": "#FFFFFF",
       "bulletSize": 5,
       "hideBulletsCount": 50,
       "lineThickness": 2,
       "title": "red line",
       "useLineColorForBulletBorder": true,
       "valueField": "SIT",
       "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[date]]</span><br>SIT: [[SIT]]</div>"
   },{
       "id": "g2",
       "bullet": "round",
       "lineColor": "#FCD202",
       "bulletBorderAlpha": 1,
       "bulletColor": "#FFFFFF",
       "bulletSize": 5,
       "hideBulletsCount": 50,
       "lineThickness": 2,
       "title": "red line",
       "useLineColorForBulletBorder": true,
       "valueField": "STAND",
       "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[date]]</span><br>STAND: [[STAND]]</div>"
   },{
       "id": "g3",
       "bullet": "round",
       "lineColor": "#B0DE09",
       "bulletBorderAlpha": 1,
       "bulletColor": "#FFFFFF",
       "bulletSize": 5,
       "hideBulletsCount": 50,
       "lineThickness": 2,
       "title": "red line",
       "useLineColorForBulletBorder": true,
       "valueField": "WALK",
       "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[date]]</span><br>WALK: [[WALK]]</div>"
   }],
   "chartScrollbar": {
       "graph": "g1",
       "oppositeAxis":false,
       "offset":30,
       "scrollbarHeight": 80,
       "backgroundAlpha": 0,
       "selectedBackgroundAlpha": 0.1,
       "selectedBackgroundColor": "#888888",
       "graphFillAlpha": 0,
       "graphLineAlpha": 0.5,
       "selectedGraphFillAlpha": 0,
       "selectedGraphLineAlpha": 1,
       "autoGridCount":true,
       "color":"#AAAAAA"
   },
   "chartCursor": {
       "pan": true,
       "valueLineEnabled": true,
       "valueLineBalloonEnabled": true,
       "cursorAlpha":0,
       "valueLineAlpha":0.2
   },
   "categoryField": "date",
   "categoryAxis": {
       "parseDates": true,
       "dashLength": 1,
       "minorGridEnabled": true,
       "minPeriod": "ss"
   },
   "export": {
       "enabled": true
   },
   "dataProvider": []
});

console.log('qV: ', qVResult)
console.log('qE: ', qEResult)
console.log('startTime: ', startTime)
console.log('endTime: ', endTime)
startTime_date = new Date("2015-10-29 02:00:00")
// startTime_date = new Date(startTime)
// console.log(startTime_date)
endTime_date = new Date("2015-10-29 02:01:00")
// endTime_date = new Date(endTime)
// var t = new Date(startTime);
// t.setSeconds(startTime_date.getSeconds() + 7000)
// console.log('t:', t)
// for(var i=0; i<qEResult.length; i++){
//     console.log(qEResult[i][5])
// }
// console.log(typeof qVResult[0][3])
current_time = startTime_date
last_ten_seconds = new Date("2015-10-29 02:00:00")
last_ten_seconds.setSeconds(last_ten_seconds.getSeconds() - 10)
console.log(current_time)
console.log(last_ten_seconds)
while(current_time < endTime_date)
{
   // console.log('current_time: ', current_time)
   sit_count = 0
   stand_count = 0
   walk_count = 0
   for(var i=0; i<qEResult.length; i++){
       tem_start = new Date(qEResult[i][3])
       tem_end = new Date(qEResult[i][4])
       console.log('1:', tem_start + '2:',last_ten_seconds + 'compare: ', (tem_start >= last_ten_seconds))
       // console.log((tem_end <= current_time))
       if((tem_start >= last_ten_seconds) && (tem_end <= current_time)){
           tem_activity = qEResult[i][5]
           switch (tem_activity){
               case 'SIT':
                   sit_count += 1;
                   break;
               case 'STAND':
                   stand_count += 1
                   break;
               case 'WALK':
                   walk_count += 1
                   break;
           }
       }
   }
   current_time_string = current_time.yyyymmdd();
   chart.dataProvider.push({
       date: current_time_string,
       SIT: sit_count,
       STAND: stand_count,
       WALK: walk_count
});
   current_time.setSeconds(current_time.getSeconds() + 10)
   last_ten_seconds.setSeconds(last_ten_seconds.getSeconds() + 10)
   // console.log('current_time: ', current_time)
   // console.log('last_ten_seconds: ', last_ten_seconds)
}

d = new Date("2015-10-29 02:59:10");
d_string = d.yyyymmdd();
console.log(d_string)

// chart.dataProvider.push({
//     date: d_string,
//     SIT: 10,
//     STAND: 15,
//     WALK: 6
// });
// console.log(chart.dataProvider)
chart.addListener("rendered", zoomChart);

zoomChart();

function zoomChart() {
   chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
}

window.onload = function(){
   var find_tag = document.getElementsByTagName("a")[6]
   find_tag.style.visibility = "hidden"
};
// console.log(qVResult)
