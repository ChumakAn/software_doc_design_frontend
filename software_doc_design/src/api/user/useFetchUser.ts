import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../../domain/user/User";

export const useFetchUser = (userId: number) => {
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get<User>(
          `http://localhost:8080/users/${userId}`
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
