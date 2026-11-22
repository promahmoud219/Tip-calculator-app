<<<<<<< HEAD
const billInput = document.getElementById("bill-input");
const formControlInputs = document.querySelectorAll(".form-control__input"); 

const tipInputs = document.querySelectorAll(".tip-input");
const customInput = document.getElementById("custom-input");

const peopleInput = document.getElementById("people-input");
const peopleInputError = document.getElementById("people-input-error");
=======
const formControlInput = document.querySelectorAll(".form-control__input");

const tipInput = document.getElementsByClassName("tip-input");
const customInput = document.getElementsByClassName("custom-input");

const peopleInput = document.getElementById("people-input");
>>>>>>> 7595e7525a6f42606551f045f5134b890b124dbe

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

<<<<<<< HEAD
const resetButton = document.querySelector(".reset-button");


function updateResults() {
    
    const checkedTipInput = document.querySelector(".tip-input:checked");
    
    console.log("you called updateResults()");

    console.log(`bill input: ${billInput?.valueAsNumber}`);
    console.log(`tip percentage: ${checkedTipInput?.value}`);
    console.log(`custom input: ${customInput?.valueAsNumber}`);
    console.log(`num of people: ${peopleInput?.valueAsNumber}`);
    
    
    const billValue = getBillInput();
    const tipPercentage = getTipPercentage(checkedTipInput, customInput);
    const numberOfPeople = getNumberOfPeople();


    // if(!validateInputs()) {
    //     return 
    // }

    // getTipPercentage();
    // calcTotalAmountPerPerson();

    // updateUI();

    // enableReset();    
    // resetCalculator();
}
 
formControlInputs.forEach(input => {

    input.addEventListener("input", (e) => { 
        
        if(e.target.valueAsNumber <= 0)
            input.closest(".form-control__input-wrapper").classList.add("form-control__input-wrapper--error");

        else 
            input.closest(".form-control__input-wrapper").classList.remove("form-control__input-wrapper--error");
          
        updateResults();
    })

}); 

tipInputs.forEach(input => {

    input.addEventListener("change", (e) => {
        resetCustomInput();
        updateResults();
    });

});
 

["focus", "input"].forEach((eventName) => {
    customInput.addEventListener(eventName, () => {
        uncheckTipInputs();
        updateResults();
    })
})




peopleInput.addEventListener("input", (e) => {

    if(e.target.valueAsNumber === 0)
        peopleInputError.hidden = false;
    
    else
        peopleInputError.hidden = true;
    
    updateResults();    

})

 
function uncheckTipInputs(){
    tipInputs.forEach(input => {
        input.checked = false; 
    } )
}

function resetCustomInput(){
    customInput.value = ""; 
}






function getBillInput() {
    
}

function getNumberOfPeople() {
    
}

 
//  — فحص المدخلات.
function getTipPercentage(checkedTipInput, customInput){
    
    if (checkedTipInput) {
        const value = Number(checkedTipInput.value);
        return Number.isNaN(value) ? 0 : (value / 100); 
    }

    const customValue = customInput?.valueAsNumber;

    if (customValue >= 0 && !Number.isNaN(customValue) && typeof customValue === "number")
        return (customValue / 100);

    return undefined;
}

function calcTipPerPerson(billInput, numberOfPeople, tipPercentage){
    return (billInput / numberOfPeople) * tipPercentage;
}

function calcTotalPerPerson(billInput, numberOfPeople) {
    return (billInput / numberOfPeople) + calcTipPerPerson();
}



function updateUI(){
        
}

function enableReset(){

}
=======
const resetButton = document.getElementsByClassName("reset-button");



formControlInput.forEach(input => {
   
    input.addEventListener("input", (e) => {
    
        if(e.target.valueAsNumber == 0){
            input.closest(".form-control__input-wrapper").classList.add("form-control__input-wrapper--error");
            if(e == peopleInput)
                document.body.style.backgroundColor = "red";
        }
        
        else if(e.target.valueAsNumber != 0)
            input.closest(".form-control__input-wrapper").classList.remove("form-control__input-wrapper--error");
    })
});
     


// Page Loads
//     |
//     v
// Initial State
//     |
//     |-- Bill = 0
//     |-- Tip = No Selection
//     |-- People = 0
//     |-- Results = 0
//     |-- Reset = Disabled
//     |
//     v
// User Enters Bill
//     |
//     v
// User Selects Tip
//     |
//     v
// User Enters Number of People
//     |
//     +---- People = 0
//     |         |
//     |         v
//     |     Show Error
//     |     Results = 0
//     |
//     +---- People > 0
//               |
//               v
//         Validate Inputs
//               |
//               v
//         Calculate Results
//               |
//               v
//         Update UI
//               |
//               v
//         Enable Reset


// calcTipPerPerson{
//     return (billInput.value / numberOfPeople) * tipPercentage;
// }

// calcTotalAmountPerPerson { 
//     return (billInput.value / numberOfPeople) + calcTipPerPerson;
// }
>>>>>>> 7595e7525a6f42606551f045f5134b890b124dbe
