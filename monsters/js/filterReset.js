import { inputElement, typeSelectElement, crSelectElement, sourcesElement, sortSelectElement } from './domQueries.js';

function resetAll() {
    crSelectElement.value = "";
    typeSelectElement.value = "";
    sortSelectElement.value = "nAscending";
    inputElement.value = "";
    sourcesElement.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.checked = false);
}

export { resetAll }