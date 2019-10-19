"use strict";

export default function canvasMouseDownFunc(event, mousePosObj) {
    const xMouse = parseInt(event.offsetX);
    const yMouse = parseInt(event.offsetY);

    mousePosObj.x = parseInt(xMouse);
    mousePosObj.y = parseInt(yMouse);
}
