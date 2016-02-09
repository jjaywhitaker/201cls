var app = angular.module('app', [])
.directive('avatar', avatarDirective);

app.controller('mainCtrl', mainCtrl);

function mainCtrl ($scope) {
  $scope.users = [{
    name: 'Jacob Whitaker',
    avatarUrl: 'https://scontent-lax3-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11150450_10205273456770459_1562044107978148925_n.jpg?oh=4b7b8015c66b96ba31150315af8af3ea&oe=573BFA6D',
  }];
  $scope.addNew = function (user) {
    $scope.users.push({
      name: user.name,
      avatarUrl: user.url,
    });
    user.name = '';
    user.url = '';
  };
}

function avatarDirective () {
  return {
    scope: {
      user: '=' /* [1] */
    },
    restrict: 'E', /* [2] */
    template: (
      '<div class="Avatar">' +
        '<img ng-src="{{user.avatarUrl}}" />' +
        '<h4>{{user.name}}</h4>' +
      '</div>'
    ), /* [3] */
    link: link
  };
  

  function link (scope) { /* [4] */
   
    if (!scope.user.avatarUrl) {
	scope.user.avatarUrl = 'https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg';          
    }
  }
}