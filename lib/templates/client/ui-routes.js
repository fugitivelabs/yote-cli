angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router for __name__');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  __pronoun__ Routes
    ***********************/
    
    // parent state of __name__.  
    .state('__name__', {
      abstract: true
      , url: '/__name__'
      , templateUrl: '/views/layouts/default'
      , controller: '__pronoun__Ctrl'
    })
    // first child of __name__. Empty url: '' signifies "/__name__" + " "
    .state('__name__.index', {
      url: ''
      , templateUrl: '/views/__name__/index'
    })

    // sample show page with inline controller
    .state('__name__.show', {
      url: '/show/:itemId'
      , templateUrl: '/views/__name__/show'
      , controller: ['$scope', '$stateParams', '$state', '__pronoun__Factory',
          function($scope, $stateParams, $state, __pronoun__Factory){
            $scope.__name__ = __pronoun__Factory.show($stateParams.itemId);
          }]
    })

// ==> end state config
})

// end file
;