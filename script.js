let ulElement = document.querySelector("ul");
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
        ulElement.textContent = "Could not load the spells";
    }
}


function showSpells(array) {
    ulElement.replaceChildren();
    for (const spell of array) {
        let liElement = document.createElement("li");
        const levelOfSpell = spell.level === 0 ? "Cantrip" : `Level ${spell.level}`;
        liElement.textContent = `${spell.name} - ${levelOfSpell} - ${spell.school}`;
        ulElement.append(liElement);
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
