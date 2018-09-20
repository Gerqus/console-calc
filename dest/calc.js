"use strict";
exports.__esModule = true;
var yargs_1 = require("yargs");
var CountingMachine_class_1 = require("./classes/CountingMachine.class");
var communication_class_1 = require("./classes/communication.class");
var operationsStack = yargs_1.argv._;
var countingMachine = new CountingMachine_class_1.CountingMachine(2);
var communication = new communication_class_1.Communication();
function askForFirstNumber() {
    return new Promise(function (resolve) {
        communication.prompt("Please provide first number (ans = previous result)", function (input) {
            if (!countingMachine.setFirstNumber(input))
                resolve(askForFirstNumber());
            else
                resolve();
        });
    });
}
function askForOperator() {
    return new Promise(function (resolve) {
        communication.prompt("Please provide operator", function (input) {
            if (!countingMachine.setOperator(input))
                resolve(askForOperator());
            else
                resolve();
        });
    });
}
function askForSecondNumber() {
    return new Promise(function (resolve) {
        communication.prompt("Please provide second number (ans = previous result)", function (input) {
            if (!countingMachine.setSecondNumber(input))
                resolve(askForSecondNumber());
            else
                resolve();
        });
    });
}
function askIfContinue() {
    return new Promise(function (resolve) {
        communication.prompt('Should I calculate another equation? [y/n]', function (input) {
            if (input === 'y')
                resolve(true);
            else if (input === 'n')
                resolve(false);
            else
                resolve(askIfContinue());
        });
    });
}
function startCycle() {
    Promise.resolve()
        .then(askForFirstNumber)
        .then(askForOperator)
        .then(askForSecondNumber)
        .then(function () { return countingMachine.calculate(); })
        .then(function () { return console.log('Result is:', countingMachine.result); })
        .then(askIfContinue)
        .then(function (shouldContinue) {
        if (shouldContinue)
            setTimeout(startCycle, 0);
    })["catch"](function (err) { return console.log('Error occured:', err); });
}
startCycle();
