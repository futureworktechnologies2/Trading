
var inventoriesModule = angular.module('fwrk.inventories', []);

inventoriesModule.service('Inventories', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/inventories').then(function(inventoryList) {
                return inventoryList.data;
            });
        },
        add: function(newInventory) {
            console.log("newInventory:");
            return $http({
                method: 'post',
                url: '/api/inventories',
                data: newInventory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newInventory) {
            return $http({
                method: 'post',
                url: '/api/delete',
                data: newInventory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        update: function(newInventory) {
            return $http({
                method: 'post',
                url: '/api/update_inventory',
                data: newInventory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        getplayers: function() {
        console.log( "in the stock getplayers");
        return $http.get('/api/getplayers').then(function(players) {
                console.log(players);
                // return false;
                return players.data;
            }).catch(function(err) {
                console.error('Something went wrong getting players!');
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
            });
        },
        getstocks: function() {
        console.log( "in the stock getstocks");
        return $http.get('/api/getstocks').then(function(stocks) {
                console.log(stocks);
                // return false;
                return stocks.data;
            }).catch(function(err) {
                console.error('Something went wrong getting stocks!');
                console.error(err);
                return err;
            });
        },        
        sigledata: function(id) {

console.log( "in the inventory singledata");
console.log(id);
// return false;

            return $http({
                method: 'post',
                url: '/api/get_inventory',
                data: id
            }).then(function(res) {
                console.log("AAAAAAA");
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        }
    };
});