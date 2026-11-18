let spellElement = document.querySelector("#spells");
let selectElement = document.querySelector("#spellLevel");
let inputElement = document.querySelector("input");
let clickedElement;
let spells = [];

async function loadSpells() {
    try{    
        const response = await fetch('spells.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        spells = data.spells;
        filtering();
    } catch (err) {
        alert(`Failed to load spells: ${err.message}`);
        spellElement.textContent = "Could not load the spells";
    }
}

function showSpells(array) {
    spellElement.replaceChildren();
    clickedElement = null;
    for (const spell of array) {
        let liElement = document.createElement("li");
        const levelOfSpell = spell.level === 0 ? "Cantrip" : `Level ${spell.level}`;
        liElement.textContent = `${spell.name} - ${levelOfSpell} - ${spell.school}`;
        const spellLiElementsClass = liElement.classList;
        spellLiElementsClass.add("spells")
        liElement.dataset.spellName = spell.name
        spellElement.append(liElement);
    };

    for (let li of spellElement.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
    }
}

function filtering() {
    const nameTerm = inputElement.value.trim().toLowerCase();
    const levelTerm = selectElement.value;

    const filtered = spells.filter(spell => {
        const nameMatches = spell.name.toLowerCase().includes(nameTerm);
        const levelMatches = levelTerm === "" || spell.level === Number(levelTerm);
        return nameMatches && levelMatches;
    });
    showSpells(filtered)
}

inputElement.addEventListener("input", filtering);
selectElement.addEventListener("change", filtering);

loadSpells();

spellElement.onclick = function(event) {
    let li = event.target.closest(".spells");

    if (!li || !spellElement.contains(li)) return;
    if (event.target.closest(".description")) return;

    const spellName = li.dataset.spellName
    let clickedSpell = spells.find(spell => spell.name === spellName);
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

function toggleClicked(elem) {

    if (clickedElement === elem) {
        elem.classList.remove("clicked");
        elem.querySelector(".description")?.remove();
        clickedElement = null;
        return false;
    }    
    if (clickedElement) {
        clickedElement.classList.remove("clicked");
        clickedElement.querySelector(".description")?.remove();
    }
    clickedElement = elem;
    elem.classList.add("clicked");
    return true;
}

