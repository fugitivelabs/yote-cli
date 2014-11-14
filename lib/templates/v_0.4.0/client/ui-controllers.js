'use strict';

/* __allCaps__ CONTROLLERS */

angular.module('Yote')

  /********************************* 
  *
  *  Yote-cli Generated Controllers 
  *
  **********************************/

  .controller('__Proper__Ctrl', ['$scope', '$stateParams', '$state', '__Proper__Factory', function($scope, $stateParams, $state, __Proper__Factory) {
    console.log("__Proper__Ctrl loaded...");
    
    __Proper__Factory.list()
      .then(function(data) {
        $scope.__name__s = data.__name__s;
      }, function(err) {
        console.log(err);
      });

  }])

  .controller('__Proper__ShowCtrl', ['$scope', '$stateParams', '$state', '__Proper__Factory', function($scope, $stateParams, $state, __Proper__Factory) {
    console.log('__Proper__ShowCtrl loaded...');

    __Proper__Factory.show($stateParams.__name__Id)
      .then(function(data) {
        $scope.__name__ = data.__name__;
      }, function(err) {
        console.log(err);
      });

  }])

  .controller('__Proper__CreateCtrl', ['$scope', '$stateParams', '$state', '__Proper__Factory', function($scope, $stateParams, $state, __Proper__Factory) {
    console.log('__Proper__CreateCtrl loaded...');

    $scope.createAction = function(__name__Data) {
      console.log('createAction initiated...');
      __Proper__Factory.create(__name__Data)
        .then(function(data) {
          if(data.success) {
            // go to __name__ show page
            $state.go('__name__.show', { __name__Id: data.__name__._id });
          } else {
            alert(data.message + " Please try again");
          }
        });
    }
  }])

  .controller('__Proper__UpdateCtrl', ['$scope', '$stateParams', '$state', '__Proper__Factory', function($scope, $stateParams, $state, __Proper__Factory) {
    console.log('__Proper__UpdateCtrl loaded...');
    
    __Proper__Factory.show($stateParams.__name__Id)
      .then(function(data) {
        $scope.__name__ = data.__name__;
        console.log(data);
      }, function(err) {
        console.log(err);
      });

    $scope.updateAction = function(__name__Data) {
      __Proper__Factory.update(__name__Data)
        .then(function(data) {
          if(data.success) {
            // go to __name__ show page
            $state.go('__name__.show', { __name__Id: data.__name__._id });
          } else {
            alert(data.message + " Please try again");
          }
        });
    }

    // Think about this before implementing
    // $scope.deleteAction = function(__name__Data) {
    //   __Proper__Factory.delete(__name__Data)
    //     .then(function(data) {
    //       if(data.success) {
    //         // go to __name__ show page
    //         $state.go('__name__.show', { __name__Id: data.__name__.id});
    //       } else {
    //         alert(data.message + " Please try again");
    //       }
    //     });
    // }

  }])


// end of file
;