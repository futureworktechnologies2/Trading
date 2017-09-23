
var adminApp = angular.module('fwrk.admin', [
	'ui.router',
	'btford.markdown',
	'fwrk.posts',
	'fwrk.categories',
	'fwrk.inventories',
	'fwrk.stocks',
	'fwrk.clubs',
	'fwrk.positions',
	'fwrk.pages',
	'fwrk.players',
	'fwrk.orders',
    'fwrk.users'
]).config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('allPosts', {
			url: '/allPosts',
			templateUrl: '/admin/templates/allPosts.html',
			resolve: {
				postList: function(Posts){
					return Posts.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'AllPostsCtrl'
		})
		.state('addPost', {
			url: '/addPost',
			templateUrl: '/admin/templates/addPost.html',
			controller: 'AddPostCtrl'
		})
		.state('addCategory', {
			url: '/addCategory',
			templateUrl: '/admin/templates/addCategory.html',
			controller: 'AddCategoryCtrl'
		})
        .state('categoryList', {
			url: '/categoryList',
			templateUrl: '/admin/templates/categoryList.html',
                        resolve: {
				categoryList: function(Categories){
					return Categories.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'categoryListCtrl'
		})
	.state('addStock', {
			url: '/addStock',
			templateUrl: '/admin/templates/addStock.html',
			controller: 'AddStockCtrl'
		})
    .state('stockList', {
			url: '/stockList',
			templateUrl: '/admin/templates/stockList.html',
            resolve: {
						stockList: function(Stocks){
							return Stocks.all().then(function(data){
							return data;
						});
						}
					},
			controller: 'stockListCtrl'
		})
    .state('editStock', {
                url: '/editStock/:id',
                templateUrl: '/admin/templates/editStock.html',
                controller: 'EditStocksCtrl'
		})
	.state('addClub', {
			url: '/addClub',
			templateUrl: '/admin/templates/addClub.html',
			controller: 'AddClubCtrl'
		})
    .state('clubList', {
			url: '/clubList',
			templateUrl: '/admin/templates/clubList.html',
                        resolve: {
				clubList: function(Clubs){
					return Clubs.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'clubListCtrl'
		})
    .state('editClub', {
                url: '/editClub/:id',
                templateUrl: '/admin/templates/editClub.html',
                controller: 'EditClubsCtrl'
		})
	.state('addPosition', {
			url: '/addPosition',
			templateUrl: '/admin/templates/addPosition.html',
			controller: 'AddPositionCtrl'
		})
    .state('positionList', {
			url: '/positionList',
			templateUrl: '/admin/templates/positionList.html',
                        resolve: {
				positionList: function(Positions){
					return Positions.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'positionListCtrl'
		})
    .state('editPosition', {
                url: '/editPosition/:id',
                templateUrl: '/admin/templates/editPosition.html',
                controller: 'EditPositionsCtrl'
		}) 
	.state('addPage', {
			url: '/addPage',
			templateUrl: '/admin/templates/addPage.html',
			controller: 'AddPageCtrl'
		})
    .state('pageList', {
			url: '/pageList',
			templateUrl: '/admin/templates/pageList.html',
                        resolve: {
				pageList: function(Pages){
					return Pages.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'pageListCtrl'
		})
    .state('editPage', {
                url: '/editPage/:id',
                templateUrl: '/admin/templates/editPage.html',
                controller: 'EditPagesCtrl'
		})   
	.state('addPlayer', {
			url: '/addPlayer',
			templateUrl: '/admin/templates/addPlayer.html',
			controller: 'AddPlayerCtrl'
		})
    .state('playerList', {
			url: '/playerList',
			templateUrl: '/admin/templates/playerList.html',
                        resolve: {
				playerList: function(Players){
					return Players.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'playerListCtrl'
		})
    .state('editPlayer', {
                url: '/editPlayer/:id',
                templateUrl: '/admin/templates/editPlayer.html',
                controller: 'EditPlayersCtrl'
		})    
        .state('addUser', {
			url: '/addUser',
			templateUrl: '/admin/templates/addUser.html',
			controller: 'AddUserCtrl'
		})

		.state('singleUserView', {
			url: '/singleUserView/:id',
			templateUrl: '/admin/templates/singleUserView.html',
			controller: 'singleUserViewCtrl'
		})

        .state('userList', {
			url: '/userList',
			templateUrl: '/admin/templates/userList.html',
                        resolve: {
				userList: function(Users){
					return Users.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'userListCtrl'
		})
	.state('addInventory', {
			url: '/addInventory',
			templateUrl: '/admin/templates/addInventory.html',
			controller: 'AddInventoryCtrl'
		})
    .state('inventoryList', {
			url: '/inventoryList',
			templateUrl: '/admin/templates/inventoryList.html',
                        resolve: {
				inventoryList: function(Inventories){
					return Inventories.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'inventoryListCtrl'
		})
    .state('editInventory', {
                url: '/editInventory/:id',
                templateUrl: '/admin/templates/editInventory.html',
                controller: 'EditInventoriesCtrl'
		})
.state('profile', {
			url: '/profile',
			templateUrl: '/admin/templates/profileUser.html',
			controller: 'profileCtrl'
		})
                 .state('dashboard', {
			url: '/',
			templateUrl: '/admin/templates/admin_index.html',
			controller: 'dashboardCtrl'
		}) 
                .state('editPost', {
                url: '/editPost/:paraml',
                templateUrl: '/admin/templates/editPost.html',
                controller: 'EditPostsCtrl'
		}) 
                .state('editCategory', {
                url: '/editCategory/:id',
                templateUrl: '/admin/templates/editCategory.html',
                controller: 'EditCategoriesCtrl'
		})
                .state('editUser', {
			url: '/editUser/:id',
			templateUrl: '/admin/templates/editUser.html',
			controller: 'EditUsersCtrl'
		});
                
                
}).directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);