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


    // if (!validateInputs()) {
    //     return;
    // }

    const tipPerPerson = calcTipPerPerson(billValue, numberOfPeople, tipPercentage);
    const totalPerPerson = calcTotalPerPerson(billValue, numberOfPeople, tipPercentage);

    updateUI(tipPerPerson.toFixed(2), totalPerPerson.toFixed(2));
    // enableReset();
    // resetCalculator();
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

function uncheckTipInputs() {
    tipInputs.forEach(input => {
        input.checked = false;
    });
}

function resetCustomInput() {
    customInput.value = "";
}

function getBillValue() {
    const billValue = billInput?.valueAsNumber;
    
    if (billValue > 0 && Number.isFinite(billValue)) 
        return billValue;
        
    return undefined;
}

function getNumberOfPeople() {
    const numOfPeople = peopleInput?.valueAsNumber;
    
    if (numOfPeople > 0 && Number.isFinite(numOfPeople)) 
        return numOfPeople;
        
    return undefined;
}

// — فحص المدخلات.
function getTipPercentage() {
    const checkedTipInput = document.querySelector(".tip-input:checked");

    if (checkedTipInput) {
        const value = Number(checkedTipInput.value);
        return Number.isNaN(value) ? 0 : (value / 100);
    }

    const customValue = customInput?.valueAsNumber;

    if (customValue >= 0 && !Number.isNaN(customValue) && typeof customValue === "number") {
        return (customValue / 100);
    }

    return undefined;
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

function enableReset() {
    
}