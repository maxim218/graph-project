"use strict";

import createPoint from "./createPoint";
import log from "./log";

export default function addOtr(dictionary, otrArr, canvasManager) {
    const pointFirst = createPoint(dictionary["Ax"].value, dictionary["Ay"].value);
    const pointSecond = createPoint(dictionary["Bx"].value, dictionary["By"].value);

    otrArr.push({
        A: pointFirst,
        B: pointSecond,
    });

    canvasManager.drawLine(pointFirst.x, pointFirst.y, pointSecond.x, pointSecond.y, "#0000FF");
    
    log(`Create otr:  A(${pointFirst.x}, ${pointFirst.y})  B(${pointSecond.x}, ${pointSecond.y})`);
}
