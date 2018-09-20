"use strict";
exports.__esModule = true;
var operations_enum_1 = require("../enums/operations.enum");
var CountingMachine = /** @class */ (function () {
    function CountingMachine(divisionPrecision) {
        this.divisionPrecision = divisionPrecision;
    }
    CountingMachine.prototype.add = function () {
        return this.firstNumber + this.secondNumber;
    };
    CountingMachine.prototype.substract = function () {
        return this.firstNumber - this.secondNumber;
    };
    CountingMachine.prototype.multiply = function () {
        return this.firstNumber * this.secondNumber;
    };
    CountingMachine.prototype.divide = function () {
        if (this.firstNumber === 0)
            throw new Error("can't divide by 0");
        return parseFloat((this.firstNumber / this.secondNumber).toFixed(this.divisionPrecision));
    };
    CountingMachine.prototype.calculate = function () {
        switch (this.operator) {
            case operations_enum_1.operations.sum:
                this.result = this.add();
                break;
            case operations_enum_1.operations.substraction:
                this.result = this.substract();
                break;
            case operations_enum_1.operations.multiplication:
                this.result = this.multiply();
                break;
            case operations_enum_1.operations.division:
                this.result = this.divide();
                break;
            default:
                throw new Error("Unknown operation " + this.operator);
        }
    };
    CountingMachine.prototype.setFirstNumber = function (input) {
        if (input === 'ans') {
            if (this.result === undefined) {
                console.log('There is no previous result to be used');
                return false;
            }
            this.firstNumber = this.result;
            return true;
        }
        var inputNumber = parseFloat(input);
        if (!isNaN(inputNumber)) {
            this.firstNumber = inputNumber;
            return true;
        }
        else {
            return false;
        }
    };
    CountingMachine.prototype.setSecondNumber = function (input) {
        if (input === 'ans') {
            if (this.result === undefined) {
                console.log('There is no previous result to be used');
                return false;
            }
            this.secondNumber = this.result;
            return true;
        }
        var inputNumber = parseFloat(input);
        if (!isNaN(inputNumber)) {
            this.secondNumber = inputNumber;
            return true;
        }
        else {
            return false;
        }
    };
    CountingMachine.prototype.setOperator = function (input) {
        if (Object.values(operations_enum_1.operations).includes(input)) {
            this.operator = input;
            return true;
        }
        else {
            return false;
        }
    };
    return CountingMachine;
}());
exports.CountingMachine = CountingMachine;
