    var app = angular.module('myApp', ['ui.bootstrap']);
    
    app.controller('MyController', function($http, $scope, $modal) {
        $scope.champs = [];
        $scope.champId = 0;

        $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=74ce19ed-2797-40e9-b267-2ebb8f01409a').success(function(data) {
            $scope.champs = data; 
        });
        
        $scope.open = function (id) {
            $scope.champId = id;
            
            var modalInstance = $modal.open({
              templateUrl: 'championContent.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                  id: function() {
                      return $scope.champId;
                  }
              }
            });
            return false;
        };
        
    });

    app.controller('ModalInstanceCtrl', function ($http, $scope, $modalInstance, id) {
        $scope.champId = id;
        $scope.champData = [];
        
        $http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+$scope.champId+'?champData=all&api_key=74ce19ed-2797-40e9-b267-2ebb8f01409a').success(function(data) {
            $scope.champData = data; 
        });
        
        $scope.close = function() {
            $modalInstance.close();
        };
    });

    
    app.directive('championTabs', function() {
        return {
            restrict: 'E',
            templateUrl: 'champion-tabs.html',
            link: function(scope, element, attr) {
                scope.tab = 1;

                scope.isSet = function(checkTab) {
                    return scope.tab === checkTab;
                };

                scope.setTab = function(activeTab) {
                    scope.tab = activeTab;
                };

            }
        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }]);
