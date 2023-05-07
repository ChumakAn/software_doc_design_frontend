import { User } from "../../domain/user/User";
import { Device } from "../../domain/device/Device";
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchDeviceByUser = (userId: number) => {
  const [data, setData] = useState<Array<Device> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get<Array<Device>>(
          `http://localhost:8080/devices/user/${userId}`
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { data, error, loading };
};
