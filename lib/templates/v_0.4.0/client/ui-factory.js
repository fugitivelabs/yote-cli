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

.factory('__Proper__Factory', ['$http', '$q', function($http, $q) {


  var __Proper__Factory = {};


  /************************************************************************************
  *
  * This is using very basic sample data.  See next section to use an API resource.
  * 
  * Yote is API agnostic, so feel free to pull in data from an open API of your choice
  *
  *************************************************************************************/

  var data = [
                {
                  "id": 0
                  , "title": "First item in __Proper__"
                  , "message": "Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? "
                }
                , {
                  "id": 1
                  , "title": "Second item in __Proper__"
                  , "message": "You think water moves fast? You should see ice. It moves like it has a mind."
                }
                , {
                  "id": 2
                  , "title": "Third item in __Proper__"
                  , "message": "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year."
                }
              ]

  __Proper__Factory.list = function () {
    var deferred = $q.defer();
    var returned = {};
    returned.success = true;
    returned.__name__s = data;
    deferred.resolve(returned);

    return deferred.promise;
  }

  __Proper__Factory.show = function(id) {
    var deferred = $q.defer();
    var returned = {};
    returned.success = true;
    returned.__name__ = data[id];
    deferred.resolve(returned);

    return deferred.promise;
  }

  __Proper__Factory.create = function(__name__Data) {
    var deferred = $q.defer();
    var returned = {};
    returned.success = true;
    __name__Data.id = data.length;
    data.push(__name__Data);
    returned.__name__ = data[__name__Data.id];
    deferred.resolve(returned);

    return deferred.promise;
  }

  __Proper__Factory.update = function(__name__Data) {
    var deferred = $q.defer();
    var returned = {};
    returned.success = true;
    data[__name__Data.id] = __name__Data;
    returned.__name__ = data[__name__Data.id];
    deferred.resolve(returned);

    return deferred.promise;
  }

  /************************************************************************************
  *
  * Uncomment below to use __Proper__Factory to pull in data from a Yote api resource
  *
  *************************************************************************************/


  // var urlBase = "/api/__name__s";

  // __Proper__Factory.list = function() {
  //   console.log("getting a list of all __Proper__s");
  //   var deferred = $q.defer();
  //   $http.get(urlBase)
  //     .success(function(data) {
  //       if(data.success) {
  //         console.log("it worked!");
  //         console.log(data);
  //         deferred.resolve(data);
  //       } else {
  //         console.log("something wrong");
  //         console.log(data);
  //         deferred.reject(data);
  //       }
  //     }).error(function(err) {
  //       console.log("it faied :( ");
  //       console.log(err);
  //       deferred.reject(err);
  //     });
  //   return deferred.promise;
  // }

  // __Proper__Factory.show = function(id) {
  //   console.log("show this post with id: " + id);
  //   var deferred = $q.defer();
  //   $http.get(urlBase + '/' + id)
  //     .success(function(data) {
  //       if(data.success) {
  //         console.log("it worked!");
  //         console.log(data);
  //         deferred.resolve(data);
  //       } else {
  //         console.log("something wrong");
  //         console.log(data);
  //         deferred.reject(data);
  //       }
  //     }).error(function(err) {
  //       console.log("it faied :( ");
  //       console.log(err);
  //       deferred.reject(err);
  //     });
  //   return deferred.promise;
  // }

  // __Proper__Factory.create = function(__name__Data) {
  //   console.log("attempting to create a new __name__ in factory");
  //   var deferred = $q.defer();
  //   $http.post(urlBase, __name__Data)
  //     .success(function(data) {
  //       if(data.success) {
  //         console.log("it worked!");
  //         console.log(data);
  //         deferred.resolve(data);
  //       } else {
  //         console.log("something wrong");
  //         console.log(data);
  //         deferred.reject(data);
  //       }
  //     }).error(function(err) {
  //       console.log("it faied :( ");
  //       console.log(err);
  //       deferred.reject(err);
  //     })
  //   return deferred.promise;
  // }

  // __Proper__Factory.update = function(__name__Data) {
  //   console.log("attempting to update __name__ with id " + __name__Data._id + " in factory");
  //   var deferred = $q.defer();
  //   $http.put(urlBase + '/' + __name__Data._id, __name__Data)
  //     .success(function(data) {
  //       if(data.success) {
  //         console.log("it worked!");
  //         console.log(data);
  //         deferred.resolve(data);
  //       } else {
  //         console.log("something wrong");
  //         console.log(data);
  //         deferred.reject(data);
  //       }
  //     }).error(function(err) {
  //       console.log("it failed :( ");
  //       console.log(err);
  //       deferred.reject(err);
  //     });
  //   return deferred.promise;
  // }

  // // Think about it before implementing this...
  // // __Proper__Factory.delete = function(__name__Data) {
  // //   console.log("attempting to delete __name__ with id " + __name__Data._id + "in factory");
  // //   var deferred = $q.defer();
  // //   $http.delete(urlBase + '/' + __name__Data._id)
  // //     .success(function(data) {
  // //       if(data.success) {
  // //         console.log("it worked!");
  // //         console.log(data);
  // //         deferred.resolve(data);
  // //       } else {
  // //         console.log("something wrong");
  // //         console.log(data);
  // //         deferred.reject(data);
  // //       }
  // //     }).error(function(err) {
  // //       console.log("it failed :( ");
  // //       console.log(err);
  // //       deferred.reject(err);
  // //     });
  // //   return deferred
  // // }


  return __Proper__Factory;

}])

// end of file
;

