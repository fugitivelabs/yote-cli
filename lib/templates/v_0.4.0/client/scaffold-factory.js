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
  * This hits the Yote api generated with the scaffold. 
  *
  *************************************************************************************/


  var urlBase = "/api/__name__s";

  __Proper__Factory.list = function() {
    console.log("getting a list of all __Proper__s");
    var deferred = $q.defer();
    $http.get(urlBase)
      .success(function(data) {
        if(data.success) {
          console.log("it worked!");
          console.log(data);
          deferred.resolve(data);
        } else {
          console.log("something wrong");
          console.log(data);
          deferred.reject(data);
        }
      }).error(function(err) {
        console.log("it failed :( ");
        console.log(err);
        deferred.reject(err);
      });
    return deferred.promise;
  }

  // /********************************************************
  // *  Think about it before implementing search...
  // ********************************************************/
  // __Proper__Factory.search = function(query) {
  //   console.log("search __name__s with factory");
  //   console.log(query);
  //   var queryString;
  //   // build the query string form query object
  //   for(var key in query) {
  //     if(query.hasOwnProperty(key)) {
  //       queryString = "?" + key + "=" + query[key];
  //     } else {
  //       queryString += "&" + key + "=" + query[key];
  //     }
  //   }
  //   console.log(queryString);
  //   var deferred = $q.defer();
  //   $http.get(urlBase + "/search" + queryString)
  //     .success(function(data) {
  //       if(data.success) {
  //         console.log("Search results: ");
  //         console.log(data);
  //         deferred.resolve(data);
  //       } else {
  //         console.log("something wrong");
  //         console.log(data);
  //         deferred.reject(data);
  //       }
  //     }).error(function(err) {
  //       console.log("Factory failed");
  //       console.log(err);
  //       deferred.reject(err);
  //     });
  //   return deferred.promise;
  // }

  __Proper__Factory.show = function(id) {
    console.log("show this __name__ with id: " + id);
    var deferred = $q.defer();
    $http.get(urlBase + '/' + id)
      .success(function(data) {
        if(data.success) {
          console.log("it worked!");
          console.log(data);
          deferred.resolve(data);
        } else {
          console.log("something wrong");
          console.log(data);
          deferred.reject(data);
        }
      }).error(function(err) {
        console.log("it faied :( ");
        console.log(err);
        deferred.reject(err);
      });
    return deferred.promise;
  }

  __Proper__Factory.create = function(__name__Data) {
    console.log("attempting to create a new __name__ in factory");
    var deferred = $q.defer();
    $http.post(urlBase, __name__Data)
      .success(function(data) {
        if(data.success) {
          console.log("it worked!");
          console.log(data);
          deferred.resolve(data);
        } else {
          console.log("something wrong");
          console.log(data);
          deferred.reject(data);
        }
      }).error(function(err) {
        console.log("it faied :( ");
        console.log(err);
        deferred.reject(err);
      })
    return deferred.promise;
  }

  __Proper__Factory.update = function(__name__Data) {
    console.log("attempting to update __name__ with id " + __name__Data._id + " in factory");
    var deferred = $q.defer();
    $http.put(urlBase + '/' + __name__Data._id, __name__Data)
      .success(function(data) {
        if(data.success) {
          console.log("it worked!");
          console.log(data);
          deferred.resolve(data);
        } else {
          console.log("something wrong");
          console.log(data);
          deferred.reject(data);
        }
      }).error(function(err) {
        console.log("it failed :( ");
        console.log(err);
        deferred.reject(err);
      });
    return deferred.promise;
  }

  /*********************************************************
  *  Think about it before implementing delete...
  *********************************************************/

  // __Proper__Factory.delete = function(__name__Data) {
  //   console.log("attempting to delete __name__ with id " + __name__Data._id + "in factory");
  //   var deferred = $q.defer();
  //   $http.delete(urlBase + '/' + __name__Data._id)
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
  //   return deferred
  // }


  return __Proper__Factory;

}])

// end of file
;

