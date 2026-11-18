import {spellCountElement, spellElement} from "./domQueries.js";



function updateSpellCount (totalSpells) {
    const visibleSpells = spellElement.childElementCount;
    if (visibleSpells === 0) {
        spellCountElement.textContent = "Woops! No spells found. Try changing your filters.";
    } else {
        spellCountElement.textContent = `showing ${visibleSpells} of ${totalSpells} spells`;
    }
}

export { updateSpellCount }