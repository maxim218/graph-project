"use strict";

export default function createPoint(x, y) {
    x = parseInt(x);
    y = parseInt(y);

    if(!x) x = 0;
    if(!y) y = 0;

    return {x, y};
}