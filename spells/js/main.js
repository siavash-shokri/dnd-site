import {
    spellElement, 
    levelSelectElement, 
    resetFiltersButton,
    schoolSelectElement, 
    sortSelectElement,inputElement,
    sourcesElement
} from './domQueries.js';
import { loadSpells } from './spellData.js';
import { showSpells } from './spellDisplay.js';
import { filtering } from './spellFilters.js';
import { sortList } from './listSorter.js'
import { resetAll } from './filterReset.js';
import { descriptionDisplay } from './spellDescriptionDisplay.js';
import { loadSources } from './sourceOptions.js'

let totalSpells = [];
const render = () => 
    showSpells(sortList(filtering(totalSpells)), totalSpells.length);

inputElement.addEventListener("input", render);
levelSelectElement.addEventListener("change", render);
schoolSelectElement.addEventListener("change", render);
sortSelectElement.addEventListener("change", render);
sourcesElement.addEventListener("change", render);
resetFiltersButton.addEventListener("click", () => {
    resetAll();
    render();
});

loadSpells().then(spellList => {
    totalSpells = spellList; 
    render();
    loadSources(spellList)
});

spellElement.addEventListener("click", event => 
    descriptionDisplay(totalSpells, event));
