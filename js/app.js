'use strict';

const buttonPeople = document.querySelector('.btnPeople');
const buttonPlanet = document.querySelector('.btnPlanet');
const buttonNext = document.querySelector('.btnNext');
const buttonBack = document.querySelector('.btnBack');
const buttonVehicles = document.querySelector('.btnVehicles');
const blockVehicles = document.querySelector('.blockVehicles');
const blockPeople = document.querySelector('.blockPeople');
const blockPlanet = document.querySelector('.blockPlanet');
let nextUrlForPeople = 'https://swapi.dev/api/people/?page=2';
let nextUrlForPlanets = 'https://swapi.dev/api/planets/?page=2';
let nextUrlForVehicles = 'https://swapi.dev/api/vehicles/?page=2';

buttonPeople.addEventListener('click', () =>{
    axios.get(' https://swapi.dev/api/people')
    .then(result => {
        const objPeople = result.data.results;
        blockPeople.innerHTML = '';

        for(let i = 0; i < objPeople.length; i++){
            const blockForPerson = createElement('div', {classname: 'blockInfo'}, null, null, blockPeople);
            createElement('div', {classname: 'listPeople', id: objPeople[i].url}, {click: moreInfPeople}, objPeople[i].name, blockForPerson);
            createElement('div', {id: 'block'+ objPeople[i].url}, null, null, blockForPerson);
        }

        buttonPeople.style.display = 'none';
        buttonPlanet.style.display = 'none';
        buttonVehicles.style.display = 'none';
        blockPlanet.style.display = 'none';
        blockVehicles.style.display = 'none';
        blockPeople.style.display = 'flex';
        buttonNext.style.display = 'block';
        buttonBack.style.display = 'block';
        buttonBack.addEventListener('click', turnBack);
        buttonNext.addEventListener('click', createNextBlockForPeople);

    })
});

function createNextBlockForPeople(){
    axios.get(nextUrlForPeople)
    .then(result => {
        nextUrlForPeople = result.data.next;
        const objPeople = result.data.results;

        for(let i = 0; i < objPeople.length; i++){
            const blockForPerson = createElement('div', {classname: 'blockInfo'}, null, null, blockPeople);
            createElement('div', {classname: 'listPeople', id: objPeople[i].url}, {click: moreInfPeople}, objPeople[i].name, blockForPerson);
            createElement('div', {id: 'block'+ objPeople[i].url}, null, null, blockForPerson);
        }

        if(!nextUrlForPeople){
            buttonNext.style.display = 'none';
        }

    })
}

function moreInfPeople(event){
    const click = event.target.getAttribute('id');
    axios.get(click)
    .then(result => {
        const listPeopleMoreInf = document.getElementById(`block${click}`);
        listPeopleMoreInf.innerHTML = '';
        const peopleInf = result.data;

        createElement('div', null, null, 'height:' + peopleInf.height, listPeopleMoreInf);
        createElement('div', null, null, 'mass:' + peopleInf.mass, listPeopleMoreInf);
        createElement('div', null, null, 'birth year:' + peopleInf.birth_year, listPeopleMoreInf);
        createElement('div', null, null, 'eye color:' + peopleInf.eye_color, listPeopleMoreInf);
        createElement('div', null, null, 'created:' + peopleInf.created, listPeopleMoreInf);
        createElement('div', null, null, 'edited:' + peopleInf.edited, listPeopleMoreInf);
        createElement('div', null, null, 'gender:' + peopleInf.gender, listPeopleMoreInf);
        createElement('div', null, null, 'hair_color:' + peopleInf.hair_color, listPeopleMoreInf);
        createElement('div', null, null, 'skin_color:' + peopleInf.skin_color, listPeopleMoreInf);

        axios.get(peopleInf.homeworld)
        .then(nameHome => {
            const home = nameHome.data.name;
            createElement('div', null, null, 'homeworld:' + home, listPeopleMoreInf);
        } );

    const film = peopleInf.films;
    createArrFilms(film, click);

    const species = peopleInf.species;
    const speciesName = 'species'; 
    createArrPromise(species, speciesName, click);

    const vehicles = peopleInf.vehicles;
    const vehiclesName = 'vehicles';
    createArrPromise(vehicles, vehiclesName, click);

   const starships = peopleInf.starships;
   const starshipsName = 'starships';
   createArrPromise(starships, starshipsName, click);
    })
}

buttonPlanet.addEventListener('click', ()=>{
    axios.get('https://swapi.dev/api/planets')
    .then(result =>{
        const objPlanet = result.data.results;
        blockPlanet.innerHTML = '';

        for(let i = 0; i < objPlanet.length; i++){
            const blockForPlanet = createElement('div', {classname: 'blockInfo'}, null, null, blockPlanet);
            createElement('div', {classname: 'listPlanet', id: objPlanet[i].url}, {click: moreInfPlanet}, objPlanet[i].name, blockForPlanet);
            createElement('div', {id: 'block'+ objPlanet[i].url}, null, null, blockForPlanet);
        }

        buttonPlanet.style.display = 'none';
        buttonPeople.style.display = 'none';
        buttonVehicles.style.display = 'none';
        blockVehicles.style.display = 'none';
        blockPeople.style.display = 'none';
        blockPlanet.style.display = 'flex';
        buttonNext.style.display = 'block';
        buttonBack.style.display = 'block';
        buttonNext.addEventListener('click', createNextBlockForPlanets);
        buttonBack.addEventListener('click', turnBack);
    })
})

function createNextBlockForPlanets(){
    axios.get(nextUrlForPlanets)
    .then(result => {
        nextUrlForPlanets = result.data.next;
        const objPlanet = result.data.results;

        for(let i = 0; i < objPlanet.length; i++){
            const blockForPlanet = createElement('div', {classname: 'blockInfo'}, null, null, blockPlanet);
            createElement('div', {classname: 'listPlanet', id: objPlanet[i].url}, {click: moreInfPlanet}, objPlanet[i].name, blockForPlanet);
            createElement('div', {id: 'block'+ objPlanet[i].url}, null, null, blockForPlanet);
        }

        if(!nextUrlForPlanets){
            buttonNext.style.display = 'none';
        }

    })
}

function moreInfPlanet(event){
    const click = event.target.getAttribute('id');
    axios.get(click)
    .then(result => {
        const listPlanetMoreInf = document.getElementById(`block${click}`);
        listPlanetMoreInf.innerHTML = '';
        const planetInf = result.data;

        createElement('div', null, null, 'climate:' + planetInf.climate, listPlanetMoreInf);
        createElement('div', null, null, 'created:' + planetInf.created, listPlanetMoreInf);
        createElement('div', null, null, 'diameter:' + planetInf.diameter, listPlanetMoreInf);
        createElement('div', null, null, 'edited:' + planetInf.edited, listPlanetMoreInf);
        createElement('div', null, null, 'gravity:' + planetInf.gravity, listPlanetMoreInf);
        createElement('div', null, null, 'orbital period:' + planetInf.orbital_period, listPlanetMoreInf);
        createElement('div', null, null, 'population:' + planetInf.population, listPlanetMoreInf);
        createElement('div', null, null, 'rotation period:' + planetInf.rotation_period, listPlanetMoreInf);
        createElement('div', null, null, 'surface water:' + planetInf.surface_water, listPlanetMoreInf);
        createElement('div', null, null, 'terrain:' + planetInf.terrain, listPlanetMoreInf);

    const film = planetInf.films;
    createArrFilms(film, click);

    const residents = planetInf.residents;
    const residentsName = 'residents'; 
    createArrPromise(residents, residentsName, click);
    })
}

buttonVehicles.addEventListener('click', ()=>{
    axios.get('https://swapi.dev/api/vehicles')
    .then(result =>{
        const objVehicles = result.data.results;
        blockVehicles.innerHTML = '';

        for(let i = 0; i < objVehicles.length; i++){
            const blockForVehicles = createElement('div', {classname: 'blockInfo'}, null, null, blockVehicles);
            createElement('div', {classname: 'listVehicles', id: objVehicles[i].url}, {click: moreInfVehicles}, objVehicles[i].name, blockForVehicles);
            createElement('div', {id: 'block'+ objVehicles[i].url}, null, null, blockForVehicles);
        }

        buttonPeople.style.display = 'none';
        buttonPlanet.style.display = 'none';
        buttonVehicles.style.display = 'none';
        blockPlanet.style.display = 'none';
        blockPeople.style.display = 'none';
        blockVehicles.style.display = 'flex';
        buttonNext.style.display = 'block';
        buttonBack.style.display = 'block';
        buttonBack.addEventListener('click', turnBack);
        buttonNext.addEventListener('click', createNextBlockForVehicles);
    })
})

function createNextBlockForVehicles(){
    axios.get(nextUrlForVehicles)
    .then(result => {
        nextUrlForVehicles = result.data.next;
        const objVehicles = result.data.results;

        for(let i = 0; i < objVehicles.length; i++){
            const blockForVehicles = createElement('div', {classname: 'blockInfo'}, null, null, blockVehicles);
            createElement('div', {classname: 'listVehicles', id: objVehicles[i].url}, {click: moreInfVehicles}, objVehicles[i].name, blockForVehicles);
            createElement('div', {id: 'block'+ objVehicles[i].url}, null, null, blockForVehicles);
        }

        if(!nextUrlForVehicles){
            buttonNext.style.display = 'none';
        }

    })
}

function moreInfVehicles(event){
    const click = event.target.getAttribute('id');
    axios.get(click)
    .then(result => {
        const listVehiclesMoreInf = document.getElementById(`block${click}`);
        listVehiclesMoreInf.innerHTML = '';
        const vehiclesInf = result.data;

        createElement('div', null, null, 'cargo capacity:' + vehiclesInf.cargo_capacity, listVehiclesMoreInf);
        createElement('div', null, null, 'consumables:' + vehiclesInf.consumables, listVehiclesMoreInf);
        createElement('div', null, null, 'cost in credits:' + vehiclesInf.cost_in_credits, listVehiclesMoreInf);
        createElement('div', null, null, 'created:' + vehiclesInf.created, listVehiclesMoreInf);
        createElement('div', null, null, 'crew:' + vehiclesInf.crew, listVehiclesMoreInf);
        createElement('div', null, null, 'edited:' + vehiclesInf.edited, listVehiclesMoreInf);
        createElement('div', null, null, 'length:' + vehiclesInf.length, listVehiclesMoreInf);
        createElement('div', null, null, 'manufacturer:' + vehiclesInf.manufacturer, listVehiclesMoreInf);
        createElement('div', null, null, 'max atmosphering speed:' + vehiclesInf.max_atmosphering_speed, listVehiclesMoreInf);
        createElement('div', null, null, 'model:' + vehiclesInf.model, listVehiclesMoreInf);
        createElement('div', null, null, 'passengers:' + vehiclesInf.passengers, listVehiclesMoreInf);
        createElement('div', null, null, 'vehicle class:' + vehiclesInf.vehicle_class, listVehiclesMoreInf);

      const film = vehiclesInf.films;
      createArrFilms(film, click);

    const pilots = vehiclesInf.pilots;
    const pilotsName = 'pilots'; 
    createArrPromise(pilots, pilotsName, click);
    })
}

function createArrPromise(name, nameAttr, clicks){
    const listPeopleMoreInf = document.getElementById(`block${clicks}`);
    let newArr = [];
    for(let i = 0; i<name.length; i++){
        newArr.push(axios.get(name[i]));
    }

    if(newArr.length > 0){
    Promise.allSettled(newArr)
    .then((result) => {
     let arr = [];
     for(let i = 0; i < result.length; i++){
        arr.push(result[i].value.data.name);
    }
    createElement('div', null, null, `${nameAttr}: ` + arr.join(', '), listPeopleMoreInf);
   });
   }
    else{
        createElement('div', null, null, `${nameAttr}: doesn't have ` , listPeopleMoreInf);
    }
}

function turnBack(){
    buttonPlanet.style.display = 'block';
    buttonPeople.style.display = 'block';
    buttonVehicles.style.display = 'block';
    blockVehicles.style.display = 'none';
    blockPeople.style.display = 'none';
    blockPlanet.style.display = 'none';
    buttonNext.style.display = 'none';
    buttonBack.style.display = 'none';
}

function createArrFilms(film, click){
    const listPeopleMoreInf = document.getElementById(`block${click}`);
    let newArr = [];
    for(let i = 0; i<film.length; i++){
     newArr.push(axios.get(film[i]));
    }

    if(newArr.length > 0){
    Promise.allSettled(newArr)
    .then((result) => {
     let arrfilm = [];
     for(let i = 0; i < result.length; i++){
         arrfilm.push(result[i].value.data.title);
    }
    createElement('div', null, null, 'films:' + arrfilm.join(', '), listPeopleMoreInf);
 });
 }
 else{
    createElement('div', null, null, `films: doesn't have` , listPeopleMoreInf);
 }
}