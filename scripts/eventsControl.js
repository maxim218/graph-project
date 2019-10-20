"use strict";

import log from "./log";
import addOtr from "./addOtr";
import saveOtrMap from "./saveOtrMap";
import loadOtrMap from "./loadOtrMap";
import getWaysBetweenVertexesFull from "./getWaysBetweenVertexesFull";
import canvasMouseDownFunc from "./canvasMouseDownFunc";
import canvasMouseUpFunc from "./canvasMouseUpFunc";
import setStartFinishFunc from "./setStartFinishFunc";

export default function eventsControl(dictionary, canvasManager, otrArr) {
    log("Call eventsControl");

    dictionary["addOtrBtn"].onclick = () => {
        addOtr(dictionary, otrArr, canvasManager);
    };

    dictionary["saveOtrMap"].onclick = () => {
        saveOtrMap(otrArr);
    };

    dictionary["loadOtrMap"].onclick = () => {
        loadOtrMap(otrArr, canvasManager);
    };

    dictionary["getWaysBetweenVertexes"].onclick = () => {
        getWaysBetweenVertexesFull(otrArr, canvasManager, dictionary);
    };

    const mousePosObj = {
        x: 0,
        y: 0,
    };

    dictionary["can"].onmousedown = function(event) {
        canvasMouseDownFunc(event, mousePosObj);
    }

    dictionary["can"].onmouseup = function(event) {
        canvasMouseUpFunc(event, mousePosObj, dictionary);
    }

    dictionary["setStartAndFinishBtn"].onclick = function() {
        setStartFinishFunc(dictionary, canvasManager, otrArr);
    }
}
