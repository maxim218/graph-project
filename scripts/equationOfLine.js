"use strict";

import equalFloat from "./../scripts/equalFloat";

export default function equationOfLine(A, B) {
    if(equalFloat(A.y, B.y) === true) {
        return {
            k: 0,
            b: (A.y + B.y) / 2,
        };
    }

    const k = (A.y - B.y) / (A.x - B.x);
    const b = A.y - A.x * k;

    return {k, b};
}
