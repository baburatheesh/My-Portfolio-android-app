angular.module('starter', ['ionic','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('intro', {
  url: '/intro',
  templateUrl: 'templates/intro.html'
  })
  .state('tabs', {
  url: '/tab',
  abstract: true,
  templateUrl: 'templates/tab.html'
  })
  .state('tabs.home', {
    url: '/home',
    views: {
      'tab-menu': {
        templateUrl: 'templates/home.html',
        controller:'HomeCtrl'

      }
    }
  })
  .state('tabs.works', {
    url: '/works',
    views: {
      'tab-menu': {
        templateUrl: 'templates/works.html',
        controller:'WorksCtrl'

      }
    }
  })
  .state('tabs.details', {
    url: '/works/:aId',
    views: {
      'tab-menu': {
        templateUrl: 'templates/works-details.html',
        controller:'WorksCtrl'

      }
    }
  })
  .state('tabs.contact', {
    url: '/contact',
    views: {
      'tab-menu': {
        templateUrl: 'templates/contact.html',
        controller:'ContactCtrl'

      }
    }
  })
  $urlRouterProvider.otherwise('/intro');
})

.controller('HomeCtrl', function($scope) {
  
})

 .controller('ContactCtrl', ['$scope', '$http',  function($scope, $http) {

        $scope.sendContact = function() {

            var data = {
                name: this.contact.name,
                email: this.contact.email,
                message: this.contact.message
            };

            console.log(data);

            $http.post("http://192.168.1.189/app_dev.php/api/contact/", data);

        }

    }])
// Add a controller
.controller( 'WorksCtrl', ['$scope', '$http', '$state', function( $scope, $http, $state ) {
 // Load posts from the WordPress API
 $http({
 method: 'GET',
 url: 'http://baburatheesh.in/wp-json/posts/?filter[portfolio]=shows',
 params: {
 'filter[posts_per_page]' : 10
 },
 }).
 success( function( data, status, headers, config ) {
 // console.log( $scope.api );
 // console.log( data );
 $scope.posts = data;
   $scope.doRefresh = function() {
    $http.get('http://baburatheesh.in/wp-json/posts/?filter[portfolio]=shows')
     .success(function(data) {
       $scope.posts = data;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
 $scope.whichartist = $state.params.aId;
 }).
 error(function(data, status, headers, config) {

 });


}]);

