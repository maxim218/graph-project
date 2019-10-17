"use strict";

import getElement from "./getElement";
import log from "./log";

export default function getElementsDictionary(idArr) {
    const dictionary = {};
    idArr.forEach((id) => {
        const element = getElement(id);
        dictionary[id] = element;
        log('Element in dictionary:  ' + id);
    });
    return dictionary;
}
