"use strict";

import log from "./log";
import getElementsDictionary from "./getElementsDictionary";
import eventsControl from "./eventsControl";
import CanvasManager from "./CanvasManager";

window.onload = function() {
    log("Load window OK");

    const dictionary = getElementsDictionary([
        "Ax",
        "Ay",
        "Bx",
        "By",
        "addOtrBtn",
        "can",
        "saveOtrMap",
        "loadOtrMap",
        "getWaysBetweenVertexes",
        "stepFIRSTbox",
        "stepSECONDbox",
    ]);

    const canvasManager = new CanvasManager(dictionary["can"]);

    const otrArr = [];

    eventsControl(dictionary, canvasManager, otrArr);
}
