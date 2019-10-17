"use strict";

export default function deleteDublicatePoints(pointsArr) {
    const resultPointsArray = [];

    pointsArr.forEach((point) => {
        let includeFlag = false;

        resultPointsArray.forEach((ppp) => {
            if(point.Px === ppp.Px && point.Py === ppp.Py) {
                includeFlag = true;
            }
        });

        if(includeFlag === false) {
            resultPointsArray.push(point);
        }
    });

    return resultPointsArray;
}
