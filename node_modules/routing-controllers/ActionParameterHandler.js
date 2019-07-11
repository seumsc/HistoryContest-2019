"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var BadRequestError_1 = require("./http-error/BadRequestError");
var ParameterParseJsonError_1 = require("./error/ParameterParseJsonError");
var ParamRequiredError_1 = require("./error/ParamRequiredError");
var AuthorizationRequiredError_1 = require("./error/AuthorizationRequiredError");
var CurrentUserCheckerNotDefinedError_1 = require("./error/CurrentUserCheckerNotDefinedError");
var isPromiseLike_1 = require("./util/isPromiseLike");
/**
 * Handles action parameter.
 */
var ActionParameterHandler = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ActionParameterHandler(driver) {
        this.driver = driver;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Handles action parameter.
     */
    ActionParameterHandler.prototype.handle = function (action, param) {
        var _this = this;
        if (param.type === "request")
            return action.request;
        if (param.type === "response")
            return action.response;
        if (param.type === "context")
            return action.context;
        // get parameter value from request and normalize it
        var value = this.normalizeParamValue(this.driver.getParamFromRequest(action, param), param);
        if (isPromiseLike_1.isPromiseLike(value))
            return value.then(function (value) { return _this.handleValue(value, action, param); });
        return this.handleValue(value, action, param);
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Handles non-promise value.
     */
    ActionParameterHandler.prototype.handleValue = function (value, action, param) {
        // if transform function is given for this param then apply it
        if (param.transform)
            value = param.transform(action, value);
        // if its current-user decorator then get its value
        if (param.type === "current-user") {
            if (!this.driver.currentUserChecker)
                throw new CurrentUserCheckerNotDefinedError_1.CurrentUserCheckerNotDefinedError();
            value = this.driver.currentUserChecker(action);
        }
        // check cases when parameter is required but its empty and throw errors in this case
        if (param.required) {
            var isValueEmpty = value === null || value === undefined || value === "";
            var isValueEmptyObject = value instanceof Object && Object.keys(value).length === 0;
            if (param.type === "body" && !param.name && (isValueEmpty || isValueEmptyObject)) {
                return Promise.reject(new ParamRequiredError_1.ParamRequiredError(action, param));
            }
            else if (param.type === "current-user") {
                if (isPromiseLike_1.isPromiseLike(value)) {
                    return value.then(function (currentUser) {
                        if (!currentUser)
                            return Promise.reject(new AuthorizationRequiredError_1.AuthorizationRequiredError(action));
                        return currentUser;
                    });
                }
                else {
                    if (!value)
                        return Promise.reject(new AuthorizationRequiredError_1.AuthorizationRequiredError(action));
                }
            }
            else if (param.name && isValueEmpty) {
                return Promise.reject(new ParamRequiredError_1.ParamRequiredError(action, param));
            }
        }
        return value;
    };
    /**
     * Normalizes parameter value.
     */
    ActionParameterHandler.prototype.normalizeParamValue = function (value, param) {
        if (value === null || value === undefined)
            return value;
        switch (param.targetName) {
            case "number":
                if (value === "")
                    return undefined;
                return +value;
            case "string":
                return value;
            case "boolean":
                if (value === "true" || value === "1") {
                    return true;
                }
                else if (value === "false" || value === "0") {
                    return false;
                }
                return !!value;
            case "date":
                var parsedDate = new Date(value);
                if (isNaN(parsedDate.getTime())) {
                    return Promise.reject(new BadRequestError_1.BadRequestError(param.name + " is invalid! It can't be parsed to date."));
                }
                return parsedDate;
            default:
                if (value && (param.parse || param.isTargetObject)) {
                    value = this.parseValue(value, param);
                    value = this.transformValue(value, param);
                    value = this.validateValue(value, param); // note this one can return promise
                }
        }
        return value;
    };
    /**
     * Parses string value into a JSON object.
     */
    ActionParameterHandler.prototype.parseValue = function (value, paramMetadata) {
        if (typeof value === "string") {
            try {
                return JSON.parse(value);
            }
            catch (error) {
                throw new ParameterParseJsonError_1.ParameterParseJsonError(paramMetadata.name, value);
            }
        }
        return value;
    };
    /**
     * Perform class-transformation if enabled.
     */
    ActionParameterHandler.prototype.transformValue = function (value, paramMetadata) {
        if (this.driver.useClassTransformer &&
            paramMetadata.targetType &&
            paramMetadata.targetType !== Object &&
            !(value instanceof paramMetadata.targetType)) {
            var options = paramMetadata.classTransform || this.driver.plainToClassTransformOptions;
            value = class_transformer_1.plainToClass(paramMetadata.targetType, value, options);
        }
        return value;
    };
    /**
     * Perform class-validation if enabled.
     */
    ActionParameterHandler.prototype.validateValue = function (value, paramMetadata) {
        var isValidationEnabled = (paramMetadata.validate instanceof Object || paramMetadata.validate === true)
            || (this.driver.enableValidation === true && paramMetadata.validate !== false);
        var shouldValidate = paramMetadata.targetType
            && (paramMetadata.targetType !== Object)
            && (value instanceof paramMetadata.targetType);
        if (isValidationEnabled && shouldValidate) {
            var options = paramMetadata.validate instanceof Object ? paramMetadata.validate : this.driver.validationOptions;
            return class_validator_1.validateOrReject(value, options)
                .then(function () { return value; })
                .catch(function (validationErrors) {
                var error = new BadRequestError_1.BadRequestError("Invalid " + paramMetadata.type + ", check 'errors' property for more info.");
                error.errors = validationErrors;
                error.paramName = paramMetadata.name;
                throw error;
            });
        }
        return value;
    };
    return ActionParameterHandler;
}());
exports.ActionParameterHandler = ActionParameterHandler;

//# sourceMappingURL=ActionParameterHandler.js.map
