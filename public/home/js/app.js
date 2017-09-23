
var app = angular.module('fwrk.home', [
	'ui.router',
        'fwrk.posts',
        // 'fwrk.categories',		
        'fwrk.pages',
        'fwrk.portfolios',
        'fwrk.users'
//        'ngMessages',
//        'ngMaterial'
])
.factory('Page', function() {//now this is not working 
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
})
.controller('TitleCtrl', function($scope, Page) {
    $scope.Page = Page;
})

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "/home/templates/myprofile.html",
			controller: 'ProfileCtrl'
		})             
                .state('post', {
			url: "/*",
			templateUrl: "/home/templates/post.html",
			controller: 'PostCtrl'
		})
                .state('edit', {
			url: "/edit",
			templateUrl: "/home/templates/edit.html",
			controller: 'ProfileCtrl'
		}) ; 
//                .state('pages', {
//			url: "/pages/*",
//			templateUrl: "/home/templates/4.html",
//			controller: 'PagesCtrl'
//		})
//                 .state('faq', {
//			url: "/pages/faq",
//			templateUrl: "/home/templates/faq.html",
//			controller: 'PagesCtrl'
//		});

	$urlRouterProvider.otherwise("/");
});