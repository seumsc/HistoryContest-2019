"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = require("./HttpError");
/**
 * Exception for todo HTTP error.
 */
var MethodNotAllowedError = /** @class */ (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError(message) {
        var _this = _super.call(this, 405) || this;
        _this.name = "MethodNotAllowedError";
        Object.setPrototypeOf(_this, MethodNotAllowedError.prototype);
        if (message)
            _this.message = message;
        return _this;
    }
    return MethodNotAllowedError;
}(HttpError_1.HttpError));
exports.MethodNotAllowedError = MethodNotAllowedError;

//# sourceMappingURL=MethodNotAllowedError.js.map
