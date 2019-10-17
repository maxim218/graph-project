"use strict";

export default function renderOtrArray(otrArr, canvasManager) {
    otrArr.forEach((element) => {
        const pointFirst = element.A;
        const pointSecond = element.B;
        canvasManager.drawLine(pointFirst.x, pointFirst.y, pointSecond.x, pointSecond.y, "#0000FF");
    });
}
