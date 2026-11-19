import { inputElement, schoolSelectElement, levelSelectElement, sortSelectElement, sourcesElement } from './domQueries.js';

function resetAll() {
    levelSelectElement.value = "";
    schoolSelectElement.value = "";
    sortSelectElement.value = "nAscending";
    inputElement.value = "";
    sourcesElement.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.checked = false);
}

export { resetAll}