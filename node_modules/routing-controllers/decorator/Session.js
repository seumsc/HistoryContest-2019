"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
function Session(optionsOrObjectName, paramOptions) {
    var propertyName;
    var options;
    if (typeof optionsOrObjectName === "string") {
        propertyName = optionsOrObjectName;
        options = paramOptions || {};
    }
    else {
        options = optionsOrObjectName || {};
    }
    return function (object, methodName, index) {
        index_1.getMetadataArgsStorage().params.push({
            type: "session",
            object: object,
            method: methodName,
            index: index,
            name: propertyName,
            parse: false,
            required: options.required !== undefined ? options.required : true,
            classTransform: options.transform,
            validate: options.validate !== undefined ? options.validate : false,
        });
    };
}
exports.Session = Session;

//# sourceMappingURL=Session.js.map
