"use strict";

import distance from "./distance";
import hitOtrWall from "./hitOtrWall";

export default function getWaysBetweenVertexes(pointsArr, otrArr) {
    const arr = [];

    pointsArr.forEach((first) => {
        pointsArr.forEach((second) => {
            const FIRST = JSON.parse(JSON.stringify(first));
            const SECOND = JSON.parse(JSON.stringify(second));

            const distanceValue = distance(FIRST, SECOND);
            const delta = 0.25;

            if(distanceValue > delta) {
                const A = {x: FIRST.Px, y: FIRST.Py};
                const B = {x: SECOND.Px, y: SECOND.Py};
                const otr = {A, B};
                const hitFlag = hitOtrWall(otr, otrArr);
                if(hitFlag === false) {
                    arr.push({
                        F: FIRST,
                        S: SECOND,
                    });
                }
            }
        });
    });

    return arr;
}