"use strict";

import log from "./log";
import addOtr from "./addOtr";
import saveOtrMap from "./saveOtrMap";
import loadOtrMap from "./loadOtrMap";

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
}