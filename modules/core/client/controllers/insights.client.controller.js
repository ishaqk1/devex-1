(function () {
  'use strict';

  angular
    .module('core')
    .controller('InsightsController', InsightsController);

  InsightsController.$inject = ['$scope', '$translate', 'AdminService', 'ProgramsService', 'ProjectsService', 'OpportunitiesService'];

  function InsightsController($scope, $translate, AdminService, ProgramsService, ProjectsService, OpportunitiesService) {
    $scope.isEnglish = function() {
        return ($translate.use() === 'en');
    };
    $scope.isFrench = function() {
        return ($translate.use() === 'fr');
    };

    Highcharts.chart('chart', {
      title: {
        text: 'Temperature Data'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
      },
      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    });

    AdminService.query(function (data) {
      $scope.users = data;
    });
    $scope.programs = ProgramsService.query();
    $scope.projects = ProjectsService.query();
    $scope.opportunities = OpportunitiesService.query();
  }
}());
