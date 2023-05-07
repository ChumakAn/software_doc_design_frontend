import {NotificationType} from "./NotificationType";
import {Hub} from "../hub/Hub";
import {Device} from "../device/Device";

export interface Notification {
    notificationType: NotificationType
    message: string
    hub: Hub
    device:Device
}