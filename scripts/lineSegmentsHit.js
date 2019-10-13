"use strict";

import equationOfLine from "./../scripts/equationOfLine";
import isMiddle from "./isMiddle";
import equalFloat from "./../scripts/equalFloat";

export default function lineSegmentsHit(AA, BB, CC, DD) {
    const A = JSON.parse(JSON.stringify(AA));
    const B = JSON.parse(JSON.stringify(BB));
    const C = JSON.parse(JSON.stringify(CC));
    const D = JSON.parse(JSON.stringify(DD));

    if(equalFloat(A.x, B.x) === true) {
        A.x += 0.15;
    }

    if(equalFloat(C.x, D.x) === true) {
        C.x += 0.15;
    }

    const otrFirst = equationOfLine(A, B);
    const otrSecond = equationOfLine(C, D);

    let deltaK = otrFirst.k - otrSecond.k;
    let deltaB = otrSecond.b - otrFirst.b;

    const x = deltaB / deltaK;
    const y = otrFirst.k * x + otrFirst.b;

    const f1 = isMiddle(A.x, x, B.x);
    const f2 = isMiddle(C.x, x, D.x);
    const f3 = isMiddle(A.y, y, B.y);
    const f4 = isMiddle(C.y, y, D.y);

    return (f1 && f2 && f3 && f4);
}
