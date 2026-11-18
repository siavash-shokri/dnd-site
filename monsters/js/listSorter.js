import { sortSelectElement } from "./domQueries.js";

function sortList(monsters) {
    const selectValue = sortSelectElement.value
    if (!selectValue) return [...monsters]; 

    const sortType = selectValue.substring(0, 1);
    const isDescending = selectValue.endsWith("Descending");

    const keyByType = {n: "name", c: "cr", t: "type"}
    const key = keyByType[sortType]

    return [...monsters].sort((a,b) => {
        const aVal = a[key];
        const bVal = b[key];
        let result;
        if (key === "cr") {
            result = Number(aVal) - Number(bVal)
        } else {
            result = aVal.localeCompare(bVal)
        }
        return isDescending ? -result : result;
    })



}

export { sortList }