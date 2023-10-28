// Javascript

const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

//* Memory box features
const memoryOperations = [];
const memoryEl = document.getElementById("memory-operations");

//* Load Ops from Local Storage
function loadMemoryOperations() {
    const savedMemoryOperations = localStorage.getItem("memory-operations");
    if (savedMemoryOperations) {
        memoryOperations.push(...JSON.parse(savedMemoryOperations));
        displayMemoryOperations();
    }
}

//* Save Ops to Local Storage
function saveMemoryOperations() {
    localStorage.setItem("memory-operations", JSON.stringify(memoryOperations));
}

//* Load Ops (When page loads)
loadMemoryOperations();

//* Variables
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

//* Numbers (ForEach)
numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
        console.log(number);
    });
});

//* Operations (ForEach)
operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    });
});

//* Clear Variables
function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
}

//* Math Ops
function mathOperation() {
    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

//* Display memory & line break
function displayMemoryOperations() {
    memoryEl.innerText = memoryOperations.join("; ");
    saveMemoryOperations(); //s Calls function
}

//* Equal Event
equalEl.addEventListener("click", () => {
    if (!dis1Num || !dis2Num || !lastOperation) return;
    haveDot = false;
    mathOperation();
    display2El.innerText = result;
    memoryOperations.push(dis1Num + dis2Num + " = " + result); //s Store the operation in the memory array
    dis1Num = "";
    dis2Num = result.toString();
    lastOperation = "";
    displayMemoryOperations(); // Update memory display
});

//* Clear Event
clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
    memoryOperations.length = 0; //s Clear Memory Op
    displayMemoryOperations(); //s Update memory display
});

//* Clear Last Event
clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
});

//* Clear Memory
const clearMemoryEl = document.getElementById("clear-memory");
clearMemoryEl.addEventListener("click", () => {
    memoryOperations.length = 0; //s Clear memory Op
    displayMemoryOperations(); //s Calls Function
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
        // console.log(e.key)
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    } else if (e.key === "*") {
        clickOperation("x");
        // console.log(e.key)
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }
    // console.log(e.key)
});

function clickButtonEl(key) {
    numbersEl.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    });
}

function clickOperation(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickEqual() {
    equalEl.click();
}
