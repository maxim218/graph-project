"use strict";

import log from "./log";
import sendPost from "./sendPost";

export default function getWayQuery(wwwObject, dictionary, canvasManager, otrArr) {
    const urlPart = dictionary["adrHostField"].value;
    const url = urlPart + "/way/find";
    log("Query url: " + url);

    const body = JSON.stringify(wwwObject);

    sendPost(url, body, (value) => {
        if(!value) {
            log("Ошибка при HTTP запросе");
            alert("Ошибка при HTTP запросе");
        } else {
            log("Ответ от сервера со статусом 200");
            const arr = JSON.parse(value).arr;
            renderResultArray(arr);
        };
    });

    function renderResultArray(arr) {
        for(let i = 0; i < arr.length; i++) {
            if(i + 1 < arr.length) {
                const A = arr[i];
                const B = arr[i + 1];
                canvasManager.drawLine(A.Px, A.Py, B.Px, B.Py, "#FF0000");
            }
        }
    }
}
