import { Header } from "../../components/Header/Header";
import { DeviceUpdateForm } from "../DeviceUpdateForm/DeviceUpdateForm";
import { useSearchParams } from "react-router-dom";
import { useFetchDevice } from "../../api/device/useFetchDevice";

export const DeviceUpdatePage = () => {
  const [searchParams] = useSearchParams();
  const deviceId = parseInt(searchParams.get("deviceId")!!);
  const { data } = useFetchDevice(deviceId);

  return (
    <>
      {data && (
        <div>
          <Header />
          <DeviceUpdateForm device={data} />
        </div>
      )}
    </>
  );
};
