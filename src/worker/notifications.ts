import * as Bull from "bull";
import {getManager} from "typeorm";
import {Notification} from "../entities/Notification";

const notificationsQueue = Bull('notification', process.env.REDIS_URL || 'redis://localhost:6379');

notificationsQueue.process(async function (job, done) {
    const notificationRepository = getManager().getRepository(Notification);
    const fullName = job.data.payload.firstName + " " + job.data.payload.lastName;

    let notification;
    switch (job.data.type) {
        case "CREATE":
            notification = notificationRepository.create({
                title: `${fullName} is created.`,
            });
            await notificationRepository.save(notification);
            break;
        case "UPDATE":
            notification = notificationRepository.create({
                title: `${fullName} is updated.`,
            });
            await notificationRepository.save(notification);
            break;
        case "DELETE":
            notification = notificationRepository.create({
                title: `${fullName} is deleted.`,
            });
            await notificationRepository.save(notification);
            break
    }

    done();
});

export default notificationsQueue;
