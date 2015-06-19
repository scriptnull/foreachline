/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="bower_components/angular-ui-codemirror/ui-codemirror.min.js" />

var foreachline = angular.module('foreachline' , ['ngMaterial' , 'ngRoute' , 'ui.codemirror']);

foreachline.config([ '$routeProvider' , 
	function($routeProvider){
		$routeProvider
		.when('/' ,{
			templateUrl : 'play.html' ,
			controller : 'AppCtrl'			
		}). 
		when('/intro' , {
			templateUrl : 'intro.html' ,
			controller : 'AppCtrl'
		}).
		otherwise({
			redirectTo : '/'
		});
	}
]);

var AppCtrl = foreachline.controller('AppCtrl' , function($scope){
	$scope.getOutput = function(){
	
	};
});