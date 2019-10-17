"use strict";

export default function getPointsFromOtrArray(otrArrayARG) {
    const otrArray = JSON.parse(JSON.stringify(otrArrayARG));
    const pointsArray = [];

    otrArray.forEach((otr) => {
        const x1 = otr.A.x;
        const y1 = otr.A.y;

        pointsArray.push({
            Px: x1,
            Py: y1,
        });

        const x2 = otr.B.x;
        const y2 = otr.B.y;

        pointsArray.push({
            Px: x2,
            Py: y2,
        });
    });

    return pointsArray;
}
