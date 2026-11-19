const spellElement = document.querySelector("#spells");
const levelSelectElement = document.querySelector("#spellLevel");
const schoolSelectElement = document.querySelector("#spellSchool");
const sourcesElement = document.querySelector("#spellSource");
const sortSelectElement = document.querySelector("#sortingStyle");
const inputElement = document.querySelector("#spellName");
const resetFiltersButton = document.querySelector("#resetFilters");
const spellCountElement = document.querySelector("#spellCount");

let clickedElement = null;
const setClickedElement = el => {clickedElement = el};
const getClickedElement = () => clickedElement;

export { 
    setClickedElement, 
    getClickedElement, 
    spellElement, 
    sortSelectElement, 
    schoolSelectElement, 
    sourcesElement,
    levelSelectElement, 
    inputElement, 
    resetFiltersButton,
    spellCountElement
};