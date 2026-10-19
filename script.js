const acidSplash = {
    name: "Acid Splash",
    level: 0,
    school: "Conjuration",
};

const chillTouch = {
    name: "Chill Touch",
    level: 0,
    school: "Necromancy",
};

const fireBolt = {
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
};

const beaconOfHope = {
    name: "Beacon of Hope",
    level: 3,
    school: "Abjuration",
};

const imprisonment = {
    name: "Imprisonment",
    level: 9,
    school: "Abjuration",
};

const spells = [acidSplash, chillTouch, fireBolt, beaconOfHope, imprisonment];

let ulElement = document.querySelector("ul");


function showSpells(array) {
    ulElement.replaceChildren()
    for (let i = 0; i < array.length; i++) {
        let liElement = document.createElement("li")
        liElement.textContent = array[i].name
        ulElement.append(liElement)
    }
};

showSpells(spells);

let inputElement = document.querySelector("input");

function findNames() {
    const searchTerm = this.value.toLowerCase();
    const searchedSpellsNames = spells.filter(item => item.name.toLowerCase().includes(searchTerm));
    showSpells(searchedSpellsNames);
};

inputElement.addEventListener("input", findNames);
