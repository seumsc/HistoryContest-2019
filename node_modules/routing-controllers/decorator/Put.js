"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
function Put(route) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().actions.push({
            type: "put",
            target: object.constructor,
            method: methodName,
            route: route
        });
    };
}
exports.Put = Put;

//# sourceMappingURL=Put.js.map
