import {spellElement, setClickedElement} from './domQueries.js';
import { updateSpellCount } from './spellCount.js';

function showSpells(array, arrayLength) {
    spellElement.replaceChildren();
    setClickedElement(null);
    
    for (const spell of array) {
        let liElement = document.createElement("li");
        const levelOfSpell = spell.level === 0 ? "Cantrip" : `Level ${spell.level}`;
        const spellLiElementsClass = liElement.classList;
        spellLiElementsClass.add("spells")
        liElement.dataset.spellName = spell.name
        
        const span = document.createElement('span');
        span.textContent = `${spell.name} - ${levelOfSpell} - ${spell.school}`;
        liElement.append(span);
        spellElement.append(liElement);
    };

    updateSpellCount(arrayLength);
}

export { showSpells };
