'use strict';

/* __allCaps__ FACTORY */

angular.module('Yote')

/*******************************************************************************************
* By default, Yote uses Angular factories with the $http and $q services as the provider model. 
* 
* Using factories vs services vs provider is mostly a matter of preference, though 
* there are some fundamental advantages to each. 
* 
* A starting point for further documentation and discussion on the matter can be found at 
* http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/
*
* If services or providers are preferred for this specific resource, this is still the  
* place to put them.
*******************************************************************************************/

.factory('__pronoun__Factory', ['$http', '$q', function($http, $q) {


  var __pronoun__Factory = {};


  /************************************************************************************
  *
  * This is using very basic sample data.  See next section to use an API resource
  *
  *************************************************************************************/

  var data = [
    {
      "id": 0
      , "title": "First item in __pronoun__"
      , "message": "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? "
    }
    , {
      "id": 1
      , "title": "Second item in __pronoun__"
      , "message": "You think water moves fast? You should see ice. It moves like it has a mind."
    }
  ]

  __pronoun__Factory.all = function () {
    return data;
  }

  __pronoun__Factory.show = function(id) {
    return data[id];
  }


  /************************************************************************************
  *
  * Uncomment below to use __pronoun__Factory to pull in data from an api resource
  *
  *************************************************************************************/


  // var urlBase = "/api/__resourceName__";

  // __pronoun__Factory.all = function() {
  //   console.log("get all __pronoun__s called");
  //   var deferred = $q.defer();
  //   $http.get(urlBase)
  //     .success(function(data){
  //       console.log("it worked!");
  //       console.log(data);
  //       deferred.resolve(data);
  //     }).error(function() {
  //       console.log("Error retrieving all __name__s.");
  //       deferred.reject("Error retrieving all __name__s.")
  //     });
  //   return deferred.promise;
  // }

  // __pronoun__Factory.show = function(slug) {
  //   console.log("show this post: " + slug);
  //   var deferred = $q.defer();
  //   $http.get(urlBase + '/' + slug)
  //     .success(function(data){
  //       console.log(data);
  //       deferred.resolve(data);
  //     }).error(function() {
  //       console.log("error showing this __name__");
  //       deferred.reject("error showing this __name__");
  //     });
  //   return deferred.promise;
  // }


  return __pronoun__Factory;

}])

// end of file
;

