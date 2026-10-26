let spellElement = document.querySelector("#spells");
let selectElement = document.querySelector("#spellLevel");
let inputElement = document.querySelector("input");

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

function showSpellDetail (li, spell) {
    const previousDesc = spellElement.querySelector(".description") 
    if (previousDesc) previousDesc.remove()
    
    if (li.classList[1] === "clicked") {
        li.classList.remove("clicked");
    } else {
        const previous = spellElement.querySelector(".clicked");
        if (previous) previous.classList.remove("clicked");

        li.classList.add("clicked");

        const spellDetailElement = document.createElement("ul");
        spellDetailElement.classList.add("description");
        li.insertAdjacentElement("afterend", spellDetailElement );

        if(!spell) return;
        spellDetailElement.replaceChildren();

        const details = [
            ["Name", spell.name],
            ["Classes", spell.classes.join(", ")],
            ["Casting Time", spell.castingTime],
            ["Range", spell.range],
            ["Duration", spell.duration],
        ];

        if(spell.damage) details.push(["Damage Roll", spell.damage]);
        if(spell.heal) details.push(["Heal Roll", spell.heal]);
        if(spell.savingThrow) details.push(["Saving Throw", spell.savingThrow]);
        
        const components = [];
        if(spell.concentration) components.push("C");
        if (spell.ritual) components.push("R");
        if (spell.verbal) components.push("V");
        if (spell.somatic) components.push("S");
        if (spell.materialComponents) components.push(`M: ${spell.materialComponents}`);

        details.push(["Components", components.join(", ") || "None"]);
        details.push(["Description", spell.description]);
        details.push(["Source", spell.source]);

        for (const [label, value] of details) {
            const detailLiElemnet = document.createElement("li")
            detailLiElemnet.textContent = `${label}: ${value}`
            spellDetailElement.append(detailLiElemnet)
        }
    }
}


function showSpells(array) {
    spellElement.replaceChildren();

    for (const spell of array) {
        let liElement = document.createElement("li");
        const levelOfSpell = spell.level === 0 ? "Cantrip" : `Level ${spell.level}`;
        liElement.textContent = `${spell.name} - ${levelOfSpell} - ${spell.school}`;
        liElement.addEventListener("click", () => showSpellDetail(liElement, spell));
        const spellLiElementsClass = liElement.classList;
        spellLiElementsClass.add("spells")
        spellElement.append(liElement);
    };
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

