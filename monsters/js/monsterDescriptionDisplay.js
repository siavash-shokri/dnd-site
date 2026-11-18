import {toggleClicked} from './toggleClicking.js';
import {monsterElement} from './domQueries.js';

const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (className) node.classList.add(className);
    if (text != null) node.textContent = text;
    return node
};

const speedList = speed => {
    const parts = [];
    if (speed.walking != null) parts.push(`${speed.walking} ft.`);
    if (speed.flying != null) parts.push(`fly ${speed.flying} ft.`);
    if (speed.swimming != null) parts.push(`swim ${speed.swimming} ft.`);
    if (speed.climbing != null) parts.push(`climb ${speed.climbing} ft.`);
    if (speed.burrowing != null) parts.push(`burrow ${speed.burrowing} ft.`);
    return parts.join(", ")
};

const mod = n => (n >=0 ? `+${n}` : `${n}`)

const labeled = (label, value) => {
    const div = document.createElement("div");
    const strong = element("strong", `${label}: `);
    div.append(strong, document.createTextNode(value));
    return div
};

const buildStatblock = monster => {
    const block = element("div", null, "statblock");
    block.classList.add("description");

    block.append(element("h1", monster.name, "name"));

    const typeLine = `${monster.size} ${monster.type}`+
    (monster.subtype ? `(${monster.subtype})` : "") +
    `, ${monster.alignment}`;

    block.append(element("div", typeLine, "type"));

    block.append(labeled("AC", `${monster.armorClass} (${monster.armorType})`));
    block.append(labeled("HP", `${monster.hitPoints} (${monster.hitDice})`));
    block.append(labeled("Speed", speedList(monster.speed)));

    const abilities = element("div", null, "abilities");
    for (const [key, value] of Object .entries(monster.abilities)) {
        abilities.append(element("span", `${key} ${value} (${mod(Math.floor((value - 10) / 2))}), `));
    }
    block.append(abilities);

    const saves = 
    Object.entries(monster.savingThrows).map(([key, value]) => `${key} ${mod(value)}`).join(", ");
    if (saves) block.append(labeled("Saving Throw Profciencies", saves));

    const skills = 
    Object.entries(monster.skills).map(([key, value]) => `${key} ${mod(value)}`).join(", ");
    if (skills) block.append(labeled("Skill Profciencies", skills));

    if (monster.damageVulnerabilities.length) block.append(labeled("Damage Vulnerabilities", monster.damageVulnerabilities.join(", ")));
    if (monster.damageResistances.length) block.append(labeled("Damage Resistances", monster.damageResistances.join(", ")));
    if (monster.damageImmunities.length) block.append(labeled("Damage Immunities", monster.damageImmunities.join(", ")));
    if (monster.conditionImmunities.length) block.append(labeled("Condition Immunities", monster.conditionImmunities.join(", ")));

    const senses = 
    Object.entries(monster.senses).filter(([ , value]) => value != null)
    .map(([key, value]) => key === "passivePerception" ? `passive Perception ${value}` : `${key} ${value} ft.`).join(", ");
    if(senses) block.append(labeled("Senses", senses));

    const languages = [
        monster.languages.join(", "),
        monster.telepathy ? `telepathy ${monster.telepathy} ft.` : null
    ].filter(Boolean).join(", ");
    if(languages) block.append(labeled("Languages", languages));

    for (const trait of monster.traits) {
        const p = document.createElement("p");
        p.append(element("strong", `${trait.name}. `), document.createTextNode(trait.description));
        block.append(p)
    }

    if (monster.actions.length) {
        block.append(element("h2", "Actions", "section-title"));
        for (const action of monster.actions) {
            const p = document.createElement("p");
            p.append(element("strong", `${action.name}. `), document.createTextNode(action.description));
            block.append(p)
        }
    }

    return block;

};

function descriptionDisplay(monsterList, event) {
    const li = event.target.closest(".monsters");
    if (!li || !monsterElement.contains(li)) return;
    if (event.target.closest(".description")) return;

    const monster = monsterList.find(monster => monster.slug === li.dataset.monsterSlug);
    if (!monster) return;

    if (!toggleClicked(li)) return;
    li.append(buildStatblock(monster))
}

export { descriptionDisplay };