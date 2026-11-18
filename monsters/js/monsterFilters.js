import { inputElement, typeSelectElement, crSelectElement } from './domQueries.js';

function filtering(monsters) {
    const nameTerm = inputElement.value.trim().toLowerCase();
    const crTerm = crSelectElement.value;
    const typeTerm = typeSelectElement.value.trim().toLowerCase();

    const parseCr = s => {
    if (s.includes("/")) {
        const [n, d] = s.split("/").map(Number);
        return n / d;
    }
    return Number(s);
};

    const filtered = monsters.filter(monster => {
        const nameMatches = monster.name.toLowerCase().includes(nameTerm);
        const crMatches = crTerm === "" || monster.cr === parseCr(crTerm);
        const typeMatches = typeTerm === "" || monster.type.toLowerCase().includes(typeTerm);
        return nameMatches && crMatches && typeMatches;
    });
    return filtered
}

export { filtering }
