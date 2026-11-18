import {monsterCountElement, monsterElement} from "./domQueries.js";



function updateMonsterCount (totalmonsters) {
    const visiblemonsters = monsterElement.childElementCount;
    if (visiblemonsters === 0) {
        monsterCountElement.textContent = "Woops! No monsters found. Try changing your filters.";
    } else {
        monsterCountElement.textContent = `showing ${visiblemonsters} of ${totalmonsters} monsters`;
    }
}

export { updateMonsterCount }