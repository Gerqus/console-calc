"use strict";
exports.__esModule = true;
var process_1 = require("process");
var Communication = /** @class */ (function () {
    function Communication() {
        this.isListeningStdin = false;
        process_1.stdin.setEncoding('utf8');
    }
    Communication.prototype.startListening = function () {
        process_1.stdin.resume();
        this.isListeningStdin = true;
    };
    Communication.prototype.stopListening = function () {
        process_1.stdin.pause();
        this.isListeningStdin = false;
    };
    Communication.prototype.prompt = function (message, cb) {
        var _this = this;
        console.log(message);
        if (!this.isListeningStdin)
            this.startListening();
        process_1.stdin.once('data', function (answer) {
            _this.stopListening();
            cb(answer.trim());
        });
    };
    return Communication;
}());
exports.Communication = Communication;
