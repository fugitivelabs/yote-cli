'use strict';

/* __allCaps__ CONTROLLERS */

angular.module('Yote')

  /********************************* 
  *
  *  Yote-cli Generated Controllers 
  *
  **********************************/

  .controller('__pronoun__Ctrl', ['$scope', '$stateParams', '$state', '__pronoun__Factory', function($scope, $stateParams, $state, __pronoun__Factory){
    console.log("__pronoun__Ctrl loaded...");
    
    __pronoun__Factory.all()
      .then(function(data) {
        $scope.__name__s = data;
      }, function(data){
        alert(data);
      });

  }])

  /********************************* 
  *
  *  Custom Controllers 
  *
  *********************************/


// end of file
;