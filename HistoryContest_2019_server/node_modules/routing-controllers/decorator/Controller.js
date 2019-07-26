"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param baseRoute Extra path you can apply as a base route to all controller actions
 */
function Controller(baseRoute) {
    return function (object) {
        index_1.getMetadataArgsStorage().controllers.push({
            type: "default",
            target: object,
            route: baseRoute
        });
    };
}
exports.Controller = Controller;

//# sourceMappingURL=Controller.js.map
