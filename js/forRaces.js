let garage = [];
let car = document.getElementsByClassName('garage');
const CARS = [['450', {engine: [[0.6, '50hp'], [0.7, '61hp'], [0.8, '41hp'], ['0.7 Brabus', '75hp']]}], ['roadster', {engine: [[0.7, '82hp'], ['0.7 Brabus', '101hp']]}], ['451', {engine: [[0.8, '54hp'], [1.0, '71hp'], [1.0, '84hp'], ['1.0 Brabus', '102hp']]}], ['453', {engine: [[1.0, '71hp'], [0.9, '90hp'], ['0.9 Brabus', '109hp']]}]];
let garageHTML = document.getElementsByClassName('containerselectBtn')[0];
let selctBtn = document.getElementsByClassName('selectBtn')[0];
let carSelect = document.getElementsByClassName('carSelect')[0];
let raceBtn = document.getElementsByClassName('racebtn')[0];
let raceCars = document.getElementsByClassName('car');
let promtMessage = document.getElementsByClassName('promtMessage')[0];
let newRaceBtn = document.getElementsByClassName('newRace')[0];
let histrory = document.getElementsByClassName('history__container')[0];


selctBtn.addEventListener('click', addToGarage);
raceBtn.classList.toggle('d-none', true);
newRaceBtn.classList.toggle('d-none',true);


function addToGarage() {
    if (!garage[0]) {
        garage[0] = [carSelect.value];
        garageHTML.insertAdjacentHTML('beforeend', `<div class="garage"><img alt='${carSelect.value}' src="images/${carSelect.value}.jpg"><select class="engine"></select></div>`);
        setTimeout(function () {
            car[0].style.cssText = 'left: 0; transform: scale(1);margin-left: 0';
        }, 0);
        selectConfig(CARS, carSelect.value);
        return garage;
    } else if (!garage[1]) {
        garage[1] = [carSelect.value];
        garageHTML.insertAdjacentHTML('beforeend', `<div class="garage"><img alt='${carSelect.value}' src="images/${carSelect.value}.jpg"><select class="engine"></select></div>`);
        setTimeout(function () {
            car[1].style.cssText = 'left: 100%; transform: scale(1);margin-left:-300px';
        },);
        selectConfig(CARS, carSelect.value);
        if (garage.length === 2) {
            selctBtn.style.display = 'none';
            carSelect.style.display = 'none';
            raceBtn.classList.toggle('d-none', false);
            promtMessage.innerText = 'Select Car Engine';
        }
        return garage;
    }

}

function selectConfig(arr, value) {
    return arr.forEach(item => item[0] === value ? item[1].engine.map(items => {
        let createSelect = document.createElement('option');
        createSelect.innerHTML = `<option>${items}</option>`;
        if (car.length === 1) {
            document.getElementsByClassName('engine')[0].append(createSelect);
        } else if (car.length === 2) {
            document.getElementsByClassName('engine')[1].append(createSelect);
        }
    }) : false);
}

function removeFromGarage(event) {
    if (garage.length === 2 && event.target.closest('img')) {
        event.path[1].remove();
        garage.splice(garage.indexOf(event.target.alt), 1);
        carSelect.style.display = 'inline-block';
        selctBtn.style.display = 'inline-block';
        promtMessage.innerText = 'Select cars';
        return raceBtn.classList.toggle('d-none', true);
    } else if (garage.length === 1 && event.target.closest('img')) {
        event.path[1].remove();
        garage.splice(garage.indexOf(event.target.alt), 1);
    }
}

garageHTML.addEventListener('click', removeFromGarage);

let startRace = () => {
    for (let i = 0; i <= garage.length - 1; i++) {
        garage[i][1] = document.getElementsByClassName('engine')[i].value.split(',')[1].split('').slice(0, this.length - 2).join('');
        raceCars[i].innerHTML = `<img src="images/${garage[i][0]}.jpg">`;
    }
    promtMessage.innerText = null;
    raceBtn.classList.toggle('d-none', true);
    setTimeout(() => document.querySelector('.red').style.backgroundColor = 'red', 700);
    setTimeout(() => document.querySelector('.yellow').style.backgroundColor = 'yellow', 1200);
    setTimeout(() => document.querySelector('.green').style.backgroundColor = 'green', 2000);
    setTimeout(carRace, 2005);
};

raceBtn.addEventListener('click', startRace);

function carRace(callback = () => {
    if(+garage[0][1] > +garage[1][1]){
        promtMessage.innerText = `Smart ${garage[0][0]} Won`;
    }
    else if(+garage[0][1] < +garage[1][1]){
        promtMessage.innerText = `Smart ${garage[1][0]} Won`;
    }
    else{
        promtMessage.innerText = `Победила дружба`;
    }
    newRaceBtn.classList.toggle('d-none',false);
}) {
    raceCars[0] && raceCars[1].addEventListener('transitionend',callback);
    raceCars[0].style.cssText = 'left: 100%;  margin-left: -300px;' + `transition: ${250 / garage[0][1]}s;`;
    raceCars[1].style.cssText = 'left: 100%; margin-left: -300px;' + `transition: ${250 / garage[1][1]}s`;
}

newRaceBtn.addEventListener('click',clearValues);

function clearValues() {
    histrory.insertAdjacentHTML('afterbegin', `<div class="history__container__item"><p class="">${promtMessage.innerText }</p><p class="">Smart:${garage[0][0]}, engine: ${garage[0][1]} hp, <span class="history__winner">VS</span> Smart ${garage[1][0]}, engine: ${garage[1][1]} hp</p> </div> `);
    garage = [];
    carSelect.style.display = 'inline-block';
    selctBtn.style.display = 'inline-block';
    promtMessage.innerText = 'Select cars';
    raceBtn.classList.toggle('d-none', true);
    car[0].remove();
    car[0].remove();
    raceCars[0].innerHTML = null;
    raceCars[1].innerHTML = null;
    raceCars[0].style.cssText = null;
    raceCars[1].style.cssText = null;
    document.querySelector('.red').style.backgroundColor = 'white';
    document.querySelector('.yellow').style.backgroundColor = 'white';
    document.querySelector('.green').style.backgroundColor = 'white';
    newRaceBtn.classList.toggle('d-none',true);
}
