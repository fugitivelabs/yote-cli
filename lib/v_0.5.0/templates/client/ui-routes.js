angular.module('Yote')

.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
  console.log('configure ui router for __name__');
  
  $locationProvider.html5Mode(true);

  $stateProvider

    /********************** 
    *  __Proper__ Routes
    ***********************/
    
    // parent state of __name__.  
    .state('__name__', {
      abstract: true
      , url: '/__name__s'
      , templateUrl: '/html/static/templates/default-layout'
      , controller: '__Proper__Ctrl'
    })

    // list of all posts.  url: 's' signifies /__name__s
    .state('__name__.list', {
      url: ''
      , views: {
        '' : {
          templateUrl: '/html/__name__/templates/list'
        }
      } 
    })

    .state('__name__.show', {
      url: '/:__name__Id/show'
      , views: {
        '' : {
          templateUrl: '/html/__name__/templates/show'
          , controller: '__Proper__ShowCtrl'
        }
      }
    })

    .state('__name__.new', {
      url: '/new'
      , views: {
        '' : {
          templateUrl: '/html/__name__/templates/create'
          , controller: '__Proper__CreateCtrl'
        }
      }
      , data: { role: 'login' } // this protects the client route 
    })

    .state('__name__.edit', {
      url: '/:__name__Id/edit'
      , views: {
        '': {
          templateUrl: '/html/__name__/templates/edit'
          , controller: '__Proper__UpdateCtrl'
        }
      }
      , data: { role: 'login' } // this protects the client route 
    })

// ==> end state config
})

// end file
;