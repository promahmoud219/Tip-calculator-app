const billInput = document.getElementById("bill-input");
const formControlInputs = document.querySelectorAll(".form-control__input");

const tipInputs = document.querySelectorAll(".tip-input");
const customInput = document.getElementById("custom-input");

const peopleInput = document.getElementById("people-input");
const peopleInputError = document.getElementById("people-input-error");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

const resetButton = document.querySelector(".reset-button");

 
function updateResults() {
 
    const billValue = getBillValue();
    const tipPercentage = getTipPercentage();
    const numberOfPeople = getNumberOfPeople();

    if (!validateInputs(billValue, tipPercentage, numberOfPeople)) {
        resetCalculator();
        disableResetBtn()
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

    updateUI(tipPerPerson.toFixed(2), totalPerPerson.toFixed(2));
    enableResetBtn();
}
 

formControlInputs.forEach(input => {

    input.addEventListener("input", (e) => {
        if (e.target.valueAsNumber <= 0) {
            input.closest(".form-control__input-wrapper").classList.add("form-control__input-wrapper--error");
        } else {
            input.closest(".form-control__input-wrapper").classList.remove("form-control__input-wrapper--error");
        }

        updateResults();
    });
});

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

peopleInput.addEventListener("input", (e) => {
    if (e.target.valueAsNumber === 0) {
        peopleInputError.hidden = false;
    } else {
        peopleInputError.hidden = true;
    }

    updateResults();
});

resetButton.addEventListener("click", () => {
    resetCalculator();
})

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
    return Number((checkedTipInput) ? checkedTipInput.value : customInput?.valueAsNumber) / 100; 
}

function calcTipPerPerson(billValue, numberOfPeople, tipPercentage) {
    return (billValue / numberOfPeople) * tipPercentage;
}

function calcTotalPerPerson(billValue, numberOfPeople, tipPercentage) {
    return (billValue / numberOfPeople) * (1 + tipPercentage);
}

function updateUI(tipPerPerson, totalPerPerson) {   
    tipAmount.textContent = `$${tipPerPerson}`;
    totalAmount.textContent = `$${totalPerPerson}`;
}
 
function validateInputs(billValue, tipPercentage, numberOfPeople) {
    const isBillValid = isValidBill(billValue);
    const isTipValid = isValidTip(tipPercentage);
    const isPeopleValid = isValidPeople(numberOfPeople);

    return isBillValid && isTipValid && isPeopleValid;
}


function isValidBill(billValue) {
    return billValue > 0 && Number.isFinite(billValue);
}


function isValidTip(tipPercentage) {
    return (
        tipPercentage >= 0 &&
        !Number.isNaN(tipPercentage) &&
        typeof tipPercentage === "number"
    ); 
}


function isValidPeople(numberOfPeople) {
    return numberOfPeople > 0 && Number.isFinite(numberOfPeople);
}

function resetCalculator() {
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

