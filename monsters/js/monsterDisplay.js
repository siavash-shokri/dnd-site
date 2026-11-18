import {monsterElement, setClickedElement} from './domQueries.js';
import { updateMonsterCount } from './monsterCount.js';

function showMonsters(array, arrayLength) {
    monsterElement.replaceChildren();
    setClickedElement(null);
    
    for (const monster of array) {
        let liElement = document.createElement("li");
        liElement.classList.add("monsters")
        liElement.dataset.monsterName = monster.name
        liElement.dataset.monsterSlug = monster.slug;
        
        const span = document.createElement('span');
        span.textContent = `${monster.name} - ${monster.cr} - ${monster.type}`;
        liElement.append(span);
        monsterElement.append(liElement);
    };

    updateMonsterCount(arrayLength);
}

export { showMonsters };
