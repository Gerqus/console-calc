import { operations } from "../enums/operations.enum";

export class Validator {
    isCalculatableNumber(valueToCheck: string): boolean {
        if(valueToCheck === 'ans') return true;
        const numberValueToCheck = parseFloat(valueToCheck);
        return !isNaN(numberValueToCheck);
    }

    isValidOperator(operator: string): boolean {
        return Object.values(operations).includes(operator);
    }
}