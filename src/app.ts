import * as express from "express";
import {createConnection} from "typeorm";
import notificationsController from "./controllers/notifications";
import usersController from "./controllers/users";

// create typeorm connection
createConnection().then(connection => {
    // create and setup express app
    const app = express();
    app.use(express.json());

    // register routes
    app.use("/notifications", notificationsController);
    app.use("/users", usersController);

    // start express server
    app.listen(3000);
    console.log("Server started at: http://localhost:3000")
});
