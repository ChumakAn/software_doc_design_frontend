import { useEffect, useState } from "react";
import axios from "axios";
import { Notification } from "../../domain/notification/Notification";

export const useFetchNotificationsByDevice = (deviceId: number) => {
  const [data, setData] = useState<Array<Notification> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get<Array<Notification>>(
          `http://localhost:8080/notifications/device/${deviceId}`
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
