/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
app.controller('MainCtrl', function($scope, Portfolios, $timeout, $interval, $window, Users, $location) {
    //$scope.myDate = new Date();
    //$scope.isOpen = false;
    Portfolios.all().then(function(res) {
        if (res == null) {
            // console.log(res);
        } else {
            $scope.portfolio = {};
            $scope.portfolio = res;
            // console.log(res);                  
        }
    });
    $timeout(function() {
        $(".regular").slick({
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4
        });
        $("#datepicker").datepicker({
            dateFormat: 'mm/dd/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-100y:c+nn',
            maxDate: '-1d'
        });
        $('#logmchk').on("click", function() {
            $('#myModalsigup').modal('hide');
            $('#myModal').modal('show');
        })
        $('#signmchk').on("click", function() {
            $('#myModal').modal('hide');
            $('#myModalsigup').modal('show');
        })
        $('#forgetchk').on("click", function() {
            $('#myModal').modal('hide');
            $('#frget').modal('show');
        })
    }, 1000);
    $scope.user = {};
    $scope.login = function() {
        //console.log(this.user);
        Users.login(this.user).then(function(res) {
            console.log("checking login..");
            // console.log(res);
            if (res.data == "Unauthorized") {
                $scope.message = "Wrong email and password!";
            } else {
                $scope.message = "You have successfully logedIn";
                $window.localStorage['email'] = JSON.stringify(res.email);
                $window.localStorage['firstname'] = JSON.stringify(res.firstname);
                $window.localStorage['lastname'] = JSON.stringify(res.lastname);
                var myprofile = function() {
                    $window.location.reload();
                };
                $timeout(myprofile, 1000);
                //console.log("here1");
            }
        });
    }
    $scope.message = false;
    $scope.signup = function() {
        this.user.dob = $('#datepicker').val();
        // console.log(this.user);
        if (this.user.password != this.user.cpassword) {
            $scope.message = "Incorrect confirm password";
            return;
        }
        Users.homeadd(this.user).then(function(res) {
            if (res) {
                $scope.message = res;
                // console.log(res);
            } else {
                $scope.message = res;
                //console.log(res);
            }
        });
    }
}).controller('ProfileCtrl', function($scope, Users) {
    
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("overlay1").style.display = "block";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("overlay1").style.display = "none";
    }


}) .controller('BlogCtrl', function($scope, $timeout) {
            $timeout(function() {
                $(".filter-button").click(function() {
                    var value = $(this).attr('data-filter');

                    if (value == "all")
                    {
                        $('.filter').show('1000');
                    }
                    else
                    {
                        $(".filter").not('.' + value).hide('3000');
                        $('.filter').filter('.' + value).show('3000');

                    }
                });

                if ($(".filter-button").removeClass("active")) {
                    $(this).removeClass("active");
                }
                $(this).addClass("active");

            }, 1000);
            $scope.openNav = function() {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("overlay1").style.display = "block";
            }

            $scope.closeNav = function() {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("overlay1").style.display = "none";
            }

        }).controller('PagesCtrl', function($scope) {
          
            $scope.openNav = function() {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("overlay1").style.display = "block";
            }

            $scope.closeNav = function() {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("overlay1").style.display = "none";
            }

        })

    