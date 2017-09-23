
var stocksModule = angular.module('fwrk.stocks', []);

stocksModule.service('Stocks', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/stocks').then(function(stockList) {
                return stockList.data;
            });
        },
        add: function(newStock) {
            console.log("newStock:");
            console.log(newStock);
            return $http({
                method: 'post',
                url: '/api/stocks',
                data: newStock
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the stock!');
                console.error(err);
                return err;
            });
        },
        remove: function(newStock) {
            return $http({
                method: 'post',
                url: '/api/delete_stock',
                data: newStock
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the stock!');
                console.error(err);
                return err;
            });
        },
        update: function(newStock) {
            return $http({
                method: 'post',
                url: '/api/editstock',
                data: newStock
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the stock!');
                console.error(err);
                return err;
            });

        },
        getcategories: function() {
        console.log( "in the stock getcategories");

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
            //     console.error('Something went wrong adding the stock!');
            //     console.error(err);
            //     return err;
            // });
        },
        sigledata: function(parmal) {

console.log( "in the stock singledata");
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
                console.error('Something went wrong adding the stock!');
                console.error(err);
                return err;
            });
        }
    };
});