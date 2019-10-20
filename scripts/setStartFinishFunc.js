"use strict";

import getIntegerFromString from "./getIntegerFromString";
import getPointsFromOtrArray from "./getPointsFromOtrArray";
import deleteDublicatePoints from "./deleteDublicatePoints";
import getWaysBetweenVertexes from "./getWaysBetweenVertexes";
import renderOtrArray from "./renderOtrArray";

export default function setStartFinishFunc(dictionary, canvasManager, otrArr) {
    canvasManager.drawBackground();

    const Sx = getIntegerFromString(dictionary["Sx"].value);
    const Sy = getIntegerFromString(dictionary["Sy"].value);
    const Fx = getIntegerFromString(dictionary["Fx"].value);
    const Fy = getIntegerFromString(dictionary["Fy"].value);

    const size = 12;
    const part = size / 2;

    canvasManager.drawBackground();

    let pointsArr = undefined;
    pointsArr = getPointsFromOtrArray(otrArr);
    pointsArr.push({
        Px: Sx,
        Py: Sy,
    });
    pointsArr.push({
        Px: Fx,
        Py: Fy,
    });
    pointsArr = deleteDublicatePoints(pointsArr);

    canvasManager.drawBackground();

    const waysArr = getWaysBetweenVertexes(pointsArr, otrArr);

    waysArr.forEach((way) => {
        canvasManager.drawLine(way.F.Px, way.F.Py, way.S.Px, way.S.Py, "#00FF00");
    });

    renderOtrArray(otrArr, canvasManager);

    canvasManager.drawRectangle(Sx - part, Sy - part, size, size, "#FF0000");
    canvasManager.drawRectangle(Fx - part, Fy - part, size, size, "#FF0000");
}
