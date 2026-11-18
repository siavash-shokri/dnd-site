import { inputElement, schoolSelectElement, levelSelectElement, sortSelectElement } from './domQueries.js';

function resetAll() {
    levelSelectElement.value = "";
    schoolSelectElement.value = "";
    sortSelectElement.value = "nAscending";
    inputElement.value = "";
}

export { resetAll}