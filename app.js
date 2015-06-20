/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="bower_components/codemirror/lib/codemirror.js" />



var foreachline = angular.module('foreachline', ['ngMaterial', 'ngRoute', 'ui.codemirror']);

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
			controller: 'SnippetCtrl'
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


var SnippetCtrl = foreachline.controller('SnippetCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.snippetsArray = [];
	$scope.setCodeMirror = function (data) {
		CodeMirror.fromTextArea(document.getElementById(data), { lineNumbers: true, lineWrapping: true, mode: 'javascript', readOnly: false });
	};
	var addAuthorAndDescription = function (content, author, description) {
		var firstLine = '//Written by ' + author;
		var secondLine = '//' + description;
		return firstLine + '\r\n' + secondLine + '\r\n' + content;
	};
	$http.get('snippets.json').success(function (data) {
		data.forEach(function (ele) {
			var eleArr = ele.gist_link.split('/');
			var id = eleArr[eleArr.length - 1];
			$http.get("https://api.github.com/gists/" + id).success(function (gist_data) {
				var filename = '', filecontent = '';
				for (var file in gist_data.files) {
					filename = gist_data.files[file].filename;
					filecontent = gist_data.files[file].content;
					break;
				}
				$scope.snippetsArray.push({
					gist_url: gist_data.url,
					gist_description: gist_data.description,
					gist_filename: filename,
					gist_content: addAuthorAndDescription(filecontent, gist_data.owner.login, gist_data.description),
					gist_avatar: gist_data.owner.avatar_url
				});
			});
		});
	})
		.error(function () {
		console.log('error in fetching');
	});
}]);

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