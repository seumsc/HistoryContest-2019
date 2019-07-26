"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressDriver_1 = require("./driver/express/ExpressDriver");
var KoaDriver_1 = require("./driver/koa/KoaDriver");
var MetadataArgsStorage_1 = require("./metadata-builder/MetadataArgsStorage");
var RoutingControllers_1 = require("./RoutingControllers");
var importClassesFromDirectories_1 = require("./util/importClassesFromDirectories");
// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------
__export(require("./container"));
__export(require("./decorator/Authorized"));
__export(require("./decorator/Body"));
__export(require("./decorator/BodyParam"));
__export(require("./decorator/ContentType"));
__export(require("./decorator/Controller"));
__export(require("./decorator/CookieParam"));
__export(require("./decorator/CookieParams"));
__export(require("./decorator/Ctx"));
__export(require("./decorator/CurrentUser"));
__export(require("./decorator/Delete"));
__export(require("./decorator/Get"));
__export(require("./decorator/Head"));
__export(require("./decorator/Header"));
__export(require("./decorator/HeaderParam"));
__export(require("./decorator/HeaderParams"));
__export(require("./decorator/HttpCode"));
__export(require("./decorator/Interceptor"));
__export(require("./decorator/JsonController"));
__export(require("./decorator/Location"));
__export(require("./decorator/Method"));
__export(require("./decorator/Middleware"));
__export(require("./decorator/OnNull"));
__export(require("./decorator/OnUndefined"));
__export(require("./decorator/Param"));
__export(require("./decorator/Params"));
__export(require("./decorator/Patch"));
__export(require("./decorator/Post"));
__export(require("./decorator/Put"));
__export(require("./decorator/QueryParam"));
__export(require("./decorator/QueryParams"));
__export(require("./decorator/Redirect"));
__export(require("./decorator/Render"));
__export(require("./decorator/Req"));
__export(require("./decorator/Res"));
__export(require("./decorator/ResponseClassTransformOptions"));
__export(require("./decorator/Session"));
__export(require("./decorator/State"));
__export(require("./decorator/UploadedFile"));
__export(require("./decorator/UploadedFiles"));
__export(require("./decorator/UseAfter"));
__export(require("./decorator/UseBefore"));
__export(require("./decorator/UseInterceptor"));
__export(require("./http-error/HttpError"));
__export(require("./http-error/InternalServerError"));
__export(require("./http-error/BadRequestError"));
__export(require("./http-error/ForbiddenError"));
__export(require("./http-error/NotAcceptableError"));
__export(require("./http-error/MethodNotAllowedError"));
__export(require("./http-error/NotFoundError"));
__export(require("./http-error/UnauthorizedError"));
__export(require("./metadata-builder/MetadataArgsStorage"));
__export(require("./metadata/ActionMetadata"));
__export(require("./metadata/ControllerMetadata"));
__export(require("./metadata/InterceptorMetadata"));
__export(require("./metadata/MiddlewareMetadata"));
__export(require("./metadata/ParamMetadata"));
__export(require("./metadata/ResponseHandleMetadata"));
__export(require("./metadata/UseMetadata"));
__export(require("./driver/BaseDriver"));
__export(require("./driver/express/ExpressDriver"));
__export(require("./driver/koa/KoaDriver"));
// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------
/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
function getMetadataArgsStorage() {
    if (!global.routingControllersMetadataArgsStorage)
        global.routingControllersMetadataArgsStorage = new MetadataArgsStorage_1.MetadataArgsStorage();
    return global.routingControllersMetadataArgsStorage;
}
exports.getMetadataArgsStorage = getMetadataArgsStorage;
/**
 * Registers all loaded actions in your express application.
 */
function useExpressServer(expressApp, options) {
    var driver = new ExpressDriver_1.ExpressDriver(expressApp);
    return createServer(driver, options);
}
exports.useExpressServer = useExpressServer;
/**
 * Registers all loaded actions in your express application.
 */
function createExpressServer(options) {
    var driver = new ExpressDriver_1.ExpressDriver();
    return createServer(driver, options);
}
exports.createExpressServer = createExpressServer;
/**
 * Registers all loaded actions in your koa application.
 */
function useKoaServer(koaApp, options) {
    var driver = new KoaDriver_1.KoaDriver(koaApp);
    return createServer(driver, options);
}
exports.useKoaServer = useKoaServer;
/**
 * Registers all loaded actions in your koa application.
 */
function createKoaServer(options) {
    var driver = new KoaDriver_1.KoaDriver();
    return createServer(driver, options);
}
exports.createKoaServer = createKoaServer;
/**
 * Registers all loaded actions in your application using selected driver.
 */
function createServer(driver, options) {
    createExecutor(driver, options);
    return driver.app;
}
exports.createServer = createServer;
/**
 * Registers all loaded actions in your express application.
 */
function createExecutor(driver, options) {
    if (options === void 0) { options = {}; }
    // import all controllers and middlewares and error handlers (new way)
    var controllerClasses;
    if (options && options.controllers && options.controllers.length) {
        controllerClasses = options.controllers.filter(function (controller) { return controller instanceof Function; });
        var controllerDirs = options.controllers.filter(function (controller) { return typeof controller === "string"; });
        controllerClasses.push.apply(controllerClasses, importClassesFromDirectories_1.importClassesFromDirectories(controllerDirs));
    }
    var middlewareClasses;
    if (options && options.middlewares && options.middlewares.length) {
        middlewareClasses = options.middlewares.filter(function (controller) { return controller instanceof Function; });
        var middlewareDirs = options.middlewares.filter(function (controller) { return typeof controller === "string"; });
        middlewareClasses.push.apply(middlewareClasses, importClassesFromDirectories_1.importClassesFromDirectories(middlewareDirs));
    }
    var interceptorClasses;
    if (options && options.interceptors && options.interceptors.length) {
        interceptorClasses = options.interceptors.filter(function (controller) { return controller instanceof Function; });
        var interceptorDirs = options.interceptors.filter(function (controller) { return typeof controller === "string"; });
        interceptorClasses.push.apply(interceptorClasses, importClassesFromDirectories_1.importClassesFromDirectories(interceptorDirs));
    }
    if (options && options.development !== undefined) {
        driver.developmentMode = options.development;
    }
    else {
        driver.developmentMode = process.env.NODE_ENV !== "production";
    }
    if (options.defaultErrorHandler !== undefined) {
        driver.isDefaultErrorHandlingEnabled = options.defaultErrorHandler;
    }
    else {
        driver.isDefaultErrorHandlingEnabled = true;
    }
    if (options.classTransformer !== undefined) {
        driver.useClassTransformer = options.classTransformer;
    }
    else {
        driver.useClassTransformer = true;
    }
    if (options.validation !== undefined) {
        driver.enableValidation = !!options.validation;
        if (options.validation instanceof Object)
            driver.validationOptions = options.validation;
    }
    else {
        driver.enableValidation = true;
    }
    driver.classToPlainTransformOptions = options.classToPlainTransformOptions;
    driver.plainToClassTransformOptions = options.plainToClassTransformOptions;
    if (options.errorOverridingMap !== undefined)
        driver.errorOverridingMap = options.errorOverridingMap;
    if (options.routePrefix !== undefined)
        driver.routePrefix = options.routePrefix;
    if (options.currentUserChecker !== undefined)
        driver.currentUserChecker = options.currentUserChecker;
    if (options.authorizationChecker !== undefined)
        driver.authorizationChecker = options.authorizationChecker;
    driver.cors = options.cors;
    // next create a controller executor
    new RoutingControllers_1.RoutingControllers(driver, options)
        .initialize()
        .registerInterceptors(interceptorClasses)
        .registerMiddlewares("before", middlewareClasses)
        .registerControllers(controllerClasses)
        .registerMiddlewares("after", middlewareClasses); // todo: register only for loaded controllers?
}
exports.createExecutor = createExecutor;
/**
 * Registers custom parameter decorator used in the controller actions.
 */
function createParamDecorator(options) {
    return function (object, method, index) {
        getMetadataArgsStorage().params.push({
            type: "custom-converter",
            object: object,
            method: method,
            index: index,
            parse: false,
            required: options.required,
            transform: options.value
        });
    };
}
exports.createParamDecorator = createParamDecorator;

//# sourceMappingURL=index.js.map
