const MAX_BILL_VALUE = 10000000;
const MAX_PEOPLE_VALUE = 10000;

const calculatorForm = document.querySelector(".tip-calculator");

const billInput = document.getElementById("bill-input");


const formControlInputs = document.querySelectorAll(".form-control__input");

const tipInputs = document.querySelectorAll(".tip-input");
const customInput = document.getElementById("custom-input");

const peopleInput = document.getElementById("people-input");
const peopleInputError = document.getElementById("people-input-error");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

const resetButton = document.querySelector(".reset-button");

billInput.dataset.previousValue = billInput.value;
peopleInput.dataset.previousValue = peopleInput.value;

function updateResults() {
    
    const billValue = getBillValue();
    const tipPercentage = getTipPercentage();
    const numberOfPeople = getNumberOfPeople();

    if (!validateInputs(billValue, tipPercentage, numberOfPeople)) {
        resetCalculator();
        return;
    }

    const tipPerPerson = calcTipPerPerson(
        billValue,
        numberOfPeople,
        tipPercentage
    );

    const totalPerPerson = calcTotalPerPerson(
        billValue,
        numberOfPeople,
        tipPercentage
    );

    updateResultsValue(
        tipPerPerson.toFixed(2),
        totalPerPerson.toFixed(2)
    );

    enableResetBtn();
}
 
formControlInputs.forEach(input => {

    input.addEventListener("input", () => {
        
        if (input === billInput)
            enforceInputLimit(input, MAX_BILL_VALUE);
        else if (input === peopleInput)
            enforceInputLimit(input, MAX_PEOPLE_VALUE);
        
        let isValid;
        
        if (input === peopleInput) 
            isValid = isValidNumOfPeople(input.valueAsNumber); 
        
        else if (input === billInput) 
            isValid = isValidBill(input.valueAsNumber); 
        
        input.closest(".form-control__input-wrapper")
            .classList.toggle("form-control__input-wrapper--error", !isValid);
        
        input.setAttribute("aria-invalid", String(!isValid));

        updateResults();
    });
    
});

peopleInput.addEventListener("input", (e) => {
    peopleInputError.hidden = e.target.valueAsNumber !== 0;
})

function enforceInputLimit(input, maxValue) {
    const currentValue = input.valueAsNumber;

    if (input.value === "" || currentValue <= maxValue) 
        input.dataset.previousValue = input.value;
    else 
        input.value = input.dataset.previousValue;
}

tipInputs.forEach(input => {
    input.addEventListener("change", () => {
        resetCustomInput();
        updateResults();
    });
});


["focus", "input"].forEach((eventName) => {
    customInput.addEventListener(eventName, () => {
        uncheckTipInputs();
        updateResults();
    });
});


calculatorForm.addEventListener("reset", () => {
    billInput.dataset.previousValue = billInput.defaultValue;   
    peopleInput.dataset.previousValue = peopleInput.defaultValue;

    resetResultValues();
    disableResetBtn();
});

function uncheckTipInputs() {
    tipInputs.forEach(input => {
        input.checked = false;
    });
}

function resetCustomInput() {
    customInput.value = "";
}

function getBillValue() {
    return billInput.valueAsNumber;
}

function getNumberOfPeople() {
    return peopleInput.valueAsNumber; 
}

function getTipPercentage() {
    const checkedTipInput = document.querySelector(".tip-input:checked");

    const selectedTip = checkedTipInput
        ? Number(checkedTipInput.value)
        : customInput.valueAsNumber;

    return selectedTip / 100;
}

function calcTipPerPerson(billValue, numberOfPeople, tipPercentage) {
    return (billValue / numberOfPeople) * tipPercentage;
}

function calcTotalPerPerson(billValue, numberOfPeople, tipPercentage) {
    return (billValue / numberOfPeople) * (1 + tipPercentage);
}

function updateResultsValue(tipPerPerson, totalPerPerson) {   
    tipAmount.textContent = `$${tipPerPerson}`;
    totalAmount.textContent = `$${totalPerPerson}`;
}
 
function validateInputs(billValue, tipPercentage, numberOfPeople) {
    const isBillValid = isValidBill(billValue);
    const isTipValid = isValidTip(tipPercentage);
    const isPeopleValid = isValidNumOfPeople(numberOfPeople);

    return isBillValid && isTipValid && isPeopleValid;
} 

function isValidTip(tipPercentage) {
    return (
        Number.isFinite(tipPercentage) &&
        tipPercentage >= 0 && tipPercentage <= 1
    ); 
}
 
function isValidNumOfPeople(value) {
    return (
        Number.isInteger(value) &&
        value >= 1 &&
        value <= MAX_PEOPLE_VALUE
    );
}
 


function isValidBill(value) {
    return (
        value > 0 &&
        Number.isFinite(value) &&
        value <= MAX_BILL_VALUE
    );
}

function resetCalculator() {
    disableResetBtn();
    resetResultValues();
}

function resetResultValues() {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
}

function enableResetBtn() {
    resetButton.disabled = false;          
    resetButton.classList.add("reset-button--enabled");
    resetButton.classList.remove("reset-button--disabled");
}

function disableResetBtn() {
    resetButton.disabled = true;          
    resetButton.classList.remove("reset-button--enabled");
    resetButton.classList.add("reset-button--disabled");
}

