
var ordersModule = angular.module('fwrk.orders', []);

ordersModule.service('Orders', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/orders').then(function(orderList) {
                return orderList.data;
            });
        },
        add: function(newOrder) {
            console.log("newOrder:");
            console.log(newOrder);
            return $http({
                method: 'post',
                url: '/api/orders',
                data: newOrder
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the order!');
                console.error(err);
                return err;
            });
        },
        remove: function(newOrder) {
            return $http({
                method: 'post',
                url: '/api/delete_order',
                data: newOrder
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the order!');
                console.error(err);
                return err;
            });
        },
        update: function(newOrder) {
            return $http({
                method: 'post',
                url: '/api/editorder',
                data: newOrder
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the order!');
                console.error(err);
                return err;
            });

        },
        getcategories: function() {
        console.log( "in the order getcategories");

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
            //     console.error('Something went wrong adding the order!');
            //     console.error(err);
            //     return err;
            // });
        },
        sigledata: function(parmal) {

console.log( "in the order singledata");
console.log(parmal);
// return false;

            return $http({
                method: 'post',
                url: '/api/parmalcat1',
                data: parmal
            }).then(function(res) {
                console.log("AAAAAAA");
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the order!');
                console.error(err);
                return err;
            });
        }
    };
});