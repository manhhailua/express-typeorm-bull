import {Request, Response, Router} from "express";
import {getManager} from "typeorm";
import {Notification} from "../entities/Notification";

const notificationsController = Router()


notificationsController.get("/", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const notifications = await notificationRepository.find();
    res.json(notifications);
});

notificationsController.get("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const results = await notificationRepository.findOne(req.params.id);
    return res.send(results);
});

notificationsController.post("/", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const notification = await notificationRepository.create(req.body);
    const results = await notificationRepository.save(notification);
    return res.send(results);
});

notificationsController.put("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const notification = await notificationRepository.findOne(req.params.id);
    notificationRepository.merge(notification, req.body);
    const results = await notificationRepository.save(notification);
    return res.send(results);
});

notificationsController.delete("/:id", async function (req: Request, res: Response) {
    const notificationRepository = getManager().getRepository(Notification);
    const results = await notificationRepository.delete(req.params.id);
    return res.send(results);
});

export default notificationsController;
