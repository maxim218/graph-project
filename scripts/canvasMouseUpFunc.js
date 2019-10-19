"use strict";

export default function canvasMouseUpFunc(event, mousePosObj, dictionary) {
    const beforeX = parseInt(mousePosObj.x);
    const beforeY = parseInt(mousePosObj.y);

    const afterX = parseInt(event.offsetX);
    const afterY = parseInt(event.offsetY);

    mousePosObj.x = 0;
    mousePosObj.y = 0;

    dictionary["Ax"].value = beforeX;
    dictionary["Ay"].value = beforeY;
    dictionary["Bx"].value = afterX;
    dictionary["By"].value = afterY;
}
