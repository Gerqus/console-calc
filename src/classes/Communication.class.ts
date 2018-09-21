import { Terminal } from "./Termial.class";
import { Validator } from "./Validator.class";

const terminal = new Terminal();
const validator = new Validator();

export class Communication {
    askForFirstNumber() {
        return new Promise((resolve) => {
            terminal.prompt("Please provide first number (ans = previous result)", (input: string) => {
                if(!validator.isCalculatableNumber(input)) resolve(this.askForFirstNumber());
                else resolve(input);
            });
        });
    }

    askForOperator() {
        return new Promise((resolve) => {
            terminal.prompt("Please provide operator", (input: string) => {
                if(!validator.isValidOperator(input)) resolve(this.askForOperator());
                else resolve(input);
            });
        });
    }

    askForSecondNumber() {
        return new Promise((resolve) => {
            terminal.prompt("Please provide second number (ans = previous result)", (input: string) => {
                if(!validator.isCalculatableNumber(input)) resolve(this.askForSecondNumber());
                else resolve(input);
            });
        });
    }
    
    askIfContinue(): Promise<boolean> {
        return new Promise((resolve) => {
            terminal.prompt('Should I calculate another equation? [y/n]', (input) => {
                if(input === 'y') resolve(true);
                else if(input === 'n') resolve(false);
                else resolve(this.askIfContinue());
            });
        });
    }
}