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
    
    const checkedTipInput = document.querySelector(".tip-input:checked");
    
    console.log("you called updateResults()");

    console.log(`bill input: ${billInput?.valueAsNumber}`);
    console.log(`tip percentage: ${checkedTipInput?.value}`);
    console.log(`custom input: ${customInput?.valueAsNumber}`);
    console.log(`num of people: ${peopleInput?.valueAsNumber}`);
    
    
    

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

customInput.addEventListener("focus", (e) => {
    uncheckTipInputs();
    updateResults();
});

peopleInput.addEventListener("input", (e) => {

    if(e.target.valueAsNumber === 0)
        peopleInputError.hidden = false;
    
    else
        peopleInputError.hidden = true;
    
    updateResults();    

})



// calcTipPerPerson{
//     return (billInput.value / numberOfPeople) * tipPercentage;
// }

// calcTotalPerPerson { 
//     return (billInput.value / numberOfPeople) + calcTipPerPerson;
// }

function uncheckTipInputs(){
    tipInputs.forEach(input => {
        input.checked = false; 
    } )
}

function resetCustomInput(){
    customInput.value = ""; 
}