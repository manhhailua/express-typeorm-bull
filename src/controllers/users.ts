import {Request, Response, Router} from "express";
import {clone} from "lodash";
import {getManager} from "typeorm";
import {User} from "../entities/User";
import notificationsQueue from "../worker/notifications";

const usersController = Router()


usersController.get("/", async function (req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    res.json(users);
});

usersController.get("/:id", async function (req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
});

usersController.post("/", async function (req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    await notificationsQueue.add({
        type: 'CREATE',
        payload: results,
    });
    return res.send(results);
});

usersController.put("/:id", async function (req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    const oldUser = clone(user);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    await notificationsQueue.add({
        type: 'UPDATE',
        payload: oldUser,
        meta: {
            new: results,
        },
    });
    return res.send(results);
});

usersController.delete("/:id", async function (req: Request, res: Response) {
    const userRepository = getManager().getRepository(User);
    const oldUser = await userRepository.findOne(req.params.id);
    const results = await userRepository.delete(req.params.id);
    await notificationsQueue.add({
        type: 'DELETE',
        payload: oldUser,
    });
    return res.send(results);
});

export default usersController;
