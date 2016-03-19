var app = angular.module('atm-app', ['ngRoute', 'ngMessages']);

app

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
      
      .when('/enter', {
        templateUrl: 'partials/enter.html',
        controller: 'ViewEnterScreenController'
      })

      .when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'ViewInformationScreenController'
      })

      .when('/cash', {
        templateUrl: 'partials/cash.html',
        controller: 'ViewEnterScreenController'
      })

      .otherwise({
        redirectTo: '/enter'
      });
}])

.controller('ViewEnterScreenController', ['$scope', '$location', 'Account', 
    function($scope, $location, Account) {


    $scope.cardNumber;
    $scope.pinCode;
    $scope.loginFailed = false;

    $scope.enter = function(cardNumber, pinCode) {

        $scope.loginFailed = false;

        if (Account.validate(cardNumber, pinCode)) {
            $location.path("/main");
        } else {
            $scope.loginFailed = true;
            // alert('Validation Failed!');
        }

    };

}])

.controller('ViewInformationScreenController', ['$scope', '$location', 'Account', 
    function($scope, $location, Account) {

    $scope.name = Account.getName();
    $scope.money = Account.getAmount();

    $scope.getMoney = function(){
        $location.path("/cash");
    };

    $scope.back = function(){
        $location.path("/enter");
    };


}])

.directive('pincode', function() {
    
})

.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }

})

.factory('Account', function() {
    
    var user = {    
        'id'        : 1,
        'name'      : 'mr Smith', 
        'cardNumber': '2000-0001',
        'pinCode'   : '313',
        'amount'    : 1000
    };

    return {

        validate: function(cardNumber, pinCode) {
            console.log('cardNumber = ' + cardNumber);
            console.log('pinCode = ' + pinCode);
            return user.cardNumber === cardNumber && user.pinCode === pinCode;
        },

        getName: function() {
            return angular.copy(user.name);
        },

        getMoney: function(amount) {
            user.amount = user.amount - amount;
        },

        getAmount: function() {
            return angular.copy(user.amount);
        }
    }
    
})
;