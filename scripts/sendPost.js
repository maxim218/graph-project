"use strict";

import log from "./log";

export default function sendPost(url, body, callback) {
    let r = new XMLHttpRequest();
    r.open("POST", url, true);
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    r.send(body);
    r.onreadystatechange = function() {
        log("Server query state: " + r.readyState);
        if(r.readyState === 4) {
            if(r.status === 200) {
                callback(r.responseText);
                r = null;
            } else {
                callback(null);
                r = null;
            }
        } 
    }
}
