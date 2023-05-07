import {Device} from "../../../domain/device/Device";
import classes from "../DevicesList/DevicesList.module.css";
import deviceIcon from "../DevicesList/responsive.png";
import editIcon from "../DevicesList/edit.png";
import deleteIcon from "../DevicesList/delete.png";
import {FC} from "react";
import {useFetchNotificationsByDevice} from "../../../api/notification/useFetchNotificationsByDevice";
import {ProtectionType} from "../../../domain/deviceProtectionData/ProtectionType";

interface DevicesListItemProps {
    device: Device
    onUpdateClick: (id: number) => void
    onDeleteClick: (id: number) => void
}

export const DevicesListItem:FC<DevicesListItemProps> = ({device, onUpdateClick, onDeleteClick}) => {
    const { data } = useFetchNotificationsByDevice(device.id!!)

    return (<div className={classes.deviceItem}>
        <div className={classes.icon}><img src={deviceIcon}/>
        </div>
        <div className={classes.container}>
            <div className={classes.deviceInfo}>
                <span>Name: {device.name}</span>
                <span>State: {device.protection.deviceState}</span>
                {device.protection.protectionType == ProtectionType.FIRE_PROTECTION &&
                    <span>Level threshold: {device.protection.levelThreshold}</span>
                }
                {device.protection.protectionType == ProtectionType.LEAKS_PROTECTION &&
                    <span>Water level: {device.protection.waterLevel}</span>
                }
                {device.protection.protectionType == ProtectionType.GLASS_PROTECTION &&
                    <span>Sound level: {device.protection.soundLevel}</span>
                }
                {device.protection.protectionType == ProtectionType.MOTION_PROTECTION &&
                    <span>Movement count: {device.protection.movementCount}</span>
                }
                <span>Hub id: {device.hub.id}</span>
                <span>Type: {device.type}</span>
                <span>Battery level: {device.batteryLevel}%</span>
                <span>Owned by: {device.user.name}</span>
                {data && <span>Notification count: {data.length}</span>}
            </div>
            <div className={classes.editContainer}>
                <img className={classes.editIcon} src={editIcon} onClick={() => onUpdateClick(device.id!!)}/>
            </div>
            <div className={classes.editContainer}>
                <img className={classes.editIcon} src={deleteIcon} onClick={() => onDeleteClick(device.id!!)}/>
            </div>
        </div>
    </div>)
}