import {
    monsterElement, 
    crSelectElement, 
    resetFiltersButton,
    typeSelectElement, 
    sortSelectElement,inputElement
} from './domQueries.js';
import { loadMonsters } from './monsterData.js';
import { showMonsters } from './monsterDisplay.js';
import { filtering } from './monsterFilters.js';
import { sortList } from './listSorter.js'
import { resetAll } from './filterReset.js';
import { descriptionDisplay } from './monsterDescriptionDisplay.js';

let totalMonsters = []; 
const render = () => 
    showMonsters(sortList(filtering(totalMonsters)), totalMonsters.length);

inputElement.addEventListener("input", render);
crSelectElement.addEventListener("change", render);
typeSelectElement.addEventListener("change", render);
sortSelectElement.addEventListener("change", render);
resetFiltersButton.addEventListener("click", () => {
    resetAll();
    render();
});

loadMonsters().then(monsterList => {
    totalMonsters = monsterList; 
    render();
});

monsterElement.addEventListener("click", event => 
    descriptionDisplay(totalMonsters, event));
