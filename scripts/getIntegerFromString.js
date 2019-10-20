"use strict";

export default function getIntegerFromString(stringParam) {
    const value = parseInt(stringParam);
    if(!value) return 0;
    return value;
}
