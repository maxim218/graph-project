"use strict";

export default function equalFloat(a, b) {
    if(a === null || a === undefined || isNaN(a)) return false;
    if(b === null || b === undefined || isNaN(b)) return false;
    const eps = 0.1;
    if(a - eps <= b && b <= a + eps) return true;
    return false;
}
