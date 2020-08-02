export class MyConsole {
    /*__________________________________________________________________________________________________________________________________________*/
    constructor(_inputElement, _outputElement) {
        this.inputElement = _inputElement;
        this.outputElement = _outputElement;
    }
    static getInstance(_inputElement, _outputElement) {
        if (!MyConsole.instance) {
            MyConsole.instance = new MyConsole(_inputElement, _outputElement);
        }
        return MyConsole.instance;
    }
    //concatenate value of _message to the TextAreaElement's value property
    consoleLog(_message) {
        this.outputElement.value += _message;
        if (_message.length > 1)
            this.outputElement.value += "\r";
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }
    //iterate over _message and send each character delayChar, then add a line break at the end of the whole message (since consoleLog wont cause message.length is > 1 is false)
    async typeWriteLog(_message) {
        for (let char of _message) {
            this.consoleLog(await this.delayChar(char));
        }
        this.consoleLog("\r");
    }
    delayChar(_character) {
        return new Promise((resolve) => {
            setTimeout(function () {
                resolve(_character);
            }, 70);
        });
    }
    consoleClear() {
        this.outputElement.value = '';
    }
    async getPlayerInput() {
        this.inputElement.readOnly = false;
        this.inputElement.focus();
        const playerInput = await this.waitForPlayerInput();
        this.inputElement.blur();
        this.inputElement.value = "";
        this.inputElement.readOnly = true;
        return playerInput;
    }
    waitForPlayerInput() {
        return new Promise((resolve) => {
            let self = this;
            this.inputElement.addEventListener("keypress", function (_event) {
                if (_event.key == "Enter") {
                    // Keycode 66 is Enter
                    let inputValue = self.inputElement.value;
                    resolve(inputValue);
                }
            });
        });
    }
}
//# sourceMappingURL=MyConsole.js.map