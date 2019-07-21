"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//生成随机数集合
function RandomArr(range, num) {
    let arr = new Array(range).fill(0).map((currentvalue, index) => index + 1).sort(() => 0.5 - Math.random()).filter((currentvalue, index) => index < num);
    return arr;
}
exports.RandomArr = RandomArr;
//# sourceMappingURL=RandomArray.js.map