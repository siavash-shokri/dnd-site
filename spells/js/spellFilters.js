import { inputElement, schoolSelectElement, levelSelectElement } from './domQueries.js';

export function filtering(spells) {
    const nameTerm = inputElement.value.trim().toLowerCase();
    const levelTerm = levelSelectElement.value;
    const schoolTerm = schoolSelectElement.value.trim().toLowerCase();

    const filtered = spells.filter(spell => {
        const nameMatches = spell.name.toLowerCase().includes(nameTerm);
        const levelMatches = levelTerm === "" || spell.level === Number(levelTerm);
        const schoolMatches = schoolTerm === "" || spell.school.toLowerCase().includes(schoolTerm);
        return nameMatches && levelMatches && schoolMatches;
    });
    return filtered
}

