"use strict";

export default function isMiddle(a, middle, b) {
    if(a <= middle && middle <= b) return true;
    if(b <= middle && middle <= a) return true;
    return false;
};
