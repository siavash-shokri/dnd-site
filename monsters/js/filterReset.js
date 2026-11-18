import { inputElement, typeSelectElement, crSelectElement, sortSelectElement } from './domQueries.js';

function resetAll() {
    crSelectElement.value = "";
    typeSelectElement.value = "";
    sortSelectElement.value = "nAscending";
    inputElement.value = "";
}

export { resetAll }