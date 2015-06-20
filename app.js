/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="bower_components/codemirror/lib/codemirror.js" />



var foreachline = angular.module('foreachline', ['ngMaterial', 'ngRoute']);

foreachline.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
			templateUrl: 'play.html',
			controller: 'AppCtrl'
		}).
			when('/intro', {
			templateUrl: 'intro.html',
			controller: 'AppCtrl'
		}).
			when('/offline', {
			templateUrl: 'offline.html',
			controller: 'AppCtrl'
		}).when('/snippets', {
			templateUrl: 'snippets.html',
			controller: 'AppCtrl'
		}).
			otherwise({
			redirectTo: '/intro'
		});
	}
]);



var AppCtrl = foreachline.controller('AppCtrl', function ($scope, $mdDialog) {
	$scope.getOutput = function (ev) {
		//logic to result
		var source = window.sourceCodeMirror.getValue();
		var logic = window.logicCodeMirror.getValue();
		var lines = source.split('\n');
		if (document.getElementById('hack'))
			document.getElementById('tempScriptDiv').removeChild(document.getElementById('hack'));
		var script = document.createElement('script');
		script.setAttribute('id', 'hack');
		script.setAttribute('type', 'text/javascript');
		script.text = 'function transformLine(line , lineNumber){' + logic + ' return line; }';
		document.getElementById('tempScriptDiv').appendChild(script);
		var finalResult = [];
		for (var i = 0; i < lines.length; i++) {
			finalResult.push(transformLine(lines[i], i + 1));
		}
		var result = finalResult.reduce(function (p, c, i, arr) {
			return p + "\n" + c;
		});
		window.resultCodeMirror.setValue(result);
	};
});

function DialogController($scope, $mdDialog) {
	$scope.hide = function () {
		$mdDialog.hide();
	};
	$scope.cancel = function () {
		$mdDialog.cancel();
	};
	$scope.answer = function (answer) {
		$mdDialog.hide(answer);
	};
}