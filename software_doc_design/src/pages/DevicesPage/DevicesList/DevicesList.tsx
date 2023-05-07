import { Device } from "../../../domain/device/Device";
import { FC } from "react";
import classes from "./DevicesList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { DevicesListItem } from "../DevicesListItem/DevicesListItem";

export interface DevicesListProps {
  devices: Array<Device>;
}

export const DevicesList: FC<DevicesListProps> = ({ devices }) => {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get("userId")!!);

  const handleDelete = async (deviceId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/devices/${deviceId}`
      );
      if (response.data !== null) {
        alert(`Deleted device with id ${deviceId}`);
        window.location.reload();
      }
    } catch (err) {
      alert(err);
    }
  };
  const handleUpdateClick = (deviceId: number) => {
    navigate(`/devices/update?userId=${userId}&deviceId=${deviceId}`);
  };
  const navigate = useNavigate();
  return (
    <div className={classes.itemGrid}>
      {devices.map((it) => (
        <DevicesListItem
          device={it}
          onUpdateClick={handleUpdateClick}
          onDeleteClick={handleDelete}
        />
      ))}
    </div>
  );
};
