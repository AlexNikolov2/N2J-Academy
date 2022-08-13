const percentButtons = document.querySelector('.btns-container');
percentButtons.addEventListener('click', percentButtonsOnClick);

const numberOfPeople = document.querySelector('.people-input');
numberOfPeople.addEventListener('click', numberOfPeopleOnClick);

const resetButton = document.querySelector('.reset-btn');
resetButton.addEventListener('click', resetButtonOnClick);

const bill = document.querySelector('.bill-input');

const customButton = document.querySelector('input[placeholder="Custom"]');
customButton.addEventListener('click', customButtonOnClick);

let currentButton;
let percent;

let isTouched = false;
let isCustomPercent = false;

document.onclick = (e) => {
    
    let notZeroEl = document.querySelector('.not-zero');
    let signPeople = document.querySelector('.sign-people');

    if (isTouched == true) {
        if (numberOfPeople != document.activeElement) {
            if (!Number.isInteger(Number(numberOfPeople.value)) || numberOfPeople.value <= 0 || numberOfPeople.value == '') {
                if (!Number.isInteger(Number(numberOfPeople.value))) {
                    notZeroEl.textContent = 'Must be a whole number'
                }
                notZeroEl.style.display = 'block'
                signPeople.style.border = '2px solid red'
            } else {
                notZeroEl.textContent = 'Can\'t be zero'
                notZeroEl.style.display = 'none'
                signPeople.style.border = '2px solid transparent'
                isTouched = false;
            }
        }
    }

    checkForMissingFields();
}

function percentButtonsOnClick(e){
    if (e.target.tagName == 'INPUT') {
        currentButton = e.target;

        if (currentButton == customButton) {
            customButtonOnClick();

        } else {
            currentButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
            currentButton.style.border = 'none';
            percent = e.target.value.slice(0, -1);

            checkForMissingFields();
        }
    }
}

function customButtonOnClick(e){
    currentButton.style.backgroundColor = 'hsl(189, 41%, 97%)';
    currentButton.style.border = '2px solid hsl(172, 67%, 45%)';
    currentButton.style.color = 'hsl(183, 100%, 15%)';

    if (e && e != undefined) {

        currentButton = e.target;

        percent = e.target.value;
        if (percent) {
            isCustomPercent = true;
        }
    }

    if (isCustomPercent) {
        checkForMissingFields();
    }

    return;
}

function checkForMissingFields() {
    if (numberOfPeople.value == '' || bill.value == '' || !currentButton) {
        console.log('You haven\'t filled the required fields');
    } else {
        resetButton.classList.remove('disabled')
        calcPercents();
    }
}

function calcPercents() {

    const people = Number(numberOfPeople.value);
    const billValue = Number(bill.value);

    if (people > 0) {

        const tipAmount = (billValue * (percent / 100)) / people;
        const total = (billValue + (tipAmount * people)) / people;

        document.querySelector('.tip-amount').textContent = tipAmount.toFixed(2);
        document.querySelector('.total-price').textContent = total.toFixed(2);
    }

    return
}

function numberOfPeopleOnClick() {
    isTouched = true;
}

function resetButtonOnClick() {
    resetButton.classList.add('disabled');
    numberOfPeople.value = '';
    bill.value = '';
    customButton.value = ''
    document.querySelector('.tip-amount').textContent = '0.00';
    document.querySelector('.total-price').textContent = '0.00';
    currentButton.style.backgroundColor = 'hsl(183, 100%, 15%)';
}

