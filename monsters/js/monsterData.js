import {monsterElement} from './domQueries.js';

async function loadMonsters() {
    try{    
        const response = await fetch('monsters.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.monsters;
    } catch (err) {
        alert(`Failed to load monsters: ${err.message}`);
        monsterElement.textContent = "Could not load the monsters";
        return [];
    }
};

export { loadMonsters }