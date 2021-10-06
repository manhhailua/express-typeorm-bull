import {Request, Response, Router} from "express";
import {getManager} from "typeorm";
import {Notification} from "../entities/Notification";

const notificationsController = Router()


notificationsController.get("/", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const users = await notificationRepository.find();
    res.json(users);
});

notificationsController.get("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const results = await notificationRepository.findOne(req.params.id);
    return res.send(results);
});

notificationsController.post("/", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const user = await notificationRepository.create(req.body);
    const results = await notificationRepository.save(user);
    return res.send(results);
});

notificationsController.put("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const user = await notificationRepository.findOne(req.params.id);
    notificationRepository.merge(user, req.body);
    const results = await notificationRepository.save(user);
    return res.send(results);
});

notificationsController.delete("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const results = await notificationRepository.delete(req.params.id);
    return res.send(results);
});

export default notificationsController;
