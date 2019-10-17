"use strict";

import clearArray from "./clearArray";
import renderOtrArray from "./renderOtrArray";

export default function loadOtrMap(otrArr, canvasManager) {
    const name = prompt("Имя карты отрезков", "");
    const prefix = "785534822459213048310914578...";
    const finalName = prefix + name;

    const arrString = localStorage.getItem(finalName);

    if(arrString) {
        clearArray(otrArr);
        JSON.parse(arrString).forEach((element) => {
            otrArr.push(element);
        });
        canvasManager.drawBackground();
        renderOtrArray(otrArr, canvasManager);
        alert("Загрузка прошла успешно");
    } else {
        alert("Ошибка загрузки");
    }
}