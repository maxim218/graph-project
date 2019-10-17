"use strict";

import lineSegmentsHit from "./lineSegmentsHit";

export default function hitOtrWall(mainOtrARG, otrArrARG) {
    const mainOtr = JSON.parse(JSON.stringify(mainOtrARG));
    const otrArr = JSON.parse(JSON.stringify(otrArrARG));

    for(let i = 0; i < otrArr.length; i++) {
        const otr = otrArr[i];
        if(lineSegmentsHit(otr.A, otr.B, mainOtr.A, mainOtr.B) === true) {
            return true;
        }
    }

    return false;
}
