import {toggleClicked} from './toggleClicking.js';
import {spellElement} from './domQueries.js';

function descriptionDisplay(spellList, event) {
    let li = event.target.closest(".spells");

    if (!li || !spellElement.contains(li)) return;
    if (event.target.closest(".description")) return;

    const spellName = li.dataset.spellName
    let clickedSpell = spellList.find(spell => spell.name === spellName);
    if (!clickedSpell) return;

    let isNowOpened = toggleClicked(li);

    if (!isNowOpened) return;

    const spellDetailElement = document.createElement("div");
    const spellDetailElementUl = document.createElement("ul");
    spellDetailElement.appendChild(spellDetailElementUl);
    spellDetailElement.classList.add("description");
    spellDetailElementUl.classList.add("descriptionUnorderedList");
    li.appendChild(spellDetailElement);

    spellDetailElementUl.replaceChildren();

    const details = [
        ["Name", clickedSpell.name],
        ["Classes", clickedSpell.classes.join(", ")],
        ["Casting Time", clickedSpell.castingTime],
        ["Range", clickedSpell.range],
        ["Duration", clickedSpell.duration],
    ];

    if(clickedSpell.damage) details.push(["Damage Roll", clickedSpell.damage]);
    if(clickedSpell.heal) details.push(["Heal Roll", clickedSpell.heal]);
    if(clickedSpell.savingThrow) details.push(["Saving Throw", clickedSpell.savingThrow]);
        
    const components = [];
    if(clickedSpell.concentration) components.push("C");
    if (clickedSpell.ritual) components.push("R");
    if (clickedSpell.verbal) components.push("V");
    if (clickedSpell.somatic) components.push("S");
    if (clickedSpell.materialComponents) components.push(`M: ${clickedSpell.materialComponents}`);

    details.push(["Components", components.join(", ") || "None"]);
    details.push(["Description", clickedSpell.description]);
    details.push(["Source", clickedSpell.source]);

    for (const [label, value] of details) {
        const detailLiElemnet = document.createElement("li")
        detailLiElemnet.textContent = `${label}: ${value}`
        spellDetailElementUl.append(detailLiElemnet)
    }
}

export { descriptionDisplay };