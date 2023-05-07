import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchDeviceByUser } from "../../api/device/useFetchDeviceByUser";
import { DevicesList } from "./DevicesList/DevicesList";
import { Header } from "../../components/Header/Header";
import classes from "./DevicesPage.module.css";

export const DevicesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = parseInt(searchParams.get("userId")!!);
  const { data } = useFetchDeviceByUser(userId);
  const handleCreateClick = () => {
    navigate(`/devices/create?userId=${userId}`);
  };

  return (
    <div>
      <Header />
      {data && <DevicesList devices={data} />}
      <button className={classes.buttonToCreate} onClick={handleCreateClick}>
        Create new device
      </button>
    </div>
  );
};
