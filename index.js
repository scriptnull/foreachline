#! /usr/bin/env node
/// <reference path="typings/node/node.d.ts"/>

var fs = require('fs');
var path = require('path');

var src =process.argv[2];
var js = process.argv[3];
var tempJsTemplate = path.join(__dirname, 'temp.js');
var tempJs = path.join(__dirname, 'realtemp.js');

if (src && js) {
	fs.readFile(src, { encoding: 'utf8' }, function (err, srcData) {
		if (!err) {
			fs.readFile(js, { encoding: 'utf8' }, function (err, jsData) {
				if (!err) {
					fs.readFile(tempJsTemplate, { encoding: 'utf8' }, function (err, tempData) {
						if (!err) {
							var funcData = tempData.replace("//line", jsData);
							fs.writeFile(tempJs, funcData, function (err) {
								if (!err) {
									var lines = srcData.split('\r\n');
									for (var i = 0; i < lines.length; i++) {
										console.log("Processing line : " + (i + 1 ));
										lines[i] = require(tempJs)(lines[i], i + 1);
									}
									var newLines = lines.reduce(function (previous, current, index, arr) {
										return previous + "\r\n" + current;
									});
									fs.writeFile(src, newLines, function (err) {
										if(err)
											console.log(err);
										else 
											console.log('Completed');
									});
								} else {
									console.log(err);
								}
							});
						} else {
							console.error(err);
						}
					});
				} else {
					console.error(err);
				}
			});
		} else {
			console.error(err);
		}
	});
}
else {
	console.error("Please specify the " + (src ? (js ? "" : "JS File") : (js ? "" : "Data and  JS Files")));
}
