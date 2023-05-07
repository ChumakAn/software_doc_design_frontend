import classes from ".././DeviceCreationForm/DeviceCreationForm.module.css";
import { FC, useState } from "react";
import { DeviceType } from "../../domain/device/DeviceType";
import { useFetchHubByUser } from "../../api/hub/useFetchHubByUser";
import { useNavigate } from "react-router-dom";
import { Hub } from "../../domain/hub/Hub";
import { ProtectionType } from "../../domain/deviceProtectionData/ProtectionType";
import { Device } from "../../domain/device/Device";
import { DeviceState } from "../../domain/deviceProtectionData/DeviceState";
import axios from "axios";

interface DeviceUpdateFormProps {
  device: Device;
}
export const DeviceUpdateForm: FC<DeviceUpdateFormProps> = ({ device }) => {
  const [name, setName] = useState<string | null>(device.name);
  const [protectionName, setProtectionName] = useState<string | null>(
    device.protection.name
  );
  const [deviceType, setDeviceType] = useState<DeviceType | null>(device.type);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(
    device.batteryLevel
  );
  const [details, setDetails] = useState<string | null>(device.details);
  const [hub, setHub] = useState<Hub | null>(device.hub);
  const [protectionType, setProtectionType] = useState<ProtectionType | null>(
    device.protection.protectionType
  );
  const [soundLevel, setSoundLevel] = useState<number>(
    device.protection.soundLevel ?? 0
  );
  const [levelThreshold, setLevelThreshold] = useState<number>(
    device.protection.levelThreshold ?? 0
  );
  const [waterLevel, setWaterLevel] = useState<number>(
    device.protection.waterLevel ?? 0
  );
  const [movementCount, setMovementCount] = useState<number>(
    device.protection.movementCount ?? 0
  );

  const { data = [] } = useFetchHubByUser(parseInt(device.user.id!!));
  const navigate = useNavigate();

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (
      name &&
      protectionName &&
      deviceType &&
      batteryLevel &&
      details &&
      hub &&
      protectionType &&
      device.user
    ) {
      try {
        const deviceRequest: Device = {
          id: device.id,
          name: name,
          protection: {
            name: protectionName,
            deviceState: calculateDeviceState(),
            protectionType: protectionType,
            levelThreshold: levelThreshold,
            waterLevel: waterLevel,
            soundLevel: soundLevel,
            movementCount: movementCount,
          },
          hub: hub,
          batteryLevel: batteryLevel,
          type: deviceType,
          user: device.user,
          details: details,
        };
        const response = await axios.put<Device>(
          `http://localhost:8080/devices/${device.id}`,
          deviceRequest
        );
        if (response.data !== null) {
          navigate(`/devices?userId=${device.user.id}`);
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  const calculateDeviceState = () => {
    if (batteryLevel && batteryLevel < 20) {
      return DeviceState.BATTERY_LOW;
    } else if (protectionType) {
      if (
        protectionType == ProtectionType.LEAKS_PROTECTION &&
        waterLevel > 30
      ) {
        return DeviceState.ALARM_STATE;
      }
      if (
        protectionType == ProtectionType.MOTION_PROTECTION &&
        movementCount > 20
      ) {
        return DeviceState.ALARM_STATE;
      }
      if (
        protectionType == ProtectionType.GLASS_PROTECTION &&
        soundLevel > 30
      ) {
        return DeviceState.ALARM_STATE;
      }
      if (levelThreshold > 30) {
        return DeviceState.ALARM_STATE;
      }
    }
    return DeviceState.NORMAL;
  };
  return (
    <div className={classes.deviceCreationContainer}>
      <div className={classes.form}>
        <form>
          <div className={classes.header}>
            <p>Update device</p>
            <span>Please fill in fields you want to edit</span>
          </div>
          <label className={classes.inputContainer}>
            <p>Name</p>
            <input
              className={classes.nameInput}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name ?? ""}
              required={true}
              placeholder={"Name"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Device Type</p>
            <select
              className={classes.dropdown}
              defaultValue={deviceType ?? DeviceType.DEFAULT}
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
              value={batteryLevel ?? ""}
              placeholder={"Battery level"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Details</p>
            <textarea
              className={classes.nameInput}
              onChange={(e) => setDetails(e.target.value)}
              required={true}
              value={details ?? ""}
              placeholder={"Details"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Hub №</p>
            <select
              className={classes.dropdown}
              onChange={(e) =>
                setHub(
                  data?.find((hub) => hub.id === parseInt(e.target.value)) ??
                    device.hub
                )
              }
              value={device.hub.id}
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
              value={protectionName ?? ""}
              placeholder={"Protection name"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Protection Type</p>
            <select
              className={classes.dropdown}
              defaultValue={protectionType ?? ProtectionType.LEAKS_PROTECTION}
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
          <label className={classes.inputContainer}>
            <p>Sound level</p>
            <input
              className={classes.nameInput}
              type="number"
              onChange={(e) => setSoundLevel(parseInt(e.target.value))}
              required={true}
              value={soundLevel ?? ""}
              placeholder={"Sound level"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Water level</p>
            <input
              className={classes.nameInput}
              type="number"
              onChange={(e) => setWaterLevel(parseInt(e.target.value))}
              required={true}
              value={waterLevel ?? ""}
              placeholder={"Water level"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Movement count</p>
            <input
              className={classes.nameInput}
              type="number"
              onChange={(e) => setMovementCount(parseInt(e.target.value))}
              required={true}
              value={movementCount ?? ""}
              placeholder={"Movement count"}
            />
          </label>
          <label className={classes.inputContainer}>
            <p>Level threshold</p>
            <input
              className={classes.nameInput}
              type="number"
              onChange={(e) => setLevelThreshold(parseInt(e.target.value))}
              required={true}
              value={levelThreshold ?? ""}
              placeholder={"Level threshold"}
            />
          </label>
          <button
            className={classes.signUpButton}
            type="submit"
            onClick={handleUpdate}
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};
