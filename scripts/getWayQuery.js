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
        };
    });
}
