"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Injects all request's query parameters to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
function QueryParams() {
    return function (object, methodName, index) {
        index_1.getMetadataArgsStorage().params.push({
            type: "queries",
            object: object,
            method: methodName,
            index: index,
            parse: false,
            required: false
        });
    };
}
exports.QueryParams = QueryParams;

//# sourceMappingURL=QueryParams.js.map
