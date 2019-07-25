"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Injects all request's route parameters to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
function Params() {
    return function (object, methodName, index) {
        index_1.getMetadataArgsStorage().params.push({
            type: "params",
            object: object,
            method: methodName,
            index: index,
            parse: false,
            required: false,
            classTransform: undefined
        });
    };
}
exports.Params = Params;

//# sourceMappingURL=Params.js.map
