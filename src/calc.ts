
import { argv as arguments } from "yargs";

import { CountingMachine } from "./classes/CountingMachine.class";
import { Communication } from "./classes/communication.class";

const operationsStack = arguments._;

const countingMachine = new CountingMachine(2);
const communication = new Communication();

function askForFirstNumber() {
    return new Promise((resolve) => {
        communication.prompt("Please provide first number (ans = previous result)", (input: string) => {
            if(!countingMachine.setFirstNumber(input)) resolve(askForFirstNumber());
            else resolve();
        });
    });
}
function askForOperator() {
    return new Promise((resolve) => {
    communication.prompt("Please provide operator", (input: string) => {
        if(!countingMachine.setOperator(input)) resolve(askForOperator());
        else resolve();
    });
});
}
function askForSecondNumber() {
    return new Promise((resolve) => {
    communication.prompt("Please provide second number (ans = previous result)", (input: string) => {
        if(!countingMachine.setSecondNumber(input)) resolve(askForSecondNumber());
        else resolve();
    });
});
}

function askIfContinue(): Promise<boolean> {
    return new Promise((resolve) => {
        communication.prompt('Should I calculate another equation? [y/n]', (input) => {
            if(input === 'y') resolve(true);
            else if(input === 'n') resolve(false);
            else resolve(askIfContinue());
        });
    });
}

function startCycle() {
    Promise.resolve()
        .then(askForFirstNumber)
        .then(askForOperator)
        .then(askForSecondNumber)
        .then(() => countingMachine.calculate())
        .then(() => console.log('Result is:', countingMachine.result))
        .then(askIfContinue)
        .then((shouldContinue) => {
            if(shouldContinue) setTimeout(startCycle, 0);
        })
        .catch((err) => console.log('Error occured:', err));
}

startCycle();