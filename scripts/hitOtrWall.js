"use strict";

import lineSegmentsHit from "./lineSegmentsHit";
import equalPoints from "./equalPoints";

export default function hitOtrWall(mainOtrARG, otrArrARG) {
    const mainOtr = JSON.parse(JSON.stringify(mainOtrARG));
    const otrArr = JSON.parse(JSON.stringify(otrArrARG));

    for(let i = 0; i < otrArr.length; i++) {
        const otr = otrArr[i];
        if(lineSegmentsHit(otr.A, otr.B, mainOtr.A, mainOtr.B) === true) {
            const f1 = equalPoints(otr.A, mainOtr.A);
            const f2 = equalPoints(otr.A, mainOtr.B);
            const f3 = equalPoints(otr.B, mainOtr.A);
            const f4 = equalPoints(otr.B, mainOtr.B);

            if(f1) continue;
            if(f2) continue;
            if(f3) continue;
            if(f4) continue;

            return true;
        }
    }

    return false;
}
