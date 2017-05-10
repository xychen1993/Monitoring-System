app.controller('mloginController', function($scope, $location, $rootScope, $http){

  $scope.jump = sub;

  function sub(){
    login().success(function(response){
    var exist = response.exist;
    console.log(response.exist);
    if(exist == true){
        $location.path('/apply');
    }
    else{
      alert('wrong password or usrname!');
      $location.path('/home');
    }
    });

    function login(){
    console.log($scope.username);
    console.log($scope.password);
    return $http.post('log_in.php', {username: $scope.username, password: $scope.password, userType:'manager'});
    }
  };

});

