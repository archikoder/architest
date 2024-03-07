#!/usr/bin/env node

const spawn = require('child_process').spawn;

const path = require('path');
const { ShellArgument } = require("./ShellArgument");
const { CommandParameters } = require("./CommandParameters");

const shellArguments = new ShellArgument(process.argv);
const commandParameters = new CommandParameters(shellArguments, path.join(__dirname));

const shellCommand = spawn("tsx", commandParameters.asArray());

shellCommand.stdout.on('data', function (data) {
  process.stdout.write(data);
});

shellCommand.stderr.on('data', function (data) {
  process.stdout.write(data);
});
