var categoriesModule = angular.module('fwrk.categories', []);
categoriesModule.service('Categories', function($http) {
// console.log($http);

    return {
        all: function() {
            return $http.get('/api/categories').then(function(categoryList) {
                return categoryList.data;
            });
        },
        // upload_file: function(uploadData) {
        //     console.log("uploadData in module:");
        //     console.log(uploadData);
        //     return $http({
        //         method: 'post',
        //         url: '/api/categories_upload',
        //         headers: { 'Content-Type': undefined },
        //         transformRequest: function (data) {
        //             var formData = new FormData();
        //             formData.append('model', angular.toJson(data.model));
        //             formData.append('file', data.files[0]);
        //             return formData;
        //         },
        //         data: { model: { title: 'hello'}, files: $scope.files }
        //     }).then(function(res) {
        //         // return the new post
        //         return res.data;
        //     }).catch(function(err) {
        //         console.error('Something went wrong adding the post!');
        //         console.error(err);
        //         return err;
        //     });
        // },

        onFileSelect : function(image, id) {

            if (angular.isArray(image)) {
            	console.log(image[0]);
                image = image[0];
            }

            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            fd.append("_id", id);

            // This is how I handle file types in client side
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }


            // return $http.upload({
            return $http({
                method: 'post',
                url: '/api/categories1',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                console.log("uploaded file name : ");
                console.log(res);
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },



        add: function(newCategory) {
//             console.log("newCategory in module:");
//             console.log(newCategory);
//             console.log(newCategory.image);
// console.log("form data : ");
// console.log(fd);

            return $http({
                method: 'post',
                url: '/api/categories',
                data: newCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(newCategory) {
            return $http({
                method: 'post',
                url: '/api/delete_category',
                data: newCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        update: function(newCategory) {
            return $http({
                method: 'post',
                url: '/api/editparmalcat',
                data: newCategory
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        sigledata: function(parmal) {

console.log( "in the category singledata");
console.log(parmal);
// return false;

            return $http({
                method: 'post',
                url: '/api/parmalcat',
                data: parmal
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