import { sortSelectElement } from "./domQueries.js";

function sortList (spells) {
    const selectValue = sortSelectElement.value
    if (!selectValue) return [...spells]; 
    const sortType = selectValue.substring(0, 1);
    const isDescending = selectValue.endsWith("Descending");

    const keyByType = {n: "name", l: "level", s: "school"}
    const key = keyByType[sortType]

    return [...spells].sort((a,b) => {
        const aVal = a[key];
        const bVal = b[key];
        if (key === "level") {
            const result = Number(aVal) - Number(bVal)
            return isDescending ? -result : result;
        } else {
            const result = aVal.localeCompare(bVal)
            return isDescending ? -result : result;
        }
    })



}

export { sortList }