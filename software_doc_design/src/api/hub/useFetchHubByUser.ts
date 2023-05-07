import { useEffect, useState } from "react";
import axios from "axios";
import { Hub } from "../../domain/hub/Hub";

export const useFetchHubByUser = (userId: number) => {
  const [data, setData] = useState<Array<Hub> | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get<Array<Hub>>(
          `http://localhost:8080/hubs/user/${userId}`
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
