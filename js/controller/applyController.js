app.controller('applyController', function($scope, $http, $location){
  $scope.submit = submit;

  function submit(){
    console.log($scope.newuser);

    create($scope.newuser).success(function(response){
      if(response.response == true){  
        alert('You have been successfully applied!');
        $location.path('/home');
      }
      else{
        alert('Failed');
        $location.path('/home');
      }
    });
/*
    then(function(response){
      if(response.success){
        alert('You have been successfully applied!');
        $location.path('/home');
      }
      else{
        alert('Failed');
        $location.path('/home');
      }
    })

  };
*/
};

  function create(){
    return $http.post('./sign_up.php', $scope.newuser);
    //return $http.post('../login1.php', {"val" : 456});
  }
});
