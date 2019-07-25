"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Specifies a template to be rendered by a controller action.
 * Must be applied on a controller action.
 */
function Render(template) {
    return function (object, methodName) {
        index_1.getMetadataArgsStorage().responseHandlers.push({
            type: "rendered-template",
            target: object.constructor,
            method: methodName,
            value: template
        });
    };
}
exports.Render = Render;

//# sourceMappingURL=Render.js.map
