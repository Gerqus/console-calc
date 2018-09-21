import { CountingMachine } from "./classes/CountingMachine.class";
import { Communication } from "./classes/Communication.class";

const countingMachine = new CountingMachine(2);
const communication = new Communication();

function startCycle() {
    Promise.resolve()
        .then(() => communication.askForFirstNumber())
        .then((input: string) => countingMachine.setFirstNumber(input))
        .then(() => communication.askForOperator())
        .then((input: string) => countingMachine.setOperator(input))
        .then(() => communication.askForSecondNumber())
        .then((input: string) => countingMachine.setSecondNumber(input))
        .then(() => countingMachine.calculate())
        .then(() => console.log('Result is:', countingMachine.result))
        .then(() => communication.askIfContinue())
        .then((shouldContinue) => {
            if(shouldContinue) setTimeout(startCycle, 0);
        })
        .catch((err) => console.log('Error occured:', err));
}

startCycle();