
var positionsModule = angular.module('fwrk.positions', []);

positionsModule.service('Positions', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/positions').then(function(positionList) {
                return positionList.data;
            });
        },
        add: function(newPosition) {
            console.log("newPosition:");
            console.log(newPosition);
            return $http({
                method: 'post',
                url: '/api/positions',
                data: newPosition
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the position!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPosition) {
            return $http({
                method: 'post',
                url: '/api/delete_position',
                data: newPosition
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the position!');
                console.error(err);
                return err;
            });
        },
        update: function(newPosition) {
            return $http({
                method: 'post',
                url: '/api/editposition',
                data: newPosition
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the position!');
                console.error(err);
                return err;
            });

        },
        getcategories: function() {
        console.log( "in the position getcategories");

        return $http.get('/api/getcategories').then(function(categories) {
                console.log(categories);
                // return false;
                return categories.data;
            }).catch(function(err) {
                console.error('Something went wrong getting categories!');
                console.error(err);
                return err;
            });;


            // return $http({
            //     method: 'post',
            //     url: '/api/getcategories',
            //     data: parmal
            // }).then(function(res) {
            //     console.log(res.data);
            //     // return the new post
            //     return res.data;
            // }).catch(function(err) {
            //     console.error('Something went wrong adding the position!');
            //     console.error(err);
            //     return err;
            // });
        },
        sigledata: function(id) {

console.log( "in the position singledata");
console.log(id);
// return false;

            return $http({
                method: 'post',
                url: '/api/get_position',
                data: id
            }).then(function(res) {
                console.log("AAAAAAA");
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the position!');
                console.error(err);
                return err;
            });
        }
    };
});