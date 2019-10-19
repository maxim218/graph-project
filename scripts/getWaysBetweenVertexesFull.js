"use strict";

import getPointsFromOtrArray from "./getPointsFromOtrArray";
import deleteDublicatePoints from "./deleteDublicatePoints";
import getWaysBetweenVertexes from "./getWaysBetweenVertexes";
import renderOtrArray from "./renderOtrArray";

export default function getWaysBetweenVertexesFull(otrArr, canvasManager, dictionary) {
    dictionary["stepFIRSTbox"].hidden = true;
    dictionary["stepSECONDbox"].hidden = false;

    let pointsArr = undefined;
    
    pointsArr = getPointsFromOtrArray(otrArr);
    pointsArr = deleteDublicatePoints(pointsArr);

    const waysArr = getWaysBetweenVertexes(pointsArr, otrArr);

    waysArr.forEach((way) => {
        canvasManager.drawLine(way.F.Px, way.F.Py, way.S.Px, way.S.Py, "#00FF00");
    });

    renderOtrArray(otrArr, canvasManager);
}