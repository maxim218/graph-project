"use strict";

import assert from 'assert';

import createPoint from "./../scripts/createPoint";
import isMiddle from "./../scripts/isMiddle";
import equalFloat from "./../scripts/equalFloat";
import lineSegmentsHit from "./../scripts/lineSegmentsHit";
import equationOfLine from "./../scripts/equationOfLine";
import clearArray from "./../scripts/clearArray";
import hitOtrWall from "./../scripts/hitOtrWall";
import getPointsFromOtrArray from "./../scripts/getPointsFromOtrArray";
import deleteDublicatePoints from "./../scripts/deleteDublicatePoints";
import distance from "./../scripts/distance";
import equalPoints from "./../scripts/equalPoints";

describe("Сравнение двух точек друг с другом", () => {
    it("Точки равны", () => {
        const A = {x: 45, y: 123};
        const B = {x: 45, y: 123};
        assert.deepStrictEqual(equalPoints(A, B), true);
    });

    it("Точки не равны", () => {
        const A = {x: 45, y: 123};
        const B = {x: 287, y: 15};
        assert.deepStrictEqual(equalPoints(A, B), false);
    });

    it("Точки не равны, хотя X одинаковая", () => {
        const A = {x: 100, y: 75};
        const B = {x: 100, y: 14};
        assert.deepStrictEqual(equalPoints(A, B), false);
    });

    it("Точки не равны, хотя Y одинаковая", () => {
        const A = {x: 123, y: 500};
        const B = {x: -67, y: 500}
        assert.deepStrictEqual(equalPoints(A, B), false);
    });
});

describe("Получение расстояния между точками", () => {
    it("Горизонтальный отрезок", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 5, Py: 1};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 3.0), true);
    });

    it("Вертикальный отрезок", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 2, Py: 5};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 4.0), true);
    });

    it("Отрезок под наклоном", () => {
        const A = {Px: 2, Py: 1};
        const B = {Px: 5, Py: 4};
        const d = distance(A, B);
        assert.deepStrictEqual(equalFloat(d, 4.24264), true);
    });
});

describe("Удаление дубликатов из массива точек", () => {
    it("Массив точек пустой", () => {
        const pointsArr = [];
        assert.deepStrictEqual(deleteDublicatePoints(pointsArr), []);
    });

    it("Массив точек не содержит дубликатов", () => {
        const pointsArr = [
            {Px: 10, Py: 20},
            {Px: 30, Py: 40},
            {Px: 50, Py: 60},
            {Px: 70, Py: 80},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(pointsArr), [
            {Px: 10, Py: 20},
            {Px: 30, Py: 40},
            {Px: 50, Py: 60},
            {Px: 70, Py: 80},
        ]);
    });

    it("Массив точек имеет дубликаты", () => {
        const pointsArr = [
            {Px: 10, Py: 20},
            {Px: 10, Py: 20},
            {Px: 10, Py: 20},
            {Px: 123, Py: 456},
            {Px: 123, Py: 456},
            {Px: 123, Py: 456},
            {Px: -9, Py: -7},
            {Px: -9, Py: -7},
            {Px: -9, Py: -7},
            {Px: 10, Py: 20},
            {Px: 30, Py: 40},
            {Px: 50, Py: 60},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(pointsArr), [
            {Px: 10, Py: 20},
            {Px: 123, Py: 456},
            {Px: -9, Py: -7},
            {Px: 30, Py: 40},
            {Px: 50, Py: 60},
        ]);
    });

    it("У всех одинаковая позиция X", () => {
        const pointsArr = [
            {Px: 1000, Py: -14},
            {Px: 1000, Py: 75},
            {Px: 1000, Py: 75},
            {Px: 1000, Py: 75},
            {Px: 1000, Py: -14},
            {Px: 1000, Py: -14},
            {Px: 1000, Py: -14},
            {Px: 1000, Py: 75},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(pointsArr), [
            {Px: 1000, Py: -14},
            {Px: 1000, Py: 75},
        ]);
    });

    it("У всех одинаковая позиция Y", () => {
        const pointsArr = [
            {Px: -25, Py: 5000},
            {Px: -8, Py: 5000},
            {Px: -25, Py: 5000},
            {Px: -8, Py: 5000},
            {Px: -25, Py: 5000},
            {Px: -8, Py: 5000},
        ];
        assert.deepStrictEqual(deleteDublicatePoints(pointsArr), [
            {Px: -25, Py: 5000},
            {Px: -8, Py: 5000},
        ]);
    });
});

describe("Получение всех точек из массива отрезков", () => {
    it("Массив отрезков пустой", () => {
        const otrArr = [];
        assert.deepStrictEqual(getPointsFromOtrArray(otrArr), []);
    });

    it("Массив отрезков имеет содержимое", () => {
        const arrString = `
            [{"A":{"x":100,"y":50},"B":{"x":200,"y":100}},
             {"A":{"x":100,"y":50},"B":{"x":50,"y":200}},
             {"A":{"x":200,"y":100},"B":{"x":50,"y":200}},
             {"A":{"x":350,"y":50},"B":{"x":450,"y":50}},
             {"A":{"x":450,"y":50},"B":{"x":450,"y":150}},
             {"A":{"x":450,"y":150},"B":{"x":350,"y":150}},
             {"A":{"x":350,"y":50},"B":{"x":350,"y":150}},
             {"A":{"x":50,"y":250},"B":{"x":350,"y":250}},
             {"A":{"x":50,"y":300},"B":{"x":350,"y":250}},
             {"A":{"x":50,"y":300},"B":{"x":50,"y":250}}]
        `;
        const otrArr = JSON.parse(arrString);

        assert.deepStrictEqual(getPointsFromOtrArray(otrArr), [
            {Px:100, Py:50},
            {Px:200, Py:100},
            {Px:100, Py:50},
            {Px:50, Py:200},
            {Px:200, Py:100},
            {Px:50, Py:200},
            {Px:350, Py:50},
            {Px:450, Py:50},
            {Px:450, Py:50},
            {Px:450, Py:150},
            {Px:450, Py:150},
            {Px:350, Py:150},
            {Px:350, Py:50},
            {Px:350, Py:150},
            {Px:50, Py:250},
            {Px:350, Py:250},
            {Px:50, Py:300},
            {Px:350, Py:250},
            {Px:50, Py:300},
            {Px:50, Py:250},
        ]);
    });
});

describe("Тестирование функции проверки пересечения отрезка с хотя бы одной стеной из массива", () => {
    it("Массив стен пустой", () => {
        const mainOtr = {
            A: {x: 10, y: 20},
            B: {x: 100, y: 200},
        }

        const otrArr = [];

        assert.deepStrictEqual(hitOtrWall(mainOtr, otrArr), false);
    });

    it("Есть пересечение с одной стенкой", () => {
        const arrString = `
            [{"A":{"x":100,"y":50},"B":{"x":200,"y":100}},{"A":{"x":100,"y":50},"B":{"x":50,"y":200}},{"A":{"x":200,"y":100},"B":{"x":50,"y":200}},{"A":{"x":350,"y":50},"B":{"x":450,"y":50}},{"A":{"x":450,"y":50},"B":{"x":450,"y":150}},{"A":{"x":450,"y":150},"B":{"x":350,"y":150}},{"A":{"x":350,"y":50},"B":{"x":350,"y":150}},{"A":{"x":50,"y":250},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":50,"y":250}}]
        `;
        const otrArr = JSON.parse(arrString);

        const mainOtr = {
            A: {x: 200, y: 50},
            B: {x: 125, y: 100},
        }

        assert.deepStrictEqual(hitOtrWall(mainOtr, otrArr), true);
    });

    it("Есть пересечение с двумя стенками", () => {
        const arrString = `
            [{"A":{"x":100,"y":50},"B":{"x":200,"y":100}},{"A":{"x":100,"y":50},"B":{"x":50,"y":200}},{"A":{"x":200,"y":100},"B":{"x":50,"y":200}},{"A":{"x":350,"y":50},"B":{"x":450,"y":50}},{"A":{"x":450,"y":50},"B":{"x":450,"y":150}},{"A":{"x":450,"y":150},"B":{"x":350,"y":150}},{"A":{"x":350,"y":50},"B":{"x":350,"y":150}},{"A":{"x":50,"y":250},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":50,"y":250}}]
        `;
        const otrArr = JSON.parse(arrString);

        const mainOtr = {
            A: {x: 300, y: 100},
            B: {x: 500, y: 100},
        }

        assert.deepStrictEqual(hitOtrWall(mainOtr, otrArr), true);
    });

    it("Нет пересечений со стенками", () => {
        const arrString = `
            [{"A":{"x":100,"y":50},"B":{"x":200,"y":100}},{"A":{"x":100,"y":50},"B":{"x":50,"y":200}},{"A":{"x":200,"y":100},"B":{"x":50,"y":200}},{"A":{"x":350,"y":50},"B":{"x":450,"y":50}},{"A":{"x":450,"y":50},"B":{"x":450,"y":150}},{"A":{"x":450,"y":150},"B":{"x":350,"y":150}},{"A":{"x":350,"y":50},"B":{"x":350,"y":150}},{"A":{"x":50,"y":250},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":350,"y":250}},{"A":{"x":50,"y":300},"B":{"x":50,"y":250}}]
        `;
        const otrArr = JSON.parse(arrString);

        const mainOtr = {
            A: {x: 175, y: 175},
            B: {x: 275, y: 225},
        }

        assert.deepStrictEqual(hitOtrWall(mainOtr, otrArr), false);
    });
});

describe("Тестирование функции очистки массива", () => {
    it("Передача массива чисел", () => {
        const arr = [10, 20, 30, 40, 50, 60, 1, 2, 3, 4, 5];
        clearArray(arr);
        assert.deepStrictEqual(arr, []);
    });

    it("Передача массива строк", () => {
        const arr = ["hello", "wonderful", "world"];
        clearArray(arr);
        assert.deepStrictEqual(arr, []);
    });

    it("Передача массива объектов", () => {
        const arr = [
            {abc: 100},
            {abc: 200},
            {abc: 500},
            {abc: 80},
            {abc: 45},
        ];
        clearArray(arr);
        assert.deepStrictEqual(arr, []);
    });

    it("Передача пустого массива", () => {
        const arr = [];
        clearArray(arr);
        assert.deepStrictEqual(arr, []);
    });
});

describe("Тестирование функции создания точки", () => {
    it("На вход идут целые числа", () => {
        assert.deepStrictEqual(createPoint(24, 17), {x: 24, y: 17});
        assert.deepStrictEqual(createPoint(-47, -123), {x: -47, y: -123});
        assert.deepStrictEqual(createPoint(16, 0), {x: 16, y: 0});
        assert.deepStrictEqual(createPoint(0, -4), {x: 0, y: -4});
    });

    it("На вход идут вещественные числа", () => {
        assert.deepStrictEqual(createPoint(3.7, 25.4), {x: 3, y: 25});
        assert.deepStrictEqual(createPoint(-68.4, -15.8), {x: -68, y: -15});
        assert.deepStrictEqual(createPoint(0.8, -2.9), {x: 0, y: -2});
    });

    it("На вход идут числа в формате строк", () => {
        assert.deepStrictEqual(createPoint("123", "56"), {x: 123, y: 56});
        assert.deepStrictEqual(createPoint("-567", "-123"), {x: -567, y: -123});
        assert.deepStrictEqual(createPoint("35.123", "89.456"), {x: 35, y: 89});
    });

    it("На вход идут некорректные данные", () => {
        assert.deepStrictEqual(createPoint("abcde", 12), {x: 0, y: 12});
        assert.deepStrictEqual(createPoint(45, "abcxyz"), {x: 45, y: 0});
        assert.deepStrictEqual(createPoint("abc", "xyz"), {x: 0, y: 0});
    });
});

describe("Тестирование функции проверки вхождения числа в числовой отрезок", () => {
    it("Входит в отрезок", () => {
        assert.deepStrictEqual(isMiddle(10, 20, 30), true);
        assert.deepStrictEqual(isMiddle(30, 20, 10), true);
        assert.deepStrictEqual(isMiddle(-8, -5, -1), true);
        assert.deepStrictEqual(isMiddle(-1, -5, -8), true);
    });

    it("Не входит в отрезок", () => {
        assert.deepStrictEqual(isMiddle(500, 600, 9), false);
        assert.deepStrictEqual(isMiddle(9, 600, 500), false);
        assert.deepStrictEqual(isMiddle(-12, 0, -17), false);
        assert.deepStrictEqual(isMiddle(-17, 0, -12), false);
    });
});

describe("Тестирование функции получения уравнения прямой", () => {
    it("Нет параллельности осям", () => {
        const A = {x: -5, y: 1};
        const B = {x: -1.5, y: 3};

        let obj = undefined;

        obj = equationOfLine(A, B);
        if(equalFloat(obj.k, 0.571) !== true) throw new Error();
        if(equalFloat(obj.b, 3.857) !== true) throw new Error();

        obj = equationOfLine(B, A);
        if(equalFloat(obj.k, 0.571) !== true) throw new Error();
        if(equalFloat(obj.b, 3.857) !== true) throw new Error();
    });

    it("Есть параллельность оси X", () => {
        const A = {x: -5, y: 7};
        const B = {x: 3.5, y: 7};

        let obj = undefined;

        obj = equationOfLine(A, B);
        if(equalFloat(obj.k, 0) !== true) throw new Error();
        if(equalFloat(obj.b, 7) !== true) throw new Error();

        obj = equationOfLine(B, A);
        if(equalFloat(obj.k, 0) !== true) throw new Error();
        if(equalFloat(obj.b, 7) !== true) throw new Error();
    });
});

describe("Тестирование функции пересечения отрезков", () => {
    it("Отрезки пересекаются", () => {
        const A = {x: 1, y: 2};
        const B = {x: 5, y: 3};

        const C = {x: 4, y: 5};
        const D = {x: 3, y: 1};

        assert.deepStrictEqual(lineSegmentsHit(A, B, C, D), true);
        assert.deepStrictEqual(lineSegmentsHit(B, A, C, D), true);
        assert.deepStrictEqual(lineSegmentsHit(A, B, D, C), true);
        assert.deepStrictEqual(lineSegmentsHit(B, A, D, C), true);

        assert.deepStrictEqual(lineSegmentsHit(C, D, A, B), true);
        assert.deepStrictEqual(lineSegmentsHit(C, D, B, A), true);
        assert.deepStrictEqual(lineSegmentsHit(D, C, A, B), true);
        assert.deepStrictEqual(lineSegmentsHit(D, C, B, A), true);
    });

    it("Отрезки не пересекаются", () => {
        const A = {x: 1, y: 2};
        const B = {x: 5, y: 3};

        const C = {x: 4, y: 5};
        const D = {x: 8.5, y: 2.5};

        assert.deepStrictEqual(lineSegmentsHit(A, B, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(A, B, D, C), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, D, C), false);

        assert.deepStrictEqual(lineSegmentsHit(C, D, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(C, D, B, A), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, B, A), false);
    });

    it("Оба отрезка параллельны оси X", () => {
        const A = {x: -5, y: 7};
        const B = {x: 3, y: 7};

        const C = {x: -4, y: 12};
        const D = {x: 2, y: 12};

        assert.deepStrictEqual(lineSegmentsHit(A, B, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(A, B, D, C), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, D, C), false);

        assert.deepStrictEqual(lineSegmentsHit(C, D, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(C, D, B, A), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, B, A), false);
    });

    it("Оба отрезка параллельны оси Y", () => {
        const A = {x: 2, y: 1};
        const B = {x: 2, y: 5};

        const C = {x: 4, y: 3};
        const D = {x: 4, y: 4};

        assert.deepStrictEqual(lineSegmentsHit(A, B, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, C, D), false);
        assert.deepStrictEqual(lineSegmentsHit(A, B, D, C), false);
        assert.deepStrictEqual(lineSegmentsHit(B, A, D, C), false);

        assert.deepStrictEqual(lineSegmentsHit(C, D, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(C, D, B, A), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, A, B), false);
        assert.deepStrictEqual(lineSegmentsHit(D, C, B, A), false);
    });

    it("Отрезки пересекаются. Один из отрезков параллелен оси Y", () => {
        const A = {x: 2, y: 1};
        const B = {x: 2, y: 5};

        const C = {x: 4, y: 3};
        const D = {x: 1, y: 2};

        assert.deepStrictEqual(lineSegmentsHit(A, B, C, D), true);
        assert.deepStrictEqual(lineSegmentsHit(B, A, C, D), true);
        assert.deepStrictEqual(lineSegmentsHit(A, B, D, C), true);
        assert.deepStrictEqual(lineSegmentsHit(B, A, D, C), true);

        assert.deepStrictEqual(lineSegmentsHit(C, D, A, B), true);
        assert.deepStrictEqual(lineSegmentsHit(C, D, B, A), true);
        assert.deepStrictEqual(lineSegmentsHit(D, C, A, B), true);
        assert.deepStrictEqual(lineSegmentsHit(D, C, B, A), true);

        assert.deepStrictEqual(A, {x: 2, y: 1});
        assert.deepStrictEqual(B, {x: 2, y: 5});
        assert.deepStrictEqual(C, {x: 4, y: 3});
        assert.deepStrictEqual(D, {x: 1, y: 2});
    });
});

describe("Тестирование функции сравнения вещественных чисел", () => {
    it("Передаются вещественные числа", () => {
        assert.deepStrictEqual(equalFloat(25.3, 25.37), true);
        assert.deepStrictEqual(equalFloat(25.37, 25.3), true);
        assert.deepStrictEqual(equalFloat(-17.8, -17.85), true);
        assert.deepStrictEqual(equalFloat(-17.85, -17.8), true);
        assert.deepStrictEqual(equalFloat(0, 0.09), true);
        assert.deepStrictEqual(equalFloat(0.09, 0), true);
        assert.deepStrictEqual(equalFloat(0, -0.09), true);
        assert.deepStrictEqual(equalFloat(-0.09, 0), true);

        assert.deepStrictEqual(equalFloat(1.0, 2.0), false);
        assert.deepStrictEqual(equalFloat(2.0, 1.0), false);
        assert.deepStrictEqual(equalFloat(15.4, 15.6), false);
        assert.deepStrictEqual(equalFloat(15.6, 15.4), false);
        assert.deepStrictEqual(equalFloat(-123.3, -123.5), false);
        assert.deepStrictEqual(equalFloat(-123.5, -123.3), false);
        assert.deepStrictEqual(equalFloat(0, 0.2), false);
        assert.deepStrictEqual(equalFloat(0.2, 0), false);
    });

    it("Передаются некорректные значения", () => {
        assert.deepStrictEqual(equalFloat(undefined, undefined), false);
        assert.deepStrictEqual(equalFloat(null, null), false);
        assert.deepStrictEqual(equalFloat(NaN, NaN), false);
        assert.deepStrictEqual(equalFloat(45, null), false);
        assert.deepStrictEqual(equalFloat(45, undefined), false);
        assert.deepStrictEqual(equalFloat(45, NaN), false);
        assert.deepStrictEqual(equalFloat(undefined, -5), false);
        assert.deepStrictEqual(equalFloat(null, -5), false);
        assert.deepStrictEqual(equalFloat(NaN, -5), false);
    });
});