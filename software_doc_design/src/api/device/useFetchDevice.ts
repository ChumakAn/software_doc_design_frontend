import { useEffect, useState } from "react";
import axios from "axios";
import { Device } from "../../domain/device/Device";

export const useFetchDevice = (deviceId: number) => {
  const [data, setData] = useState<Device | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get<Device>(
          `http://localhost:8080/devices/${deviceId}`
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [deviceId]);

  return { data, error, loading };
};
