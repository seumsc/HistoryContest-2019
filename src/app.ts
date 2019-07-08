import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { Face } from "./entity/Face";
import * as Koa from "koa";
import * as koa_logger from "koa-logger";
import { FaceController } from "./controller/FaceController";

// Config Dependency Injection
useContainer(Container);

const app: Koa = createKoaServer({
    controllers: [FaceController],
    validation: true,
    classTransformer: true,
    cors: true,
});

// Asynchronously configure app then start.
Promise.all([
    createConnection()
]).then(() => {
    app.use(koa_logger());
    app.listen(5000);
});

// createConnection().then(async connection => {


//     console.log("Loading faces from the database...");
//     const faces = await connection.getRepository(Face).find();
//     console.log("Loaded users: ", faces);

// }).catch(error => console.log(error));
