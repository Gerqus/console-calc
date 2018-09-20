// ifaces
import { addition } from "../interfaces/addition.iface";
import { substraction } from "../interfaces/substraction.iface";
import { multiplication } from "../interfaces/multiplication.iface";
import { division } from "../interfaces/division.iface";
import { operations } from "../enums/operations.enum";

export class CountingMachine implements addition, substraction, multiplication, division {
    private divisionPrecision: number;
    private firstNumber: number;
    private secondNumber: number;
    private operator: string;
    result: number;

    constructor(divisionPrecision: number) {
        this.divisionPrecision = divisionPrecision;
    }

    add(): number {
        return this.firstNumber + this.secondNumber;
    }

    substract(): number {
        return this.firstNumber - this.secondNumber;
    }

    multiply(): number {
        return this.firstNumber * this.secondNumber;
    }

    divide(): number {
        if (this.secondNumber === 0) throw new Error("can't divide by 0");
        return parseFloat((this.firstNumber / this.secondNumber).toFixed(this.divisionPrecision));
    }

    calculate(): void {
        switch(this.operator) {
            case operations.sum:
                this.result = this.add();
                break;
            case operations.substraction:
                this.result = this.substract();
                break;
            case operations.multiplication:
                this.result = this.multiply();
                break;
            case operations.division:
                this.result = this.divide();
                break;
            default:
                throw new Error(`Unknown operation ${this.operator}`);
        }
    }

    setFirstNumber(input: string): boolean {
        if(input === 'ans') {
            if(this.result === undefined) {
                console.log('There is no previous result to be used');
                return false;
            }
            this.firstNumber = this.result;
            return true;
        }
        const inputNumber = parseFloat(input);
        if(!isNaN(inputNumber)) {
            this.firstNumber = inputNumber;
            return true;
        } else {
            return false;
        }
    }

    setSecondNumber(input: string): boolean {
        if(input === 'ans') {
            if(this.result === undefined) {
                console.log('There is no previous result to be used');
                return false;
            }
            this.secondNumber = this.result;
            return true;
        }
        const inputNumber = parseFloat(input);
        if(!isNaN(inputNumber)) {
            this.secondNumber = inputNumber;
            return true;
        } else {
            return false;
        }
    }

    setOperator(input: string): boolean {
        if(Object.values(operations).includes(input)) {
            this.operator = input;
            return true;
        } else {
            return false;
        }
    }
}