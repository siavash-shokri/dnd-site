const monsterElement = document.querySelector("#monsters");
const crSelectElement = document.querySelector("#monsterCR");
const typeSelectElement = document.querySelector("#monsterType");
const sortSelectElement = document.querySelector("#sortingStyle");
const inputElement = document.querySelector("#monsterName");
const resetFiltersButton = document.querySelector("#resetFilters");
const monsterCountElement = document.querySelector("#monsterCount");

let clickedElement = null;
const setClickedElement = el => {clickedElement = el};
const getClickedElement = () => clickedElement;

export { 
    setClickedElement, 
    getClickedElement, 
    monsterElement, 
    sortSelectElement, 
    typeSelectElement, 
    crSelectElement, 
    inputElement, 
    resetFiltersButton,
    monsterCountElement
};