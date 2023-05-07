import {HubType} from "./HubType";
import {User} from "../user/User";

export interface Hub {
    id?: number
    hubType: HubType
    eventLog: string
    user: User
}