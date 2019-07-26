"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ActionMetadata_1 = require("../metadata/ActionMetadata");
var ControllerMetadata_1 = require("../metadata/ControllerMetadata");
var InterceptorMetadata_1 = require("../metadata/InterceptorMetadata");
var MiddlewareMetadata_1 = require("../metadata/MiddlewareMetadata");
var ParamMetadata_1 = require("../metadata/ParamMetadata");
var ResponseHandleMetadata_1 = require("../metadata/ResponseHandleMetadata");
var UseMetadata_1 = require("../metadata/UseMetadata");
var index_1 = require("../index");
/**
 * Builds metadata from the given metadata arguments.
 */
var MetadataBuilder = /** @class */ (function () {
    function MetadataBuilder(options) {
        this.options = options;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Builds controller metadata from a registered controller metadata args.
     */
    MetadataBuilder.prototype.buildControllerMetadata = function (classes) {
        return this.createControllers(classes);
    };
    /**
     * Builds middleware metadata from a registered middleware metadata args.
     */
    MetadataBuilder.prototype.buildMiddlewareMetadata = function (classes) {
        return this.createMiddlewares(classes);
    };
    /**
     * Builds interceptor metadata from a registered interceptor metadata args.
     */
    MetadataBuilder.prototype.buildInterceptorMetadata = function (classes) {
        return this.createInterceptors(classes);
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Creates middleware metadatas.
     */
    MetadataBuilder.prototype.createMiddlewares = function (classes) {
        var middlewares = !classes ? index_1.getMetadataArgsStorage().middlewares : index_1.getMetadataArgsStorage().filterMiddlewareMetadatasForClasses(classes);
        return middlewares.map(function (middlewareArgs) { return new MiddlewareMetadata_1.MiddlewareMetadata(middlewareArgs); });
    };
    /**
     * Creates interceptor metadatas.
     */
    MetadataBuilder.prototype.createInterceptors = function (classes) {
        var interceptors = !classes ? index_1.getMetadataArgsStorage().interceptors : index_1.getMetadataArgsStorage().filterInterceptorMetadatasForClasses(classes);
        return interceptors.map(function (interceptorArgs) { return new InterceptorMetadata_1.InterceptorMetadata({
            target: interceptorArgs.target,
            method: undefined,
            interceptor: interceptorArgs.target
        }); });
    };
    /**
     * Creates controller metadatas.
     */
    MetadataBuilder.prototype.createControllers = function (classes) {
        var _this = this;
        var controllers = !classes ? index_1.getMetadataArgsStorage().controllers : index_1.getMetadataArgsStorage().filterControllerMetadatasForClasses(classes);
        return controllers.map(function (controllerArgs) {
            var controller = new ControllerMetadata_1.ControllerMetadata(controllerArgs);
            controller.build(_this.createControllerResponseHandlers(controller));
            controller.actions = _this.createActions(controller);
            controller.uses = _this.createControllerUses(controller);
            controller.interceptors = _this.createControllerInterceptorUses(controller);
            return controller;
        });
    };
    /**
     * Creates action metadatas.
     */
    MetadataBuilder.prototype.createActions = function (controller) {
        var _this = this;
        return index_1.getMetadataArgsStorage()
            .filterActionsWithTarget(controller.target)
            .map(function (actionArgs) {
            var action = new ActionMetadata_1.ActionMetadata(controller, actionArgs, _this.options);
            action.params = _this.createParams(action);
            action.uses = _this.createActionUses(action);
            action.interceptors = _this.createActionInterceptorUses(action);
            action.build(_this.createActionResponseHandlers(action));
            return action;
        });
    };
    /**
     * Creates param metadatas.
     */
    MetadataBuilder.prototype.createParams = function (action) {
        var _this = this;
        return index_1.getMetadataArgsStorage()
            .filterParamsWithTargetAndMethod(action.target, action.method)
            .map(function (paramArgs) { return new ParamMetadata_1.ParamMetadata(action, _this.decorateDefaultParamOptions(paramArgs)); });
    };
    /**
     * Decorate paramArgs with default settings
     */
    MetadataBuilder.prototype.decorateDefaultParamOptions = function (paramArgs) {
        var options = this.options.defaults && this.options.defaults.paramOptions;
        if (!options)
            return paramArgs;
        if (paramArgs.required === undefined)
            paramArgs.required = options.required || false;
        return paramArgs;
    };
    /**
     * Creates response handler metadatas for action.
     */
    MetadataBuilder.prototype.createActionResponseHandlers = function (action) {
        return index_1.getMetadataArgsStorage()
            .filterResponseHandlersWithTargetAndMethod(action.target, action.method)
            .map(function (handlerArgs) { return new ResponseHandleMetadata_1.ResponseHandlerMetadata(handlerArgs); });
    };
    /**
     * Creates response handler metadatas for controller.
     */
    MetadataBuilder.prototype.createControllerResponseHandlers = function (controller) {
        return index_1.getMetadataArgsStorage()
            .filterResponseHandlersWithTarget(controller.target)
            .map(function (handlerArgs) { return new ResponseHandleMetadata_1.ResponseHandlerMetadata(handlerArgs); });
    };
    /**
     * Creates use metadatas for actions.
     */
    MetadataBuilder.prototype.createActionUses = function (action) {
        return index_1.getMetadataArgsStorage()
            .filterUsesWithTargetAndMethod(action.target, action.method)
            .map(function (useArgs) { return new UseMetadata_1.UseMetadata(useArgs); });
    };
    /**
     * Creates use interceptors for actions.
     */
    MetadataBuilder.prototype.createActionInterceptorUses = function (action) {
        return index_1.getMetadataArgsStorage()
            .filterInterceptorUsesWithTargetAndMethod(action.target, action.method)
            .map(function (useArgs) { return new InterceptorMetadata_1.InterceptorMetadata(useArgs); });
    };
    /**
     * Creates use metadatas for controllers.
     */
    MetadataBuilder.prototype.createControllerUses = function (controller) {
        return index_1.getMetadataArgsStorage()
            .filterUsesWithTargetAndMethod(controller.target, undefined)
            .map(function (useArgs) { return new UseMetadata_1.UseMetadata(useArgs); });
    };
    /**
     * Creates use interceptors for controllers.
     */
    MetadataBuilder.prototype.createControllerInterceptorUses = function (controller) {
        return index_1.getMetadataArgsStorage()
            .filterInterceptorUsesWithTargetAndMethod(controller.target, undefined)
            .map(function (useArgs) { return new InterceptorMetadata_1.InterceptorMetadata(useArgs); });
    };
    return MetadataBuilder;
}());
exports.MetadataBuilder = MetadataBuilder;

//# sourceMappingURL=MetadataBuilder.js.map
