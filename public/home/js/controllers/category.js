/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('CategoryCtrl', function($scope, Categories, $location) {
    console.log("home js controller CategoryCtrl");
    $scope.url = {};
    $scope.url.path = $location.absUrl().split('/')[3];
    Categories.sigledata($scope.url).then(function(res) {
        if (res == null) {
            window.location.href = '/404';
        } else {
            console.log("in the category controller start..");
            console.log(res);
            console.log("in the category controller end..");            
            $scope.description = res.description;
            $scope.image = 'himagehomejs';
            // $scope.himage = 'himagehomejs';
            // $scope.simage = 'simagehomejs';
            $scope.title = res.title;
        }
    });
});