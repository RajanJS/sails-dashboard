var app = angular.module('dashboard', ['chart.js']);

app.controller('main', ['$scope', '$http',
  function($scope, $http) {
    $scope.loading = true;
    $scope.charts = [];

    $http({
      method: 'GET',
      url: 'http://localhost:1337/event/find'
    }).then(
      function success(response) {
        console.log(response);
        buildDoughutChart(response.data, 'os', 'Visitor Os distribution');
        buildDoughutChart(response.data, 'browser', 'Visitor Os distribution');
        console.log(response);
        $scope.loading = false;
      }, function failure(error) {
        console.log(error);
      }
    );

    function buildDoughutChart(events, property, title) {
      var prop,
        temp = {},
        data = {
          title: title,
          type: 'doughnut',
          labels: [],
          data: []
        };

      events.forEach(function(event) {
        // build up labels array
        if (data.labels.indexOf(event[property]) === -1) {
          data.labels.push(event[property]);
        }

        //build object to contain counts
        if (!temp[event[property]]) {
          temp[event[property]] = {
            count: 0
          };
        }
        temp[event[property]].count += 1;
      });

      for (prop in temp) {
        data.data.push(temp[prop].count);
      }

      $scope.charts.push(data);
      console.log(data);
    }
  }
]);
