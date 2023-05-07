import {DeviceType} from "./DeviceType";
import {User} from "../user/User";
import {Hub} from "../hub/Hub";
import {DeviceProtectionData} from "../deviceProtectionData/DeviceProtectionData";

export interface Device {
    id?: number
    name: string
    type: DeviceType
    batteryLevel: number
    details: string
    user: User
    hub: Hub
    protection: DeviceProtectionData

}