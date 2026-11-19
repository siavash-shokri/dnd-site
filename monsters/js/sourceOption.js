import { sourcesElement } from "./domQueries.js";

function makeSourceOption (source, sourceId) {
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.id = sourceId;
    newCheckBox.value = sourceId;

    const newCheckBoxLabel = document.createElement("label");
    newCheckBoxLabel.htmlFor = newCheckBox.id;
    newCheckBoxLabel.textContent = source;

    sourcesElement.append(newCheckBox, newCheckBoxLabel);
}

function loadSources (list) {
    const seen = new Set();
    for (const monster of list) {
        if(seen.has(monster.sourceId)) continue;

         makeSourceOption(monster.source, monster.sourceId);
         seen.add(monster.sourceId);
    }
}

export { loadSources }