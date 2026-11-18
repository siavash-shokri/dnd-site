import {spellElement} from './domQueries.js';

export async function loadSpells() {
    try{    
        const response = await fetch('spells.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.spells;
    } catch (err) {
        alert(`Failed to load spells: ${err.message}`);
        spellElement.textContent = "Could not load the spells";
        return [];
    }
};
