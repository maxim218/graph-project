"use strict";

const URL = "http://localhost:5005/way/find";
let DRAW_YELLOW_WAY = false;

function clearArray(arr) {
    while(arr.length) {
        arr.splice(0, 1);
    }
}

function renderResultArray(arr, canvasManager) {
    for(let i = 0; i < arr.length; i++) {
        if(i + 1 < arr.length) {
            const A = arr[i];
            const B = arr[i + 1];
            canvasManager.setLineWidth(4);
            canvasManager.drawLine(A.Px, A.Py, B.Px, B.Py, "#FF0000");
            canvasManager.setLineWidth(2);
        }
    }
}

function sendPost(url, body, callback) {
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

function getIntegerFromString(stringParam) {
    const value = parseInt(stringParam);
    if(!value) return 0;
    return value;
}

function renderOtrArray(otrArr, canvasManager) {
    otrArr.forEach((element) => {
        const pointFirst = element.A;
        const pointSecond = element.B;
        canvasManager.drawLine(pointFirst.x, pointFirst.y, pointSecond.x, pointSecond.y, "#0000FF");
    });
}

function equationOfLine(A, B) {
    if(equalFloat(A.y, B.y) === true) {
        return {
            k: 0,
            b: (A.y + B.y) / 2,
        };
    }

    const k = (A.y - B.y) / (A.x - B.x);
    const b = A.y - A.x * k;

    return {k, b};
}

function isMiddle(a, middle, b) {
    if(a <= middle && middle <= b) return true;
    if(b <= middle && middle <= a) return true;
    return false;
};

function equalFloat(a, b) {
    if(a === null || a === undefined || isNaN(a)) return false;
    if(b === null || b === undefined || isNaN(b)) return false;
    const eps = 0.1;
    if(a - eps <= b && b <= a + eps) return true;
    return false;
}

function lineSegmentsHit(AA, BB, CC, DD) {
    const A = JSON.parse(JSON.stringify(AA));
    const B = JSON.parse(JSON.stringify(BB));
    const C = JSON.parse(JSON.stringify(CC));
    const D = JSON.parse(JSON.stringify(DD));

    if(equalFloat(A.x, B.x) === true) {
        A.x += 0.15;
    }

    if(equalFloat(C.x, D.x) === true) {
        C.x += 0.15;
    }

    const otrFirst = equationOfLine(A, B);
    const otrSecond = equationOfLine(C, D);

    let deltaK = otrFirst.k - otrSecond.k;
    let deltaB = otrSecond.b - otrFirst.b;

    const x = deltaB / deltaK;
    const y = otrFirst.k * x + otrFirst.b;

    const f1 = isMiddle(A.x, x, B.x);
    const f2 = isMiddle(C.x, x, D.x);
    const f3 = isMiddle(A.y, y, B.y);
    const f4 = isMiddle(C.y, y, D.y);

    return (f1 && f2 && f3 && f4);
}

function equalPoints(A, B) {
    if(parseInt(A.x) !== parseInt(B.x)) return false;
    if(parseInt(A.y) !== parseInt(B.y)) return false;
    return true;
}

function hitOtrWall(mainOtrARG, otrArrARG) {
    const mainOtr = JSON.parse(JSON.stringify(mainOtrARG));
    const otrArr = JSON.parse(JSON.stringify(otrArrARG));

    for(let i = 0; i < otrArr.length; i++) {
        const otr = otrArr[i];
        if(lineSegmentsHit(otr.A, otr.B, mainOtr.A, mainOtr.B) === true) {
            const f1 = equalPoints(otr.A, mainOtr.A);
            const f2 = equalPoints(otr.A, mainOtr.B);
            const f3 = equalPoints(otr.B, mainOtr.A);
            const f4 = equalPoints(otr.B, mainOtr.B);

            if(f1) continue;
            if(f2) continue;
            if(f3) continue;
            if(f4) continue;

            return true;
        }
    }

    return false;
}

function distance(A, B) {
    const x = A.Px - B.Px;
    const y = A.Py - B.Py;
    return Math.sqrt(x * x + y * y);
}

function getWaysBetweenVertexes(pointsArr, otrArr) {
    const arr = [];

    pointsArr.forEach((first) => {
        pointsArr.forEach((second) => {
            const FIRST = JSON.parse(JSON.stringify(first));
            const SECOND = JSON.parse(JSON.stringify(second));

            const distanceValue = distance(FIRST, SECOND);
            const delta = 0.25;

            if(distanceValue > delta) {
                const A = {x: FIRST.Px, y: FIRST.Py};
                const B = {x: SECOND.Px, y: SECOND.Py};
                const otr = {A, B};
                const hitFlag = hitOtrWall(otr, otrArr);
                if(hitFlag === false) {
                    arr.push({
                        F: FIRST,
                        S: SECOND,
                    });
                }
            }
        });
    });

    return arr;
}

function deleteDublicatePoints(pointsArr) {
    const resultPointsArray = [];

    pointsArr.forEach((point) => {
        let includeFlag = false;

        resultPointsArray.forEach((ppp) => {
            if(point.Px === ppp.Px && point.Py === ppp.Py) {
                includeFlag = true;
            }
        });

        if(includeFlag === false) {
            resultPointsArray.push(point);
        }
    });

    return resultPointsArray;
}

function getPointsFromOtrArray(otrArrayARG) {
    const otrArray = JSON.parse(JSON.stringify(otrArrayARG));
    const pointsArray = [];

    otrArray.forEach((otr) => {
        const x1 = otr.A.x;
        const y1 = otr.A.y;

        pointsArray.push({
            Px: x1,
            Py: y1,
        });

        const x2 = otr.B.x;
        const y2 = otr.B.y;

        pointsArray.push({
            Px: x2,
            Py: y2,
        });
    });

    return pointsArray;
}

function createPoint(x, y) {
    x = parseInt(x);
    y = parseInt(y);

    if(!x) x = 0;
    if(!y) y = 0;

    return {x, y};
}

function log(s) {
    console.log(s);
}

class CanvasManager {
    constructor(can) {
        log("Create object from class CanvasManager");
        const holst = can.getContext('2d');
        this.holst = holst;
        holst.lineWidth = 2;
        this.drawBackground();
    }

    setLineWidth(value) {
        const holst = this.holst;
        holst.lineWidth = parseInt(value);
    }

    drawBackground() {
        const holst = this.holst;
        holst.clearRect(0, 0, 800, 600);
        holst.fillStyle = "#CCCCCC";
        holst.fillRect(0, 0, 800, 600);
    }

    drawLine(x1, y1, x2, y2, color) {
        const holst = this.holst;
        holst.strokeStyle = color;
        holst.beginPath();
        holst.moveTo(x1, y1);
        holst.lineTo(x2, y2);
        holst.closePath();
        holst.stroke();
    }

    drawRectangle(x, y, width, height, color) {
        const holst = this.holst;
        holst.fillStyle = color;
        holst.fillRect(x, y, width, height);
    }
}

function getAngle(A, B) {
    const xx = B.Px - A.Px;
    const yy = B.Py - A.Py;

    const xxx = 800;
    const yyy = 0;

    const scalar = xx * xxx + yy * yyy;
    console.log("scalar: " + scalar);

    const L1 = Math.sqrt(xx * xx + yy * yy);
    const L2 = Math.sqrt(xxx * xxx + yyy * yyy);
    console.log("L1: " + L1);
    console.log("L2: " + L2);

    const cosAngle = scalar / (L1 * L2);
    const angleRad = Math.acos(cosAngle);
    const angleGradus = angleRad * 180 / Math.PI;

    console.log("cosAngle: " + cosAngle);
    console.log("angleRad: " + angleRad);
    console.log("angleGradus: " + angleGradus);

    return angleRad;
}

window.onload = function() {
    log("Window load OK");
    const can = document.getElementById("can");

    const canvasManager = new CanvasManager(can);

    const otrArr = [];

    const mousePosObj = {
        x: 0,
        y: 0,
    };

    const START_POINT = {
        Px: 50,
        Py: 300,
    }

    const FINISH_POINT = {
        Px: 750,
        Py: 300,
    }

    function drawHeroAndFinish() {
        const Sx = getIntegerFromString(START_POINT.Px);
        const Sy = getIntegerFromString(START_POINT.Py);
        const Fx = getIntegerFromString(FINISH_POINT.Px);
        const Fy = getIntegerFromString(FINISH_POINT.Py);
        const size = 12;
        const part = size / 2;
        canvasManager.drawRectangle(Sx - part, Sy - part, size, size, "#FF0000");
        canvasManager.drawRectangle(Fx - part, Fy - part, size, size, "#FF0000");
    }

    function mainFunction() {
        ////
        canvasManager.drawBackground();
        ////
        canvasManager.drawBackground();
        ////
        let pointsArr = undefined;
        pointsArr = getPointsFromOtrArray(otrArr);
        pointsArr.push(START_POINT);
        pointsArr.push(FINISH_POINT);
        pointsArr = deleteDublicatePoints(pointsArr);
        ////
        canvasManager.drawBackground();
        ////
        const waysArr = getWaysBetweenVertexes(pointsArr, otrArr);
        waysArr.forEach((way) => {
            if(DRAW_YELLOW_WAY) canvasManager.drawLine(way.F.Px, way.F.Py, way.S.Px, way.S.Py, "#00FF00");
        });
        ////
        renderOtrArray(otrArr, canvasManager);
        ///
        drawHeroAndFinish();
        ///
        ///
        ///
        const wwwObject = {
            waysArr: waysArr,
            pointA: START_POINT,
            pointB: FINISH_POINT,
        };
        //
        //
        const url = URL;
        const body = JSON.stringify(wwwObject);
        //
        sendPost(url, body, (value) => {
            if(!value) {
                log("Ошибка при HTTP запросе");
            } else {
                log("Ответ от сервера со статусом 200");
                const arr = JSON.parse(value).arr;
                renderResultArray(arr, canvasManager);
                ////
                const angleRad = getAngle(START_POINT, arr[1]);

                let newPointX = 0;
                let newPointY = 0;

                const SIZE = 10;

                newPointX = START_POINT.Px + SIZE * Math.cos(angleRad);

                if(arr[1].Py >= START_POINT.Py)
                    newPointY = START_POINT.Py + SIZE * Math.sin(angleRad);
                else
                    newPointY = START_POINT.Py - SIZE * Math.sin(angleRad);

                newPointX = parseInt(newPointX);
                newPointY = parseInt(newPointY);
                
                canvasManager.drawLine(
                    START_POINT.Px, 
                    START_POINT.Py, 
                    newPointX,
                    newPointY,
                    "#FFFFFF"
                );

                START_POINT.Px = parseInt(newPointX);
                START_POINT.Py = parseInt(newPointY);

                console.log("START_POINT.Px: " + START_POINT.Px);
                console.log("START_POINT.Py: " + START_POINT.Py);
            };
        });
    }

    const name = prompt("Имя карты отрезков", "");
    const prefix = "785534822459213048310914578...";
    const finalName = prefix + name;

    const arrString = localStorage.getItem(finalName);

    let map = false;

    if(arrString) {
        clearArray(otrArr);
        JSON.parse(arrString).forEach((element) => {
            otrArr.push(element);
        });
        canvasManager.drawBackground();
        renderOtrArray(otrArr, canvasManager);
        alert("Загрузка прошла успешно");
        map = true;
    } else {
        alert("Ошибка загрузки");
    }

    let inter = setInterval(function() {
        if(map) mainFunction(null);
    }, 150);
}
