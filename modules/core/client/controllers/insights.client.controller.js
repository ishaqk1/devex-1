(function () {
  'use strict';

  angular
    .module('core')
    .controller('InsightsController', InsightsController);

  InsightsController.$inject = ['$scope', '$location', '$translate', 'AdminService', 'ProgramsService', 'ProjectsService', 'OpportunitiesService'];

  function InsightsController($scope, $location, $translate, AdminService, ProgramsService, ProjectsService, OpportunitiesService) {
    $scope.isEnglish = function() {
        return ($translate.use() === 'en');
    };
    $scope.isFrench = function() {
        return ($translate.use() === 'fr');
    };

    var lang = (($location.path).indexOf("/fr") >= 0) ? 'fr' : 'en';
    var usersTitle = (lang === 'fr') ? 'Membres inscrits' : 'Registered Members';
    var programsTitle = (lang === 'fr') ? 'Équipes créées' : 'Teams Created';
    var projectsTitle = (lang === 'fr') ? 'Projets créées' : 'Projects Created';
    var opportunitiesTitle = (lang === 'fr') ? 'Opportunités créées' : 'Opportunities Created';

    AdminService.registrations(function (data) {
    	var userData = data;
    	var chart = Highcharts.charts[0];
    	var users = [];
    	var usersCount = 0;
    	$.each(userData.reverse(), function(key, value) {
	        usersCount += 1;
	        var thisDate = new Date(value.created);
	        users.push([thisDate.getTime(), usersCount]);
	    });
	    chart.series[0].setData(users);
	    chart.series[0].update({name: usersTitle + ' (' + usersCount + ')'}, false);
	    chart.redraw();
    });
    /*
    ProgramsService.query(function (data) {
    	$scope.programs = data;
    	var programData = data;
    	var chart = Highcharts.charts[0];
    	var programs = [];
    	var programsCount = 0;
    	$.each(programData.reverse(), function(key, value) {
	        programsCount += 1;
	        var thisDate = new Date(value.created);
	        programs.push([thisDate.getTime(), programsCount]);
	    });
	    chart.series[1].setData(programs);
	    chart.series[1].update({name: programsTitle + ' (' + programsCount + ')'}, false);
	    chart.redraw();
    });
    ProjectsService.query(function (data) {
    	$scope.projects = data;
    	var projectData = data;
    	var chart = Highcharts.charts[0];
    	var projects = [];
    	var projectsCount = 0;
    	$.each(projectData.reverse(), function(key, value) {
	        projectsCount += 1;
	        var thisDate = new Date(value.created);
	        projects.push([thisDate.getTime(), projectsCount]);
	    });
	    chart.series[2].setData(projects);
	    chart.series[2].update({name: projectsTitle + ' (' + projectsCount + ')'}, false);
	    chart.redraw();
    });
    */
    OpportunitiesService.query(function (data) {
    	var opportunitiesData = data;
    	var chart = Highcharts.charts[0];
    	var opportunities = [];
    	var opportunitiesCount = 0;
    	$.each(opportunitiesData.reverse(), function(key, value) {
	        opportunitiesCount += 1;
	        var thisDate = new Date(value.created);
	        opportunities.push([thisDate.getTime(), opportunitiesCount]);
	    });
	    chart.series[1].setData(opportunities);
	    chart.series[1].update({name: opportunitiesTitle + ' (' + opportunitiesCount + ')'}, false);
	    chart.redraw();
    });

    Date.prototype.niceDate = function() {
        if (lang === 'fr') {
            var months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            var mm = this.getMonth();
            var dd = this.getDate();
            var yy = this.getFullYear();
            return dd + ' ' + months[mm] + ' ' + yy;
        } else {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var mm = this.getMonth();
            var dd = this.getDate();
            var yy = this.getFullYear();
            return months[mm] + ' ' + dd + ', ' + yy;
        }
    };

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function SortRegistrations(a, b){
        return (a[0] - b[0]);
    }

    if (lang === 'fr') {
        Highcharts.setOptions({
            lang: {
                months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                shortMonths: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sept', 'Oct', 'Nov', 'Déc'],
                decimalPoint: ',',
                thousandsSep: ' ',
                downloadPNG: 'Télécharger en image PNG',
                downloadJPEG: 'Télécharger en image JPEG',
                downloadPDF: 'Télécharger en document PDF',
                downloadSVG: 'Télécharger en document Vectoriel',
                exportButtonTitle: 'Export du graphique',
                loading: 'Chargement en cours...',
                printButtonTitle: 'Imprimer le graphique',
                resetZoom: 'Réinitialiser le zoom',
                resetZoomTitle: 'Réinitialiser le zoom au niveau 1:1',
                printChart: 'Imprimer le graphique',
                downloadCSV: 'Télécharger en CSV',
                downloadXLS: 'Télécharger en XLS',
                viewData: 'Afficher la table des données'
            }
        });
    }

    var title = (lang === 'fr') ? 'Ligne du temps' : 'Timeline';
    var amount = (lang === 'fr') ? 'Quantité' : 'Amount';
    var zoom = (lang === 'fr') ? 'Cliquez et glissez pour faire un zoom avant' : 'Click and drag to zoom in';
    var pinch = (lang === 'fr') ? 'Pincer le graphique pour le zoomer' : 'Pinch the chart to zoom in';
    Highcharts.chart('timeline', {
        chart: {
            zoomType: 'x',
            resetZoomButton: {
                position: {
                    align: 'left',
                    x: 10
                },
                relativeTo: 'chart'
            }
        },
        title: {
            text: title
        },
        subtitle: {
            text: document.ontouchstart === undefined ? zoom : pinch
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: amount
            },
            min: 0
        },
        legend: {
            enabled: true
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        tooltip: {
            formatter: function() {
                var text = '';
                if (this.series.userOptions.id === 'users') {
                    text = '<b>' + usersTitle + ':</b> ' + this.y;
                } else if (this.series.userOptions.id === 'programs') {
                    text = '<b>' + programsTitle + ':</b> ' + this.y;
                } else if (this.series.userOptions.id === 'projects') {
                    text = '<b>' + projectsTitle + ':</b> ' + this.y;
                } else if (this.series.userOptions.id === 'opportunities') {
                    text = '<b>' + opportunitiesTitle + '</b> ' + this.y;
                }
                return text;
            }
        },
        series: [{
            type: 'area',
            id: 'users'
        },
        // {
        //     type: 'area',
        //     id: 'programs'
        // },
        // {
        //     type: 'area',
        //     id: 'projects'
        // },
        {
            type: 'area',
            id: 'opportunities'
        }]
    });
  }
}());
