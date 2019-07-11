"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("../container");
/**
 * Controller metadata.
 */
var ControllerMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ControllerMetadata(args) {
        this.target = args.target;
        this.route = args.route;
        this.type = args.type;
    }
    Object.defineProperty(ControllerMetadata.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Gets instance of the controller.
         */
        get: function () {
            return container_1.getFromContainer(this.target);
        },
        enumerable: true,
        configurable: true
    });
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Builds everything controller metadata needs.
     * Controller metadata should be used only after its build.
     */
    ControllerMetadata.prototype.build = function (responseHandlers) {
        var authorizedHandler = responseHandlers.find(function (handler) { return handler.type === "authorized" && !handler.method; });
        this.isAuthorizedUsed = !!authorizedHandler;
        this.authorizedRoles = [].concat((authorizedHandler && authorizedHandler.value) || []);
    };
    return ControllerMetadata;
}());
exports.ControllerMetadata = ControllerMetadata;

//# sourceMappingURL=ControllerMetadata.js.map
