
var categoriesModule = angular.module('fwrk.api', []);

categoriesModule.service('Api', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/api').then(function(categoryList) {
                return categoryList.data;
            });
        }
    };
});