app.controller('forgotController', function($scope, $location, $rootScope, $http){

  $scope.sub = sub;

  function sub(){
	console.log('clicked');

  	login().success(function(response){
            var exist = response.exist;
            var password = response.password;
  	    console.log(response.exit);
            console.log(response.password);
            if(exist == true){
                console.log("1");
		alert('Your password is:' + password);
                $location.path('/home');
       	    }
       	    else{
       	        alert('Count not find the email');
                $location.path('/home');
       	    }
        });

  function login(){
        return $http.post('findPassword.php', {username: $scope.username});
      }
   };

});
