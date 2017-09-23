
var pagesModule = angular.module('fwrk.pages', []);

pagesModule.service('Pages', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/pages').then(function(pageList) {
                return pageList.data;
            });
        },
        add: function(newPage) {
            console.log("newPage:");
            console.log(newPage);
            return $http({
                method: 'post',
                url: '/api/pages',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });
        },
        remove: function(newPage) {
            return $http({
                method: 'post',
                url: '/api/delete_page',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });
        },
        update: function(newPage) {
            return $http({
                method: 'post',
                url: '/api/editpage',
                data: newPage
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });

        },
        getcategories: function() {
        console.log( "in the page getcategories");

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
            //     console.error('Something went wrong adding the page!');
            //     console.error(err);
            //     return err;
            // });
        },
        sigledata: function(id) {

console.log( "in the page singledata");
console.log(id);
// return false;

            return $http({
                method: 'post',
                url: '/api/get_page',
                data: id
            }).then(function(res) {
                console.log("AAAAAAA");
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the page!');
                console.error(err);
                return err;
            });
        }
    };
});