"use strict";

export default function clearArray(arr) {
    while(arr.length) {
        arr.splice(0, 1);
    }
}
