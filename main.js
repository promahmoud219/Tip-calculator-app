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

    updateResultsValue(tipPerPerson.toFixed(2), totalPerPerson.toFixed(2));

}
 
formControlInputs.forEach(input => {

    input.addEventListener("input", () => {
        const isValid = isValidBillOrNumOfPeople(input.valueAsNumber);

        input.closest(".form-control__input-wrapper")
            .classList.toggle("form-control__input-wrapper--error", !isValid);

        input.setAttribute("aria-invalid", String(!isValid));

        if (input === peopleInput) {
            peopleInputError.hidden = input.valueAsNumber !== 0;
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
    return Number((checkedTipInput) ? checkedTipInput.value  : customInput?.valueAsNumber) / 100; 
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
    const isBillValid = isValidBillOrNumOfPeople(billValue);
    const isTipValid = isValidTip(tipPercentage);
    const isPeopleValid = isValidBillOrNumOfPeople(numberOfPeople);

    return isBillValid && isTipValid && isPeopleValid;
} 

function isValidTip(tipPercentage) {
    return (
        tipPercentage >= 0 &&
        !Number.isNaN(tipPercentage) &&
        typeof tipPercentage === "number" &&
        tipPercentage <= 1
    ); 
}
 
function isValidBillOrNumOfPeople(numberOfPeople) {
    return numberOfPeople > 0 && Number.isFinite(numberOfPeople);
}

function resetCalculator() {
    enableResetBtn();
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

