"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Defines a class as a JSON controller. If JSON controller is used, then all controller actions will return
 * a serialized json data, and its response content-type always will be application/json.
 *
 * @param baseRoute Extra path you can apply as a base route to all controller actions
 */
function JsonController(baseRoute) {
    return function (object) {
        index_1.getMetadataArgsStorage().controllers.push({
            type: "json",
            target: object,
            route: baseRoute
        });
    };
}
exports.JsonController = JsonController;

//# sourceMappingURL=JsonController.js.map
