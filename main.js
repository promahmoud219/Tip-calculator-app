const formControlInput = document.querySelectorAll(".form-control__input");

const tipInput = document.getElementsByClassName("tip-input");
const customInput = document.getElementsByClassName("custom-input");

const peopleInput = document.getElementById("people-input");

const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");

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