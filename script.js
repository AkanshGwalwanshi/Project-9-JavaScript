// function to get history
const getHistory = () => document.getElementById("history-value").innerText;

// function to print history
const printHistory = (num) => {
    document.getElementById("history-value").innerText = num;
}

// function to get output
const getOutput = () => document.getElementById("output-value").innerText;

// function to print output
const printOutput = (num) => {

    if (num == "") {
        document.getElementById("output-value").innerText = num;
    }
    else {
        num = getFormattedNumber(num);
    }
    document.getElementById("output-value").innerText = num;
}

// function to format number with commas
const getFormattedNumber = (num) => {
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");

    return value;
};

// function to unformat number with commas for evaluating the result
const reverseNumberFormat = (num) => {
    return Number(num.replace(/,/g, ''));
};

const operator = document.getElementsByClassName("operator");
const number = document.getElementsByClassName("number");

for (const currVal of operator) {
    currVal.addEventListener('click', () => {
        if (currVal.id == "clear") {
            printHistory("");
            printOutput("");
        }
        else if (currVal.id == "backspace") {
            let output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substring(0, output.length - 1);
                printOutput(output);
            }
        }
        else {
            let output = getOutput();
            let history = getHistory();
            if (output == "" && history != "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substring(0, history.length - 1);
                }
            }

            if (output != "" || history != "") {
                output = ( output == "" ? output : reverseNumberFormat(output));
                history = `${history + output}`;
                if (currVal.id == "=") {
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else {
                    history = history + currVal.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

for (const currVal of number) {
    currVal.addEventListener('click', () => {
        let output = reverseNumberFormat(getOutput());
        if (output != NaN) {
            output = `${output + currVal.id}`;
            printOutput(output);
        }
    });
}