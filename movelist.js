#!/usr/local/bin/node

var FileSystem = require('fs');
var CommandLineArgs = require('command-line-args');

const OptionDefinitions = [
	{name: 'verbose', alias: 'v', type: Boolean},
	{name: 'noop', alias: 'n', type: Boolean},
	{name: 'listoffiles', alias: 'l', type: String},
	{name: 'sourceprefix', alias: 's', type: String},
	{name: 'destinationdirectory', alias: 'd', type: String}
];
const Options = CommandLineArgs(OptionDefinitions);
if(Options.verbose == true) console.log('Options: ', Options);

if(Options.listoffiles != null){
	var FileText = FileSystem.readFileSync(Options.listoffiles, 'utf8');
	if(Options.verbose == true) console.log('FileText: ', FileText);
	var Lines = FileText.split(/\n|\r/);
	if(Options.verbose == true) console.log('Lines: ', Lines);
	if(Options.destinationdirectory != null){
		for(var i = 0; i < Lines.length; i++){
			if(Options.verbose == true) console.log(i);
			var oldpath = Options.sourceprefix + Lines[i];
			if(Options.verbose == true) console.log('oldpath: ', oldpath);
			var newpath = Options.destinationdirectory + Lines[i];
			if(Options.verbose == true) console.log('newpath: ', newpath);
			if(Options.noop != true){
				FileSystem.renameSync(oldpath, newpath);
			}
		}
	}
}
