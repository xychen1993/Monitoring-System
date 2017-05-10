app.controller('mangController', function ($location, $scope, $http){
  $http.get('manage.php').then(function(response){
      $scope.applys = response.data;
    });

  var judge = true;

  $scope.approve = function(mail){
    console.log('wtf!');
    console.log('clicked');

    var res = {username: mail,temp: true};
    console.log(mail);
    console.log(res);
    $http.post('change_status.php', res)
    .success(
      alert("This application has been approved!"));
  };

  $scope.refuse = function(){
    console.log('refuse!');
    judge = false;
    $http.post('change_status.php', judge)
    .success(alert("This application has been refused!"));
  };

});
