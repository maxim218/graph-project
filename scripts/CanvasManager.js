"use strict";

import log from "./log";

export default class CanvasManager {
    constructor(can) {
        log("Create object from class CanvasManager");
        const holst = can.getContext('2d');
        this.holst = holst;
        holst.lineWidth = 2;
        this.drawBackground();
    }

    drawBackground() {
        const holst = this.holst;
        holst.clearRect(0, 0, 800, 600);
        holst.fillStyle = "#CCCCCC";
        holst.fillRect(0, 0, 800, 600);
    }

    drawLine(x1, y1, x2, y2, color) {
        const holst = this.holst;
        holst.strokeStyle = color;
        holst.beginPath();
        holst.moveTo(x1, y1);
        holst.lineTo(x2, y2);
        holst.closePath();
        holst.stroke();
    }
}
