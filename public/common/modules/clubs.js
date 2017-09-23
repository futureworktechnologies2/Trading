
var clubsModule = angular.module('fwrk.clubs', []);

clubsModule.service('Clubs', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/clubs').then(function(clubList) {
                return clubList.data;
            });
        },
        add: function(newClub) {
            console.log("newClub:");
            console.log(newClub);
            return $http({
                method: 'post',
                url: '/api/clubs',
                data: newClub
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the club!');
                console.error(err);
                return err;
            });
        },
        remove: function(newClub) {
            return $http({
                method: 'post',
                url: '/api/delete_club',
                data: newClub
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the club!');
                console.error(err);
                return err;
            });
        },
        update: function(newClub) {
            return $http({
                method: 'post',
                url: '/api/editclub',
                data: newClub
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the club!');
                console.error(err);
                return err;
            });

        },
        getcategories: function() {
        console.log( "in the club getcategories");

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
            //     console.error('Something went wrong adding the club!');
            //     console.error(err);
            //     return err;
            // });
        },
        sigledata: function(id) {

console.log( "in the club singledata");
console.log(id);
// return false;

            return $http({
                method: 'post',
                url: '/api/get_club',
                data: id
            }).then(function(res) {
                console.log("AAAAAAA");
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the club!');
                console.error(err);
                return err;
            });
        }
    };
});