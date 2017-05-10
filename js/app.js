var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('responseObserver');

  $routeProvider
    .when('/login',{
        templateUrl: 'template/login.html',

        })
    .when('/signup',{
        templateUrl: 'template/signup.html',

        })
    .when('/home',{
        templateUrl: 'template/home.html',

        })
    .when('/apply',{
        templateUrl: 'template/apply.html',

        })
    .when('/forgot',{
        templateUrl: 'template/forgot.html',

        })
    .when('/mlogin',{
            templateUrl: 'template/mlogin.html',

        })
    .when('/profile',{
        templateUrl: 'template/profile.html',

        })
    .when('/index',{
//cannot open the dashboard without lgin
/*        resolve:{
            "check":  function($location, $rootScope){
              if(!$rootScope.loggedIn){
                $location.path('/');
              }
            }
        },
        */
        templateUrl: 'template/project/index.html',
        })
    .otherwise({
        redirectTo: '/home',
        })

});


app.factory('responseObserver', function responseObserver($q, $window) {
    return {
        'responseError': function(errorResponse) {
            switch (errorResponse.status) {
            case 403:
                $window.location = './403.html';
                break;
            case 500:
                $window.location = './500.html';
                break;
            }
            return $q.reject(errorResponse);
        }
    };
});
