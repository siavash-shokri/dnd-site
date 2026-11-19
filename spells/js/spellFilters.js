import { inputElement, schoolSelectElement, levelSelectElement, sourcesElement } from './domQueries.js';

function filtering(spells) {
    const nameTerm = inputElement.value.trim().toLowerCase();
    const levelTerm = levelSelectElement.value;
    const schoolTerm = schoolSelectElement.value.trim().toLowerCase();

    const filtered = spells.filter(spell => {
        const nameMatches = spell.name.toLowerCase().includes(nameTerm);
        const levelMatches = levelTerm === "" || spell.level === Number(levelTerm);
        const schoolMatches = schoolTerm === "" || spell.school.toLowerCase().includes(schoolTerm);

        const checkedSources = [...sourcesElement.querySelectorAll("input:checked")].map(checkbox => checkbox.value);
        const sourceMatches = checkedSources.length === 0 || checkedSources.includes(spell.sourceId);

        return nameMatches && levelMatches && schoolMatches && sourceMatches;
    });
    return filtered
}

export {filtering}