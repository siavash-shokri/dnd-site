import {setClickedElement, getClickedElement} from './domQueries.js';

function toggleClicked(elem) {

    if (getClickedElement() === elem) {
        elem.classList.remove("clicked");
        elem.querySelector(".statblock")?.remove();
        setClickedElement(null);
        return false;
    }    
    if (getClickedElement()) {
        getClickedElement().classList.remove("clicked");
        getClickedElement().querySelector(".statblock")?.remove();
    }
    setClickedElement(elem);
    elem.classList.add("clicked");
    return true;
}

export { toggleClicked };