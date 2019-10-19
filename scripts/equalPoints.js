"use strict";

export default function equalPoints(A, B) {
    if(parseInt(A.x) !== parseInt(B.x)) return false;
    if(parseInt(A.y) !== parseInt(B.y)) return false;
    return true;
}
