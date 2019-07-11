"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if given value is a Promise-like object.
 */
function isPromiseLike(arg) {
    return arg != null && typeof arg === "object" && typeof arg.then === "function";
}
exports.isPromiseLike = isPromiseLike;

//# sourceMappingURL=isPromiseLike.js.map
