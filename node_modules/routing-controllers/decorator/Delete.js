"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Registers a controller method to be executed when DELETE request comes on a given route.
 * Must be applied on a controller action.
 */
function Delete(route) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().actions.push({
            type: "delete",
            target: object.constructor,
            method: methodName,
            route: route
        });
    };
}
exports.Delete = Delete;

//# sourceMappingURL=Delete.js.map
