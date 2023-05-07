import classes from "./DeviceCreationForm.module.css";
import { useState } from "react";
import { DeviceType } from "../../domain/device/DeviceType";
import { useFetchHubByUser } from "../../api/hub/useFetchHubByUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Hub } from "../../domain/hub/Hub";
import { ProtectionType } from "../../domain/deviceProtectionData/ProtectionType";
import axios from "axios";
import { Device } from "../../domain/device/Device";
import { DeviceState } from "../../domain/deviceProtectionData/DeviceState";
import { useFetchUser } from "../../api/user/useFetchUser";

export const DeviceCreationForm = () => {
  const [name, setName] = useState<string | null>();
  const [protectionName, setProtectionName] = useState<string | null>();
  const [deviceType, setDeviceType] = useState<DeviceType | null>();
  const [batteryLevel, setBatteryLevel] = useState<number | null>();
  const [details, setDetails] = useState<string | null>();
  const [hub, setHub] = useState<Hub | null>();
  const [protectionType, setProtectionType] = useState<ProtectionType | null>();

  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get("userId")!!);
  const { data } = useFetchHubByUser(userId);
  const { data: user } = useFetchUser(userId);
  const navigate = useNavigate();

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (
      name &&
      protectionName &&
      deviceType &&
      batteryLevel &&
      details &&
      hub &&
      protectionType &&
      user
    ) {
      try {
        const device: Device = {
          name: name,
          protection: {
            name: protectionName,
            deviceState:
              batteryLevel < 20 ? DeviceState.BATTERY_LOW : DeviceState.NORMAL,
            protectionType: protectionType,
          },
          hub: hub,
          batteryLevel: batteryLevel,
          type: deviceType,
          user: user,
          details: details,
        };
        const response = await axios.post<Device>(
          "http://localhost:8080/devices",
          device
        );
        if (response.data !== null) {
          navigate(`/devices?userId=${userId}`);
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <div className={classes.deviceCreationContainer}>
      <div className={classes.form}>
        <form>
          <div className={classes.header}>
            <p>Create device</p>
            <span>Please fill in fields</span>
          </div>
          <label className={classes.inputContainer}>
            <p>Name</p>
            <input
              className={classes.nameInput}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required={true}
              placeholder={"Name"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Device Type</p>
            <select
              className={classes.dropdown}
              defaultValue={DeviceType.DEFAULT}
              onChange={(e) =>
                setDeviceType(
                  DeviceType[e.target.value as keyof typeof DeviceType]
                )
              }
            >
              <option value={DeviceType.SENSOR}>Sensor</option>
              <option value={DeviceType.DEFAULT}>Default</option>
            </select>
          </label>
          <label className={classes.inputContainer}>
            <p>Battery level</p>
            <input
              className={classes.nameInput}
              type="number"
              onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
              required={true}
              placeholder={"Battery level"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Details</p>
            <textarea
              className={classes.nameInput}
              onChange={(e) => setDetails(e.target.value)}
              required={true}
              placeholder={"Details"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Hub №</p>
            <select
              className={classes.dropdown}
              onChange={(e) =>
                setHub(data?.find((hub) => hub.id === parseInt(e.target.value)))
              }
            >
              {data && data.map((it) => <option value={it.id}>{it.id}</option>)}
            </select>
          </label>
          <label className={classes.inputContainer}>
            <p>Protection name</p>
            <input
              className={classes.nameInput}
              type="text"
              onChange={(e) => setProtectionName(e.target.value)}
              required={true}
              placeholder={"Protection name"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Protection Type</p>
            <select
              className={classes.dropdown}
              defaultValue={ProtectionType.LEAKS_PROTECTION}
              onChange={(e) =>
                setProtectionType(
                  ProtectionType[e.target.value as keyof typeof ProtectionType]
                )
              }
            >
              <option value={ProtectionType.LEAKS_PROTECTION}>
                Leaks protection
              </option>
              <option value={ProtectionType.FIRE_PROTECTION}>
                Fire protection
              </option>
              <option value={ProtectionType.GLASS_PROTECTION}>
                Glass protection
              </option>
              <option value={ProtectionType.MOTION_PROTECTION}>
                Motion protection
              </option>
            </select>
          </label>
          <button
            className={classes.signUpButton}
            type="submit"
            onClick={handleCreate}
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
