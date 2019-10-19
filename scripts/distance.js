"use strict";

export default function distance(A, B) {
    const x = A.Px - B.Px;
    const y = A.Py - B.Py;
    return Math.sqrt(x * x + y * y);
}
