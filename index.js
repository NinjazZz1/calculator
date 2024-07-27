let firstNumber;
let secondNumber;
let operation;

let display = "";
let chainedString = "";

let canDelete;

const defaultTheme = document.querySelector(".default-theme");
const purpleTheme = document.querySelector(".purple-theme");
const blueTheme = document.querySelector(".blue-theme");

const buttons = document.querySelectorAll("button");
let displayElement = document.querySelector(".main-display");
let subDisplayElement = document.querySelector(".sub-display");

let root = document.documentElement;

purpleTheme.addEventListener("click", e => {
    root.style.setProperty("--color1", "rgb(113, 69, 115)");
    root.style.setProperty("--color2", "rgb(184, 145, 200)");
    root.style.setProperty("--color3", "rgb(217, 179, 253)");
    root.style.setProperty("--color4", "rgb(184, 113, 250)");
    root.style.setProperty("--color5", "rgb(200, 162, 236)");
});

defaultTheme.addEventListener("click", e => {
    root.style.setProperty("--color1", "rgb(0, 0, 0)");
    root.style.setProperty("--color2", "rgb(0, 0, 0)");
    root.style.setProperty("--color3", "rgb(120, 114, 127)");
    root.style.setProperty("--color4", "rgb(42, 42, 42)");
    root.style.setProperty("--color5", "rgb(125, 122, 128)");
});

blueTheme.addEventListener("click", e => {
    root.style.setProperty("--color1", "rgb(211, 198, 53)");
    root.style.setProperty("--color2", "rgb(102, 119, 231)");
    root.style.setProperty("--color3", "rgb(47, 17, 128)");
    root.style.setProperty("--color4", "rgb(22, 73, 124)");
    root.style.setProperty("--color5", "rgb(87, 78, 215)");
});

function pressButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (buttons[i].id === "operator") {
                operation = "" + buttons[i].innerHTML;
                canDelete = false;
                setNumber();
            } else if (buttons[i].id === "number") {
                canDelete = true;
                appendDisplay(buttons[i].innerHTML);
            } else if (buttons[i].id === "sum") {
                if (firstNumber === undefined) return; else { setNumber(); }
            } else if (buttons[i].id === "c") {
                clear();
            } else if (buttons[i].id === "back") {
                if (canDelete === true) {
                    console.log(display.length)
                    if (display.length !== 1) {
                        console.log(display.length)
                        display = display.substring(0, display.length - 1);
                        displayElement.innerHTML = display;
                    }
                }
            }
        })
    }
}

pressButton();

function setNumber() {
    if (firstNumber === undefined) {
        firstNumber = display;
        display = "";
        console.log("Saving number one", firstNumber);
        chainedString = firstNumber.toString() + " " + operation;
    } else if (secondNumber === undefined) {
        secondNumber = display;
        display = "";
        console.log("Saving number two", secondNumber);
        chainedString = firstNumber.toString() + " " + operation + " " + secondNumber.toString() + " = ";
        operate();
    }
    subDisplayElement.innerHTML = chainedString;

}

function add(num1, num2) {
    return +num1 + +num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function remainder(num1, num2) {
    return num1 % num2;
}

function clear() {
    firstNumber = undefined;
    secondNumber = undefined;
    operation = undefined;
    display = "";
    chainedString = "";
    displayElement.innerHTML = "0"
    console.log("cleared");
    subDisplayElement.innerHTML = "";
}

function appendDisplay(number) {
    display += number;
    displayElement.innerHTML = display;
}

function operate() {
    let sum = 0;
    console.log(firstNumber, "." + operation + ".", secondNumber);
    if (operation === "+") {
        sum = add(firstNumber, secondNumber).toString();;
    } else if (operation === "-") {
        sum = subtract(firstNumber, secondNumber).toString();
    } else if (operation === "/") {
        sum = divide(firstNumber, secondNumber).toString();
    } else if (operation === "*") {
        sum = multiply(firstNumber, secondNumber).toString();
    } else if (operation === "%") {
        sum = remainder(firstNumber, secondNumber).toString();
    }
    firstNumber = undefined;
    secondNumber = undefined;
    display = "";

    if (sum == "Infinity") {
        appendDisplay("ERROR!");
        chainedString = "";
        displayElement.innerHTML = display;
    } else {
        let chars = sum.length;
        let roundedSum = parseFloat(sum);
        if (chars > 12) {
            roundedSum = roundedSum.toFixed(2);
        }
        appendDisplay(roundedSum);
        canDelete = false;
    }
}