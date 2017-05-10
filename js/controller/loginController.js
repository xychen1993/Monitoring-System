app.controller('loginController', function($scope, $location, $rootScope, $http){

  $scope.jump = sub;

  function sub(){
    login().success(function(response){
    var exist = response.exist;
    var stats = response.stats;
    console.log(response.exit);
    console.log(response.stats);
    if(exist == true){
      if(stats == true){
        window.location.href='index1.php';
      }
      else {
        alert('application not approved!');
        $location.path('/home');
      }
    }
    else{
      alert('wrong password or usrname!');
      $location.path('/home');
    }
    });

    function login(){
      return $http.post('log_in.php', {username: $scope.username, password: $scope.password, userType:'user'});
    }
  };

});


/*
    $http.get('ttp://www.w3schools.com/angular/customers_mysql.php')
      .success(function(response){
        var login = false;
        $scope.data = response;
        console.log($scope.data);
        $scope.submit = function(){

          console.log($scope.data.length);
          for(i = 0; i<$scope.data.length; i++){
            if($scope.data[i].login== $scope.username && $scope.data[i].id == $scope.password){
              login = true;
              $rootScope.loggedIn = true;
              $location.path('/dashboard');
            }
          };
          if(!login){
            alert("wrong password or usrname!");
          }
        };
      });
*/
