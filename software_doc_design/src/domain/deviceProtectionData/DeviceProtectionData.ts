import {ProtectionType} from "./ProtectionType";
import {DeviceState} from "./DeviceState";

export interface DeviceProtectionData {
    name: string
    protectionType: ProtectionType
    deviceState: DeviceState
    waterLevel?: number
    soundLevel?: number
    levelThreshold?: number
    movementCount?: number

}