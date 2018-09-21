import { stdin } from "process";

export class Terminal {
    private isListeningStdin = false;

    constructor() {
        stdin.setEncoding('utf8');
    }

    private startListening(): void {
        stdin.resume();
        this.isListeningStdin = true;
    }

    private stopListening(): void {
        stdin.pause();
        this.isListeningStdin = false;
    }

    prompt(message: string, cb: (answer: string) => void): void {
        console.log(message)

        if (!this.isListeningStdin) this.startListening();

        stdin.once('data', (answer) => {
            this.stopListening();
            cb(answer.trim());
        });
        
    }
}