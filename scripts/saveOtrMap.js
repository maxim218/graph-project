"use strict";

export default function saveOtrMap(otrArr) {
    const name = prompt("Имя карты отрезков", "");

    if(name) {
        const prefix = "785534822459213048310914578...";
        const finalName = prefix + name;
        const arrString = JSON.stringify(otrArr);
        localStorage.setItem(finalName, arrString);
        alert("Сохранение прошло успешно");
    } else {
        alert("Сохранение отменено");
    }
}